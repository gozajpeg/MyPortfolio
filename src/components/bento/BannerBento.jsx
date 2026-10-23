import { useEffect, useRef } from 'react';

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

            // Radial edge fade + soft center text clearance (replaces expensive CSS mask + blur-xl)
            const nx = (cx / width - 0.5) * 2;
            const ny = (cy / height - 0.5) * 2;
            const distEdge = Math.hypot(nx, ny);
            const edgeFade = Math.max(0, 1 - Math.pow(distEdge * 0.78, 2.2));
            const centerDip =
              0.38 + 0.62 * Math.min(1, Math.hypot(nx * 1.35, ny * 2.1));

            const wave =
              0.5 + 0.5 * Math.sin(t - (r + c) * 0.28);
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
 * Mobile Merged Banner — Full-bleed cover banner merged into the top of the Profile Card (`HeroBento`) on screens < lg
 */
export function MobileMergedBanner() {
  return (
    <div className="relative flex lg:hidden items-center justify-center text-center overflow-hidden -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 px-5 py-9 mb-1 border-b border-border rounded-t-2xl">
      <SquareMatrixBackground />

      <h2 className="relative z-10 font-sans text-xl sm:text-2xl font-bold text-ink tracking-tight leading-snug m-0 max-w-md">
        Building and shipping systems with confidence.
      </h2>
    </div>
  );
}

/**
 * Desktop Banner — Transparent container with dense Square-Matrix looped animation
 * and centered bold headline, placed right before `About` on screens >= lg.
 */
export default function BannerBento() {
  return (
    <section
      id="banner"
      aria-label="Statement Banner"
      className="relative hidden lg:flex items-center justify-center text-center overflow-hidden bg-transparent py-11 px-6"
    >
      <SquareMatrixBackground />

      <h2 className="relative z-10 font-sans text-2xl xl:text-4xl font-bold text-ink tracking-tight leading-tight m-0 max-w-2xl">
        Building and shipping systems with confidence.
      </h2>
    </section>
  );
}
