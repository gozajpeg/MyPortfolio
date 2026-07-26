import { useState, useRef, useCallback } from 'react';
import HeroBento from '../bento/HeroBento';
import AboutBento from '../bento/AboutBento';
import ProjectsBento from '../bento/ProjectsBento';
import SkillsBento from '../bento/SkillsBento';
import SocialsBento from '../bento/SocialsBento';

const BENTO_META = {
  hero: { id: 'hero', label: 'Home', index: '01', Component: HeroBento },
  about: { id: 'about', label: 'About', index: '02', Component: AboutBento },
  projects: { id: 'projects', label: 'Projects', index: '03', Component: ProjectsBento },
  skills: { id: 'skills', label: 'Skills', index: '04', Component: SkillsBento },
  socials: { id: 'socials', label: 'Connect', index: '05', Component: SocialsBento },
};

const INITIAL_QUEUE = ['hero', 'about', 'projects', 'skills', 'socials'];

function BentoLayout() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeKey, setActiveKey] = useState('hero');

  const queueItemRefs = useRef({});

  const handleSelect = useCallback((selectedId) => {
    if (isAnimating || selectedId === queue[0]) return;
    setIsAnimating(true);

    // FLIP step 1: snapshot current rects of all queue items
    const snapshots = {};
    queue.slice(1).forEach((id) => {
      const el = queueItemRefs.current[id];
      if (el) snapshots[id] = el.getBoundingClientRect();
    });

    // Build new queue: selected -> front, old active -> back
    const filtered = queue.filter(id => id !== selectedId);
    const oldActive = filtered.shift();
    filtered.push(oldActive);
    const finalQueue = [selectedId, ...filtered];

    setQueue(finalQueue);
    setActiveKey(selectedId);

    // FLIP step 2+3: after DOM settles, apply inverse then release
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        finalQueue.slice(1).forEach((id) => {
          const el = queueItemRefs.current[id];
          if (!el || !snapshots[id]) return;
          const lastRect = el.getBoundingClientRect();
          const firstRect = snapshots[id];
          const dx = firstRect.left - lastRect.left;
          const dy = firstRect.top - lastRect.top;
          el.style.transition = 'none';
          el.style.transform = `translate(${dx}px, ${dy}px)`;
          el.style.transformOrigin = 'top left';
          requestAnimationFrame(() => {
            el.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
            el.style.transform = '';
          });
        });

        setTimeout(() => {
          setIsAnimating(false);
          finalQueue.slice(1).forEach((id) => {
            const el = queueItemRefs.current[id];
            if (el) {
              el.style.transition = '';
              el.style.transform = '';
              el.style.transformOrigin = '';
            }
          });
        }, 600);
      });
    });
  }, [queue, isAnimating]);

  const activeId = queue[0];
  const { Component: ActiveComponent } = BENTO_META[activeId];
  const queueIds = queue.slice(1);

  return (
    <div className="flex flex-col w-full h-dvh box-border overflow-visible bg-bg p-2 gap-1.5 sm:p-2.5 sm:gap-2">

      {/* ── ACTIVE BENTO ─────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="keycap keycap-active h-full w-full overflow-hidden flex flex-col">
          {/* Thin top strip: section indicator */}
          <div className="shrink-0 flex items-center justify-between border-b border-white/5 px-[18px] pt-2 pb-[7px]">
            <div className="flex items-center gap-1.5">
              {INITIAL_QUEUE.map((id) => (
                <span
                  key={id}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${id === activeId ? 'bg-ink' : 'bg-white/10'
                    }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] font-semibold text-ink-muted uppercase tracking-[0.14em]">
              {BENTO_META[activeId].index} / {INITIAL_QUEUE.length}
            </span>
          </div>

          {/* Content area -- no scroll, content must fit */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ActiveComponent key={activeKey} isActive />
          </div>
        </div>
      </div>

      {/* ── QUEUE STRIP ──────────────────────────────────────── */}
      <div className="no-scrollbar flex-none flex gap-1.5 sm:gap-2 overflow-hidden h-[clamp(66px,10vh,88px)] sm:h-[clamp(80px,12.5vh,115px)]">
        {queueIds.map((id) => {
          const { label, index } = BENTO_META[id];
          return (
            <div
              key={id}
              className="flex-1 min-w-0 h-full overflow-hidden"
              ref={(el) => { queueItemRefs.current[id] = el; }}
              onClick={() => handleSelect(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(id)}
              aria-label={`Open ${label}`}
            >
              <div className="keycap keycap-queue h-full w-full flex flex-col items-center justify-center gap-1.5 px-3 py-2.5 select-none relative">
                {/* Queue position */}
                <span className="animate-label-fade font-mono text-[9px] font-semibold text-white/[0.18] tracking-[0.14em] leading-none">
                  {index}
                </span>

                {/* Section label */}
                <span className="animate-label-fade font-display font-bold text-[clamp(11px,1.1vw,14px)] text-ink tracking-[-0.01em] text-center leading-none">
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BentoLayout;