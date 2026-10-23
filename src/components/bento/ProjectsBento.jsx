import { useState, useEffect, useMemo } from 'react';
import { projectsData } from '../../data/Projects/projectsData';
import ReadmeFrameModal from '../UI/ReadmeFrameModal';

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/**
 * Parses `released` field ("MM-DD-YYYY" or "N/A").
 * "N/A" (or missing) defaults to today's timestamp so active/today projects rank as most recent.
 */
function getReleaseTimestamp(released) {
  if (!released || String(released).trim().toUpperCase() === 'N/A') {
    return Date.now();
  }
  const clean = String(released).trim();
  const parts = clean.split('-');
  if (parts.length === 3) {
    const [month, day, year] = parts.map(Number);
    if (!Number.isNaN(month) && !Number.isNaN(day) && !Number.isNaN(year)) {
      return new Date(year, month - 1, day).getTime();
    }
  }
  const parsed = Date.parse(clean);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getSortedProjects(list) {
  return [...(list || [])].sort(
    (a, b) => getReleaseTimestamp(b.released) - getReleaseTimestamp(a.released)
  );
}

function formatReleaseLabel(released) {
  if (!released || String(released).trim().toUpperCase() === 'N/A') {
    return 'Active · Today';
  }
  return String(released).trim();
}

function CopyCommandButton({ command }) {
  const [copied, setCopied] = useState(false);

  if (!command) return null;

  const isPlaceholder = String(command).toUpperCase().includes('SOON');

  const handleCopy = async (e) => {
    e.stopPropagation();
    if (isPlaceholder) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore clipboard error */
    }
  };

  if (isPlaceholder) {
    return (
      <div className="flex h-9 w-full items-center justify-between gap-3 rounded-xl border border-border bg-surface-hover/25 px-3.5 text-left">
        <span className="font-mono text-xs text-ink-muted truncate">
          {command}
        </span>
        <span className="font-sans text-[11px] font-medium text-ink-muted shrink-0">
          Upcoming
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy install command: ${command}`}
      className="flex h-9 w-full items-center justify-between gap-3 rounded-xl border border-border bg-surface-hover/40 hover:bg-surface-hover px-3.5 text-left transition-colors cursor-pointer"
    >
      <span className="font-mono text-xs text-ink truncate">
        {command}
      </span>
      <span
        aria-live="polite"
        className="flex items-center gap-1 font-sans text-[11px] font-medium text-ink-soft shrink-0"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </span>
    </button>
  );
}

/* ── RECENT PROJECT BENTO ITEM (Single Persistent Logo = Zero Blink, Fixed Layout = Zero Reflow) ── */
function RecentProjectBox({ project, isExpanded, onActivate, onOpenReadme }) {
  const command = project.command || project.installCmd;

  return (
    <li
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      style={{
        flex: isExpanded ? '2.4 1 0%' : '1 1 0%',
      }}
      className={`theme-surface relative h-[225px] rounded-2xl border overflow-hidden cursor-pointer select-none transition-[flex-grow,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExpanded
          ? 'border-border-strong'
          : 'border-border hover:border-border-strong'
      }`}
    >
      {/* Single Persistent Logo (Never unmounts or fades out -> Zero Blink, GPU-scaled) */}
      <div
        className={`absolute z-10 flex flex-col items-center transition-[top,left,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isExpanded
            ? 'top-5 left-5 translate-x-0 translate-y-0'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}
      >
        {project.logo ? (
          <img
            src={project.logo}
            alt={project.name}
            width="80"
            height="80"
            decoding="async"
            className={`w-20 h-20 sm:w-[84px] sm:h-[84px] object-contain shrink-0 origin-top-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isExpanded
                ? 'scale-85'
                : 'scale-100'
            }`}
          />
        ) : (
          <span className="font-sans text-2xl font-bold text-ink">
            {project.name?.charAt(0)}
          </span>
        )}

        <span
          className={`font-sans text-xs font-semibold text-ink text-center whitespace-nowrap transition-opacity duration-200 ${
            isExpanded
              ? 'opacity-0 max-h-0 mt-0 overflow-hidden pointer-events-none'
              : 'opacity-100 max-h-6 mt-2.5'
          }`}
        >
          {project.name}
        </span>
      </div>

      {/* Stationary Expanded Content (Locked min-width prevents text/button squishing while card widens) */}
      <div
        aria-hidden={!isExpanded}
        className={`absolute inset-0 p-5 flex flex-col justify-between min-w-[295px] sm:min-w-[335px] transition-opacity duration-300 ease-out ${
          isExpanded
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top-Right Title & Tagline (Aligned beside the Top-Left Persistent Logo) */}
        <div className="pl-20 sm:pl-[88px] h-[72px] flex flex-col justify-center min-w-0 overflow-hidden shrink-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-sans text-base sm:text-lg font-bold text-ink tracking-tight m-0 truncate">
              {project.name}
            </h3>
            <span className="font-sans text-[10px] font-medium text-ink-muted shrink-0">
              {formatReleaseLabel(project.released)}
            </span>
          </div>
          <p className="font-sans text-xs text-ink-soft leading-relaxed mt-1 m-0 line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Bottom Full-Width Command Bar + Action Buttons */}
        <div className="flex flex-col justify-end gap-2.5 w-full h-[84px] shrink-0">
          <CopyCommandButton command={command} />

          <div
            className={`grid gap-2 w-full ${
              project.npm ? 'grid-cols-3' : 'grid-cols-2'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenReadme(project);
              }}
              className="h-9 px-3 rounded-xl bg-ink text-bg font-sans text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer border-none whitespace-nowrap"
            >
              README
            </button>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="h-9 px-3 rounded-xl border border-border hover:border-border-strong bg-transparent hover:bg-surface-hover/60 text-ink font-sans text-xs font-medium inline-flex items-center justify-center no-underline transition-colors whitespace-nowrap"
            >
              GitHub
            </a>

            {project.npm && (
              <a
                href={project.npm}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="h-9 px-3 rounded-xl border border-border hover:border-border-strong bg-transparent hover:bg-surface-hover/60 text-ink font-sans text-xs font-medium inline-flex items-center justify-center no-underline transition-colors whitespace-nowrap"
              >
                npm
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/* ── DEDICATED ALL PROJECTS SCREEN ── */
export function AllProjectsScreen({ onBackHome }) {
  const sortedProjects = useMemo(() => getSortedProjects(projectsData), []);
  const [selectedReadmeProject, setSelectedReadmeProject] = useState(null);

  return (
    <section aria-label="All Projects" className="w-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="font-sans text-xl sm:text-2xl font-bold text-ink tracking-tight m-0">
            All Projects
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ink-soft mt-1 m-0">
            Sorted by release date ({sortedProjects.length} total projects).
          </p>
        </div>

        <button
          type="button"
          onClick={onBackHome}
          className="h-10 px-4 rounded-xl border border-border hover:border-border-strong bg-surface hover:bg-surface-hover text-ink font-sans text-xs font-medium transition-colors cursor-pointer"
        >
          Back to Home
        </button>
      </div>

      <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProjects.map((project) => {
          const command = project.command || project.installCmd;
          return (
            <li
              key={project.id}
              className="theme-surface rounded-2xl border p-6 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {project.logo && (
                    <img
                      src={project.logo}
                      alt={project.name}
                      width="72"
                      height="72"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="font-sans text-lg font-bold text-ink tracking-tight m-0 truncate">
                        {project.name}
                      </h2>
                      <span className="font-sans text-[11px] font-medium text-ink-muted shrink-0">
                        {formatReleaseLabel(project.released)}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-ink-muted block mt-0.5">
                      {project.category}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed m-0">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <CopyCommandButton command={command} />

                <div
                  className={`grid gap-2 ${
                    project.npm ? 'grid-cols-3' : 'grid-cols-2'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedReadmeProject(project)}
                    className="h-10 px-4 rounded-xl bg-ink text-bg font-sans text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer border-none"
                  >
                    README
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-4 rounded-xl border border-border hover:border-border-strong bg-transparent hover:bg-surface-hover/60 text-ink font-sans text-xs font-medium inline-flex items-center justify-center no-underline transition-colors"
                  >
                    GitHub
                  </a>

                  {project.npm && (
                    <a
                      href={project.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 px-4 rounded-xl border border-border hover:border-border-strong bg-transparent hover:bg-surface-hover/60 text-ink font-sans text-xs font-medium inline-flex items-center justify-center no-underline transition-colors"
                    >
                      npm
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <ReadmeFrameModal
        project={selectedReadmeProject}
        isOpen={Boolean(selectedReadmeProject)}
        onClose={() => setSelectedReadmeProject(null)}
      />
    </section>
  );
}

/* ── MY RECENT PROJECTS SECTION (Home View — Top 3 Most Recent Only) ── */
export default function ProjectsBento({ onOpenAllProjects }) {
  const recentProjects = useMemo(
    () => getSortedProjects(projectsData).slice(0, 3),
    []
  );

  const [activeId, setActiveId] = useState(
    () => recentProjects[0]?.id || 'barstile'
  );
  const [isHovered, setIsHovered] = useState(false);
  const [selectedReadmeProject, setSelectedReadmeProject] = useState(null);

  // Every 5 seconds, if not hovering, randomly expand a different project from the 3 recent ones
  useEffect(() => {
    if (isHovered || recentProjects.length <= 1) return;

    const timer = setInterval(() => {
      setActiveId((prevId) => {
        const candidates = recentProjects.filter((p) => p.id !== prevId);
        if (candidates.length === 0) return prevId;
        const randomNext =
          candidates[Math.floor(Math.random() * candidates.length)];
        return randomNext.id;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, recentProjects]);

  const latestProject = recentProjects[0];

  return (
    <section id="projects" aria-label="My Recent Projects" className="flex flex-col gap-3.5">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
          My Recent Projects
        </h2>
        <button
          type="button"
          onClick={onOpenAllProjects}
          className="font-sans text-xs font-medium text-ink-soft hover:text-ink bg-transparent border-none p-0 cursor-pointer transition-colors"
        >
          See all projects ({projectsData.length})
        </button>
      </div>

      {/* Mobile View (< md): Shows ONLY the Single Latest Project */}
      {latestProject && (
        <div className="md:hidden theme-surface rounded-2xl border border-border-strong p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-4">
            {latestProject.logo && (
              <img
                src={latestProject.logo}
                alt={latestProject.name}
                width="72"
                height="72"
                className="w-16 h-16 object-contain shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-sans text-base font-bold text-ink tracking-tight m-0 truncate">
                  {latestProject.name}
                </h3>
                <span className="font-sans text-[10px] font-medium text-ink-muted shrink-0">
                  {formatReleaseLabel(latestProject.released)}
                </span>
              </div>
              <p className="font-sans text-xs text-ink-soft leading-relaxed mt-1 m-0 line-clamp-2">
                {latestProject.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            <CopyCommandButton command={latestProject.command || latestProject.installCmd} />

            <div
              className={`grid gap-2 w-full ${
                latestProject.npm ? 'grid-cols-3' : 'grid-cols-2'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedReadmeProject(latestProject)}
                className="h-9 px-3 rounded-xl bg-ink text-bg font-sans text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer border-none whitespace-nowrap"
              >
                README
              </button>

              <a
                href={latestProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3 rounded-xl border border-border hover:border-border-strong bg-transparent hover:bg-surface-hover/60 text-ink font-sans text-xs font-medium inline-flex items-center justify-center no-underline transition-colors whitespace-nowrap"
              >
                GitHub
              </a>

              {latestProject.npm && (
                <a
                  href={latestProject.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3 rounded-xl border border-border hover:border-border-strong bg-transparent hover:bg-surface-hover/60 text-ink font-sans text-xs font-medium inline-flex items-center justify-center no-underline transition-colors whitespace-nowrap"
                >
                  npm
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop View (>= md): Uneven Flex Bento Row of Top 3 Most Recent Projects */}
      <ul
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="m-0 p-0 list-none hidden md:flex flex-row gap-3.5"
      >
        {recentProjects.map((project) => (
          <RecentProjectBox
            key={project.id}
            project={project}
            isExpanded={activeId === project.id}
            onActivate={() => setActiveId(project.id)}
            onOpenReadme={(p) => setSelectedReadmeProject(p)}
          />
        ))}
      </ul>

      <ReadmeFrameModal
        project={selectedReadmeProject}
        isOpen={Boolean(selectedReadmeProject)}
        onClose={() => setSelectedReadmeProject(null)}
      />
    </section>
  );
}
