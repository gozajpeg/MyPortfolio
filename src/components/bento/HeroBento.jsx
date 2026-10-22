import { useState } from 'react';
import mePhoto from '../../assets/logo/me.webp';

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

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function EmailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const SOCIAL_ITEMS = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/gozajpeg',
    Icon: GitHubIcon,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rommel-angelo-goza-264a72421/',
    Icon: LinkedInIcon,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/jelonaticz',
    Icon: InstagramIcon,
  },
];

export default function HeroBento() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ragoza.builds@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = 'mailto:ragoza.builds@gmail.com';
    }
  };

  return (
    <aside
      id="hero"
      aria-label="Profile and Resume Summary"
      className="theme-surface rounded-2xl border p-5 sm:p-6 flex flex-col gap-5"
    >
      {/* Profile Photo (Blended with no box border/background, zoomed on upper portrait) + Name */}
      <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4">
        <div className="w-24 h-28 sm:w-28 sm:h-32 lg:w-full lg:h-64 overflow-hidden shrink-0 flex items-start justify-center">
          <img
            src={mePhoto}
            alt="Rommel Angelo Goza"
            width="416"
            height="480"
            fetchPriority="high"
            className="w-full h-full object-contain object-top scale-[1.32] translate-y-1 origin-top"
          />
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <h1 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-ink m-0 leading-snug">
            Rommel Angelo Goza
          </h1>
          <p className="font-sans text-xs sm:text-sm font-medium text-ink-soft m-0">
            Full-Stack Developer
          </p>
          <p className="font-sans text-xs text-ink-muted m-0">
            Bacolod City, Philippines
          </p>
        </div>
      </div>

      {/* Icon-Based Links (Replaces the extra text above Experience) */}

      
      <div className="flex items-center gap-1.5 pt-4 border-t border-border flex-wrap">
        {SOCIAL_ITEMS.map((item) => {
          const Icon = item.Icon;
          const isOpen = hoveredLink === item.id;
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              onMouseEnter={() => setHoveredLink(item.id)}
              onMouseLeave={() => setHoveredLink(null)}
              className="inline-flex items-center h-10 px-3 rounded-xl bg-surface-hover/40 hover:bg-surface-hover text-ink-soft hover:text-ink no-underline transition-colors duration-200"
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span
                className={`grid transition-[grid-template-columns,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen
                    ? 'grid-cols-[1fr] opacity-100 ml-2'
                    : 'grid-cols-[0fr] opacity-0 ml-0'
                }`}
              >
                <span className="overflow-hidden whitespace-nowrap font-sans text-xs font-medium text-ink">
                  {item.name}
                </span>
              </span>
            </a>
          );
        })}

        {/* Icon-based Email Copy Button */}
        <button
          type="button"
          onClick={handleCopyEmail}
          onMouseEnter={() => setHoveredLink('email')}
          onMouseLeave={() => setHoveredLink(null)}
          aria-label="Copy email address ragoza.builds@gmail.com"
          className="inline-flex items-center h-10 px-3 rounded-xl bg-surface-hover/40 hover:bg-surface-hover text-ink-soft hover:text-ink border-none cursor-pointer transition-colors duration-200"
        >
          <EmailIcon className="w-4 h-4 shrink-0" />
          <span
            className={`grid transition-[grid-template-columns,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hoveredLink === 'email' || emailCopied
                ? 'grid-cols-[1fr] opacity-100 ml-2'
                : 'grid-cols-[0fr] opacity-0 ml-0'
            }`}
          >
            <span className="overflow-hidden whitespace-nowrap font-sans text-xs font-medium text-ink">
              {emailCopied ? 'Copied' : 'Email'}
            </span>
          </span>
        </button>
      </div>

      {/* Condensed Resume Snapshot */}
      <div className="flex flex-col gap-4 pt-4 border-t border-border">
        {/* Experience */}
        <div className="flex flex-col gap-2.5">
          <h2 className="font-sans text-xs font-semibold text-ink-muted m-0">
            Experience
          </h2>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-sans text-xs sm:text-[13px] font-semibold text-ink">
                Developer
              </span>
              <span className="font-sans text-[11px] text-ink-muted shrink-0">
                2024 – Present  
              </span>
            </div>
            <span className="font-sans text-xs text-ink-soft">
              Freelance Web Developer
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-sans text-xs sm:text-[13px] font-semibold text-ink">
                Remotasks
              </span>
              <span className="font-sans text-[11px] text-ink-muted shrink-0">
                2026 – Present
              </span>
            </div>
            <span className="font-sans text-xs text-ink-soft">
              Video Annotator
            </span>
          </div>
        </div>

        {/* Education */}
        <div className="flex flex-col gap-1 pt-3 border-t border-border">
          <h2 className="font-sans text-xs font-semibold text-ink-muted m-0">
            Education
          </h2>
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-sans text-xs sm:text-[13px] font-semibold text-ink">
              STI West Negros University
            </span>
            <span className="font-sans text-[11px] text-ink-muted shrink-0">
              2025 – 2026
            </span>
          </div>
          <span className="font-sans text-xs text-ink-soft">
            B.S. in Information Technology
          </span>
        </div>
      </div>
    </aside>
  );
}
