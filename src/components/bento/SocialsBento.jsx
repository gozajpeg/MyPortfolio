import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { hasUserSentMessage, recordMessageSent, getDeviceFingerprint } from '../../utils/antiSpam';

/* ── OFFICIAL BRAND VECTOR ICONS (Zero Network Delay, Pure SVG) ── */
function GitHubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function EmailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const SOCIALS = [
  {
    name: 'GitHub',
    handle: '@gozajpeg',
    url: 'https://github.com/gozajpeg',
    component: GitHubIcon,
    desktopPos: 'top-[10%] left-[5%] lg:top-[12%] lg:left-[8%] xl:left-[11%]',
    animClass: 'animate-float-github',
    mobileAnimClass: 'animate-float-mobile-1',
    hoverEffect: 'hover:text-white hover:drop-shadow-[0_0_32px_rgba(255,255,255,0.8)]',
  },
  {
    name: 'LinkedIn',
    handle: 'Rommel Angelo Goza',
    url: 'https://www.linkedin.com/in/rommel-angelo-goza-264a72421/',
    component: LinkedInIcon,
    desktopPos: 'top-[10%] right-[5%] lg:top-[12%] lg:right-[8%] xl:right-[11%]',
    animClass: 'animate-float-linkedin',
    mobileAnimClass: 'animate-float-mobile-2',
    hoverEffect: 'hover:text-[#0A66C2] hover:drop-shadow-[0_0_36px_rgba(10,102,194,0.85)]',
  },
  {
    name: 'Email',
    handle: 'ragoza.builds@gmail.com',
    url: 'mailto:ragoza.builds@gmail.com',
    component: EmailIcon,
    desktopPos: 'bottom-[12%] left-[6%] lg:bottom-[14%] lg:left-[9%] xl:left-[12%]',
    animClass: 'animate-float-email',
    mobileAnimClass: 'animate-float-mobile-3',
    hoverEffect: 'hover:text-[#EA4335] hover:drop-shadow-[0_0_36px_rgba(234,67,53,0.85)]',
  },
  {
    name: 'Instagram',
    handle: '@jelonaticz',
    url: 'https://www.instagram.com/jelonaticz',
    component: InstagramIcon,
    desktopPos: 'bottom-[12%] right-[6%] lg:bottom-[14%] lg:right-[9%] xl:right-[12%]',
    animClass: 'animate-float-instagram',
    mobileAnimClass: 'animate-float-mobile-4',
    hoverEffect: 'hover:text-[#E1306C] hover:drop-shadow-[0_0_36px_rgba(225,48,108,0.85)]',
  },
];

