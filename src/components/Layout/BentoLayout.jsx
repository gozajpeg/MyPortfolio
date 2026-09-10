import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SquareScanOverlay from '../UI/SquareScanOverlay';
import HeroBento from '../bento/HeroBento';
import AboutBento from '../bento/AboutBento';
import ProjectsBento from '../bento/ProjectsBento';
import SkillsBento from '../bento/SkillsBento';
import SocialsBento from '../bento/SocialsBento';

const BENTO_META = {
  hero: { id: 'hero', keyNumber: '1', label: 'Home', index: '01', Component: HeroBento },
  about: { id: 'about', keyNumber: '2', label: 'About', index: '02', Component: AboutBento },
  projects: { id: 'projects', keyNumber: '3', label: 'Projects', index: '03', Component: ProjectsBento },
  skills: { id: 'skills', keyNumber: '4', label: 'Skills', index: '04', Component: SkillsBento },
  socials: { id: 'socials', keyNumber: '5', label: 'Connect', index: '05', Component: SocialsBento },
};

const INITIAL_QUEUE = ['hero', 'about', 'projects', 'skills', 'socials'];

function BentoLayout() {
  const [queue, setQueue] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (INITIAL_QUEUE.includes(hash)) {
      const filtered = INITIAL_QUEUE.filter(id => id !== hash);
      return [hash, ...filtered];
    }
    return INITIAL_QUEUE;
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [activeKey, setActiveKey] = useState(() => queue[0]);
  const [prevActiveKey, setPrevActiveKey] = useState(null);
  const [isSectionScanning, setIsSectionScanning] = useState(false);
  const [erasingQueueId, setErasingQueueId] = useState(null);
  const [dormantQueueId, setDormantQueueId] = useState(null);
  const [revealingQueueId, setRevealingQueueId] = useState(null);
  const prevSectionRef = useRef(null);
  const incomingKeycapRef = useRef(null);

  const handleSelect = useCallback((selectedId) => {
    if (isAnimating || selectedId === queue[0]) return;
    setIsAnimating(true);

    const oldActiveId = queue[0];
    setPrevActiveKey(oldActiveId);
    incomingKeycapRef.current = oldActiveId;

    // Build new queue: selected -> front, old active -> back
    const filtered = queue.filter(id => id !== selectedId);
    const oldActive = filtered.shift();
    filtered.push(oldActive);
    const finalQueue = [selectedId, ...filtered];

    // ── 1ST: Snappy click dissolve / erase scan on the clicked bento queue keycap (0ms to 130ms)
    setErasingQueueId(selectedId);
    setRevealingQueueId(null);
    setDormantQueueId(null);

    // Sync URL hash
    window.history.replaceState(null, '', `#${selectedId}`);

    // ── 2ND: Erase ends -> Queue reorganizes with fluid spring, active section loads with forward scan (130ms)
    setTimeout(() => {
      setErasingQueueId(null);
      setDormantQueueId(oldActiveId); // Holds incoming keycap covered
      setRevealingQueueId(null);
      setQueue(finalQueue);
      setActiveKey(selectedId);
      setIsSectionScanning(true);
    }, 130);
  }, [queue, isAnimating]);

  const handleSectionScanComplete = useCallback(() => {
    const incomingId = incomingKeycapRef.current;
    setIsSectionScanning(false);
    setPrevActiveKey(null);
    setDormantQueueId(null);
    setRevealingQueueId(incomingId);

    // ── 3RD: Keycap reveal completes -> Release animation lock (180ms)
    setTimeout(() => {
      setRevealingQueueId(null);
      setIsAnimating(false);
    }, 180);
  }, []);

  // Keyboard navigation (1-5) and browser hash changes
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.matches('input, textarea')) return;
      const keyMap = { '1': 'hero', '2': 'about', '3': 'projects', '4': 'skills', '5': 'socials' };
      if (keyMap[e.key]) {
        e.preventDefault();
        handleSelect(keyMap[e.key]);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (INITIAL_QUEUE.includes(hash) && hash !== queue[0]) {
        handleSelect(hash);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleSelect, queue]);

  const activeId = queue[0];
  const { Component: ActiveComponent } = BENTO_META[activeId];
  const PrevComponent = prevActiveKey && prevActiveKey !== activeId ? BENTO_META[prevActiveKey]?.Component : null;
  const queueIds = queue.slice(1);

  return (
    <div
      className="flex flex-col w-full h-full box-border overflow-hidden bg-bg p-2 bento-container-mobile gap-2 sm:p-2.5 sm:gap-2.5"
    >

      {/* ── ACTIVE BENTO ─────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="keycap keycap-active h-full w-full overflow-hidden relative bg-surface">
          {/* Base Layer: Active (new) section being revealed underneath - isolated to prevent z-index leaks */}
          <div className="w-full h-full relative z-0 isolate">
            <ActiveComponent isActive={true} onNavigate={handleSelect} />
          </div>

            {/* Overlapping Top Layer: Previous section - stays 100% visible ahead of the scanning wave and wipes away in real time */}
            {isSectionScanning && PrevComponent && (
              <div
                ref={prevSectionRef}
                style={{
                  clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%, 0% 50%)',
                  willChange: 'clip-path',
                }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none bg-surface overflow-hidden"
              >
                <PrevComponent isActive={false} onNavigate={handleSelect} />
              </div>
            )}

            {/* 2nd: Fast horizontal scanning squares overlay across sections (transparent background) */}
            <SquareScanOverlay
              active={isSectionScanning}
              direction="horizontal"
              duration={380}
              backgroundFill="transparent"
              className="z-30"
              onProgress={(progress) => {
                if (prevSectionRef.current) {
                  // Synchronized chevron boundary matching SquareScanOverlay's horizontal wave:
                  // The wave has a forward chevron (center is ahead, top & bottom trail behind)
                  const centerOffset = Math.min(100, Math.max(0, progress * 118));
                  const edgeOffset = Math.min(100, Math.max(0, progress * 118 - 10));
                  prevSectionRef.current.style.clipPath = `polygon(${edgeOffset}% 0, 100% 0, 100% 100%, ${edgeOffset}% 100%, ${centerOffset}% 50%)`;
                }
              }}
              onComplete={handleSectionScanComplete}
            />
        </div>
      </div>

      {/* ── QUEUE STRIP ──────────────────────────────────────── */}
      <div className="no-scrollbar flex-none flex gap-1.5 sm:gap-2 overflow-hidden h-[clamp(52px,7.5vh,60px)] sm:h-[clamp(76px,12vh,105px)]">
        {queueIds.map((id) => {
          const { label, index, keyNumber } = BENTO_META[id];
          const isErasing = erasingQueueId === id;
          const isRevealing = revealingQueueId === id;
          const isDormant = dormantQueueId === id;

          return (
            <motion.div
              layout
              key={id}
              transition={{
                layout: { type: 'spring', stiffness: 500, damping: 36, mass: 0.8 },
              }}
              className="flex-1 min-w-0 h-full overflow-hidden relative"
              onClick={() => handleSelect(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(id)}
              aria-label={`Open ${label} tab`}
            >
              {/* 1st: Snappy down-to-up erase scan overlay on clicked keycap (130ms) */}
              <SquareScanOverlay
                active={isErasing}
                direction="vertical-up"
                duration={130}
                backgroundFill="#090909"
                className="z-20"
              />

              {/* 2nd: Dormant solid cover while queue moves and active section loads */}
              {isDormant && (
                <div className="absolute inset-0 bg-[#090909] z-20 rounded-[inherit] pointer-events-none" />
              )}

              {/* 3rd: Snappy top-to-down reveal scan overlay on newly placed keycap (180ms) */}
              <SquareScanOverlay
                active={isRevealing}
                direction="vertical"
                duration={180}
                backgroundFill="#090909"
                className="z-20"
              />

              {/* The keycap box itself with Framer Motion tactile micro-interactions */}
              <motion.div
                whileHover={!isErasing && !isRevealing && !isDormant ? { scale: 1.015, y: -1 } : undefined}
                whileTap={!isErasing && !isRevealing && !isDormant ? { scale: 0.985, y: 1 } : undefined}
                transition={{ duration: 0.1 }}
                className="keycap keycap-queue h-full w-full flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-1 py-1 sm:px-3 sm:py-2 select-none relative group overflow-hidden z-10"
              >
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-sans text-[9px] sm:text-[10px] font-medium text-ink-muted/80">
                    {index}
                  </span>
                  <span className="font-sans text-[8.5px] text-ink-muted/40 hidden sm:inline">
                    {keyNumber}
                  </span>
                </div>

                <span className="font-display font-bold text-[clamp(9.5px,2.6vw,12.5px)] sm:text-[clamp(11px,1.15vw,14px)] text-ink-soft group-hover:text-ink tracking-tight text-center leading-tight transition-colors duration-150 truncate max-w-full">
                  {label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default BentoLayout;