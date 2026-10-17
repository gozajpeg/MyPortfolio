import { useState } from 'react';
import { projectsData } from '../../data/Projects/projectsData';
import ReadmeFrameModal from '../UI/ReadmeFrameModal';

/* ---------- tiny inline icons (no extra deps) ---------- */
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
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const linkBtn =
  'h-9 px-3.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 text-ink-soft hover:text-ink font-sans text-xs font-semibold inline-flex items-center justify-center gap-1.5 no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60';

function ProjectRow({ project, onOpenReadme }) {
  const [copied, setCopied] = useState(false);
  const command = project.command || project.installCmd;

  const handleCopy = async () => {
    if (!command) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: fail silently */
    }
  };

  return (
    <li className="flex flex-col rounded-2xl border border-[#252525] bg-[#141414] p-4 sm:p-5 transition-colors duration-150 hover:border-white/20">
      <div className="flex h-full flex-col justify-between gap-5">
        {/* Identity: logo + name + tagline */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] sm:h-14 sm:w-14">
            {project.logo ? (
              <img src={project.logo} alt="" className="h-full w-full object-contain p-2" loading="lazy" />
            ) : (
              <span className="font-display text-lg font-bold text-ink-soft">
                {project.name?.charAt(0)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="m-0 truncate font-display text-lg font-bold leading-tight tracking-tight text-ink sm:text-xl">
              {project.name}
            </h3>
            <p className="m-0 mt-1 line-clamp-2 font-sans text-[13px] leading-relaxed text-ink-soft">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Command + actions */}
        <div className="flex flex-col gap-3">
          {command && (
            <button
              type="button"
              onClick={handleCopy}
              title="Copy command"
              aria-label={`Copy command: ${command}`}
              className="group/cmd flex h-9 min-w-0 items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-[#0E0E0E] px-3 text-left transition-colors hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 w-full"
            >
              <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-ink">
                <span className="select-none text-ink-muted">$</span>
                <span className="truncate">{command}</span>
              </span>
              <span
                aria-live="polite"
                className={`flex shrink-0 items-center gap-1 font-sans text-[11px] transition-colors ${
                  copied ? 'text-emerald-400' : 'text-ink-muted group-hover/cmd:text-ink'
                }`}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenReadme(project)}
              className="inline-flex h-9 flex-[2] items-center justify-center gap-1.5 rounded-lg border border-[#252525] border-b-[3px] bg-[#EDEAE3] px-4 font-sans text-xs font-bold text-bg shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] transition-all duration-75 hover:translate-y-[1px] hover:border-b-2 active:translate-y-[3px] active:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              README
            </button>

            <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${linkBtn} flex-1`}>
              GitHub <ExternalIcon />
            </a>

            {project.npm && (
              <a href={project.npm} target="_blank" rel="noopener noreferrer" className={`${linkBtn} flex-1`}>
                npm <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function ProjectsBento() {
  const [selectedReadmeProject, setSelectedReadmeProject] = useState(null);
  const projects = projectsData || [];

  return (
    <div className="h-full w-full overflow-y-auto bg-surface text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-5 sm:p-6 lg:gap-8 lg:p-10">
        {/* Header */}
        <header className="flex flex-col gap-2 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h1 className="m-0 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Published packages &amp; tools
            </h1>
            <p className="m-0 mt-2 max-w-md font-sans text-xs leading-relaxed text-ink-soft sm:text-sm">
              Open-source CLI tools on npm. Copy an install command or read the full docs without leaving the page.
            </p>
          </div>
          <span className="shrink-0 font-sans text-xs text-ink-muted">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </span>
        </header>

        {/* Project list */}
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:gap-4 md:grid-cols-2 lg:gap-5">
          {projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onOpenReadme={(p) => setSelectedReadmeProject(p)}
            />
          ))}
        </ul>
      </div>

      {/* In-App GitHub README Frame Modal */}
      <ReadmeFrameModal
        project={selectedReadmeProject}
        isOpen={Boolean(selectedReadmeProject)}
        onClose={() => setSelectedReadmeProject(null)}
      />
    </div>
  );
}