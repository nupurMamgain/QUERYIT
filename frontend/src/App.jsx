import {Routes,Route} from "react-router-dom"
import Navbar from "./COMPONENTS/Navbar";
import Hero from "./COMPONENTS/Hero";
import Stats from "./COMPONENTS/Stats";
import Strip from "./COMPONENTS/Strip";
import Feature from "./COMPONENTS/Feature";
import Footer from "./COMPONENTS/Footer";
import QueryEngine from "./COMPONENTS/QueryEngine";

function HomePage() {
  return (
    <>
      <div className="bg-[#080F1A] overflow-x-hidden bg-[linear-gradient(to_right,rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.08)_1px,transparent_1px)]
bg-[size:60px_60px]">

      <Navbar />

      <Hero />

      <Strip />

      <Stats />

      <Feature />

      <Footer />

    </div>
  
    
    </>
  );
}

function App(){
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/query-engine" element={<QueryEngine/>}/>
    </Routes>
  )
}

export default App;