/* ── IN-PLACE CONTACT & HEADING PANE ───────────────────────── */
function CenterContactPane({ isMobile }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | already_sent
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSent, setHasSent] = useState(false);
  const messageInputRef = useRef(null);

  // Check multi-tier anti-spam lock on mount
  useEffect(() => {
    let isMounted = true;
    hasUserSentMessage().then((alreadySent) => {
      if (isMounted && alreadySent) {
        setHasSent(true);
      }
    });

    const handleQuickMessage = () => {
      setIsFormOpen(true);
      setTimeout(() => messageInputRef.current?.focus(), 150);
    };

    window.addEventListener('open-quick-message', handleQuickMessage);
    return () => {
      isMounted = false;
      window.removeEventListener('open-quick-message', handleQuickMessage);
    };
  }, []);

  const handleOpenForm = () => {
    if (hasSent) return;
    setIsFormOpen(true);
    setTimeout(() => messageInputRef.current?.focus(), 100);
  };

  const handleBackToInfo = () => {
    setIsFormOpen(false);
    setStatus('idle');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim() || status === 'loading') return;

    // Verify anti-spam lock across all storage tiers
    const alreadySent = await hasUserSentMessage();
    if (alreadySent || hasSent) {
      setHasSent(true);
      setStatus('already_sent');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const fp = getDeviceFingerprint();
      const params = new URLSearchParams({
        sender: sender.trim() || 'Anonymous Visitor',
        message: message.trim(),
        timestamp: new Date().toISOString(),
        fp,
      });

      const response = await fetch(
        `https://messages.ragoza-builds.workers.dev?${params.toString()}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      );

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      if (data.success) {
        await recordMessageSent(sender.trim());
        setHasSent(true);
        setStatus('success');
        setMessage('');
        setTimeout(() => {
          setIsFormOpen(false);
        }, 2400);
      } else {
        throw new Error(data.error || 'Failed to dispatch');
      }
    } catch (err) {
      console.error('Dispatch failed:', err);
      setStatus('error');
      setErrorMessage('Dispatch failed. Please email ragoza.builds@gmail.com');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 max-w-xl mx-auto pointer-events-auto px-4 w-full transition-all duration-300">
      {/* ── MODE 1: In-Place Message Form ── */}
      {isFormOpen ? (
        <div className="w-full max-w-md sm:max-w-lg flex flex-col items-center gap-3 animate-card-enter">
          {/* Top Bar: Form Tag & "Back to info" toggle (Changeable too) */}
          <div className="flex items-center justify-between w-full px-1">
            <span className="font-sans text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Direct Message
            </span>
            <button
              type="button"
              onClick={handleBackToInfo}
              className="font-sans text-xs text-ink-muted hover:text-ink transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-1"
              aria-label="Change back to heading information"
            >
              <span>←</span>
              <span>Back to info</span>
            </button>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-2.5 text-left"
          >
            {/* Email / Username Field */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-sans text-[11px] font-medium text-ink-muted uppercase tracking-wider pl-1">
                Email or Username
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="your.email@example.com or @telegram"
                disabled={status === 'loading' || hasSent}
                className="w-full bg-[#161616] border border-white/12 hover:border-white/20 focus:border-white/40 focus:bg-[#1a1a1a] rounded-xl px-3.5 py-2 sm:py-2.5 font-sans text-xs sm:text-sm text-ink placeholder:text-ink-muted/50 outline-none transition-all shadow-inner"
              />
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between pl-1 pr-1">
                <label className="font-sans text-[11px] font-medium text-ink-muted uppercase tracking-wider">
                  Message
                </label>
                <span className="font-sans text-[10px] text-ink-muted/60">
                  {message.length}/500
                </span>
              </div>
              <textarea
                ref={messageInputRef}
                rows={isMobile ? 2 : 3}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to build or discuss?"
                disabled={status === 'loading' || hasSent}
                className="w-full h-[64px] sm:h-[76px] bg-[#161616] border border-white/12 hover:border-white/20 focus:border-white/40 focus:bg-[#1a1a1a] rounded-xl px-3.5 py-2 sm:py-2.5 font-sans text-xs sm:text-sm text-ink placeholder:text-ink-muted/50 outline-none resize-none transition-all shadow-inner"
              />
            </div>

            {/* Action Keycap Button: EXACT SAME SIZE */}
            <div className="flex flex-col items-center gap-1.5 pt-1 w-full">
              <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[46px] w-[170px] sm:w-[185px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <button
                  type="submit"
                  disabled={status === 'loading' || hasSent || !message.trim()}
                  className={`w-full flex items-center justify-center gap-2 px-5 h-full font-sans text-xs sm:text-sm font-bold transition-all duration-75 rounded-xl border border-[#252525] ${
                    hasSent || status === 'success'
                      ? 'bg-[#1C261D] text-emerald-300 border-emerald-500/40 border-b-[2px] cursor-not-allowed'
                      : !message.trim() || status === 'loading'
                      ? 'bg-[#222222] text-ink-muted cursor-not-allowed border-b-[2px]'
                      : 'text-bg bg-[#EDEAE3] border-b-[4px] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] cursor-pointer hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]'
                  }`}
                >
                  <span>
                    {status === 'loading'
                      ? 'Sending...'
                      : status === 'success' || hasSent
                      ? 'Message Sent ✓'
                      : 'Submit Message'}
                  </span>
                  {status !== 'loading' && !hasSent && status !== 'success' && (
                    <span className="text-xs">↗</span>
                  )}
                </button>
              </div>

              {/* Status and Anti-Spam Notification */}
              <span className="font-sans text-[11px] sm:text-xs text-ink-muted min-h-[18px]">
                {status === 'success' ? (
                  <span className="text-emerald-400 font-semibold">
                    Dispatched directly to Telegram ✓
                  </span>
                ) : hasSent || status === 'already_sent' ? (
                  <span className="text-ink-soft">
                    1 message limit reached • Thank you!
                  </span>
                ) : status === 'error' ? (
                  <span className="text-rose-400 font-medium">
                    {errorMessage || 'Dispatch failed. Try again.'}
                  </span>
                ) : (
                  'Instant dispatch to Telegram • 1 message limit'
                )}
              </span>
            </div>
          </form>
        </div>
      ) : (
        /* ── MODE 2: Standard Editorial Heading View ── */
        <div className="flex flex-col items-center gap-2.5 sm:gap-4.5 animate-card-enter">
          <span className="font-sans text-[11px] sm:text-xs font-semibold text-ink-muted uppercase tracking-wider">
            Get in Touch
          </span>

          <h2 className="font-display font-extrabold text-[clamp(1.6rem,5.5vw,2.4rem)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.93] text-ink tracking-tight uppercase m-0">
            Let's build<br />
            something real.
          </h2>

          <p className="font-sans text-xs sm:text-base lg:text-lg font-normal text-ink-soft leading-relaxed m-0 max-w-sm sm:max-w-md">
            Open to contract work, full-time engineering opportunities, and technical projects.
          </p>

          {/* Action Keycap Button: EXACT SAME SIZE */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[46px] w-[170px] sm:w-[185px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <button
                type="button"
                onClick={handleOpenForm}
                disabled={hasSent}
                className={`w-full flex items-center justify-center gap-2 px-5 h-full font-sans text-xs sm:text-sm font-bold transition-all duration-75 rounded-xl border border-[#252525] ${
                  hasSent
                    ? 'bg-[#1C261D] text-emerald-300/90 border-emerald-500/40 border-b-[2px] cursor-not-allowed'
                    : 'text-bg bg-[#EDEAE3] border-b-[4px] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] cursor-pointer hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]'
                }`}
                aria-label={hasSent ? 'Message already sent' : 'Open in-place direct message form'}
              >
                <span>{hasSent ? 'Message Sent ✓' : 'Direct Message'}</span>
                {!hasSent && <span className="text-xs">↗</span>}
              </button>
            </div>
            <span className="font-sans text-xs text-ink-muted flex items-center gap-1.5">
              {hasSent
                ? '1 message per visitor limit reached • Connected'
                : 'Instant dispatch directly to Telegram'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── DESKTOP: Centered Headings + Big Floating Social Icons (NO Containers) ─── */
function SocialsDesktop() {
  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center p-6 sm:p-8 lg:p-12 select-none isolate">
      {/* Off-Main-Thread Hardware Accelerated Floating Keyframes */}
      <style>{`
        @keyframes float-drift-1 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(22px, -24px, 0) rotate(5deg); }
          50% { transform: translate3d(-18px, 16px, 0) rotate(-4deg); }
          75% { transform: translate3d(18px, -18px, 0) rotate(3deg); }
        }
        @keyframes float-drift-2 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(-22px, 22px, 0) rotate(-5deg); }
          50% { transform: translate3d(16px, -16px, 0) rotate(4deg); }
          75% { transform: translate3d(-18px, 18px, 0) rotate(-3deg); }
        }
        @keyframes float-drift-3 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(20px, 22px, 0) rotate(4deg); }
          50% { transform: translate3d(-18px, -18px, 0) rotate(-5deg); }
          75% { transform: translate3d(16px, 20px, 0) rotate(3deg); }
        }
        @keyframes float-drift-4 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(-22px, -22px, 0) rotate(-4deg); }
          50% { transform: translate3d(18px, 16px, 0) rotate(5deg); }
          75% { transform: translate3d(-16px, -18px, 0) rotate(-3deg); }
        }
        .animate-float-github {
          animation: float-drift-1 9.4s ease-in-out infinite;
          will-change: transform;
        }
        .animate-float-linkedin {
          animation: float-drift-2 10.6s ease-in-out infinite;
          will-change: transform;
        }
        .animate-float-email {
          animation: float-drift-3 11.2s ease-in-out infinite;
          will-change: transform;
        }
        .animate-float-instagram {
          animation: float-drift-4 9.8s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* Ambient background soft glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,transparent_70%)]" />

      {/* Big Floating Social Icons - NO Containers, Pure Floating Brand Glyphs */}
      {SOCIALS.map((social) => {
        const IconComponent = social.component;
        return (
          <div
            key={social.name}
            className={`absolute z-10 ${social.desktopPos} ${social.animClass} pointer-events-auto`}
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${social.name} • ${social.handle}`}
              aria-label={social.name}
              className={`block text-[#EDEAE3]/80 hover:text-[#EDEAE3] transition-all duration-300 ease-out cursor-pointer select-none hover:scale-125 active:scale-95 drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] ${social.hoverEffect}`}
            >
              <div className="w-18 h-18 sm:w-22 sm:h-22 lg:w-26 lg:h-26 xl:w-28 xl:h-28 flex items-center justify-center p-1">
                <IconComponent className="w-full h-full object-contain transition-transform duration-300" />
              </div>
            </a>
          </div>
        );
      })}

      {/* Dynamic Center In-Place Pane */}
      <CenterContactPane isMobile={false} />
    </div>
  );
}

