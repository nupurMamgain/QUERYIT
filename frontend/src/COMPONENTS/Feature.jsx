import { Link } from "react-router-dom"
import Card from "./Card"
import { Link as LinkIcon, Link2, MessageCircle, Zap, Target, BookOpen, Lock } from "lucide-react"

function Feature() {

  return (

    <section className=" py-24 px-10">

      {/* Heading */}
      <div className="text-center mb-20">

        <div className="inline-block bg-[#080F1A] border border-[#0D3B6E] text-[#0EA5E9] font-bold px-6 py-2 rounded-full mb-6">
          WHY QUERY IT?
        </div>

        <h1 className="text-6xl font-black text-[#BAE6FD]">

          Everything you need
          <br />
          to query smarter

        </h1>

        <p className="mt-8 text-xl text-gray-700">

          Stop spending hours reading.
          Start asking questions and getting answers.

        </p>

      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card
  icon={<Link2 className="w-10 h-10 text-[#0EA5E9]" />}
  title="Feed 3 URLs"
  desc="Point our AI to any three web pages — blogs, docs, news, research."
/>

<Card
  icon={<MessageCircle className="w-10 h-10 text-[#0EA5E9]" />}
  title="Ask Anything"
  desc="Type your question in plain English and get source-grounded answers."
/>

<Card
  icon={<Zap className="w-10 h-10 text-[#0EA5E9]" />}
  title="Read Less"
  desc="Skip walls of text. Our AI distills what matters instantly."
/>

<Card
  icon={<Target className="w-10 h-10 text-[#0EA5E9]" />}
  title="Stay On-Point"
  desc="Every answer stays anchored to your sources."
/>

<Card
  icon={<BookOpen className="w-10 h-10 text-[#0EA5E9]" />}
  title="Save History"
  desc="All your sessions are saved so you can revisit and compare."
/>

<Card
  icon={<Lock className="w-10 h-10 text-[#0EA5E9]" />}
  title="Private & Safe"
  desc="Your URLs and questions stay yours. We never share your data."
/>


      </div>
      

      <div className="bg-[#21262D]/40 rounded-2xl p-40 mt-10 font-extrabold text-center text-[#38BDF8] text-7xl">
        READY TO QUERY iT?
        
        <p className="font-light mt-4  mb-4 text-[#6E7681] text-2xl">Start extracting insights from any URL in seconds.</p>
        <Link to="/query-engine">
        <button className="bg-[#0EA5E9] text-amber-200 rounded-2xl p-5 text-2xl">
            LAUNCH QUERY ENGINE
        </button>
        </Link>
      </div>

    </section>

  )
}

export default Feature