function Card({title,desc,icon}){
    return(
        
        <div className="bg-[#30363D] p-7 rounded-xl shadow-2xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-6">
        {icon}
      </div>
            <h1 className="text-2xl mb-4 font-extrabold text-[#F0F3F6]">
                {title}
            </h1>
            <p className="mt-4 text-[#8B949E] leading-relaxed">
                {desc}
            </p>
        </div>
    )
}

export default Card