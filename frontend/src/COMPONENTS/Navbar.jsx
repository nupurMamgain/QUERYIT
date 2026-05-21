import { Link } from "react-router-dom";
import logo from "../assets/QUERYITLOGO.png"
function Navbar(){
    return(
        <nav className="bg-[#21262D]  text-white flex justify-items-start items-center px-4 md:px-8 py-3 border-2 border-white/5">
             {/*logo*/}
             <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-10 h-10 object-contain"/>
                <h1 className="text-2xl font-bold text-orange-400 "style={{fontFamily:"Söhne"}}>QUERY iT</h1>
                
             </div>

             <div className=" justify-evenly flex gap-8 text-sm ml-150 ">

                <a href="#"className="text-[#6E7681] hover:scale-95">
                    Home
                </a>

                 <a href="#"className="text-[#6E7681] hover:scale-95">
                    Query
                </a>

                 <a href="#"className="text-[#6E7681] hover:scale-95">
                    About
                </a>

                 <a href="#"className="text-[#6E7681] hover:scale-95">
                    Pricing
                </a>
                
            </div>

            <div className="flex gap-4 ml-9">
                <Link to="/query-engine">
                <button className="bg-[#0EA5E9] text-[#080B10] border border-[#0EA5E9] font-bold px-5 py-2 rounded-full hover:scale-105 transition">
                    Start Querying
                </button>
                </Link>
            </div>
        </nav>
    )
    
} 
export default Navbar;


/*#e2e5cc bg  #38304a nav #df5a3d butons #fca100 buton text*/