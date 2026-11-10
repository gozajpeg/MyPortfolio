import { useState, useEffect, useRef } from 'react';
import { getActiveBanner, fallbackBannerQuote } from '../../data/Banner/banner';

const COLS = 28;
const ROWS = 7;

/**
 * High-Performance Single-Canvas Square-Matrix Wave Background.
 * Replaces 392 individual `will-change` DOM nodes + CSS blur filters with 1 lightweight canvas
 * that pauses automatically when off-screen or hidden by breakpoint.
 */
export function SquareMatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    const getInkRgb = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark';
      return isDark ? '242, 241, 236' : '20, 20, 19';
    };

    const render = (time) => {
      if (!isVisible) return;
      if (width === 0 || height === 0) {
        updateSize();
      }
      if (width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        const rgb = getInkRgb();
        const cellW = width / COLS;
        const cellH = height / ROWS;
        const baseSize = Math.min(cellW, cellH, 15) * 0.72;
        const t = time * 0.0024;

        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const cx = (c + 0.5) * cellW;
            const cy = (r + 0.5) * cellH;

            const nx = (cx / width - 0.5) * 2;
            const ny = (cy / height - 0.5) * 2;
            const distEdge = Math.hypot(nx, ny);
            const edgeFade = Math.max(0, 1 - Math.pow(distEdge * 0.78, 2.2));
            const centerDip =
              0.38 + 0.62 * Math.min(1, Math.hypot(nx * 1.35, ny * 2.1));

            const wave = 0.5 + 0.5 * Math.sin(t - (r + c) * 0.28);
            const scale = 0.62 + 0.38 * wave;
            const alpha = (0.06 + 0.32 * wave) * edgeFade * centerDip;

            if (alpha > 0.015) {
              const size = baseSize * scale;
              const x = cx - size / 2;
              const y = cy - size / 2;

              ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.42})`;
              ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
              ctx.lineWidth = 1;

              ctx.beginPath();
              if (ctx.roundRect) {
                ctx.roundRect(x, y, size, size, 2);
              } else {
                ctx.rect(x, y, size, size);
              }
              ctx.fill();
              ctx.stroke();
            }
          }
        }
      }
      rafId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updateSize();
          if (!rafId) rafId = requestAnimationFrame(render);
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);
    window.addEventListener('resize', updateSize, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full block"
    />
  );
}

/**
 * Dismissible Release Banner + Fallback Square-Matrix Quote Banner.
 * Driven by `src/data/Banner/banner.js`.
 * Placed right above the `About` section. When dismissed (`×`), smoothly reveals the quote banner underneath.
 */
export default function BannerBento() {
  const activeBanner = getActiveBanner();
  const [isDismissed, setIsDismissed] = useState(false);

  const showAnnouncement = Boolean(activeBanner && !isDismissed);

  return (
    <section
      id="banner"
      aria-label={showAnnouncement ? `${activeBanner.title} Release Banner` : 'Statement Banner'}
      className="relative flex items-center justify-center overflow-hidden bg-transparent h-[136px] sm:h-[168px] px-4 sm:px-6"
    >
      {/* Subtle Square-Matrix Wave Background */}
      <SquareMatrixBackground />

      {showAnnouncement ? (
        <div className="relative z-10 w-full h-full flex flex-row items-center justify-center gap-5 sm:gap-8">
          {/* Dismiss (×) Button */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss release announcement"
            title="Dismiss announcement"
            className="absolute top-2 right-0 sm:top-3 sm:right-1 w-6 h-6 rounded-full border border-border hover:border-border-strong bg-surface/80 hover:bg-surface-hover text-ink-muted hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Left: Barstile Logo + Oversized Bold "V1" Display Lockup */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 select-none shrink-0">
            {activeBanner.logo && (
              <img
                src={activeBanner.logo}
                alt={activeBanner.title}
                width="48"
                height="48"
                decoding="async"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0"
              />
            )}
            <span className="font-sans text-6xl sm:text-8xl xl:text-[96px] font-black tracking-tighter leading-[0.8] text-ink">
              {activeBanner.version}
            </span>
          </div>

          {/* Right: Compact, Readable Title, Subtitle & Simplified Button */}
          <div className="flex flex-col items-start text-left gap-2 min-w-0">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-sans text-sm sm:text-base font-bold text-ink tracking-tight leading-tight m-0">
                {activeBanner.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm font-normal text-ink-muted leading-tight m-0">
                {activeBanner.subtitle}
              </p>
            </div>

            <a
              href={activeBanner.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-3.5 rounded-lg bg-ink text-bg font-sans text-[11px] sm:text-xs font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center no-underline whitespace-nowrap"
            >
              {activeBanner.ctaText}
            </a>
          </div>
        </div>
      ) : (
        <h2 className="relative z-10 font-sans text-xl sm:text-2xl xl:text-4xl font-bold text-ink tracking-tight leading-tight text-center m-0 max-w-2xl">
          {fallbackBannerQuote}
        </h2>
      )}
    </section>
  );
}
