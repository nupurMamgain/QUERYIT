import type { Config } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";
import * as cheerio from "cheerio";

const MAX_URLS = 3;
const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 300;
const TOP_K = 6;

const STOPWORDS = new Set(
  "a an and are as at be by for from has have how in is it its of on or that the this to was were what when where which who why will with does did do".split(" ")
);

const tokenize = (text: string) =>
  text.toLowerCase().match(/[a-z0-9]+/g)?.filter((t) => !STOPWORDS.has(t)) ?? [];

// Fetch a page and return its readable text
async function loadUrl(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; QueryiT/1.0)" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const $ = cheerio.load(await res.text());
  $("script, style, noscript, svg, nav, footer, header, iframe").remove();
  return $("body").text().split(/\s+/).join(" ").trim();
}

function splitText(text: string): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + CHUNK_SIZE, text.length);
    // Prefer breaking at a sentence or word boundary
    if (end < text.length) {
      const slice = text.slice(start, end);
      const cut = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf(" "));
      if (cut > CHUNK_SIZE / 2) end = start + cut + 1;
    }
    chunks.push(text.slice(start, end).trim());
    if (end >= text.length) break;
    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }
  return chunks.filter(Boolean);
}

// Rank chunks against the question with BM25
function topChunks(chunks: string[], question: string): string[] {
  const query = [...new Set(tokenize(question))];
  const docs = chunks.map(tokenize);
  const avgLen = docs.reduce((n, d) => n + d.length, 0) / (docs.length || 1);
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set(d)) df.set(t, (df.get(t) ?? 0) + 1);

  const scored = docs.map((d, i) => {
    const tf = new Map<string, number>();
    for (const t of d) tf.set(t, (tf.get(t) ?? 0) + 1);
    let score = 0;
    for (const q of query) {
      const f = tf.get(q);
      if (!f) continue;
      const idf = Math.log(1 + (docs.length - df.get(q)! + 0.5) / (df.get(q)! + 0.5));
      score += (idf * f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (d.length / avgLen)));
    }
    return { i, score };
  });

  const ranked = scored.sort((a, b) => b.score - a.score).slice(0, TOP_K);
  // Fall back to the start of the pages if nothing matched
  const picked = ranked[0]?.score > 0 ? ranked.filter((r) => r.score > 0) : ranked;
  return picked.map((r) => chunks[r.i]);
}

export default async (req: Request) => {
  let body: { urls?: unknown; question?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const urls = (Array.isArray(body.urls) ? body.urls : [])
    .filter((u): u is string => typeof u === "string" && /^https?:\/\//i.test(u.trim()))
    .map((u) => u.trim())
    .slice(0, MAX_URLS);
  const question = typeof body.question === "string" ? body.question.trim() : "";

  if (!urls.length) return Response.json({ error: "No URLs provided" }, { status: 400 });
  if (!question) return Response.json({ error: "No question provided" }, { status: 400 });

  const pages = await Promise.allSettled(urls.map(loadUrl));
  const chunks = pages.flatMap((p) => (p.status === "fulfilled" ? splitText(p.value) : []));

  if (!chunks.length) {
    return Response.json({ answer: "No content could be extracted from the provided URLs." });
  }

  const context = topChunks(chunks, question).join("\n\n");
  const prompt = `You are a precise QA system.

RULES:
- Use ONLY the context below
- If answer is not clearly in context → say "Not found in provided URLs"
- Wikipedia text may be messy, but extract meaning carefully
- Do NOT guess

Context:
${context}

Question:
${question}

Answer:`;

  try {
    const anthropic = new Anthropic();
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      temperature: 0,
      messages: [{ role: "user", content: prompt }],
    });
    const answer = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("")
      .trim();
    return Response.json({ answer: answer || "Not found in provided URLs." });
  } catch (error) {
    console.error("LLM request failed", error);
    return Response.json({ error: "Failed to generate an answer" }, { status: 502 });
  }
};

export const config: Config = {
  path: "/api/ask",
  method: "POST",
};
