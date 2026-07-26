import mePhoto from '../../assets/logo/me.webp';
import { useIsMobile } from '../../hooks/useIsMobile';

const DISCIPLINES = ['Full-Stack Dev', 'UI / UX Design', 'Web & Mobile', 'Cybersecurity'];

function CTAButtons() {
  return (
    <div className="flex flex-wrap gap-4 py-1">
      {/* Get in Touch Outer Base */}
      <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[clamp(38px,6dvh,52px)] w-[145px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <a
          href="mailto:ragoza.builds@gmail.com"
          className="absolute inset-0 flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[5px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] uppercase tracking-wider no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[3px] active:border-b-0 active:translate-y-[5px]"
        >
          Get in touch ↗
        </a>
      </div>

      {/* GitHub Outer Base */}
      <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[clamp(38px,6dvh,52px)] w-[110px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <a
          href="https://github.com/gozajpeg"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center gap-1.5 font-mono text-[11px] font-semibold text-ink bg-[#1A1A1A] border border-[#252525] border-b-[5px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.08)] uppercase tracking-wider no-underline transition-all duration-75 hover:bg-[#222222] hover:border-b-[2px] hover:translate-y-[3px] active:border-b-0 active:translate-y-[5px]"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

/* ── DESKTOP ──────────────────────────────────────────────────────────────── */
function HeroDesktop() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Photo -- absolute, right 35% of container */}
      <img
        src={mePhoto}
        alt="Rommel Angelo Goza"
        className="absolute right-0 top-0 bottom-0 w-[35%] h-full object-cover object-top block opacity-80"
      />
      {/* Fade from left dark panel into photo */}
      <div className="absolute right-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-surface to-transparent pointer-events-none" />

      {/* Text content -- padding, gaps, and the heading size all scale off
          viewport HEIGHT (dvh) as well as width, so short/wide windows never
          overflow the active slot and get clipped by the queue strip below */}
      <div className="relative z-10 h-full max-w-[58%] flex flex-col justify-between overflow-hidden p-[clamp(1rem,4dvh,4rem)]">
        {/* Status */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="animate-pulse-dot inline-block w-[7px] h-[7px] rounded-full bg-ink shrink-0" />
          <span className="font-mono text-[10px] font-semibold text-ink-muted uppercase tracking-widest">
            Open to work
          </span>
        </div>

        {/* Name -- clamps against the shorter of width/height so it can never
            push the CTA row out of the box */}
        <h1 className="font-display font-extrabold text-[clamp(2.5rem,min(12dvh,9vw),11rem)] leading-[0.86] text-ink tracking-tighter uppercase m-0 shrink">
          Rommel<br />
          <span className="text-ink-soft">Angelo</span><br />
          Goza
        </h1>

        {/* Subtext + CTAs + disciplines */}
        <div className="flex flex-col gap-[clamp(0.5rem,2dvh,1.125rem)] shrink-0">
          <p className="font-sans text-[clamp(0.75rem,1.7dvh,1.125rem)] font-normal text-ink-soft leading-relaxed m-0 max-w-md">
            An aspiring developer from the Philippines. Builds structured, secure,
            and high-performance software from the ground up.
          </p>

          <CTAButtons />

          <div className="flex items-center gap-2 border-t border-white/5 pt-[clamp(0.5rem,1.5dvh,0.875rem)] overflow-hidden whitespace-nowrap">
            <div className="inline-flex items-center animate-ticker">
              {[...DISCIPLINES, ...DISCIPLINES].map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  aria-hidden={i >= DISCIPLINES.length}
                  className="font-mono text-[10px] font-medium text-ink-muted uppercase tracking-wider pr-6 shrink-0"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MOBILE ───────────────────────────────────────────────────────────────── */
function HeroMobile() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-end">
      {/* Dimmed background photo */}
      <img
        src={mePhoto}
        alt="Rommel Angelo Goza"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
      />
      {/* Dark gradient at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface/90 pointer-events-none" />

      {/* Content anchored to bottom */}
      <div className="relative z-10 p-5 sm:p-6 pb-6 overflow-hidden">
        <h1 className="font-display font-extrabold text-[clamp(1.75rem,min(7dvh,10vw),3rem)] leading-none text-ink tracking-tighter uppercase m-0 mb-4">
          Rommel<br />
          <span className="text-ink-soft">Angelo</span><br />
          Goza
        </h1>

        <p className="font-sans text-sm font-normal text-ink-soft leading-relaxed m-0 mb-4.5">
          An aspiring developer from the Philippines. Builds structured, secure software.
        </p>

        <CTAButtons />
      </div>
    </div>
  );
}

export default function HeroBento() {
  const isMobile = useIsMobile();
  return (
    <div className="animate-content-reveal w-full h-full overflow-hidden">
      {isMobile ? <HeroMobile /> : <HeroDesktop />}
    </div>
  );
}