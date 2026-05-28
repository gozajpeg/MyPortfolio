function Skills() {
  const skillsData = {
    Languages: [
      { name: 'JavaScript', score: '4/10', level: 40, icon: 'https://cdn.simpleicons.org/javascript/ededed' },
      { name: 'React + Vite', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/react/ededed' },
      { name: 'React Native', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/react/ededed' },
      { name: 'Java', score: '6/10', level: 60, icon: 'https://api.iconify.design/mdi/language-java.svg?color=%23ededed' },
      { name: 'C#', score: '4/10', level: 40, icon: 'https://api.iconify.design/mdi/language-csharp.svg?color=%23ededed' },
      { name: 'Python', score: '4/10', level: 40, icon: 'https://cdn.simpleicons.org/python/ededed' },
      { name: 'SQL', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/mysql/ededed' },
    ],
    Frameworks: [
      { name: 'React', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/react/ededed' },
      { name: 'Express', score: '4/10', level: 40, icon: 'https://cdn.simpleicons.org/express/ededed' },
      { name: 'Fastify', score: '4/10', level: 40, icon: 'https://cdn.simpleicons.org/fastify/ededed' },
      { name: 'Tailwind CSS', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/tailwindcss/ededed' },
    ],
    Backend: [
      { name: 'REST API', score: '5/10', level: 50, icon: 'https://api.iconify.design/mdi/api.svg?color=%23ededed' },
      { name: 'Cloudflare', score: '4/10', level: 40, icon: 'https://cdn.simpleicons.org/cloudflare/ededed' },
      { name: 'OAuth2', score: '4/10', level: 40, icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%23ededed' },
      { name: 'MariaDB', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/mariadb/ededed' },
    ],
    Databases: [
      { name: 'PostgreSQL', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/postgresql/ededed' },
      { name: 'NoSQL', score: '6/10', level: 60, icon: 'https://api.iconify.design/mdi/database-outline.svg?color=%23ededed' },
      { name: 'MySQL', score: '5/10', level: 50, icon: 'https://cdn.simpleicons.org/mysql/ededed' },
    ],
    Infrastructure: [
      'Database Management',
      'Server Monitoring',
      'Key Rotation Management',
      'Cryptographic Encryption and Data Security',
    ],
    'Other Tools': ['VS Code', 'Figma', 'Git', 'Adobe Illustrator'],
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
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
                  </div>
                  <span className="text-[#555555] text-xs tracking-widest">{skill.score}</span>
                </div>
                <div className="w-full h-[1px] bg-[#222222]">
                  <div className="h-full bg-[#555555] group-hover:bg-[#ededed] transition-all duration-1000 ease-out origin-left" style={{ transform: `scaleX(${skill.level / 100})` }}></div>
                </div>
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
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
                  </div>
                  <span className="text-[#555555] text-xs tracking-widest">{skill.score}</span>
                </div>
                <div className="w-full h-[1px] bg-[#222222]">
                  <div className="h-full bg-[#555555] group-hover:bg-[#ededed] transition-all duration-1000 ease-out origin-left" style={{ transform: `scaleX(${skill.level / 100})` }}></div>
                </div>
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
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
                  </div>
                  <span className="text-[#555555] text-xs tracking-widest">{skill.score}</span>
                </div>
                <div className="w-full h-[1px] bg-[#222222]">
                  <div className="h-full bg-[#555555] group-hover:bg-[#ededed] transition-all duration-1000 ease-out origin-left" style={{ transform: `scaleX(${skill.level / 100})` }}></div>
                </div>
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
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={skill.icon} alt={skill.name} className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-[#a3a3a3] group-hover:text-[#ededed] font-light text-sm transition-colors duration-500">{skill.name}</span>
                  </div>
                  <span className="text-[#555555] text-xs tracking-widest">{skill.score}</span>
                </div>
                <div className="w-full h-[1px] bg-[#222222]">
                  <div className="h-full bg-[#555555] group-hover:bg-[#ededed] transition-all duration-1000 ease-out origin-left" style={{ transform: `scaleX(${skill.level / 100})` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 5: Infrastructure (Wide) */}
        <div className="md:col-span-2 xl:col-span-2 bg-[#0a0a0a] border border-[#222222] p-8 hover:border-[#ededed] transition-colors duration-500 flex flex-col gap-8 group">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Infrastructure</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {skillsData.Infrastructure.map((item, index) => (
              <div key={index} className="px-4 py-2 border border-[#222222] text-[#737373] text-[10px] tracking-widest uppercase transition-colors duration-300 group-hover:border-[#555555] group-hover:text-[#ededed]">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Box 6: Other Tools (Compact Corner) */}
        <div className="md:col-span-2 xl:col-span-1 bg-[#0c0c0c] border border-[#222222] p-8 hover:border-[#ededed] transition-colors duration-500 flex flex-col gap-8 group">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#555555] group-hover:bg-[#ededed] transition-colors duration-500"></span>
            <h3 className="text-[#ededed] text-sm tracking-[0.2em] uppercase">Other Tools</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {skillsData['Other Tools'].map((item, index) => (
              <div key={index} className="px-4 py-2 border border-[#222222] text-[#737373] text-[10px] tracking-widest uppercase transition-colors duration-300 group-hover:border-[#555555] group-hover:text-[#ededed]">
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Skills;