/* ── MOBILE: 2 Big Icons Top, Centered Headings + Changeable DM, 2 Big Icons Bottom ── */
function SocialsMobile() {
  const topSocials = [SOCIALS[0], SOCIALS[1]]; // GitHub & LinkedIn
  const bottomSocials = [SOCIALS[2], SOCIALS[3]]; // Email & Instagram

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar flex flex-col items-center justify-between p-4 sm:p-6 gap-3 sm:gap-4 text-center select-none isolate">
      <style>{`
        @keyframes float-mob-1 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(6px, -6px, 0); }
        }
        @keyframes float-mob-2 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-6px, 6px, 0); }
        }
        @keyframes float-mob-3 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(6px, 6px, 0); }
        }
        @keyframes float-mob-4 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-6px, -6px, 0); }
        }
        .animate-float-mobile-1 { animation: float-mob-1 5.5s ease-in-out infinite; will-change: transform; }
        .animate-float-mobile-2 { animation: float-mob-2 6.0s ease-in-out infinite; will-change: transform; }
        .animate-float-mobile-3 { animation: float-mob-3 6.4s ease-in-out infinite; will-change: transform; }
        .animate-float-mobile-4 { animation: float-mob-4 5.8s ease-in-out infinite; will-change: transform; }
      `}</style>

      {/* 1. TOP ROW: 2 BIG FLOATING ICONS (GitHub & LinkedIn) - NO Containers */}
      <div className="w-full max-w-xs flex items-center justify-around pt-2 shrink-0">
        {topSocials.map((social) => {
          const IconComponent = social.component;
          return (
            <div
              key={social.name}
              className={`${social.mobileAnimClass} flex items-center justify-center`}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${social.name} • ${social.handle}`}
                aria-label={social.name}
                className={`block text-[#EDEAE3]/80 hover:text-[#EDEAE3] transition-all duration-200 active:scale-90 drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] ${social.hoverEffect}`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-1.5">
                  <IconComponent className="w-full h-full object-contain" />
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* 2. CENTER SECTION: Vertically Centered Headings & Changeable Direct Message */}
      <div className="w-full my-auto py-2 flex items-center justify-center flex-1">
        <CenterContactPane isMobile={true} />
      </div>

      {/* 3. BOTTOM ROW: 2 BIG FLOATING ICONS (Email & Instagram) - NO Containers */}
      <div className="w-full max-w-xs flex items-center justify-around pb-2 shrink-0">
        {bottomSocials.map((social) => {
          const IconComponent = social.component;
          return (
            <div
              key={social.name}
              className={`${social.mobileAnimClass} flex items-center justify-center`}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${social.name} • ${social.handle}`}
                aria-label={social.name}
                className={`block text-[#EDEAE3]/80 hover:text-[#EDEAE3] transition-all duration-200 active:scale-90 drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] ${social.hoverEffect}`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-1.5">
                  <IconComponent className="w-full h-full object-contain" />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SocialsBento() {
  const isMobile = useIsMobile(768);
  return isMobile ? <SocialsMobile /> : <SocialsDesktop />;
}