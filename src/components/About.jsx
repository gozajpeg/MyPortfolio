

function About() {
  return (
    <div className="animate-page-in w-full">
      <h2 className="text-[#555555] text-lg font-light tracking-widest uppercase mb-12">
        About Me
      </h2>

      {/* Box Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mt-4">
        
        {/* Box 1: Professional Summary (Wide) */}
        <div className="lg:col-span-2 p-8 md:p-10 border border-[#222222] bg-[#0c0c0c] hover:border-[#ededed] transition-colors duration-500 group flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Background</h3>
          </div>
          <div className="flex flex-col gap-6 text-[#a3a3a3] font-light leading-relaxed tracking-wide text-sm md:text-base">
            <p>
              A self-taught developer from the Philippines with a passion for building secure, structured, and high-performance applications. Capable of mastering both frontend and backend development, with hands-on experience managing servers and databases, as well as encrypting and securing data through robust security practices. Highly dependable with a proven track record of delivering quality work on time, with the ability to take full ownership of projects independently or collaborate smoothly within professional teams.
            </p>
            <p>
              Committed to continuous learning, regularly exploring new technologies, architectural patterns, and security practices to write cleaner, more efficient code.
            </p>
          </div>
        </div>

        {/* Box 2: Core Capabilities */}
        <div className="lg:col-span-2 p-8 md:p-10 border border-[#222222] bg-[#0a0a0a] hover:border-[#ededed] transition-colors duration-500 group flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Core Capabilities</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-[#a3a3a3] font-light">
            <li className="flex flex-col gap-3">
              <span className="text-[#333333] text-4xl md:text-5xl font-light mb-2">01</span>
              <span className="text-[#ededed] text-base tracking-wider uppercase">Frontend & Backend</span>
              <span className="text-sm text-[#737373] leading-relaxed">Developing responsive interfaces and robust scalable REST APIs.</span>
            </li>
            <li className="flex flex-col gap-3">
              <span className="text-[#333333] text-4xl md:text-5xl font-light mb-2">02</span>
              <span className="text-[#ededed] text-base tracking-wider uppercase">Security Management</span>
              <span className="text-sm text-[#737373] leading-relaxed">Implementing OAuth2, cryptographic encryption, and secure data practices.</span>
            </li>
            <li className="flex flex-col gap-3">
              <span className="text-[#333333] text-4xl md:text-5xl font-light mb-2">03</span>
              <span className="text-[#ededed] text-base tracking-wider uppercase">Database Management</span>
              <span className="text-sm text-[#737373] leading-relaxed">Structuring, querying, and optimizing SQL and NoSQL databases.</span>
            </li>
          </ul>
        </div>

        {/* Box 3: Currently Building */}
        <div className="lg:col-span-2 p-8 md:p-10 border border-[#222222] bg-[#0c0c0c] hover:border-[#ededed] transition-colors duration-500 group flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Currently Building</h3>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[#ededed] text-lg font-light tracking-widest uppercase">FrensLynk</span>
            <p className="text-[#737373] text-sm font-light leading-relaxed mb-2">Social Utility Platform Empowering Real-Life Connections.</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 border border-[#333333] text-[#a3a3a3] text-[10px] tracking-widest uppercase group-hover:border-[#ededed] group-hover:text-[#0a0a0a] group-hover:bg-[#ededed] transition-all duration-300 cursor-default">React + Vite</span>
              <span className="px-4 py-2 border border-[#333333] text-[#a3a3a3] text-[10px] tracking-widest uppercase group-hover:border-[#ededed] group-hover:text-[#0a0a0a] group-hover:bg-[#ededed] transition-all duration-300 cursor-default">Fastify</span>
              <span className="px-4 py-2 border border-[#333333] text-[#a3a3a3] text-[10px] tracking-widest uppercase group-hover:border-[#ededed] group-hover:text-[#0a0a0a] group-hover:bg-[#ededed] transition-all duration-300 cursor-default">PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;