import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="bg-[linear-gradient(to_right,#080f1a,#0d3b6e,#080f1a)] min-h-screen px-10 py-20">
      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-6xl font-black text-[#BAE6FD]  leading-tight">
            READ LESS.
            <br />
            <span className="text-[#0EA5E9]">KNOW MORE.</span>
          </h1>

          <p className="mt-8 text-xl text-[#B1BAC4] leading-relaxed">
            Drop three URLs, ask one question.
            Query It tears through the content
            and hands you exactly what matters.
          </p>

          <Link to="/query-engine">
            <button className="bg-[#0EA5E9] mt-8 font-bold text-[#080B10] border border-[#0EA5E9] px-5 py-2 rounded-xl  hover:scale-105 transition">
              Get Started
            </button>
          </Link>

          <div className="mt-6 flex gap-10 items-start">

  {/* LEFT */}
  <div className="flex flex-col items-center">
    <h1 className="text-5xl mr-20 font-bold text-[#38BDF8]">
      3
    </h1>

    <p className="text-sm text-[#6E7681]">
      URLs per session
    </p>
  </div>

  {/* RIGHT */}
  <div className="flex flex-col items-center">
    <h1 className="text-5xl font-bold mr-20 text-[#38BDF8]">
      ~2s
    </h1>

    <p className="text-sm text-[#6E7681]">
      average response
    </p>
  </div>

    <div className="flex flex-col items-center">
    <h1 className="text-5xl font-bold mr-30 text-[#38BDF8]">
      100%
    </h1>

    <p className="text-sm mr-30 text-[#6E7681]">
      source backed answer
    </p>
  </div>

</div>
        </div>

        {/* RIGHT BOX */}
        <div className="relative bg-[#21262D] text-amber-50 rounded-3xl p-4 py-5 shadow-2xl">

          {/* GLOW BADGE (moved OUTSIDE inner content + fixed position) */}
          <span className="absolute -top-4 -right-4 bg-[#0EA5E9] text-black text-xs font-bold px-4 py-1 rounded-full rotate-12 shadow-[0_0_18px_rgba(250,204,21,0.6)] animate-float">
            Instant!
          </span>

          <span className="absolute -bottom-1 -left-13 bg-[#BAE6FD] border border-[#0EA5E9] text-black text-xs font-bold px-4 py-1 rounded-full rotate-12 shadow-[0_0_20px_rgba(14,165,233,0.6),0_0_30px_rgba(250,204,21,0.4)] ">
            3 URLSs→1 ANSWER
          </span>


          <div className="mb-4 font-bold text-sm tracking-wide text-[#B1BAC4]">
            URLS QUEUED
          </div>

          <div className="space-y-4">
            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl text-[#38BDF8]">
              🔗 https://openai.com
            </div>

            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl text-[#38BDF8]">
              🔗 https://openai.com
            </div>

            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl text-[#38BDF8]">
              🔗 https://openai.com
            </div>

            <div className="bg-white/10 backdrop-blur-md border-[#0369A1] p-4 rounded-xl text-[#B1BAC4]">
              What are the differences between GPT-4 and Claude?
            </div>

            <div className="bg-white p-4 rounded-xl text-black">
              Based on your sources...Claude (Anthropic) and GPT-4 (OpenAI) differ primarily in their architectural focus, safety alignment, and multimodal capabilities.  Claude utilizes a Constitutional AI framework that prioritizes ethical alignment, resulting in concise, cautious responses and lower hallucination rates, whereas GPT-4 relies on Reinforcement Learning from Human Feedback (RLHF), offering greater versatility and creativity.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;