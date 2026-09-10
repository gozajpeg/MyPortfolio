import { useLayoutEffect, useEffect, useRef } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * SquareScanOverlay (Hardware-accelerated HTML5 Canvas)
 * Directional Forward-Facing Square Scan:
 * - 'horizontal': Sweeps left-to-right facing forward (chevron >) across sections.
 *   Solid opaque backing ahead of wave guarantees 0% background bleed with no chessboard lines.
 * - 'vertical-up': Bottom-to-top erase facing upward (^).
 * - 'vertical': Top-to-down reveal facing downward (v).
 */
export default function SquareScanOverlay({
  active = false,
  direction = 'horizontal', // 'horizontal' | 'vertical' | 'vertical-up'
  duration = 650,
  backgroundFill,
  onProgress,
  onComplete,
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useIsomorphicLayoutEffect(() => {
    if (!active) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.floor(rect.width * dpr);
    const targetH = Math.floor(rect.height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const isHorizontal = direction === 'horizontal';
    const isVerticalUp = direction === 'vertical-up';
    // For horizontal sweeps across sections, default to transparent so the previous section is never blocked out in black
    const bgFill = backgroundFill !== undefined ? backgroundFill : (isHorizontal ? 'transparent' : '#090909');

    // Perfect 1:1 true square geometry with uniform 2px gap
    const squareSize = isHorizontal ? 34 : 18;
    const gap = 2;
    const step = squareSize + gap;

    const cols = Math.ceil(rect.width / step);
    const rows = Math.ceil(rect.height / step);

    const animDuration = duration;
    let startTime = null;

    const drawFrame = (now) => {
      if (!startTime) startTime = now;
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / animDuration, 1);
      onProgressRef.current?.(progress);

      ctx.clearRect(0, 0, rect.width, rect.height);

      if (isHorizontal) {
        // Horizontal sweep (left to right) facing where it goes (chevron > pointing right)
        const maxStagger = 3.8;
        const totalCols = cols + maxStagger + 3.2;
        const wave = progress * totalCols;

        const headFill = new Path2D();
        const headStroke = new Path2D();
        const trailFill = new Path2D();
        const trailStroke = new Path2D();
        let hasHead = false;
        let hasTrail = false;

        for (let r = 0; r < rows; r++) {
          const y = r * step;
          const normR = rows > 1 ? (r - (rows - 1) / 2) / ((rows - 1) / 2) : 0;
          const stagger = (1 - normR * normR) * maxStagger;

          // Windowed bounds: only iterate over the ~4 active wave columns per row
          const minC = Math.max(0, Math.floor(wave - stagger - 3.2));
          const maxC = Math.min(cols - 1, Math.ceil(wave - stagger + 0.1));

          for (let c = minC; c <= maxC; c++) {
            const x = c * step;
            const dist = wave - c - stagger;

            if (dist >= 0 && dist < 1.1) {
              headFill.rect(x, y, squareSize, squareSize);
              headStroke.rect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
              hasHead = true;
            } else if (dist >= 1.1 && dist < 3.2) {
              trailFill.rect(x, y, squareSize, squareSize);
              trailStroke.rect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
              hasTrail = true;
            }
          }
        }

        if (hasHead) {
          ctx.fillStyle = '#EDEAE3';
          ctx.globalAlpha = 1.0;
          ctx.fill(headFill);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.stroke(headStroke);
        }

        if (hasTrail) {
          ctx.fillStyle = '#242424';
          ctx.globalAlpha = 0.6;
          ctx.fill(trailFill);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke(trailStroke);
        }
      } else if (isVerticalUp) {
        // Vertical scan: bottom to top erase facing upwards (^ pointing up)
        const maxStagger = 1.8;
        const totalRows = rows + maxStagger + 2.8;
        const wave = progress * totalRows;

        const headFill = new Path2D();
        const headStroke = new Path2D();
        const trailFill = new Path2D();
        const trailStroke = new Path2D();
        const eraseBg = new Path2D();
        let hasHead = false;
        let hasTrail = false;
        let hasBg = false;

        for (let c = 0; c < cols; c++) {
          const x = c * step;
          const normC = cols > 1 ? (c - (cols - 1) / 2) / ((cols - 1) / 2) : 0;
          const stagger = (1 - normC * normC) * maxStagger;

          for (let r = rows - 1; r >= 0; r--) {
            const y = r * step;
            const fromBottom = (rows - 1 - r);
            const dist = wave - fromBottom - stagger;

            if (dist < 0) {
              continue;
            } else if (dist >= 0 && dist < 1.1) {
              headFill.rect(x, y, squareSize, squareSize);
              headStroke.rect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
              hasHead = true;
            } else if (dist >= 1.1 && dist < 2.6) {
              eraseBg.rect(x, y, step, step);
              trailFill.rect(x, y, squareSize, squareSize);
              trailStroke.rect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
              hasTrail = true;
              hasBg = true;
            } else {
              eraseBg.rect(x, y, step, step);
              hasBg = true;
            }
          }
        }

        if (hasBg) {
          ctx.fillStyle = bgFill;
          ctx.globalAlpha = 1.0;
          ctx.fill(eraseBg);
        }
        if (hasHead) {
          ctx.fillStyle = '#EDEAE3';
          ctx.globalAlpha = 1.0;
          ctx.fill(headFill);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.stroke(headStroke);
        }
        if (hasTrail) {
          ctx.fillStyle = '#242424';
          ctx.globalAlpha = 0.65;
          ctx.fill(trailFill);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 1;
          ctx.stroke(trailStroke);
        }
      } else {
        // Vertical scan: top-to-down reveal facing downwards (v pointing down)
        const maxStagger = 1.8;
        const totalRows = rows + maxStagger + 2.8;
        const wave = progress * totalRows;

        const aheadBg = new Path2D();
        const headFill = new Path2D();
        const headStroke = new Path2D();
        const trailFill = new Path2D();
        const trailStroke = new Path2D();
        let hasAhead = false;
        let hasHead = false;
        let hasTrail = false;

        for (let c = 0; c < cols; c++) {
          const x = c * step;
          const normC = cols > 1 ? (c - (cols - 1) / 2) / ((cols - 1) / 2) : 0;
          const stagger = (1 - normC * normC) * maxStagger;

          for (let r = 0; r < rows; r++) {
            const y = r * step;
            const dist = wave - r - stagger;

            if (dist >= 2.6) continue;

            if (dist < 0) {
              aheadBg.rect(x, y, step, step);
              hasAhead = true;
            } else if (dist >= 0 && dist < 1.1) {
              headFill.rect(x, y, squareSize, squareSize);
              headStroke.rect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
              hasHead = true;
            } else if (dist >= 1.1 && dist < 2.6) {
              trailFill.rect(x, y, squareSize, squareSize);
              trailStroke.rect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
              hasTrail = true;
            }
          }
        }

        if (hasAhead) {
          ctx.fillStyle = bgFill;
          ctx.globalAlpha = 1.0;
          ctx.fill(aheadBg);
        }
        if (hasHead) {
          ctx.fillStyle = '#EDEAE3';
          ctx.globalAlpha = 1.0;
          ctx.fill(headFill);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.stroke(headStroke);
        }
        if (hasTrail) {
          ctx.fillStyle = '#242424';
          ctx.globalAlpha = 0.65;
          ctx.fill(trailFill);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          ctx.stroke(trailStroke);
        }
      }

      ctx.globalAlpha = 1;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(drawFrame);
      } else {
        ctx.clearRect(0, 0, rect.width, rect.height);
        onProgressRef.current?.(1);
        onCompleteRef.current?.();
      }
    };

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, direction, duration, backgroundFill]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-50 rounded-[inherit] transition-opacity duration-75 ${
        active ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
