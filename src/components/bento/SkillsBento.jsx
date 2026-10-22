import { useState } from 'react';

const ALL_SKILLS = [
  // Frontend & UI
  { name: 'React', category: 'Frontend', icon: 'https://cdn.simpleicons.org/react/EDEAE3' },
  { name: 'React Native', category: 'Frontend', icon: 'https://cdn.simpleicons.org/react/EDEAE3' },
  { name: 'Tailwind', category: 'Frontend', icon: 'https://cdn.simpleicons.org/tailwindcss/EDEAE3' },
  { name: 'JavaScript', category: 'Languages', icon: 'https://cdn.simpleicons.org/javascript/EDEAE3' },

  // Backend & Languages
  { name: 'Fastify', category: 'Backend', icon: 'https://cdn.simpleicons.org/fastify/EDEAE3' },
  { name: 'Express', category: 'Backend', icon: 'https://cdn.simpleicons.org/express/EDEAE3' },
  { name: 'Python', category: 'Languages', icon: 'https://cdn.simpleicons.org/python/EDEAE3' },
  { name: 'Java', category: 'Languages', icon: 'https://api.iconify.design/mdi/language-java.svg?color=%23EDEAE3' },
  { name: 'C#', category: 'Languages', icon: 'https://api.iconify.design/mdi/language-csharp.svg?color=%23EDEAE3' },

  // Databases
  { name: 'PostgreSQL', category: 'Database', icon: 'https://cdn.simpleicons.org/postgresql/EDEAE3' },
  { name: 'MySQL', category: 'Database', icon: 'https://cdn.simpleicons.org/mysql/EDEAE3' },
  { name: 'Redis', category: 'Database', icon: 'https://api.iconify.design/mdi/database-outline.svg?color=%23EDEAE3' },

  // Security, QA & Cloud
  { name: 'Playwright', category: 'Security & QA', icon: 'https://api.iconify.design/simple-icons/playwright.svg?color=%23EDEAE3' },
  { name: 'OAuth 2.0', category: 'Security & QA', icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%23EDEAE3' },
  { name: 'JWT Auth', category: 'Security & QA', icon: 'https://cdn.simpleicons.org/jsonwebtokens/EDEAE3' },
  { name: 'Argon2', category: 'Security & QA', icon: 'https://api.iconify.design/mdi/shield-key-outline.svg?color=%23EDEAE3' },
  { name: 'Cloudflare', category: 'Tools', icon: 'https://cdn.simpleicons.org/cloudflare/EDEAE3' },

  // Workflow Tools
  { name: 'GitHub', category: 'Tools', icon: 'https://cdn.simpleicons.org/github/EDEAE3' },
  { name: 'Bash', category: 'Tools', icon: 'https://cdn.simpleicons.org/gnubash/EDEAE3' },
  { name: 'Figma', category: 'Tools', icon: 'https://cdn.simpleicons.org/figma/EDEAE3' },
  { name: 'VS Code', category: 'Tools', icon: 'https://api.iconify.design/simple-icons/visualstudiocode.svg?color=%23EDEAE3' },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Languages', 'Database', 'Security & QA', 'Tools'];

export default function SkillsBento() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <section id="skills" aria-label="Technical Stack" className="flex flex-col gap-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-3">
          <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
            Stack
          </h2>
          {activeSkill && (
            <span className="font-sans text-xs font-medium text-ink-soft transition-opacity duration-200">
              {activeSkill.name} · {activeSkill.category}
            </span>
          )}
        </div>

        {/* Minimalist Category Filter */}
        <div className="flex items-center gap-1 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`h-7 px-2.5 rounded-lg font-sans text-[11px] font-medium transition-colors cursor-pointer border-none ${
                  isSelected
                    ? 'bg-ink text-bg font-semibold'
                    : 'bg-transparent text-ink-muted hover:text-ink hover:bg-surface-hover/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Zero-Reflow Fixed-Cell Icon Grid: Icons lift in-place on hover/tap to reveal their label */}
      <div className="theme-surface rounded-2xl border p-4 sm:p-5">
        <ul className="m-0 p-0 list-none grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
          {ALL_SKILLS.map((skill) => {
            const isSelected = activeSkill?.name === skill.name;
            const isDimmed =
              activeCategory !== 'All' && skill.category !== activeCategory;

            return (
              <li key={skill.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() =>
                    setActiveSkill((prev) => (prev?.name === skill.name ? null : prev))
                  }
                  onClick={() =>
                    setActiveSkill((prev) => (prev?.name === skill.name ? null : skill))
                  }
                  aria-label={`${skill.name} (${skill.category})`}
                  className={`relative w-full h-16 rounded-xl border transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none px-1 ${
                    isSelected
                      ? 'stack-item-active border-border-strong bg-surface-hover/80'
                      : 'border-transparent hover:border-border bg-surface-hover/25 hover:bg-surface-hover/60'
                  } ${isDimmed ? 'opacity-25 scale-95' : 'opacity-100 scale-100'}`}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    width="24"
                    height="24"
                    loading="lazy"
                    decoding="async"
                    className={`w-6 h-6 object-contain stack-icon shrink-0 transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isSelected ? '-translate-y-2 scale-95' : 'translate-y-0 scale-100'
                    }`}
                  />

                  <span
                    className={`absolute bottom-1.5 inset-x-1 font-sans text-[10px] font-medium text-ink text-center truncate transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isSelected
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                  >
                    {skill.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
