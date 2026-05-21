
import { useState } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";

function QueryEngine() {

  const [urls, setUrls] = useState(["", "", ""]);
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isValidURL = (url) => {
    if (!url.trim()) return false;

    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validUrls = urls.filter((url) => isValidURL(url)).length;

  const handleURLChange = (index, value) => {
    const updated = [...urls];
    updated[index] = value;

    setUrls(updated);

    setErrors((prev) => ({
      ...prev,
      [`url${index}`]: "",
    }));
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);

    setErrors((prev) => ({
      ...prev,
      question: "",
    }));
  };

  const handleClear = () => {
    setUrls(["", "", ""]);
    setQuestion("");
    setErrors({});
    setSubmitted(false);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!urls[0].trim()) {
      newErrors.url0 = "At least one URL is required";
    } else if (!isValidURL(urls[0])) {
      newErrors.url0 = "Please enter a valid URL";
    }

    urls.slice(1).forEach((url, index) => {
      if (url.trim() && !isValidURL(url)) {
        newErrors[`url${index + 1}`] = "Invalid URL format";
      }
    });

    if (!question.trim()) {
      newErrors.question = "Question is required";
    } else if (question.trim().length < 10) {
      newErrors.question =
        "Question should be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8000/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls,
          question,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch answer");
    }

    const data = await response.json();

    setAnswer(data.answer);

    setSubmitted(true);

  } catch (error) {
    console.log(error);

    setErrors((prev) => ({
      ...prev,
      api: "Something went wrong",
    }));

  } finally {
    setLoading(false);
  }
};

  const isButtonActive =
    validUrls >= 1 &&
    question.trim().length >= 10;

  return (
    <div className="h-auto bg-[#111111] text-white px-10 py-12 font-sans">

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-6xl font-bold tracking-tight">
            <span className="text-[#BAE6FD]">Query </span>
            <span className="text-[#0EA5E9]">Engine</span>
          </h1>

          <p className="text-[#b5b5b5] mt-3 text-lg">
            Add URLs → ask your question → get answers
          </p>
        </div>

        <button
          onClick={handleClear}
          className="text-sm text-[#d6d6d6] hover:text-white flex items-center gap-1 mt-4 transition-all"
        >
          Clear All <X size={14} />
        </button>
      </div>

      <div className="mt-12 border border-[#2d2d2d] rounded-3xl bg-[#181818] p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-[#ECECE7]">
            Source URLs
          </h2>

          <div
            className={`
              text-sm px-4 py-2 rounded-full border transition-all
              ${
                validUrls > 0
                  ? "bg-[#142417] border-[#285f35] text-[#59ff7a]"
                  : "bg-[#0D3B6E] border-[#0EA5E9] text-[#0EA5E9]"
              }
            `}
          >
            {validUrls}/3 added
          </div>
        </div>

        <div className="space-y-7">

          {urls.map((url, index) => (
            <div key={index}>

              <label className="block text-sm text-[#cfcfcf] mb-3">
                URL {index + 1}
                {index === 0 && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              <div
                className={`
                  flex items-center rounded-xl px-4 h-15
                  border transition-all
                  ${
                    errors[`url${index}`]
                      ? "border-red-500"
                      : "border-[#2f2f2f]"
                  }
                  bg-[#1d1d1d]
                `}
              >
                <div
                  className={`
                    w-3 h-3 rounded-full border
                    ${
                      isValidURL(url)
                        ? "bg-green-500 border-green-500"
                        : "border-[#8d8d8d]"
                    }
                  `}
                />

                <input
                  type="text"
                  value={url}
                  onChange={(e) =>
                    handleURLChange(index, e.target.value)
                  }
                  placeholder={`https://example${index + 1}.com/article`}
                  className="bg-transparent outline-none w-full ml-4 text-[#f1f1f1] placeholder:text-[#8d8d8d]"
                />
              </div>

              {errors[`url${index}`] && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <AlertCircle size={14} />
                  {errors[`url${index}`]}
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      <div className="mt-8 border border-[#2d2d2d] rounded-3xl bg-[#181818] p-8 shadow-[0_0_40px_rgba(0,0,0,0.25)]">

        <h2 className="text-3xl font-semibold text-[#ECECE7]">
          Your Question
        </h2>

        <p className="text-[#cfcfcf] text-sm mt-6 mb-3">
          What do you want to know?
          <span className="text-red-500 ml-1">*</span>
        </p>

        <textarea
          value={question}
          onChange={handleQuestionChange}
          placeholder="e.g. What are the main differences between these topics? Summarize the key points..."
          className={`
            w-full
            h-35
            resize-none
            rounded-2xl
            border
            px-5
            py-4
            text-[#f1f1f1]
            placeholder:text-[#8d8d8d]
            outline-none
            bg-[#1d1d1d]
            transition-all
            ${
              errors.question
                ? "border-red-500"
                : "border-[#2f2f2f]"
            }
          `}
        />

        {errors.question && (
          <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
            <AlertCircle size={14} />
            {errors.question}
          </div>
        )}

        <div className="flex items-center justify-between mt-6">

          <p className="text-[#8d8d8d] text-sm">
            {question.length} chars
          </p>

          <button
            onClick={handleSubmit}
            disabled={!isButtonActive}
            className={`
              px-8
              py-4
              rounded-xl
              text-white
              text-sm
              font-medium
              transition-all
              duration-300
              ${
                isButtonActive
                  ? "bg-[#0EA5E9] hover:bg-[#38BDF8] shadow-[0_0_20px_rgba(255,77,77,0.35)]"
                  : "bg-[#0D3B6E] cursor-not-allowed opacity-60"
              }
            `}
          >
            Generate Answer →
          </button>
        </div>

        {submitted && (
          <div className="mt-6 flex items-center gap-2 text-green-400 bg-[#16251a] border border-[#285f35] rounded-xl px-4 py-3">
            <CheckCircle2 size={18} />
            Query submitted successfully.
          </div>
        )}
      </div>

      {answer && (
  <div className="mt-8 border border-[#2d2d2d] rounded-3xl bg-[#181818] p-8">

    <h2 className="text-2xl font-semibold mb-4 text-[#ECECE7]">
      AI Answer
    </h2>

    <p className="text-[#d6d6d6] leading-relaxed whitespace-pre-line">
      {answer}
    </p>

  </div>
)}

      <div className="mt-8 border border-dashed border-[#2f2f2f] rounded-3xl bg-[#141414] p-8">

        <h3 className="text-[#ECECE7] text-lg mb-6 flex items-center gap-2">
          💡 Tips for best results
        </h3>

        <div className="space-y-3 text-[#cfcfcf] text-sm">
          <p>Use direct article or documentation URLs</p>
          <p>Be specific in your question for focused answers</p>
          <p>Mix different sources for comparative analysis</p>
          <p>Try asking for summaries, comparisons, or key points</p>
        </div>

      
      </div>
  

    </div>
    
  );
}

export default QueryEngine;

