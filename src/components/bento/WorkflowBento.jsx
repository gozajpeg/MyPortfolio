const FUNDAMENTALS = [
  {
    id: 'planning',
    step: '01',
    title: 'Planning',
    subtitle: 'System Architecture & Scope',
    description:
      'Defining clean system boundaries, data schemas, and zero-bloat requirements before writing a single line of code.',
  },
  {
    id: 'development',
    step: '02',
    title: 'Development',
    subtitle: 'Modular Execution',
    description:
      'Writing lean, standard-library-first code with strict modularity, predictable state, and fast execution.',
  },
  {
    id: 'testing',
    step: '03',
    title: 'Testing',
    subtitle: 'Automated Verification',
    description:
      'Verifying AST parsing, authentication boundaries, and deterministic CLI output across real-world scenarios.',
  },
  {
    id: 'publish',
    step: '04',
    title: 'Publish',
    subtitle: 'Release & Distribution',
    description:
      'Packaging lightweight, versioned builds and shipping directly to the npm registry, GitHub, and Cloudflare edge.',
  },
];

/* ── CONTINUOUS NON-PAUSABLE ARCHITECTURAL VECTOR LOOP (220x84 — Matches What I Build) ── */
function ArchitecturalCanvas({ stageId }) {
  if (stageId === 'planning') {
    const nodes = [
      { cx: 28, cy: 42, label: 'IN', delay: '0s' },
      { cx: 82, cy: 18, label: 'AST', delay: '0.25s' },
      { cx: 82, cy: 66, label: 'API', delay: '0.4s' },
      { cx: 142, cy: 18, label: 'CORE', delay: '0.65s' },
      { cx: 142, cy: 66, label: 'DB', delay: '0.8s' },
      { cx: 194, cy: 42, label: 'SPEC', delay: '1.05s' },
    ];

    return (
      <svg
        viewBox="0 0 220 84"
        className="w-full h-20 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <line x1="14" y1="42" x2="206" y2="42" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
        <line x1="112" y1="8" x2="112" y2="76" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />

        <path
          d="M 28 42 L 82 18 L 142 18 L 194 42"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="svg-draw-loop"
        />
        <path
          d="M 28 42 L 82 66 L 142 66 L 194 42"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="svg-draw-loop"
          style={{ animationDelay: '0.35s' }}
        />
        <line
          x1="82"
          y1="18"
          x2="142"
          y2="66"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          strokeDasharray="3 3"
        />

        {nodes.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="10"
              fill="var(--color-surface)"
              stroke="currentColor"
              strokeWidth="1.35"
              className="svg-pulse-node"
              style={{ animationDelay: node.delay }}
            />
            <text
              x={node.cx}
              y={node.cy + 2.5}
              textAnchor="middle"
              fill="currentColor"
              className="font-mono text-[6px] font-semibold"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (stageId === 'development') {
    const streams = [
      { y: 18, w: 86, delay: '0s' },
      { y: 34, w: 114, delay: '0.22s' },
      { y: 50, w: 74, delay: '0.44s' },
      { y: 66, w: 102, delay: '0.66s' },
    ];
    return (
      <svg
        viewBox="0 0 220 84"
        className="w-full h-20 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {streams.map((s, i) => (
          <g key={i}>
            <line
              x1="16"
              y1={s.y}
              x2="140"
              y2={s.y}
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="16"
              y={s.y - 2}
              width={s.w}
              height="4"
              rx="2"
              fill="currentColor"
              className="svg-bar-scalex"
              style={{ animationDelay: s.delay }}
            />
          </g>
        ))}

        {[18, 34, 50, 66].map((y, idx) => (
          <path
            key={y}
            d={`M 144 ${y} C 160 ${y}, 162 42, 176 42`}
            pathLength="1"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeOpacity="0.45"
            className="svg-draw-loop"
            style={{ animationDelay: `${idx * 0.15}s` }}
          />
        ))}

        <rect
          x="176"
          y="22"
          width="30"
          height="40"
          rx="7"
          fill="var(--color-surface)"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle
          cx="191"
          cy="42"
          r="4.5"
          fill="currentColor"
          className="svg-pulse-node"
        />
      </svg>
    );
  }

  if (stageId === 'testing') {
    const gates = [
      { x: 44, label: 'UNIT', delay: '0.15s' },
      { x: 110, label: 'AST', delay: '0.55s' },
      { x: 176, label: 'E2E', delay: '0.95s' },
    ];
    return (
      <svg
        viewBox="0 0 220 84"
        className="w-full h-20 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="16"
          y1="42"
          x2="204"
          y2="42"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.4"
        />

        {gates.map((g) => (
          <g key={g.label}>
            <rect
              x={g.x - 19}
              y="18"
              width="38"
              height="48"
              rx="8"
              fill="var(--color-surface)"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d={`M ${g.x - 6} 38 L ${g.x - 1.5} 42.5 L ${g.x + 7} 33`}
              pathLength="1"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="svg-draw-loop"
              style={{ animationDelay: g.delay }}
            />
            <text
              x={g.x}
              y="57"
              textAnchor="middle"
              fill="currentColor"
              opacity="0.72"
              className="font-mono text-[7px] font-semibold"
            >
              {g.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  // 'publish'
  return (
    <svg
      viewBox="0 0 220 84"
      className="w-full h-20 text-ink overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      {[20, 31, 42].map((r, i) => (
        <circle
          key={r}
          cx="110"
          cy="42"
          r={r}
          stroke="currentColor"
          strokeWidth="1.2"
          className="svg-ripple-out"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}

      <line
        x1="92"
        y1="42"
        x2="42"
        y2="42"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.4"
        className="svg-draw-loop"
      />
      <line
        x1="128"
        y1="42"
        x2="178"
        y2="42"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.4"
        className="svg-draw-loop"
        style={{ animationDelay: '0.25s' }}
      />

      <circle cx="28" cy="42" r="12" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.4" />
      <text x="28" y="44.5" textAnchor="middle" fill="currentColor" className="font-mono text-[6.5px] font-semibold">
        GIT
      </text>

      <circle cx="192" cy="42" r="12" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.4" />
      <text x="192" y="44.5" textAnchor="middle" fill="currentColor" className="font-mono text-[6.5px] font-semibold">
        NPM
      </text>

      <circle cx="110" cy="42" r="16" fill="currentColor" />
      <text
        x="110"
        y="45"
        textAnchor="middle"
        fill="var(--color-bg)"
        className="font-mono text-[8px] font-bold"
      >
        v1.0
      </text>
    </svg>
  );
}

/* ── STAGE CARD (Matches What I Build / CapabilitiesBento Design) ── */
function StageCard({ stage }) {
  return (
    <div className="theme-surface rounded-2xl border border-border hover:border-border-strong p-5 flex flex-col justify-between gap-4 transition-colors duration-300">
      {/* Continuous Looped Vector Wireframe */}
      <div className="w-full py-1 border-b border-border/60 pb-3">
        <ArchitecturalCanvas stageId={stage.id} />
      </div>

      {/* Stage Editorial Copy */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md bg-ink text-bg font-mono text-[10px] font-semibold shrink-0">
              {stage.step}
            </span>
            <h3 className="font-sans text-base font-bold text-ink tracking-tight m-0 truncate">
              {stage.title}
            </h3>
          </div>
          <span className="font-sans text-[11px] font-medium text-ink-muted shrink-0">
            {stage.subtitle}
          </span>
        </div>

        <p className="font-sans text-xs text-ink-soft leading-relaxed mt-1 m-0">
          {stage.description}
        </p>
      </div>
    </div>
  );
}

/* ── DESKTOP HORIZONTAL SNAKEY S-CURVE CONNECTOR (Between Left & Right Cards) ── */
function HorizontalSnakeRoad({ invert = false }) {
  const pathData = invert
    ? 'M 0 28 C 22 46, 38 10, 60 28'
    : 'M 0 28 C 22 10, 38 46, 60 28';

  return (
    <div
      aria-hidden="true"
      className="hidden sm:flex items-center justify-center w-11 md:w-14 shrink-0 text-ink select-none"
    >
      <svg
        viewBox="0 0 60 56"
        className="w-full h-14 overflow-visible"
        fill="none"
      >
        {/* Soft Road Track Shoulder */}
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Solid Road Rail */}
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Continuous Non-Pausable Flowing Signal */}
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.9"
          strokeWidth="2"
          strokeLinecap="round"
          className="snake-road-flow"
        />
        <circle cx="2" cy="28" r="2.5" fill="currentColor" />
        <circle cx="58" cy="28" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ── DESKTOP SWEEPING S-CURVE TURN (Winds from 02 Development on Right -> 03 Testing on Left) ── */
function CrossRowSnakeRoad() {
  const pathData = 'M 620 2 C 620 44, 180 12, 180 54';

  return (
    <div
      aria-hidden="true"
      className="hidden sm:block w-full h-14 text-ink select-none px-4"
    >
      <svg
        viewBox="0 0 800 56"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        {/* Soft Road Track Shoulder */}
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.09"
          strokeWidth="8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Solid Road Rail */}
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.24"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Continuous Non-Pausable Flowing Signal */}
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.9"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="snake-road-flow"
        />
      </svg>
    </div>
  );
}

/* ── MOBILE VERTICAL SNAKEY S-CURVE CONNECTOR ── */
function MobileSnakeRoad({ flip = false }) {
  const pathData = flip
    ? 'M 148 0 C 148 22, 72 22, 72 44'
    : 'M 72 0 C 72 22, 148 22, 148 44';

  return (
    <div
      aria-hidden="true"
      className="sm:hidden w-full h-11 flex items-center justify-center text-ink select-none"
    >
      <svg
        viewBox="0 0 220 44"
        className="w-56 h-full overflow-visible"
        fill="none"
      >
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d={pathData}
          stroke="currentColor"
          strokeOpacity="0.9"
          strokeWidth="2"
          strokeLinecap="round"
          className="snake-road-flow"
        />
      </svg>
    </div>
  );
}

export default function WorkflowBento() {
  const [planning, development, testing, publish] = FUNDAMENTALS;

  return (
    <section
      id="workflow"
      aria-label="Build Process Fundamentals"
      className="flex flex-col gap-3.5"
    >
      {/* Header (Matches What I Build) */}
      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
          How I Build
        </h2>
        <span className="font-sans text-xs text-ink-muted">
          How it should be
        </span>
      </div>

      {/* ── SNAKEY CONNECTED ROAD LAYOUT (01 Planning -> 02 Development -> 03 Testing -> 04 Publish) ── */}
      <div className="flex flex-col">
        {/* Row 1: 01 Planning -> Snakey Bridge -> 02 Development */}
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <div className="flex-1 min-w-0">
            <StageCard stage={planning} />
          </div>

          <HorizontalSnakeRoad />
          <MobileSnakeRoad flip={false} />

          <div className="flex-1 min-w-0">
            <StageCard stage={development} />
          </div>
        </div>

        {/* Cross-Row Snakey S-Curve Road: 02 Development (Right) -> 03 Testing (Left) */}
        <CrossRowSnakeRoad />
        <MobileSnakeRoad flip={true} />

        {/* Row 2: 03 Testing -> Snakey Bridge -> 04 Publish */}
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <div className="flex-1 min-w-0">
            <StageCard stage={testing} />
          </div>

          <HorizontalSnakeRoad invert />
          <MobileSnakeRoad flip={false} />

          <div className="flex-1 min-w-0">
            <StageCard stage={publish} />
          </div>
        </div>
      </div>
    </section>
  );
}
