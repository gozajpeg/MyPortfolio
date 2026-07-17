import { useState } from 'react';

function HeroSection() {
  const roles = [
    { label: 'FULL-STACK DEVELOPER', color: 'bg-[#a3e635]' },
    { label: 'UI/UX DESIGNER', color: 'bg-[#f50000]' },
    { label: 'WEB & MOBILE ENGINEER', color: 'bg-[#ff6b00]' }
  ];

  return (
    <section id="home" className="w-full pt-8 sm:pt-16 px-4 sm:px-6 relative">

      {/* Decorative Floating SVG Sticker 1 (Retro Star) */}
      <div className="absolute top-16 right-[15%] z-20 pointer-events-none animate-spin-3d hidden md:block">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[3px_3px_0px_#050505]">
          <path d="M32 0C32 17.6731 17.6731 32 0 32C17.6731 32 32 46.3269 32 64C32 46.3269 46.3269 32 64 32C46.3269 32 32 17.6731 32 0Z" fill="#ffde047" stroke="#050505" strokeWidth="4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Left Side: Hero Title Dashboard */}
        <div
          className="lg:col-span-7 bg-[#22d3ee] border-4 border-[#050505] shadow-[8px_8px_0px_#050505] md:shadow-[12px_12px_0px_#050505] p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(#050505 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Neon mesh circle background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ff3884] rounded-full filter blur-[80px] opacity-60 -z-10"></div>

          <div className="relative space-y-6">

            {/* Giant Typographic Title */}
            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight uppercase leading-[0.85] text-[#050505] drop-shadow-[4px_4px_0px_#ffffff]">
              ROMMEL
              <br />
              <span className="text-white [-webkit-text-stroke:2px_#050505] drop-shadow-[4px_4px_0px_#ff3884]">ANGELO</span>
              <br />
              GOZA
            </h1>

            {/* Subtext description with custom bracket border */}
            <div className="border-l-4 border-black pl-4 py-1">
              <p className="font-mono text-xs sm:text-base text-[#050505] max-w-lg leading-relaxed font-black bg-white p-4 neo-border neo-shadow">
                Building bulletproof code architectures, secure backend gateways, and highly interactive user interfaces.
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mt-8 relative pt-6 border-t-4 border-[#050505] flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3 bg-white p-2.5 border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg]">
              <span className="w-3.5 h-3.5 bg-[#a3e635] border-2 border-black rounded-full animate-ping inline-block"></span>
              <span className="font-mono text-[10px] sm:text-xs uppercase font-black tracking-wider text-[#050505]">
                AVAILABLE FOR WORK
              </span>
            </div>

            <a
              href="#about"
              className="bg-[#ff6b00] hover:bg-black hover:text-white border-2 border-[#050505] font-mono text-xs font-black uppercase px-4 py-2 shadow-[3px_3px_0px_#050505] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              System Profile &darr;
            </a>
          </div>
        </div>

        {/* Right Side: Virtual Desktop Terminal UI */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 bg-white border-4 border-[#050505] shadow-[8px_8px_0px_#050505] md:shadow-[12px_12px_0px_#050505] flex flex-col">

            {/* Window header widget */}
            <div className="bg-[#34ff1a] text-white p-4 flex items-center justify-between border-b-4 border-black">
            </div>

            {/* Window Content */}
            <div
              className="p-6 sm:p-8 flex flex-col col-span-10 justify-between flex-1 gap-10 relative overflow-hidden"
              style={{
                backgroundImage: " linear-gradient(to right, #ff0000ff 0.5px, transparent 0.5px), linear-gradient(to bottom, #000000 0.5px, transparent 0.5px)",
                backgroundSize: '30px 30px',
                backgroundAlpha: '0.04'
              }}
            >
              <div className="space-y-4">
                <p className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#050505] leading-none bg-white p-10 neo-border neo-shadow">
                  "Design, code, and secure Platforms for growth."
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="#projects"
                  className="w-full inline-block text-center py-4 px-6 bg-[#ff3884] text-white font-mono font-black text-xs sm:text-sm uppercase border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                >
                  EXPLORE PROJECTS &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Marquee Banner */}
      <div className="max-w-7xl mx-auto mt-8 bg-[#ff3884] border-4 border-black shadow-[6px_6px_0px_#000] p-4 overflow-hidden relative">
        <div className="flex w-max animate-ticker whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center">
              {roles.map((role, j) => (
                <span key={`${i}-${j}`} className="font-display text-lg sm:text-2xl uppercase text-[#050505] font-black tracking-widest mx-6 flex items-center">
                  {role.label}
                  <span className="text-white pl-12">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
