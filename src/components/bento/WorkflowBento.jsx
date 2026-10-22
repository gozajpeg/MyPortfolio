import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGE_DURATION_MS = 3800;

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

/* ── BESPOKE ARCHITECTURAL VECTOR MOTION STAGE (280x140) ── */
function ArchitecturalCanvas({ stageId }) {
  if (stageId === 'planning') {
    return (
      <svg
        viewBox="0 0 280 140"
        className="w-full h-36 sm:h-40 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Subtle architectural reference grid */}
        <line x1="20" y1="70" x2="260" y2="70" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
        <line x1="140" y1="15" x2="140" y2="125" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />

        {/* Animated Blueprint Connections */}
        <motion.path
          d="M 38 70 L 105 34 L 185 34 L 242 70"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M 38 70 L 105 106 L 185 106 L 242 70"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line
          x1="105"
          y1="34"
          x2="185"
          y2="106"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Blueprint Nodes */}
        {[
          { cx: 38, cy: 70, label: 'IN', delay: 0 },
          { cx: 105, cy: 34, label: 'AST', delay: 0.25 },
          { cx: 105, cy: 106, label: 'API', delay: 0.35 },
          { cx: 185, cy: 34, label: 'CORE', delay: 0.65 },
          { cx: 185, cy: 106, label: 'DB', delay: 0.75 },
          { cx: 242, cy: 70, label: 'SPEC', delay: 1.05 },
        ].map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="12"
              fill="var(--color-bg)"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: node.delay, ease: 'easeOut' }}
            />
            <motion.text
              x={node.cx}
              y={node.cy + 3}
              textAnchor="middle"
              fill="currentColor"
              className="font-mono text-[7px] font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.3, delay: node.delay + 0.15 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    );
  }

  if (stageId === 'development') {
    const streams = [
      { y: 34, w: 110, delay: 0 },
      { y: 58, w: 145, delay: 0.18 },
      { y: 82, w: 95, delay: 0.36 },
      { y: 106, w: 130, delay: 0.54 },
    ];
    return (
      <svg
        viewBox="0 0 280 140"
        className="w-full h-36 sm:h-40 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Left Modular Code Streams */}
        {streams.map((s, i) => (
          <g key={i}>
            <line
              x1="24"
              y1={s.y}
              x2="180"
              y2={s.y}
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.rect
              x="24"
              y={s.y - 2}
              height="4"
              rx="2"
              fill="currentColor"
              initial={{ width: 0, opacity: 0.3 }}
              animate={{ width: s.w, opacity: 0.9 }}
              transition={{
                duration: 0.9,
                delay: s.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </g>
        ))}

        {/* Converging Compiler Lines to Runtime Core */}
        {[34, 58, 82, 106].map((y, idx) => (
          <motion.path
            key={y}
            d={`M 184 ${y} C 204 ${y}, 206 70, 224 70`}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeOpacity="0.45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.4 + idx * 0.1 }}
          />
        ))}

        {/* Right Execution Core Node */}
        <motion.rect
          x="224"
          y="48"
          width="36"
          height="44"
          rx="8"
          fill="var(--color-bg)"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        <motion.circle
          cx="242"
          cy="70"
          r="5"
          fill="currentColor"
          animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    );
  }

  if (stageId === 'testing') {
    const gates = [
      { x: 56, label: 'UNIT', delay: 0.2 },
      { x: 140, label: 'AST', delay: 0.65 },
      { x: 224, label: 'E2E', delay: 1.1 },
    ];
    return (
      <svg
        viewBox="0 0 280 140"
        className="w-full h-36 sm:h-40 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Horizontal Verification Track */}
        <line
          x1="24"
          y1="70"
          x2="256"
          y2="70"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />

        {/* Sweeping Diagnostic Scanline */}
        <motion.line
          y1="22"
          y2="118"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          initial={{ x1: 24, x2: 24, opacity: 0 }}
          animate={{
            x1: [24, 256],
            x2: [24, 256],
            opacity: [0, 0.85, 0],
          }}
          transition={{ duration: 2.0, ease: 'easeInOut' }}
        />

        {/* 3 Verification Gates */}
        {gates.map((g) => (
          <g key={g.label}>
            <motion.rect
              x={g.x - 22}
              y="44"
              width="44"
              height="52"
              rx="10"
              fill="var(--color-bg)"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ opacity: 0.3, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: g.delay }}
            />
            <motion.path
              d={`M ${g.x - 7} 65 L ${g.x - 2} 70 L ${g.x + 8} 59`}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: g.delay + 0.15 }}
            />
            <text
              x={g.x}
              y="86"
              textAnchor="middle"
              fill="currentColor"
              opacity="0.7"
              className="font-mono text-[8px] font-semibold"
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
      viewBox="0 0 280 140"
      className="w-full h-36 sm:h-40 text-ink overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      {/* Concentric Dispatch Ripples */}
      {[26, 44, 62].map((r, i) => (
        <motion.circle
          key={r}
          cx="140"
          cy="70"
          r={r}
          stroke="currentColor"
          strokeWidth="1.2"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [0.75, 1.15],
            opacity: [0.65, 0],
          }}
          transition={{
            duration: 2.2,
            delay: i * 0.45,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Outbound Distribution Beams */}
      <motion.line
        x1="118"
        y1="70"
        x2="48"
        y2="70"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.line
        x1="162"
        y1="70"
        x2="232"
        y2="70"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Left Destination: GitHub */}
      <circle cx="36" cy="70" r="14" fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.5" />
      <text x="36" y="73" textAnchor="middle" fill="currentColor" className="font-mono text-[7px] font-semibold">
        GIT
      </text>

      {/* Right Destination: npm */}
      <circle cx="244" cy="70" r="14" fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.5" />
      <text x="244" y="73" textAnchor="middle" fill="currentColor" className="font-mono text-[7px] font-semibold">
        NPM
      </text>

      {/* Center Published Artifact Core */}
      <circle cx="140" cy="70" r="20" fill="currentColor" />
      <text
        x="140"
        y="73"
        textAnchor="middle"
        fill="var(--color-bg)"
        className="font-mono text-[9px] font-bold"
      >
        v1.0
      </text>
    </svg>
  );
}

export default function WorkflowBento() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FUNDAMENTALS.length);
    }, STAGE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentStage = FUNDAMENTALS[activeIndex];
  const trackProgressPercent = (activeIndex / (FUNDAMENTALS.length - 1)) * 100;

  return (
    <section
      id="workflow"
      aria-label="Build Process Fundamentals"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="flex flex-col gap-5 py-2"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
          How I Build
        </h2>
        <span className="font-mono text-xs text-ink-muted">
          How it should be
        </span>
      </div>

      {/* ── OPEN HORIZONTAL PIPELINE TRACK (No Box Clutter) ── */}
      <div className="relative px-2 pt-2">
        {/* Continuous Background Rail */}
        <div
          aria-hidden="true"
          className="absolute left-6 right-6 top-[22px] h-[1.5px] bg-border"
        />

        {/* Animated Active Beam Connecting the Fundamental Nodes */}
        <div
          aria-hidden="true"
          className="absolute left-6 right-6 top-[22px] h-[1.5px] overflow-hidden"
        >
          <motion.div
            animate={{ width: `${trackProgressPercent}%` }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-ink"
          />
        </div>

        {/* 4 Interactive Fundamental Nodes Along the Track */}
        <ol className="relative z-10 m-0 p-0 list-none grid grid-cols-4 gap-2">
          {FUNDAMENTALS.map((item, idx) => {
            const isActive = idx === activeIndex;
            const isPassed = idx <= activeIndex;

            return (
              <li
                key={item.id}
                className={`flex flex-col ${
                  idx === 0
                    ? 'items-start text-left'
                    : idx === FUNDAMENTALS.length - 1
                    ? 'items-end text-right'
                    : 'items-center text-center'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="group flex flex-col items-inherit gap-2.5 bg-transparent border-none p-0 cursor-pointer select-none"
                >
                  {/* Node Circle */}
                  <span
                    className={`relative flex items-center justify-center w-7 h-7 rounded-full font-mono text-[10px] font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-ink text-bg scale-110 shadow-sm'
                        : isPassed
                        ? 'bg-surface border border-border-strong text-ink'
                        : 'bg-bg border border-border text-ink-muted group-hover:border-border-strong'
                    }`}
                  >
                    {item.step}
                  </span>

                  {/* Node Label */}
                  <span
                    className={`font-sans text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-300 ${
                      isActive
                        ? 'text-ink'
                        : 'text-ink-muted group-hover:text-ink-soft'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── UNIFIED ARCHITECTURAL STAGE (Morphs smoothly across the 4 fundamentals) ── */}
      <div className="relative border-y border-border py-6 px-1 sm:px-2 overflow-hidden">
        {/* Subtle bottom cycle progress line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent overflow-hidden"
        >
          <motion.div
            key={`cycle-${currentStage.id}-${isPaused ? 'paused' : 'live'}`}
            initial={{ width: isPaused ? '100%' : '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: isPaused ? 0.2 : STAGE_DURATION_MS / 1000,
              ease: 'linear',
            }}
            className="h-full bg-ink/60"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            {/* Left Editorial Breakdown */}
            <div className="md:col-span-7 flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-semibold text-ink-muted">
                  {currentStage.step}
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-ink tracking-tight m-0">
                  {currentStage.title}
                </h3>
                <span className="font-sans text-xs text-ink-muted">
                  {currentStage.subtitle}
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed m-0 max-w-xl">
                {currentStage.description}
              </p>

            </div>

            {/* Right Animated Vector Schematic */}
            <div className="md:col-span-5 flex items-center justify-center">
              <ArchitecturalCanvas stageId={currentStage.id} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
