import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';
import OptionWheel from '../UI/OptionWheel';
import PixelPortrait from '../UI/PixelPortrait';
import stiwnuLogo from '../../assets/logo/stiwnu.jpg';

const ABOUT_CATEGORIES = [
  {
    id: 'who-i-am',
    label: 'Who I Am',
    title: 'Builder, Engineer & Explorer',
    tagline: 'STI West Negros University 2026 • Bacolod City, Philippines',
    bio: [
      'I’m Rommel Angelo Goza—a software developer from Bacolod City, Philippines, graduating from STI West Negros University (Class of 2026).',
      'I build web systems from the ground up: crafting responsive frontend experiences, designing relational database schemas, and writing RESTful backend APIs. Outside code, I recharge through street photography, custom keyboard modding, and gaming.',
    ],
    education: {
      school: 'STI West Negros University',
      year: 'Class of 2026',
      city: 'Bacolod City, Philippines',
      degree: 'B.S. in Information Technology',
      note: 'Academic foundation in software architecture, relational databases, data structures, and capstone project delivery.',
    },
    hobbies: [
      { name: 'PC Gaming', detail: 'Exploring strategic mechanics, tactical systems, and interactive game design.' },
      { name: 'Music Curation', detail: 'Curating focus-driven ambient, synthwave, and lo-fi instrumental playlists.' },
    ],
  },
  {
    id: 'my-journey',
    label: 'My Journey',
    title: 'Backend to Full-Stack & AI',
    tagline: 'Self-directed evolution from server logic to capstone frontend and AI tooling.',
    bio: [
      'My journey began behind the scenes as a backend developer—structuring relational databases, designing REST APIs with Fastify and Node.js, and handling secure auth.',
      'To turn my capstone project into a complete, production-grade application, I learned modern frontend architecture with React and Vite. Today, I am actively adapting to the world of AI, integrating intelligent agents and LLM workflows into everyday development.',
    ],
    milestones: [
      {
        phase: 'Stage 01',
        title: 'Backend Foundations',
        detail: 'Started in server-side engineering: Node.js, Fastify, PostgreSQL, and MySQL. Learned schema normalization, indexing, and REST API conventions.',
      },
      {
        phase: 'Stage 02',
        title: 'Frontend for Capstone',
        detail: 'Expanded to full-stack to build and deploy the capstone project. Mastered React, Vite, Tailwind CSS, component state, and responsive layouts.',
      },
      {
        phase: 'Stage 03',
        title: 'Adapting to AI',
        detail: 'Actively integrating AI-assisted developer tools, LLM APIs, and autonomous QA testing agents (like Cerium) into modern engineering flows.',
      },
    ],
  },
  {
    id: 'my-core-values',
    label: 'My Core Values',
    title: 'Quality, Security & Delivery',
    tagline: 'Build quality systems. Protect what must be protected. Always deliver.',
    bio: [
      'I believe software engineering is grounded in discipline. My work is guided by three principles: build quality systems, protect what must be protected, and always deliver.',
      'No fragile shortcuts or hollow buzzwords—just clean code that lasts, vigilant data protection, and the dedication to ship working software on time.',
    ],
    values: [
      {
        pillar: 'Pillar 01',
        title: 'Build Quality Systems',
        detail: 'Write maintainable, modular, and predictable code. Rejecting brittle hacks in favor of clean architecture, thoughtful state management, and automated testing.',
      },
      {
        pillar: 'Pillar 02',
        title: 'Protect What’s To Protect',
        detail: 'Security and privacy are core prerequisites. Applying Argon2 password hashing, secure JWT / OAuth2 sessions, and tamper-resistant audit logs by default.',
      },
      {
        pillar: 'Pillar 03',
        title: 'Deliver With Reliability',
        detail: 'Taking end-to-end responsibility from initial requirements to production deployment. Communicating clearly, solving real problems, and shipping dependable results.',
      },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    title: 'Work & Client Engagements',
    tagline: 'Video Annotator at Remotasks • Open for client projects & freelance contracts.',
    bio: [
      'Currently working as a Video Annotator at Remotasks (August 2026 – Present), delivering high-precision computer vision annotation for machine learning pipelines.',
      'I am actively open for clients and freelance engineering contracts—available to design, build, and deploy full-stack web applications with speed and craft.',
    ],
    roles: [
      {
        role: 'Video Annotator',
        company: 'Remotasks',
        period: 'August 2026 – Present',
        badge: 'Active Role',
        detail: 'Executing frame-level temporal annotation, object tracking, and quality validation for computer vision training datasets under strict accuracy benchmarks.',
      },
      {
        role: 'Full-Stack Developer',
        company: 'Open for Clients & Contracts',
        period: 'Available Now',
        badge: 'Open for Work',
        detail: 'Partnering with clients to build responsive React web applications, custom UI components, Fastify REST APIs, and relational database systems.',
      },
    ],
  },
];

const WHEEL_ITEMS = ABOUT_CATEGORIES.map((cat) => cat.label);

/* ── DYNAMIC CENTER CONTENT RENDERER ───────────────────────── */
function CategoryContent({ category, onNavigate }) {
  if (category.id === 'who-i-am') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
        {/* Education Card with interactive PixelPortrait */}
        <div className="flex flex-col gap-2.5">
          <h3 className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider m-0">
            Education & Alma Mater
          </h3>
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-[#161616] shadow-sm">
              <PixelPortrait
                src={stiwnuLogo}
                alt="STI West Negros University Logo"
                cols={24}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span className="font-sans text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                {category.education.year}
              </span>
              <h4 className="font-sans text-xs sm:text-sm font-bold text-ink m-0 tracking-tight leading-snug">
                {category.education.school}
              </h4>
              <p className="font-sans text-[11px] text-ink-muted m-0">
                {category.education.city}
              </p>
              <span className="font-sans text-[11px] font-semibold text-ink-soft mt-1">
                {category.education.degree}
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed m-0 px-0.5">
            {category.education.note}
          </p>
        </div>

        {/* Hobbies & Interests */}
        <div className="flex flex-col gap-2.5">
          <h3 className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider m-0">
            Hobbies & Interests
          </h3>
          <div className="flex flex-col gap-2">
            {category.hobbies.map((hobby) => (
              <div key={hobby.name} className="flex flex-col gap-0.5">
                <span className="font-sans text-xs sm:text-sm font-semibold text-ink">
                  {hobby.name}
                </span>
                <span className="font-sans text-xs text-ink-muted leading-relaxed">
                  {hobby.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (category.id === 'my-journey') {
    return (
      <div className="flex flex-col gap-2.5 pt-2">
        <h3 className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider m-0">
          Engineering Evolution
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-3.5">
          {category.milestones.map((step) => (
            <div key={step.title} className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  {step.phase}
                </span>
                <span className="text-white/20 text-[6px]">•</span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-ink">
                  {step.title}
                </span>
              </div>
              <p className="font-sans text-xs text-ink-muted leading-relaxed m-0">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category.id === 'my-core-values') {
    return (
      <div className="flex flex-col gap-2.5 pt-2">
        <h3 className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider m-0">
          Guiding Principles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-3.5">
          {category.values.map((val) => (
            <div key={val.title} className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="font-sans text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                {val.pillar}
              </span>
              <h4 className="font-sans text-xs sm:text-sm font-semibold text-ink m-0">
                {val.title}
              </h4>
              <p className="font-sans text-xs text-ink-muted leading-relaxed m-0">
                {val.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category.id === 'experience') {
    return (
      <div className="flex flex-col gap-2.5 pt-2">
        <h3 className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider m-0">
          Work Experience & Client Availability
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {category.roles.map((item) => (
            <div key={item.role} className="flex flex-col justify-between gap-2 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-xs sm:text-sm font-bold text-ink">
                    {item.role}
                  </span>
                  <span className="font-sans text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
                <span className="font-sans text-xs font-medium text-ink-soft">
                  {item.company}
                </span>
                <p className="font-sans text-xs text-ink-muted leading-relaxed m-0 pt-1">
                  {item.detail}
                </p>
              </div>

              {item.company.includes('Open for Clients') && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate?.('socials');
                      window.dispatchEvent(new CustomEvent('open-quick-message'));
                    }}
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-ink bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
                  >
                    <span>Direct Message</span>
                    <span>↗</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/* ── DESKTOP: Seamless Open Spread (No Lines, No Box Containers) ───────── */
function AboutDesktop({ onNavigate }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeCat = ABOUT_CATEGORIES[selectedIndex] || ABOUT_CATEGORIES[0];

  return (
    <div className="h-full w-full overflow-hidden flex flex-row items-stretch p-6 sm:p-8 lg:p-10 gap-8 lg:gap-12 xl:gap-14">
      {/* LEFT COLUMN: About Narrative Description on Top + OptionWheel at Bottom Left */}
      <div className="w-[320px] lg:w-[360px] xl:w-[410px] shrink-0 h-full flex flex-col justify-between overflow-hidden">
        {/* Narrative Description on Top */}
        <div className="flex-1 min-h-0 flex flex-col justify-start pb-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="flex flex-col gap-3"
            >
              <span className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider">
                About Me
              </span>
              <p className="font-sans text-base sm:text-lg lg:text-xl font-medium text-ink leading-snug m-0">
                {activeCat.bio[0]}
              </p>
              {activeCat.bio[1] && (
                <p className="font-sans text-sm sm:text-base font-normal text-ink-soft leading-relaxed m-0">
                  {activeCat.bio[1]}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM-LEFT: 3D Category OptionWheel (Fixed Center, Level & Balanced) */}
        <div className="w-full h-[155px] lg:h-[165px] shrink-0 relative overflow-hidden">
          <OptionWheel
            items={WHEEL_ITEMS}
            defaultSelected={selectedIndex}
            onChange={(idx) => setSelectedIndex(idx)}
            side="left"
            fontSize={1.22}
            spacing={1.36}
            curve={0.95}
            tilt={6}
            baseRotation={0}
            centerOffset={50}
            blur={1.4}
            fade={0.28}
            minOpacity={0.08}
            smoothing={180}
            inset={12}
            loop={true}
            draggable={true}
            activeColor="#EDEAE3"
            textColor="#555555"
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Headings on Top, Dynamic Center Content */}
      <div className="flex-1 min-w-0 h-full flex flex-col justify-between overflow-hidden">
        {/* Top: Breadcrumbs meta */}
        <div className="flex items-center justify-between pb-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs font-semibold text-ink-muted">
              Overview & Focus
            </span>
            <span className="text-ink-muted/40">•</span>
            <span className="font-sans text-xs text-ink-muted/70">
              Rommel Angelo Goza
            </span>
          </div>
          <span className="font-sans text-xs font-medium text-ink-muted/50">
            0{selectedIndex + 1} of 0{ABOUT_CATEGORIES.length}
          </span>
        </div>

        {/* Main Category Content */}
        <div className="flex-1 min-h-0 flex flex-col justify-between py-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="flex flex-col justify-between h-full"
            >
              {/* Category Headings on Right */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <span className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  {activeCat.label}
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-ink tracking-tight uppercase m-0 leading-[0.96]">
                  {activeCat.title}
                </h2>
                <p className="font-sans text-sm sm:text-base font-normal text-ink-soft leading-relaxed m-0">
                  {activeCat.tagline}
                </p>
              </div>

              {/* Dynamic Center Area */}
              <CategoryContent category={activeCat} onNavigate={onNavigate} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── MOBILE: Top OptionWheel + Clean Story Flow ───────────────── */
function AboutMobile({ onNavigate }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeCat = ABOUT_CATEGORIES[selectedIndex] || ABOUT_CATEGORIES[0];

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar flex flex-col p-4 sm:p-5 gap-3.5 pb-8">
      {/* Top Area: OptionWheel with no container separating it */}
      <div className="flex flex-col shrink-0">
        <div className="flex items-center justify-between pb-1">
          <span className="font-sans text-xs font-semibold text-ink-muted">
            About Me
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-sans text-xs font-semibold text-ink-muted hover:text-ink cursor-pointer bg-transparent border-none p-1 transition-colors"
          >
            {isExpanded ? 'Shrink' : 'Expand'}
          </button>
        </div>

        <motion.div
          animate={{ height: isExpanded ? 220 : 110 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="w-full relative overflow-hidden"
        >
          <OptionWheel
            items={WHEEL_ITEMS}
            defaultSelected={selectedIndex}
            onChange={(idx) => setSelectedIndex(idx)}
            side="left"
            fontSize={1.12}
            spacing={1.32}
            curve={0.9}
            tilt={6}
            blur={1.2}
            fade={0.25}
            minOpacity={0.08}
            smoothing={160}
            inset={8}
            loop={true}
            draggable={true}
            activeColor="#EDEAE3"
            textColor="#555555"
          />
        </motion.div>
      </div>

      {/* Bottom Area: Personal Story Flow */}
      <div className="flex-1 min-h-0 flex flex-col gap-3 pt-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="flex flex-col gap-3.5"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider">
                {activeCat.label}
              </span>

              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight uppercase m-0 leading-tight">
                {activeCat.title}
              </h2>

              <p className="font-sans text-xs sm:text-sm font-normal text-ink-soft leading-relaxed m-0">
                {activeCat.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-sans text-sm sm:text-base font-medium text-ink leading-relaxed m-0">
                {activeCat.bio[0]}
              </p>
              {activeCat.bio[1] && (
                <p className="font-sans text-xs sm:text-sm font-normal text-ink-soft leading-relaxed m-0">
                  {activeCat.bio[1]}
                </p>
              )}
            </div>

            {/* Category Dynamic Content on Mobile */}
            <CategoryContent category={activeCat} onNavigate={onNavigate} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AboutBento({ onNavigate }) {
  const isMobile = useIsMobile();
  return isMobile ? <AboutMobile onNavigate={onNavigate} /> : <AboutDesktop onNavigate={onNavigate} />;
}