import mePhoto from '../../assets/logo/me.webp';
import { useIsMobile } from '../../hooks/useIsMobile';
import PixelPortrait from '../UI/PixelPortrait';

function HeroActions({ onNavigate }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3 py-1 w-full sm:w-auto">
      {/* Primary Action: Direct Message */}
      <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[38px] sm:h-[42px] sm:w-[140px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <button
          type="button"
          onClick={() => {
            onNavigate?.('socials');
            window.dispatchEvent(new CustomEvent('open-quick-message'));
          }}
          className="absolute inset-0 flex items-center justify-center gap-1 font-sans text-xs font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[3px] sm:border-b-[4px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] cursor-pointer no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
        >
          Message ↗
        </button>
      </div>

      {/* Secondary Action: Explore Projects */}
      <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[38px] sm:h-[42px] sm:w-[130px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <button
          type="button"
          onClick={() => onNavigate?.('projects')}
          className="absolute inset-0 flex items-center justify-center gap-1 font-sans text-xs font-semibold text-ink bg-[#1A1A1A] border border-[#252525] border-b-[3px] sm:border-b-[4px] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] cursor-pointer no-underline transition-all duration-75 hover:bg-[#222222] hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
        >
          Projects ↗
        </button>
      </div>

      {/* GitHub Profile */}
      <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[38px] sm:h-[42px] sm:w-[105px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <a
          href="https://github.com/gozajpeg"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center gap-1 font-sans text-xs font-semibold text-ink-soft hover:text-ink bg-[#1A1A1A] border border-[#252525] border-b-[3px] sm:border-b-[4px] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] no-underline transition-all duration-75 hover:bg-[#222222] hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}

/* ── DESKTOP ──────────────────────────────────────────────────────────────── */
function HeroDesktop({ onNavigate }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Photo: Big, prominent top-half portrait with interactive Pixel Mosaic */}
      <div className="absolute right-0 top-0 bottom-0 w-[50%] max-w-[620px] overflow-hidden pointer-events-auto select-none z-10">
        <div className="relative w-full h-full flex justify-center items-start pt-1 overflow-hidden">
          <PixelPortrait
            src={mePhoto}
            alt="Rommel Angelo Goza"
            cols={76}
            spotlight={true}
            spotlightSize={220}
            className="h-[215%] w-auto max-w-none origin-top translate-x-[6%] drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] will-change-transform"
            imgClassName="h-full w-auto max-w-none object-contain object-top"
          />
          {/* Soft bottom dissolve at the waist */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#141414] via-[#141414]/75 to-transparent pointer-events-none" />
          {/* Soft left dissolve for text separation */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#141414] via-[#141414]/35 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content pane */}
      <div className="relative z-10 h-full max-w-[56%] flex flex-col justify-between p-6 sm:p-8 lg:p-10 pointer-events-none">
        {/* Availability line */}
        <div className="flex items-center gap-2.5 shrink-0 pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-sans text-xs font-medium text-ink-muted">
            Available for contracts & full-time roles
          </span>
        </div>

        {/* Hero Title */}
        <div className="shrink-0 my-auto py-2 pointer-events-auto">
          <p className="font-sans text-xs font-semibold text-ink-muted mb-2">
            Rommel Angelo Goza
          </p>
          <h1 className="font-display font-extrabold text-[clamp(2rem,min(8dvh,4.8vw),4.5rem)] leading-[0.94] text-ink tracking-tight uppercase m-0">
            I Build<br />
            <span className="text-ink-soft">Quality Over</span><br />
            Quantity Systems.
          </h1>
        </div>

        {/* Summary + Actions + Core Stack */}
        <div className="flex flex-col gap-4 shrink-0 pointer-events-auto">
          <p className="font-sans text-sm sm:text-base font-normal text-ink-soft leading-relaxed m-0 max-w-md">
            Full-stack developer based in the Philippines. Crafting structured, high-performance web applications with React, Fastify, and PostgreSQL.
          </p>

          <HeroActions onNavigate={onNavigate} />

          <div className="flex items-center gap-2.5 border-t border-white/[0.06] pt-3 overflow-hidden whitespace-nowrap text-ink-muted">
            <span className="font-sans text-xs font-semibold text-ink-soft shrink-0">Stack:</span>
            {['React', 'Fastify', 'PostgreSQL', 'Playwright QA', 'TypeScript'].map((tech, i, arr) => (
              <span key={tech} className="inline-flex items-center gap-2.5 shrink-0">
                <span className="font-sans text-xs text-ink-muted">{tech}</span>
                {i < arr.length - 1 && <span className="text-white/10 text-[6px]">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MOBILE ───────────────────────────────────────────────────────────────── */
function HeroMobile({ onNavigate }) {
  return (
    <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col justify-between p-4 sm:p-6 gap-2.5 sm:gap-4">
      {/* Top Header with interactive Avatar */}
      <div className="flex items-center gap-2.5 pt-0.5 shrink-0">
        <div className="relative w-10 h-10 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-white/15 shrink-0 bg-[#1A1A1A] shadow-md">
          <PixelPortrait
            src={mePhoto}
            alt="Rommel Angelo Goza"
            cols={24}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover object-top scale-110"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-sans text-xs font-medium text-ink-muted">
              Available for work
            </span>
          </div>
          <p className="font-sans text-xs font-bold text-ink m-0">
            Rommel Angelo Goza
          </p>
        </div>
      </div>

      {/* Main headline */}
      <div className="flex flex-col gap-2 my-auto py-1">
        <h1 className="font-display font-extrabold text-[clamp(1.4rem,min(4.8dvh,6.8vw),2.2rem)] leading-[0.95] text-ink tracking-tight uppercase m-0">
          I Build<br />
          <span className="text-ink-soft">Quality Over</span><br />
          Quantity Systems.
        </h1>

        <p className="font-sans text-xs sm:text-sm font-normal text-ink-soft leading-relaxed m-0">
          Full-stack developer from the Philippines. Building clean, structured web apps with React, Fastify, and PostgreSQL.
        </p>
      </div>

      {/* Actions */}
      <div className="shrink-0 pb-0.5 w-full">
        <HeroActions onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export default function HeroBento({ onNavigate }) {
  const isMobile = useIsMobile();
  return isMobile ? <HeroMobile onNavigate={onNavigate} /> : <HeroDesktop onNavigate={onNavigate} />;
}