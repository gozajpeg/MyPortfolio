import { useIsMobile } from '../../hooks/useIsMobile';

const SOCIALS = [
  { name: 'GitHub', handle: '@gozajpeg', url: 'https://github.com/gozajpeg/MyPortfolio', icon: 'https://cdn.simpleicons.org/github/EDEAE3' },
  { name: 'LinkedIn', handle: 'Rommel Angelo Goza', url: 'https://www.linkedin.com/in/rommel-angelo-goza-264a72421/', icon: 'https://api.iconify.design/simple-icons/linkedin.svg?color=%23EDEAE3' },
  { name: 'Instagram', handle: '@jelonaticz', url: 'https://www.instagram.com/jelonaticz', icon: 'https://cdn.simpleicons.org/instagram/EDEAE3' },
  { name: 'Gmail', handle: 'ragoza.builds@gmail.com', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=ragoza.builds@gmail.com', icon: 'https://cdn.simpleicons.org/gmail/EDEAE3' },
];

function ContactCTA() {
  return (
    <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[46px] w-[150px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <a
        href="mailto:ragoza.builds@gmail.com"
        className="absolute inset-0 flex items-center justify-center gap-2 font-mono text-[11px] font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[5px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] uppercase tracking-wider no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[3px] active:border-b-0 active:translate-y-[5px]"
      >
        Send a message ↗
      </a>
    </div>
  );
}

function SocialRow({ social, last }) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between gap-3 py-3.5 no-underline color-inherit transition-opacity duration-150 hover:opacity-50 ${last ? '' : 'border-b border-white/5'}`}
    >
      <div className="flex items-center gap-3.5 min-w-0 overflow-hidden">
        <img src={social.icon} alt={social.name} className="w-[18px] h-[18px] object-contain shrink-0 opacity-80" />
        <div className="min-w-0 overflow-hidden">
          <p className="font-display text-base font-bold text-ink m-0 whitespace-nowrap">
            {social.name}
          </p>
          <p className="font-mono text-[11px] text-ink-muted m-0 whitespace-nowrap truncate">
            {social.handle}
          </p>
        </div>
      </div>
      <span className="font-mono text-base text-ink-muted shrink-0">↗</span>
    </a>
  );
}

/* ── DESKTOP: 2-col ────────────────────────────────────────── */
function SocialsDesktop() {
  return (
    <div className="h-full w-full overflow-hidden grid grid-cols-2 p-6 sm:p-10 md:p-14 gap-10 md:gap-14">
      {/* LEFT */}
      <div className="flex flex-col justify-between overflow-hidden">
        <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0">
          Connect
        </span>

        <div>
          <p className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-none text-ink tracking-tighter uppercase m-0 mb-4 sm:mb-6">
            Let's build something worth it.
          </p>
          <p className="font-sans text-sm sm:text-base font-normal text-ink-muted leading-relaxed m-0">
            Open to collaborations, freelance work, and conversations worth having.
          </p>
        </div>

        <ContactCTA />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col justify-between border-l border-white/5 pl-6 sm:pl-10 md:pl-12 overflow-hidden">
        {SOCIALS.map((social, i) => <SocialRow key={social.name} social={social} last={i === SOCIALS.length - 1} />)}
      </div>
    </div>
  );
}

/* ── MOBILE: single col, heading + rows + CTA ──────────────── */
function SocialsMobile() {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col p-5 sm:p-6 gap-4">
      <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0">
        Connect
      </span>

      <p className="font-display font-extrabold text-2xl sm:text-3xl leading-none text-ink tracking-tighter uppercase m-0 shrink-0 break-words">
        Let's build something worth it.
      </p>

      {/* Social rows */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-evenly">
        {SOCIALS.map((social, i) => <SocialRow key={social.name} social={social} last={i === SOCIALS.length - 1} />)}
      </div>

      <ContactCTA />
    </div>
  );
}

export default function SocialsBento() {
  const isMobile = useIsMobile();
  return (
    <div className="animate-content-reveal h-full w-full overflow-hidden">
      {isMobile ? <SocialsMobile /> : <SocialsDesktop />}
    </div>
  );
}