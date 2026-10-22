import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBento from '../bento/HeroBento';
import AboutBento from '../bento/AboutBento';
import ProjectsBento, { AllProjectsScreen } from '../bento/ProjectsBento';
import CapabilitiesBento from '../bento/CapabilitiesBento';
import WorkflowBento from '../bento/WorkflowBento';
import SkillsBento from '../bento/SkillsBento';
import GitHubBento from '../bento/GitHubBento';
import SocialsBento from '../bento/SocialsBento';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function BentoLayout() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('goza-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  // 'home' | 'projects'
  const [view, setView] = useState('home');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      window.localStorage.setItem('goza-theme', theme);
    } catch {
      /* ignore storage errors */
    }
  }, [theme]);

  // Custom Origin-Aware Circular Iris Reveal Theme Transition
  const handleToggleTheme = (e) => {
    e.stopPropagation();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    const applyTheme = (targetTheme) => {
      if (targetTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      setTheme(targetTheme);
    };

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (
      typeof document === 'undefined' ||
      !document.startViewTransition ||
      prefersReducedMotion
    ) {
      applyTheme(nextTheme);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.classList.add('theme-transitioning');

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyTheme(nextTheme);
      });
    });

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {
        /* ignore view transition cancellation */
      });

    transition.finished.finally(() => {
      root.classList.remove('theme-transitioning');
    });
  };

  const handleSwitchView = (nextView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-bg text-ink">
      {/* ── MINIMALIST TOP PILL (Home, Project, Toggle) ── */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 z-50">
        <nav
          aria-label="Primary navigation"
          className="theme-surface flex items-center gap-1 rounded-full border border-border-strong p-1.5 shadow-md"
        >
          <button
            type="button"
            onClick={() => handleSwitchView('home')}
            className={`relative h-8 px-4 rounded-full font-sans text-xs font-medium transition-colors cursor-pointer border-none ${
              view === 'home'
                ? 'bg-ink text-bg font-semibold'
                : 'bg-transparent text-ink-soft hover:text-ink hover:bg-surface-hover/60'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleSwitchView('projects')}
            className={`relative h-8 px-4 rounded-full font-sans text-xs font-medium transition-colors cursor-pointer border-none ${
              view === 'projects'
                ? 'bg-ink text-bg font-semibold'
                : 'bg-transparent text-ink-soft hover:text-ink hover:bg-surface-hover/60'
            }`}
          >
            Project
          </button>

          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-surface-hover/70 hover:bg-surface-hover text-ink transition-colors cursor-pointer border-none shrink-0"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:py-12">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[350px_minmax(0,1fr)] gap-5 lg:gap-6 items-start"
            >
              {/* Left 30% Column: Resume Sidebar + Icon-Based Links */}
              <div className="lg:sticky lg:top-12 w-full">
                <HeroBento />
              </div>

              {/* Right 70% Column: Short About + Top 3 Recent Projects + What I Build + How I Build + Stack + GitHub Activity + CTA/Contact */}
              <div className="w-full min-w-0 flex flex-col gap-7">
                <AboutBento />
                <ProjectsBento onOpenAllProjects={() => handleSwitchView('projects')} />
                <CapabilitiesBento />
                <WorkflowBento />
                <SkillsBento />
                <GitHubBento />
                <SocialsBento />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="projects-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <AllProjectsScreen onBackHome={() => handleSwitchView('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
