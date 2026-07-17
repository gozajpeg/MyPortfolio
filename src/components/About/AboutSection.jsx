function AboutSection() {

  const services = [
    { label: "SAAS Platforms", color: "bg-yellow-300" },
    { label: "Web & Mobile Apps", color: "bg-pink-400" },
    { label: "UI/UX Design", color: "bg-cyan-300" },
    { label: "Cybersecurity", color: "bg-lime-300" },
    { label: "Open Source", color: "bg-orange-300" },
  ];
  return (
    <section id="about" className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Section Headline Banner */}
      <div className="bg-[#fde047] neo-border neo-shadow p-6 mb-12">
        <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter uppercase text-[#050505] leading-none">
          About Me
        </h2>
        <p className="font-mono text-sm uppercase tracking-wider text-[#050505] mt-2 font-semibold">
          Background, Philosophy, and Core Capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Summary */}
        <div className="lg:col-span-7 bg-white neo-border neo-shadow p-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#ff6b00] border-2 border-black inline-block"></span>
            <h3 className="font-display font-black text-2xl uppercase text-[#050505]">
              Professional Summary
            </h3>
          </div>

          <div className="font-sans text-base leading-relaxed text-zinc-700 space-y-4">
            <p>
              I am a self-taught developer based in the Philippines who loves coding secure, structured, and high-performance applications. I enjoy mastering both frontend layouts and backend systems, including hands-on experience managing servers, optimization, and securing data with modern cryptography practices.
            </p>
            <p>
              Highly dependable, I take full ownership of projects independently or collaborate smoothly within professional teams. I'm committed to continuous learning, regularly exploring new technologies, clean architectural patterns, and robust security policies to write cleaner, safer code.
            </p>
          </div>
        </div>

        {/* Right Card: Currently Building */}
        <div className="lg:col-span-5 bg-[#22d3ee] neo-border neo-shadow p-8 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#050505] inline-block"></span>
              <h3 className="font-display font-black text-2xl uppercase text-[#050505]">
                CREDENTIALS
              </h3>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
              <a href="#" className="neo-border neo-shadow p-4 flex items-center justify-center font-mono font-bold uppercase text-[#050505] bg-white hover:bg-[#e66bff] hover:text-white transition-colors">OPEN CV</a>
              <a href="#socials" className="neo-border neo-shadow p-4 flex items-center justify-center font-mono font-bold uppercase text-[#050505] bg-white hover:bg-[#ff5805] hover:text-white transition-colors">CHECK SOCIALS</a>
            </div>
          </div>
        </div>

        {/* Marquee Section */}
        <h3 className="font-display lg:col-span-12 p-5 flex flex-col neo-shadow neo-border bg-[#70ff38] items-center justify-center font-black text-4xl uppercase text-[#050505]">SERVICES I LOVE TO DO</h3>
        <div className="w-full lg:col-span-12 bg-[#ff2424] neo-border neo-shadow p-4 overflow-hidden">
          <div className="flex w-max animate-ticker whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center">
                {services.map((service, j) => (
                  <span key={`${i}-${j}`} className="font-display text-2xl uppercase text-[#050505] font-black tracking-widest mx-5 flex items-center">
                    {service.label}
                    <span className="text-white pl-10">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Full-width Card: Core Capabilities */}
        <div className="lg:col-span-12 bg-white neo-border neo-shadow p-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-4 h-4 bg-[#a3e635] border-2 border-black inline-block"></span>
            <h3 className="font-display font-black text-2xl uppercase text-[#050505]">
              Core Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Frontend & Backend',
                desc: 'Developing responsive interfaces and robust scalable REST APIs with standard security practices.',
                bg: 'bg-neo-lime'
              },
              {
                num: '02',
                title: 'Security Management',
                desc: 'Implementing OAuth2, cryptographic encryption (Argon2, Iron-WebCrypto), and secure key rotations.',
                bg: 'bg-neo-cyan'
              },
              {
                num: '03',
                title: 'Database Architecture',
                desc: 'Structuring, querying, and optimizing SQL (PostgreSQL, MySQL) and NoSQL database schemas.',
                bg: 'bg-neo-yellow'
              }
            ].map((cap, i) => (
              <div key={i} className="bg-zinc-50 border-4 border-black p-6 flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-4xl text-[#050505]">
                    {cap.num}
                  </span>
                  <span className="w-6 h-6 border-2 border-black bg-white shadow-[2px_2px_0px_#000]"></span>
                </div>
                <div>
                  <h4 className="font-display font-black text-lg uppercase text-[#050505] mb-2">
                    {cap.title}
                  </h4>
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
