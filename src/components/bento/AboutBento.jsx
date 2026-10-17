export default function AboutBento({ onNavigate }) {
  return (
    <div className="h-full w-full overflow-y-auto md:overflow-hidden bg-surface text-ink flex flex-col justify-between p-5 sm:p-6 lg:p-8 xl:p-10 select-none">
      {/* Top Header Bar spanning full width */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 lg:pb-5 border-b border-white/[0.08] shrink-0">
        <div>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted block mb-1">
            About Me
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight m-0 leading-tight">
            Software developer based in Bacolod City.
          </h1>
        </div>
        <p className="font-sans text-xs sm:text-sm text-ink-soft max-w-md m-0 leading-relaxed text-left md:text-right shrink-0">
          Information Technology student graduating in 2026.
          Building web applications, REST APIs, and developer CLI tools.
        </p>
      </div>

      {/* Main 3-Column Balanced Grid across full width */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 pt-4 lg:pt-6 items-stretch">
        {/* Column 1: Background & Approach */}
        <div className="flex flex-col justify-between h-full gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted m-0">
              Background
            </h2>
            <p className="font-sans text-xs sm:text-[13px] lg:text-sm text-ink-soft leading-relaxed m-0">
              I’m Rommel Angelo Goza. My foundation started in backend logic—designing relational
              database schemas with MySQL and PostgreSQL, and writing RESTful APIs with Node.js and Fastify.
            </p>
            <p className="font-sans text-xs sm:text-[13px] lg:text-sm text-ink-soft leading-relaxed m-0">
              To turn ideas into complete products, I expanded into full-stack development with React
              and Vite. I value straightforward architecture, readable code, and software that solves
              real problems without unnecessary complexity.
            </p>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted block mb-1">
              Current Focus
            </span>
            <p className="font-sans text-xs sm:text-[13px] text-ink-soft leading-relaxed m-0">
              Building open-source developer tooling like <span className="text-ink font-medium">prins-cli</span> and
              focusing on clean, dependable application design.
            </p>
          </div>
        </div>

        {/* Column 2: Work Experience */}
        <div className="flex flex-col justify-between h-full gap-4 border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-6 lg:pl-8 xl:pl-10">
          <div className="flex flex-col gap-4">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted m-0">
              Experience
            </h2>

            {/* Remotasks */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-sans text-sm font-semibold text-ink m-0">
                  Remotasks
                </h3>
                <span className="font-sans text-[11px] text-ink-muted">
                  Aug 2024 – Present
                </span>
              </div>
              <p className="font-sans text-xs text-ink-soft m-0">
                Video Annotator
              </p>
              <p className="font-sans text-xs text-ink-muted leading-relaxed mt-0.5 m-0">
                Performing temporal annotation and object tracking for computer vision training datasets.
              </p>
            </div>

            {/* Freelance & Projects */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-sans text-sm font-semibold text-ink m-0">
                  Freelance & Independent
                </h3>
                <span className="font-sans text-[11px] text-ink-muted">
                  2024 – Present
                </span>
              </div>
              <p className="font-sans text-xs text-ink-soft m-0">
                Full-Stack Development
              </p>
              <p className="font-sans text-xs text-ink-muted leading-relaxed mt-0.5 m-0">
                Building React web applications, custom UI components, and Node.js utilities.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted block mb-1">
              Availability
            </span>
            <p className="font-sans text-xs sm:text-[13px] text-ink-soft leading-relaxed m-0">
              Open for junior software developer roles, internships, and freelance projects.
            </p>
          </div>
        </div>

        {/* Column 3: Education, Interests & Contact */}
        <div className="flex flex-col justify-between h-full gap-4 border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-6 lg:pl-8 xl:pl-10">
          {/* Education */}
          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted m-0">
              Education
            </h2>
            <div className="flex flex-col gap-1">
              <h3 className="font-sans text-sm sm:text-base font-semibold text-ink m-0">
                STI West Negros University
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-soft m-0">
                B.S. in Information Technology
              </p>
              <p className="font-sans text-xs text-ink-muted mt-0.5 m-0">
                2022 – Expected 2026 • Bacolod City, Philippines
              </p>
            </div>
          </div>

          {/* Interests */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-white/[0.06]">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted m-0">
              Interests
            </h2>
            <p className="font-sans text-xs sm:text-[13px] text-ink-soft leading-relaxed m-0">
              Street photography, custom mechanical keyboards, and PC gaming.
            </p>
          </div>

          {/* Action CTA */}
          <div className="pt-2 border-t border-white/[0.06]">
            <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[38px] w-full max-w-[200px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <button
                type="button"
                onClick={() => onNavigate?.('socials')}
                className="absolute inset-0 flex items-center justify-center gap-1.5 font-sans text-xs font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[3px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] cursor-pointer no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[1px] active:border-b-0 active:translate-y-[3px]"
              >
                <span>Get in touch ↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}