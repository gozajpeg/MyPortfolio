import { useState, useEffect } from 'react';

function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'projects', 'skills', 'socials'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', color: 'bg-neo-lime' },
    { name: 'About', id: 'about', color: 'bg-neo-cyan' },
    { name: 'Projects', id: 'projects', color: 'bg-neo-orange' },
    { name: 'Skills', id: 'skills', color: 'bg-neo-yellow' },
    { name: 'Socials', id: 'socials', color: 'bg-neo-lime' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full bg-[#f4f0d6] transition-all duration-300 neo-border ${isScrolled ? 'py-3' : 'py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          className="font-display font-black text-2xl md:text-3xl tracking-tighter uppercase select-none hover:rotate-1 transition-transform duration-200"
        >
          GOZA<span className="text-[#ff6b00] font-mono">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-4 py-2 font-mono font-bold text-sm uppercase border-2 border-[#050505] transition-all ${isActive
                  ? `${link.color} shadow-[2px_2px_0px_#050505] translate-x-[-2px] translate-y-[-2px]`
                  : 'bg-white hover:bg-zinc-100 hover:shadow-[2px_2px_0px_#050505] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                  }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Mobile menu indicator */}
        <div className="md:hidden flex items-center">
          <a
            href={`#${activeSection === 'socials' ? 'home' : navLinks[navLinks.findIndex(l => l.id === activeSection) + 1]?.id || 'home'}`}
            className="px-3 py-1.5 font-mono font-bold text-xs uppercase border-2 border-[#050505] bg-[#fde047] shadow-[2px_2px_0px_#050505]"
          >
            Next Section &rarr;
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
