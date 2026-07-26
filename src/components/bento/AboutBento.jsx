import { useIsMobile } from '../../hooks/useIsMobile';

const services = ['SaaS Platforms', 'Web Apps', 'Mobile', 'UI / UX', 'Cybersecurity', 'Open Source'];

const capabilities = [
  { num: '01', title: 'Frontend & Backend', desc: 'Responsive interfaces paired with robust REST APIs, designed to scale under load.' },
  { num: '02', title: 'Security', desc: 'OAuth2, Argon2, Iron-WebCrypto, rate-limiting, and secure key rotations by default.' },
  { num: '03', title: 'Databases', desc: 'Structuring and optimizing PostgreSQL, MySQL, and NoSQL schemas for long-term integrity.' },
];

function CVButton() {
  return (
    <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[46px] w-[120px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <a
        href="#"
        className="absolute inset-0 flex items-center justify-center gap-2 font-mono text-[11px] font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[5px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] uppercase tracking-wider no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[3px] active:border-b-0 active:translate-y-[5px]"
      >
        Open CV ↗
      </a>
    </div>
  );
}

/* ── DESKTOP ───────────────────────────────────────────────── */
function AboutDesktop() {
  return (
    <div className="h-full w-full overflow-hidden grid grid-cols-[1.1fr_0.9fr] p-6 sm:p-10 md:p-12 lg:p-14 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
      {/* LEFT COLUMN: About Biography */}
      <div className="flex flex-col gap-6 overflow-hidden pr-2">
        <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0">
          About
        </span>
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <p className="font-sans text-sm sm:text-base md:text-lg font-normal text-ink-soft leading-relaxed m-0">
            Self-taught developer based in the Philippines. Loves coding secure, structured,
            and high-performance applications across the full stack.
          </p>
          <p className="font-sans text-xs sm:text-sm font-normal text-ink-muted leading-relaxed m-0">
            Takes full ownership independently and collaborates smoothly within teams. Constantly exploring new patterns, technologies, and security practices.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN (2nd Layout Pane): Services & Responsibilities */}
      <div className="flex flex-col gap-6 border-l border-white/5 pl-8 sm:pl-10 md:pl-12 lg:pl-14 overflow-hidden">
        {/* Core Responsibilities */}
        <div className="flex flex-col gap-4 overflow-hidden shrink-0">
          <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0">
            Core Responsibilities
          </span>
          <div className="flex flex-col gap-3 py-1">
            {capabilities.map((cap, idx) => (
              <div key={cap.num} className="flex flex-col gap-1 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-bold text-ink-muted shrink-0">
                    {cap.num}
                  </span>
                  <p className="font-display text-xs sm:text-sm font-bold text-ink m-0 tracking-tight">
                    {cap.title}
                  </p>
                </div>
                <p className="font-sans text-[11px] sm:text-xs font-normal text-ink-muted leading-relaxed m-0 pl-6">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 shrink-0" />

        {/* Services & CV Action Column */}
        <div className="flex-1 flex flex-col justify-between min-h-0">
          <div className="shrink-0 mb-4">
            <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0 block mb-2.5">
              Services
            </span>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {services.map(s => (
                <span key={s} className="font-sans text-xs sm:text-sm font-medium text-ink-soft whitespace-nowrap">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <CVButton />
        </div>
      </div>
    </div>
  );
}

/* ── MOBILE ────────────────────────────────────────────────── */
function AboutMobile() {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col p-5 gap-5">
      {/* Bio section */}
      <div className="flex flex-col gap-2 shrink-0">
        <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest">
          About
        </span>
        <p className="font-sans text-sm font-normal text-ink-soft leading-relaxed m-0">
          Self-taught developer from the Philippines. Builds secure, structured, high-performance applications across the full stack.
        </p>
      </div>

      {/* Services Section */}
      <div className="flex flex-col gap-2 shrink-0">
        <p className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest m-0">Services</p>
        <div className="grid grid-cols-3 gap-2">
          {services.map(s => (
            <span key={s} className="font-sans text-xs font-medium text-ink-soft whitespace-nowrap">
              {s}
            </span>
          ))}
        </div>
      </div>

      <CVButton />

      {/* Divider */}
      <div className="w-full h-px bg-white/5 shrink-0" />

      {/* Capabilities list */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col gap-4">
        <p className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest m-0 shrink-0">
          Core Responsibilities
        </p>
        <div className="flex flex-col gap-4">
          {capabilities.map((cap, idx) => (
            <div key={cap.num} className="flex flex-col gap-1 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold text-ink-muted shrink-0">
                  {cap.num}
                </span>
                <p className="font-display text-xs sm:text-sm font-bold text-ink m-0 tracking-tight">
                  {cap.title}
                </p>
              </div>
              <p className="font-sans text-[11px] sm:text-xs font-normal text-ink-muted leading-relaxed m-0 pl-6">
                {cap.desc}
              </p>
              {idx < capabilities.length - 1 && <div className="w-full h-px bg-white/5 mt-3 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutBento() {
  const isMobile = useIsMobile();
  return (
    <div className="animate-content-reveal h-full w-full overflow-hidden">
      {isMobile ? <AboutMobile /> : <AboutDesktop />}
    </div>
  );
}