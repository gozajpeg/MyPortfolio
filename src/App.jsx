import { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Skills from './components/Skills'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Socials from './components/Socials'
import gozagrayImg from './assets/gozagray.png'
import gozablackImg from './assets/gozablack.png'
import './App.css'

function App() {
  // Dynamic Favicon logic
  useEffect(() => {
    const handleVisibilityChange = () => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = document.hidden ? gozagrayImg : gozablackImg;
    };

    // Set initial favicon
    handleVisibilityChange();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Dynamic class for NavLinks to handle the active state and sweeping hover effect
  const navLinkClass = ({ isActive }) => 
    `px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm tracking-[0.15em] uppercase cursor-pointer outline-none border-none block text-left bg-gradient-to-r from-[#ededed] from-50% to-transparent to-50% bg-[length:200%_100%] transition-all duration-500 ease-out ${
      isActive 
        ? 'bg-left-bottom text-[#0a0a0a] shadow-[0_0_20px_rgba(237,237,237,0.15)]' 
        : 'bg-right-bottom text-[#ededed] hover:bg-left-bottom hover:text-[#0a0a0a] hover:shadow-[0_0_20px_rgba(237,237,237,0.15)]'
    }`;

  return (
    <Router>
      <div className="min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-[#0a0a0a] text-[#ededed] font-sans box-border md:overflow-hidden">
      
      {/* Pane 1: Navigation / Branding */}
      <aside className="w-full md:w-[35%] lg:w-1/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#222222] md:h-full md:overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-4 mb-2">
          <img src={gozagrayImg} alt="Logo" className="w-14 h-14 md:w-16 md:h-16 shrink-0 object-contain" />
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-extralight tracking-[-0.02em] text-left leading-tight">
            Rommel Angelo T. Goza
          </h1>
        </div>
        <p className="text-xs md:text-sm font-normal tracking-[0.3em] uppercase text-[#737373] mb-12 text-left">
          Portfolio
        </p>
        
        <nav className="flex flex-col gap-2 md:gap-4">
          <NavLink to="/about" className={navLinkClass}>About Me</NavLink>
          <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
          <NavLink to="/skills" className={navLinkClass}>Skills</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/socials" className={navLinkClass}>Socials</NavLink>        
        </nav>
      </aside>

      {/* Pane 2: Content Display Area */}
      <main className="w-full md:w-[65%] lg:w-3/4 p-8 md:p-16 flex flex-col md:h-full md:overflow-y-auto no-scrollbar">
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center h-full">
              <img src={gozagrayImg} alt="Loading..." className="w-40 h-40 md:w-64 md:h-64 animate-spin-3d opacity-10" />
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/socials" element={<Socials />} />
        </Routes>
      </main>
    </div>
    </Router>
  )
}

export default App
