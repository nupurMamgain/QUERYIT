import image from "../assets/image.png"
function Stats() {
  return (

    <section className="mt-16 mb-12 backdrop-blur-md bg-[#6E7681]/20 text-white py-16 px-10">

      <h2 className="text-7xl font-extrabold text-[#0EA5E9] text-center mb-16">
        HOW IT WORKS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center items-center">

        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-[#34647c]">
            01
          </h1>

          <p className="mt-3 text-[##F0F3F6] text-2xl">
            Drop your URLs
          </p>

          <p className="mt-3 text-gray-500 text-s">
            Paste up to three web URLs — articles, papers, docs, anything.
          </p>
          
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-[#34647c]">
            02
          </h1>

          <p className="mt-3 text-[#F0F3F6] text-2xl">
            Ask your question
          </p>

          <p className="mt-3 text-gray-500 text-s">
            Type exactly what you want to know. Specific or broad — it handles both.
          </p>

          
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-[#34647c]">
            03
          </h1>

          <p className="mt-3 text-[#F0F3F6] text-2xl">
            Get your answer
          </p>

          <p className="mt-3 text-gray-500 text-s">
            Receive a concise, cited answer drawn from your provided sources.
          </p>

        </div>

      </div>

    </section>

  )
}

export default Stats