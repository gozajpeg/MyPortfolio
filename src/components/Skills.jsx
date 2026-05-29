function Skills() {
  const skillsData = {
    Languages: [
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/ededed' },
      { name: 'Java', icon: 'https://api.iconify.design/mdi/language-java.svg?color=%23ededed' },
      { name: 'C#', icon: 'https://api.iconify.design/mdi/language-csharp.svg?color=%23ededed' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/ededed' },
    ],
    Frameworks: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/ededed' },
      { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ededed' },
      { name: 'Fastify', icon: 'https://cdn.simpleicons.org/fastify/ededed' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/ededed' },
      { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/ededed' },
    ],
    Backend: [
      { name: 'Cloudflare', icon: 'https://cdn.simpleicons.org/cloudflare/ededed' },
      { name: 'OAuth2', icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%23ededed' },
      { name: 'JSON Web Tokens (JWT)', icon: 'https://cdn.simpleicons.org/jsonwebtokens/ededed' },
      { name: 'Crypto (Argon2, Iron-WebCrypto)', icon: 'https://api.iconify.design/mdi/shield-key-outline.svg?color=%23ededed' },
      { name: 'Key Rotation Management', icon: 'https://api.iconify.design/mdi/lock-reset.svg?color=%23ededed' },
    ],
    Databases: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/ededed' },
      { name: 'NoSQL/ Firebase', icon: 'https://api.iconify.design/mdi/database-outline.svg?color=%23ededed' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/ededed' },
    ],
    'Other Tools': [
      { name: 'VS Code', icon: 'https://api.iconify.design/simple-icons/visualstudiocode.svg?color=%23ededed' },
      { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/ededed' },
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git/ededed' },
      { name: 'Adobe Illustrator', icon: 'https://api.iconify.design/simple-icons/adobeillustrator.svg?color=%23ededed' },
    ],
  };

  return (
    <div className="animate-page-in w-full">
      <h2 className="text-[#555555] text-lg font-light tracking-widest uppercase mb-12">
        Skills & Expertise
      </h2>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Box 1: Languages (Wide) */}
        <div className="md:col-span-2 xl:col-span-2 bg-[#0c0c0c] border border-[#222222] p-8 hover:border-[#ededed] transition-colors duration-500 flex flex-col gap-8 group">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Languages</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {skillsData.Languages.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: Frameworks (Tall Column) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-2 bg-[#0a0a0a] border border-[#222222] p-8 hover:border-[#ededed] transition-colors duration-500 flex flex-col gap-8 group">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Frameworks</h3>
          </div>
          <div className="flex flex-col gap-6">
            {skillsData.Frameworks.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 3: Backend (Square) */}
        <div className="md:col-span-1 xl:col-span-1 bg-[#0a0a0a] border border-[#222222] p-8 hover:border-[#ededed] transition-colors duration-500 flex flex-col gap-8 group">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Backend</h3>
          </div>
          <div className="flex flex-col gap-6">
            {skillsData.Backend.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 4: Databases (Square) */}
        <div className="md:col-span-1 xl:col-span-1 bg-[#0c0c0c] border border-[#222222] p-8 hover:border-[#ededed] transition-colors duration-500 flex flex-col gap-8 group">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Databases</h3>
          </div>
          <div className="flex flex-col gap-6">
            {skillsData.Databases.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 5: Other Tools (Wide Bottom) */}
        <div className="md:col-span-2 xl:col-span-3 bg-[#0a0a0a] border border-[#222222] p-8 hover:border-[#ededed] transition-colors duration-500 flex flex-col gap-8 group">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Other Tools</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-12 gap-y-6">
            {skillsData['Other Tools'].map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Skills;
