import { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

const GROUPS = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/EDEAE3' },
      { name: 'Java', icon: 'https://api.iconify.design/mdi/language-java.svg?color=%23EDEAE3' },
      { name: 'C#', icon: 'https://api.iconify.design/mdi/language-csharp.svg?color=%23EDEAE3' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/EDEAE3' },
    ],
  },
  {
    label: 'Frameworks',
    items: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/EDEAE3' },
      { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/EDEAE3' },
      { name: 'Express', icon: 'https://cdn.simpleicons.org/express/EDEAE3' },
      { name: 'Fastify', icon: 'https://cdn.simpleicons.org/fastify/EDEAE3' },
      { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/EDEAE3' },
    ],
  },
  {
    label: 'Security',
    items: [
      { name: 'Cloudflare', icon: 'https://cdn.simpleicons.org/cloudflare/EDEAE3' },
      { name: 'OAuth2', icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%23EDEAE3' },
      { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/EDEAE3' },
      { name: 'Argon2', icon: 'https://api.iconify.design/mdi/shield-key-outline.svg?color=%23EDEAE3' },
      { name: 'Key Rotation', icon: 'https://api.iconify.design/mdi/lock-reset.svg?color=%23EDEAE3' },
    ],
  },
  {
    label: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/EDEAE3' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/EDEAE3' },
      { name: 'NoSQL', icon: 'https://api.iconify.design/mdi/database-outline.svg?color=%23EDEAE3' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'VS Code', icon: 'https://api.iconify.design/simple-icons/visualstudiocode.svg?color=%23EDEAE3' },
      { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/EDEAE3' },
      { name: 'Framer', icon: 'https://api.iconify.design/simple-icons/framer.svg?color=%23EDEAE3' },
      { name: 'Illustrator', icon: 'https://api.iconify.design/simple-icons/adobeillustrator.svg?color=%23EDEAE3' },
      { name: 'Bash', icon: 'https://cdn.simpleicons.org/gnubash/EDEAE3' },
      { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/EDEAE3' },
    ],
  },
];

function SkillRow({ skill }) {
  return (
    <div
      className="flex items-center gap-2.5 p-2 px-3 rounded-lg bg-[#141414]/30 border border-white/[0.03] hover:border-white/[0.08] hover:bg-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200 cursor-pointer shrink-0"
    >
      <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain shrink-0 opacity-80" />
      <span className="font-sans text-xs sm:text-sm font-semibold text-ink-soft hover:text-ink truncate">
        {skill.name}
      </span>
    </div>
  );
}

/* ── DESKTOP: 5-column grid ────────────────────────────────── */
function SkillsDesktop() {
  return (
    <div className="h-full w-full overflow-hidden grid grid-cols-5 p-6 sm:p-10 md:p-12 gap-5 sm:gap-6">
      {GROUPS.map((group, gi) => (
        <div
          key={group.label}
          className={`flex flex-col gap-3 overflow-hidden ${gi < GROUPS.length - 1 ? 'border-r border-white/5 pr-4 sm:pr-5' : ''}`}
        >
          <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0">
            {group.label}
          </span>
          <div className="w-full h-px bg-white/5 shrink-0" />
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar pb-4">
            {group.items.map(skill => <SkillRow key={skill.name} skill={skill} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── MOBILE: tab selector + single group ───────────────────── */
function SkillsMobile() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = GROUPS[activeGroup];

  return (
    <div className="h-full w-full overflow-hidden flex flex-col p-4 sm:p-5 gap-3.5">
      {/* Horizontal tab row */}
      <div className="flex gap-3 py-1.5 shrink-0 overflow-x-auto no-scrollbar">
        {GROUPS.map((g, i) => {
          const isActive = activeGroup === i;
          return (
            <div key={g.label} className="relative bg-[#141414] border border-[#252525] rounded-lg h-[34px] w-[95px] shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              <button
                type="button"
                onClick={() => setActiveGroup(i)}
                className={`absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-75 rounded-lg border border-[#252525] ${isActive
                    ? 'text-bg bg-[#EDEAE3] border-b-[3px] translate-y-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                    : 'text-ink-soft bg-[#1A1A1A] border-b-[3px] hover:bg-[#222222] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-b-[2px] hover:translate-y-[1px] active:border-b-0 active:translate-y-[3px]'
                  }`}
              >
                {g.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Skills for selected group */}
      <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
        <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0">
          {group.label}
        </span>
        <div className="w-full h-px bg-white/5 shrink-0" />
        <div className="flex-1 overflow-hidden flex flex-col gap-3">
          {group.items.map(skill => <SkillRow key={skill.name} skill={skill} />)}
        </div>
      </div>
    </div>
  );
}

export default function SkillsBento() {
  const isMobile = useIsMobile();
  return (
    <div className="animate-content-reveal h-full w-full overflow-hidden">
      {isMobile ? <SkillsMobile /> : <SkillsDesktop />}
    </div>
  );
}