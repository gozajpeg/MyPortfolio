import { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import PixelTransition from '../UI/PixelTransition';

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
      { name: 'Fastify', icon: 'https://cdn.simpleicons.org/fastify/EDEAE3' },
      { name: 'Express', icon: 'https://cdn.simpleicons.org/express/EDEAE3' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/EDEAE3' },
    ],
  },
  {
    label: 'Security & QA',
    items: [
      { name: 'Playwright', icon: 'https://api.iconify.design/simple-icons/playwright.svg?color=%23EDEAE3' },
      { name: 'OAuth2', icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%23EDEAE3' },
      { name: 'JWT Auth', icon: 'https://cdn.simpleicons.org/jsonwebtokens/EDEAE3' },
      { name: 'Argon2', icon: 'https://api.iconify.design/mdi/shield-key-outline.svg?color=%23EDEAE3' },
      { name: 'Cloudflare', icon: 'https://cdn.simpleicons.org/cloudflare/EDEAE3' },
    ],
  },
  {
    label: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/EDEAE3' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/EDEAE3' },
      { name: 'NoSQL / Redis', icon: 'https://api.iconify.design/mdi/database-outline.svg?color=%23EDEAE3' },
    ],
  },
  {
    label: 'Tools & Workflow',
    items: [
      { name: 'Git / GitHub', icon: 'https://cdn.simpleicons.org/github/EDEAE3' },
      { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/EDEAE3' },
      { name: 'VS Code', icon: 'https://api.iconify.design/simple-icons/visualstudiocode.svg?color=%23EDEAE3' },
      { name: 'Bash / Linux', icon: 'https://cdn.simpleicons.org/gnubash/EDEAE3' },
      { name: 'Framer', icon: 'https://api.iconify.design/simple-icons/framer.svg?color=%23EDEAE3' },
    ],
  },
];

function SkillPixelTile({ skill }) {
  return (
    <div className="relative w-full group select-none">
      <PixelTransition
        firstContent={
          <div className="w-full h-full flex flex-col items-center justify-center p-2">
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              loading="lazy"
            />
          </div>
        }
        secondContent={
          <div className="w-full h-full flex flex-col items-center justify-center p-1.5 text-center bg-[#181818]">
            <span className="font-sans text-xs font-semibold text-[#EDEAE3] leading-tight px-1 break-words line-clamp-2 text-center">
              {skill.name}
            </span>
          </div>
        }
        gridSize={7}
        pixelColor="#EDEAE3"
        animationStepDuration={0.25}
        aspectRatio="100%"
        className="rounded-xl border border-white/[0.08] hover:border-[#EDEAE3]/40 bg-[#121212] transition-colors"
      />
    </div>
  );
}

/* ── DESKTOP: 5-column grid with PixelTransition tiles ──────── */
function SkillsDesktop() {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col p-6 sm:p-8 lg:p-10 gap-4 sm:gap-5">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-xs font-semibold text-ink-muted">
            Capabilities & Technologies
          </span>
          <span className="text-ink-muted/40">•</span>
          <span className="font-sans text-xs text-ink-muted/60">
            22 Technologies
          </span>
        </div>
        <span className="font-sans text-xs text-ink-muted/70">
          Hover to preview
        </span>
      </div>

      {/* 5-Column Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-5 gap-4 lg:gap-6 overflow-hidden">
        {GROUPS.map((group, gi) => (
          <div
            key={group.label}
            className={`flex flex-col gap-3 overflow-hidden ${
              gi < GROUPS.length - 1 ? 'border-r border-white/[0.06] pr-4 sm:pr-5' : ''
            }`}
          >
            <div className="flex items-center justify-between shrink-0">
              <span className="font-sans text-xs font-semibold text-ink-muted">
                {group.label}
              </span>
              <span className="font-sans text-xs text-ink-muted/50">
                {group.items.length}
              </span>
            </div>
            <div className="w-full h-px bg-white/[0.06] shrink-0" />
            <div className="flex-1 overflow-y-auto no-scrollbar pb-2">
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {group.items.map((skill) => (
                  <SkillPixelTile key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MOBILE: tab selector + 3-column tile grid ──────────────── */
function SkillsMobile() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = GROUPS[activeGroup];

  return (
    <div className="h-full w-full overflow-hidden flex flex-col p-4 sm:p-5 gap-3.5">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between shrink-0">
        <span className="font-sans text-xs font-semibold text-ink-muted">
          Capabilities
        </span>
        <span className="font-sans text-xs text-ink-muted/70">
          Tap to preview
        </span>
      </div>

      {/* Horizontal tab selector */}
      <div className="flex gap-1.5 py-0.5 shrink-0 overflow-x-auto no-scrollbar">
        {GROUPS.map((g, i) => {
          const isActive = activeGroup === i;
          return (
            <button
              key={g.label}
              type="button"
              onClick={() => setActiveGroup(i)}
              className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#EDEAE3] text-bg shadow-sm'
                  : 'bg-[#1A1A1A] text-ink-soft hover:text-ink border border-white/[0.06]'
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Selected group skills */}
      <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
        <div className="flex items-center justify-between shrink-0">
          <span className="font-sans text-xs font-semibold text-ink-muted">
            {group.label}
          </span>
          <span className="font-sans text-xs text-ink-muted/60">
            {group.items.length} items
          </span>
        </div>
        <div className="w-full h-px bg-white/[0.06] shrink-0" />
        <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {group.items.map((skill) => (
              <SkillPixelTile key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillsBento() {
  const isMobile = useIsMobile();
  return isMobile ? <SkillsMobile /> : <SkillsDesktop />;
}