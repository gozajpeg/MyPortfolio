function SkillsSection() {
  const skillsData = {
    Languages: [
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/050505' },
      { name: 'Java', icon: 'https://api.iconify.design/mdi/language-java.svg?color=%23050505' },
      { name: 'C#', icon: 'https://api.iconify.design/mdi/language-csharp.svg?color=%23050505' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/050505' },
    ],
    Frameworks: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/050505' },
      { name: 'Express', icon: 'https://cdn.simpleicons.org/express/050505' },
      { name: 'Fastify', icon: 'https://cdn.simpleicons.org/fastify/050505' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/050505' },
      { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/050505' },
    ],
    Backend: [
      { name: 'Cloudflare', icon: 'https://cdn.simpleicons.org/cloudflare/050505' },
      { name: 'OAuth2', icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%23050505' },
      { name: 'JSON Web Tokens (JWT)', icon: 'https://cdn.simpleicons.org/jsonwebtokens/050505' },
      { name: 'Crypto (Argon2, Iron-WebCrypto)', icon: 'https://api.iconify.design/mdi/shield-key-outline.svg?color=%23050505' },
      { name: 'Key Rotation Management', icon: 'https://api.iconify.design/mdi/lock-reset.svg?color=%23050505' },
    ],
    Databases: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/050505' },
      { name: 'NoSQL / Firebase', icon: 'https://api.iconify.design/mdi/database-outline.svg?color=%23050505' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/050505' },
    ],
    'Other Tools': [
      { name: 'VS Code', icon: 'https://api.iconify.design/simple-icons/visualstudiocode.svg?color=%23050505' },
      { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/050505' },
      { name: 'Bash', icon: 'https://cdn.simpleicons.org/gnubash/050505' },
      { name: 'Adobe Illustrator', icon: 'https://api.iconify.design/simple-icons/adobeillustrator.svg?color=%23050505' },
      { name: 'Framer', icon: 'https://api.iconify.design/simple-icons/framer.svg?color=%23050505' },
      { name: 'Github', icon: 'https://cdn.simpleicons.org/github/050505' },
    ],
  };

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Headline Banner */}
      <div className="bg-[#ff6b00] neo-border neo-shadow p-6 mb-12">
        <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter uppercase text-[#050505] leading-none">
          Skills & Expertise
        </h2>
        <p className="font-mono text-sm uppercase tracking-wider text-[#050505] mt-2 font-semibold">
          My Technical Arsenal and Toolbelt
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Languages (Cyan Accent) */}
        <div className="bg-[#22d3ee] neo-border neo-shadow p-6 flex flex-col justify-between group">
          <div>
            <h3 className="font-display font-black text-2xl uppercase mb-6 text-[#050505] border-b-2 border-black pb-2">
              Languages
            </h3>
            <div className="space-y-4">
              {skillsData.Languages.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_#050505]">
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                  <span className="font-mono text-sm font-bold text-[#050505]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frameworks (Yellow Accent) */}
        <div className="bg-[#fde047] neo-border neo-shadow p-6 flex flex-col justify-between group">
          <div>
            <h3 className="font-display font-black text-2xl uppercase mb-6 text-[#050505] border-b-2 border-black pb-2">
              Frameworks
            </h3>
            <div className="space-y-4">
              {skillsData.Frameworks.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_#050505]">
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                  <span className="font-mono text-sm font-bold text-[#050505]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backend & Security (Lime Accent) */}
        <div className="bg-[#a3e635] neo-border neo-shadow p-6 flex flex-col justify-between group">
          <div>
            <h3 className="font-display font-black text-2xl uppercase mb-6 text-[#050505] border-b-2 border-black pb-2">
              Backend
            </h3>
            <div className="space-y-4">
              {skillsData.Backend.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_#050505]">
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                  <span className="font-mono text-sm font-bold text-[#050505]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Databases (White Accent with shadow) */}
        <div className="bg-white neo-border neo-shadow p-6 flex flex-col justify-between group">
          <div>
            <h3 className="font-display font-black text-2xl uppercase mb-6 text-[#050505] border-b-2 border-black pb-2">
              Databases
            </h3>
            <div className="space-y-4">
              {skillsData.Databases.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 bg-zinc-50 p-3 border-2 border-black shadow-[2px_2px_0px_#050505]">
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                  <span className="font-mono text-sm font-bold text-[#050505]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Workflow (Orange Accent, spans 2 columns on larger screens) */}
        <div className="md:col-span-2 bg-[#ff6b00] neo-border neo-shadow p-6 flex flex-col justify-between group">
          <div>
            <h3 className="font-display font-black text-2xl uppercase mb-6 text-[#050505] border-b-2 border-black pb-2">
              Tools & Creative Workflows
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsData['Other Tools'].map((skill, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_#050505]">
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                  <span className="font-mono text-sm font-bold text-[#050505]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default SkillsSection;
