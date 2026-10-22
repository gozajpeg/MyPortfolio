import { motion } from 'framer-motion';

const CAPABILITIES = [
  {
    id: 'saas',
    title: 'SaaS Websites',
    subtitle: 'Multi-tenant platforms & dashboards',
    description:
      'Subscription-ready platforms with clean onboarding, role-based access, and high-converting interfaces.',
  },
  {
    id: 'cli',
    title: 'CLI Tools',
    subtitle: 'Developer tooling & npm packages',
    description:
      'Zero-bloat command-line utilities for AST analysis, package auditing, and Git workflow automation.',
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    subtitle: 'Cross-platform iOS & Android',
    description:
      'Responsive React Native applications built for smooth 60fps gestures, offline resilience, and native feel.',
  },
  {
    id: 'webapp',
    title: 'Web Applications',
    subtitle: 'Full-stack systems & APIs',
    description:
      'End-to-end web apps powered by Fastify or Express, PostgreSQL, Redis, and secure authentication.',
  },
];

/* ── CONTINUOUS LOOPED WIREFRAME ANIMATIONS FOR EACH DOMAIN ── */
function DomainLoopGraphic({ id }) {
  if (id === 'saas') {
    return (
      <svg
        viewBox="0 0 220 84"
        className="w-full h-20 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Minimalist Browser Frame */}
        <rect
          x="4"
          y="6"
          width="212"
          height="72"
          rx="8"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1.25"
        />
        <line
          x1="4"
          y1="20"
          x2="216"
          y2="20"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        {/* Window dots */}
        <circle cx="14" cy="13" r="1.8" fill="currentColor" fillOpacity="0.4" />
        <circle cx="21" cy="13" r="1.8" fill="currentColor" fillOpacity="0.4" />
        <circle cx="28" cy="13" r="1.8" fill="currentColor" fillOpacity="0.4" />

        {/* Sidebar skeleton */}
        <line
          x1="46"
          y1="20"
          x2="46"
          y2="78"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <rect x="12" y="28" width="24" height="3" rx="1.5" fill="currentColor" fillOpacity="0.35" />
        <rect x="12" y="37" width="18" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="12" y="46" width="21" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />

        {/* Looped Analytics Curve */}
        <motion.path
          d="M 58 64 C 82 62, 92 42, 118 46 C 144 50, 156 30, 182 32 C 194 33, 200 26, 204 26"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0.3, 1, 1, 0.3],
          }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated Metric Pillars */}
        {[
          { x: 64, h: 16, d: 0 },
          { x: 96, h: 26, d: 0.2 },
          { x: 128, h: 20, d: 0.4 },
          { x: 160, h: 32, d: 0.6 },
          { x: 192, h: 38, d: 0.8 },
        ].map((bar, i) => (
          <motion.circle
            key={i}
            cx={bar.x}
            cy={70 - bar.h}
            r="2.5"
            fill="var(--color-surface)"
            stroke="currentColor"
            strokeWidth="1.4"
            animate={{
              scale: [0.8, 1.25, 0.8],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 2.4,
              delay: bar.d,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    );
  }

  if (id === 'cli') {
    return (
      <svg
        viewBox="0 0 220 84"
        className="w-full h-20 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Minimalist Terminal Window */}
        <rect
          x="4"
          y="6"
          width="212"
          height="72"
          rx="8"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1.25"
        />

        {/* Prompt Symbol `$` */}
        <text
          x="16"
          y="30"
          fill="currentColor"
          opacity="0.7"
          className="font-mono text-[10px] font-bold"
        >
          $
        </text>

        {/* Looped Typed Command Bar */}
        <motion.rect
          x="28"
          y="23"
          height="4"
          rx="2"
          fill="currentColor"
          animate={{
            width: [0, 88, 88, 0],
            opacity: [0.4, 0.95, 0.95, 0.2],
          }}
          transition={{
            duration: 4.0,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Execution Output Stream */}
        <motion.rect
          x="16"
          y="40"
          height="3.5"
          rx="1.75"
          fill="currentColor"
          animate={{
            width: [0, 140, 140, 0],
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: 4.0,
            delay: 0.45,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Progress Scan Bar */}
        <rect
          x="16"
          y="55"
          width="156"
          height="4"
          rx="2"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <motion.rect
          x="16"
          y="55"
          height="4"
          rx="2"
          fill="currentColor"
          animate={{
            width: [0, 156, 156, 0],
          }}
          transition={{
            duration: 4.0,
            delay: 0.7,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Verified Check Badge */}
        <motion.circle
          cx="192"
          cy="57"
          r="7"
          stroke="currentColor"
          strokeWidth="1.4"
          animate={{
            scale: [0.7, 1.05, 1, 0.7],
            opacity: [0.2, 1, 1, 0.2],
          }}
          transition={{
            duration: 4.0,
            delay: 1.1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.path
          d="M 189 57 L 191 59 L 195.5 54.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4.0,
            delay: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    );
  }

  if (id === 'mobile') {
    return (
      <svg
        viewBox="0 0 220 84"
        className="w-full h-20 text-ink overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Minimalist Mobile Frame (Centered Horizontal Showcase) */}
        <rect
          x="74"
          y="4"
          width="72"
          height="76"
          rx="11"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1.4"
        />
        {/* Dynamic Island / Notch */}
        <rect
          x="101"
          y="9"
          width="18"
          height="3"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.45"
        />

        {/* Animated Floating UI Cards Inside Mobile Viewport */}
        <motion.rect
          x="84"
          y="20"
          width="52"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.25"
          animate={{
            y: [22, 18, 22],
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.rect
          x="84"
          y="44"
          width="52"
          height="14"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.2"
          animate={{
            y: [46, 42, 46],
            opacity: [0.3, 0.75, 0.3],
          }}
          transition={{
            duration: 3.2,
            delay: 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Touch Gesture Pulse Ring */}
        <motion.circle
          cx="110"
          cy="66"
          r="5"
          stroke="currentColor"
          strokeWidth="1.2"
          animate={{
            r: [3, 9],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <circle cx="110" cy="66" r="2.2" fill="currentColor" />

        {/* Ambient Side Motion Guides */}
        <motion.line
          x1="46"
          y1="28"
          x2="62"
          y2="28"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ opacity: [0.15, 0.55, 0.15], x1: [42, 48, 42] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.line
          x1="158"
          y1="52"
          x2="174"
          y2="52"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ opacity: [0.15, 0.55, 0.15], x2: [178, 172, 178] }}
          transition={{ duration: 3.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    );
  }

  // 'webapp' — Full-Stack Client <-> API <-> DB Loop
  return (
    <svg
      viewBox="0 0 220 84"
      className="w-full h-20 text-ink overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      {/* Left Node: Reactive Client UI */}
      <rect
        x="10"
        y="20"
        width="54"
        height="44"
        rx="7"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.35"
      />
      <rect x="18" y="29" width="24" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.65" />
      <rect x="18" y="37" width="36" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="18" y="45" width="28" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />

      {/* Center Node: API / Auth Gateway */}
      <motion.circle
        cx="114"
        cy="42"
        r="14"
        fill="var(--color-surface)"
        stroke="currentColor"
        strokeWidth="1.4"
        animate={{
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <text
        x="114"
        y="45"
        textAnchor="middle"
        fill="currentColor"
        className="font-mono text-[7px] font-semibold"
      >
        API
      </text>

      {/* Right Node: Database Cluster */}
      <rect
        x="160"
        y="20"
        width="50"
        height="44"
        rx="7"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.35"
      />
      <line x1="170" y1="32" x2="200" y2="32" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="170" y1="42" x2="200" y2="42" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="170" y1="52" x2="200" y2="52" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />

      {/* Bidirectional Data Bus Lines */}
      <line x1="64" y1="42" x2="100" y2="42" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.4" />
      <line x1="128" y1="42" x2="160" y2="42" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.4" />

      {/* Traveling Request/Response Data Packets */}
      <motion.circle
        cy="42"
        r="2.8"
        fill="currentColor"
        animate={{
          cx: [66, 98, 66],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.circle
        cy="42"
        r="2.8"
        fill="currentColor"
        animate={{
          cx: [130, 158, 130],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2.6,
          delay: 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

export default function CapabilitiesBento() {
  return (
    <section
      id="capabilities"
      aria-label="What I Build"
      className="flex flex-col gap-3.5"
    >
      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
          What I Build
        </h2>
        <span className="font-sans text-xs text-ink-muted">
          Core Focus
        </span>
      </div>

      <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {CAPABILITIES.map((item) => (
          <li
            key={item.id}
            className="theme-surface rounded-2xl border border-border hover:border-border-strong p-5 flex flex-col justify-between gap-4 transition-colors duration-300"
          >
            {/* Continuous Looped Vector Wireframe */}
            <div className="w-full py-1 border-b border-border/60 pb-3">
              <DomainLoopGraphic id={item.id} />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-sans text-base font-bold text-ink tracking-tight m-0">
                  {item.title}
                </h3>
                <span className="font-sans text-[11px] font-medium text-ink-muted shrink-0">
                  {item.subtitle}
                </span>
              </div>
              <p className="font-sans text-xs text-ink-soft leading-relaxed mt-1 m-0">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

