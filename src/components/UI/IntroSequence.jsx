import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SquareScanOverlay from './SquareScanOverlay';
import FaultyTerminal from './FaultyTerminal';

const SCAN_DURATION = 380; // Exact same duration as section scanned transitions

function BigSquaredNumber({ value }) {
  return (
    <div className="flex items-baseline justify-end mix-blend-difference select-none pointer-events-none">
      <span
        className="font-square font-black text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] text-white tracking-tighter tabular-nums leading-none select-none"
        style={{ fontFamily: '"Orbitron", ui-monospace, monospace, sans-serif' }}
      >
        {value}
      </span>
    </div>
  );
}

export default function IntroSequence({ onComplete }) {
  const [hasSeen] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      // Only skip if explicitly navigating directly to a deep section
      if (['about', 'projects', 'skills', 'socials'].includes(hash)) {
        return true;
      }
    }
    return false;
  });

  // Phases: 'loading' (5s square count) -> 'heading' (FaultyTerminal + button) -> 'scanning' (380ms wipe) -> 'complete'
  const [phase, setPhase] = useState(hasSeen ? 'complete' : 'loading');
  const [displayNumber, setDisplayNumber] = useState(1);
  const canvasRef = useRef(null);
  const headingRef = useRef(null);

  const finishIntro = useCallback(() => {
    setPhase('complete');
    onComplete?.();
  }, [onComplete]);

  const handleTransitionToHero = useCallback(() => {
    if (phase === 'scanning' || phase === 'complete') return;
    setPhase('scanning');
  }, [phase]);

  // Keyboard navigation: Enter / Space triggers transition during heading; Escape finishes intro
  useEffect(() => {
    if (hasSeen || phase === 'complete') return;

    const handleKeyDown = (e) => {
      if (phase === 'heading' && ['Space', 'Enter'].includes(e.code)) {
        e.preventDefault();
        handleTransitionToHero();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        finishIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasSeen, phase, handleTransitionToHero, finishIntro]);

  // Phase 1: Full-Screen Seamless Squares Loading (5.0s, NO GAPS, NO BORDERS)
  // Contiguous edge-to-edge squares sweep from top-left (0, 0) to bottom-right into black
  useEffect(() => {
    if (hasSeen || phase !== 'loading') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    // Contiguous edge-to-edge squares with gap = 0 (no borders, no lines)
    const squareSize = 36;
    const cols = Math.ceil(width / squareSize);
    const rows = Math.ceil(height / squareSize);
    const maxDiag = (cols - 1) + (rows - 1);

    const duration = 5000; // Exactly 5 seconds
    let startTime = null;
    let rafId;
    let delayTimeout = null;

    const render = (now) => {
      if (!startTime) startTime = now;
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(1, elapsed / duration);

      // Update real-time number (1 to 100) only when changed to avoid React render thrash
      const currentPercent = Math.min(100, Math.max(1, Math.floor(progress * 100)));
      setDisplayNumber((prev) => (prev !== currentPercent ? currentPercent : prev));

      // Diagonal wave front from top-left to bottom-right
      const totalProgress = maxDiag + 2.5;
      const wave = progress * totalProgress;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      const wavePath = new Path2D();
      const blackPath = new Path2D();

      for (let r = 0; r < rows; r++) {
        const y = r * squareSize;
        for (let c = 0; c < cols; c++) {
          const x = c * squareSize;
          const diag = c + r;
          const dist = wave - diag;

          if (dist >= 1.2) {
            blackPath.rect(x, y, squareSize + 0.5, squareSize + 0.5);
          } else if (dist >= 0) {
            wavePath.rect(x, y, squareSize + 0.5, squareSize + 0.5);
          }
        }
      }

      ctx.fillStyle = '#000000';
      ctx.fill(blackPath);
      ctx.fillStyle = '#EDEAE3';
      ctx.fill(wavePath);

      if (progress < 1) {
        rafId = requestAnimationFrame(render);
      } else {
        // Explicitly hit 100 and clear the canvas to black
        setDisplayNumber(100);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Delay 1 second at 100 before transitioning to intro heading
        delayTimeout = setTimeout(() => {
          setPhase('heading');
        }, 1000);
      }
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
    };
  }, [hasSeen, phase]);

  if (hasSeen || phase === 'complete') return null;

  return (
    <div
      className={`fixed inset-0 z-[9990] select-none overflow-hidden ${
        phase === 'scanning' ? 'bg-transparent pointer-events-none' : 'bg-[#090909]'
      }`}
      role="region"
      aria-label="Introduction sequence"
    >
      {/* Phase 1: Full-screen Canvas loading (5s, seamless borderless squares) */}
      {phase === 'loading' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
      )}

      {/* Big squared number at bottom-right: made of squares, zero jitter, inverts in real time */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="big-squared-number"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute bottom-6 right-8 sm:bottom-10 sm:right-12 md:bottom-12 md:right-16 pointer-events-none select-none z-20"
          >
            <BigSquaredNumber value={displayNumber} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Heading Display with FaultyTerminal WebGL backdrop and tactile button to transition to hero */}
      {(phase === 'heading' || phase === 'scanning') && (
        <div
          ref={headingRef}
          style={{
            clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
            willChange: 'clip-path',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#090909] overflow-hidden"
        >
          {/* FaultyTerminal WebGL Shader Canvas Backdrop */}
          <div className="absolute inset-0 z-0 pointer-events-auto opacity-80">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.4}
              pause={phase === 'scanning'}
              scanlineIntensity={0.5}
              glitchAmount={0.7}
              flickerAmount={0.5}
              noiseAmp={0.8}
              chromaticAberration={1.0}
              dither={0}
              curvature={0.12}
              tint="#EDEAE3"
              mouseReact={true}
              mouseStrength={0.35}
              pageLoadAnimation={false}
              brightness={0.8}
            />
          </div>

          {/* Radial Vignette Overlay for Crisp Typography Contrast */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 72% 68% at 50% 50%, rgba(9, 9, 9, 0.72) 0%, rgba(9, 9, 9, 0.94) 82%, #090909 100%)',
            }}
          />

          {/* Center Heading Typography & Tactile Button */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-4 max-w-xl px-4 select-none"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-ink uppercase m-0 leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]"
            >
              Build Systems that last
            </motion.h1>

            {/* Author Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs sm:text-sm font-semibold text-ink-muted uppercase tracking-[0.25em] m-0"
            >
              Rommel Angelo Goza
            </motion.p>

            {/* Tactile Keycap Transition Button to Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[46px] min-w-[190px] shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                <button
                  type="button"
                  onClick={handleTransitionToHero}
                  className="absolute inset-0 flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[4px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] uppercase tracking-wider cursor-pointer no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
                >
                  <span>Explore</span>
                  <span className="text-[12px]">↗</span>
                  <span className="text-[9.5px] text-bg/60 font-normal ml-0.5">[↵]</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Phase 3: Signature Scanned Squares Transition (380ms) */}
      {phase === 'scanning' && (
        <SquareScanOverlay
          active={true}
          direction="horizontal"
          duration={SCAN_DURATION}
          backgroundFill="transparent"
          onProgress={(progress) => {
            if (headingRef.current) {
              const centerOffset = Math.min(100, Math.max(0, progress * 118));
              const edgeOffset = Math.min(100, Math.max(0, progress * 118 - 10));
              headingRef.current.style.clipPath = `polygon(${edgeOffset}% 0, 100% 0, 100% 100%, ${edgeOffset}% 100%, ${centerOffset}% 50%)`;
            }
          }}
          onComplete={finishIntro}
        />
      )}
    </div>
  );
}
