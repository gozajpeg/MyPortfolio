import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import defaultPhoto from '../../assets/logo/me.webp';

// Module-level cache for processed pixel data
const portraitCache = new Map();

export const SPOTLIGHT_MODES = [
  {
    id: 'full',
    label: 'COLOR',
    filter: 'none',
  },
  {
    id: 'gray',
    label: 'GRAY',
    filter: 'grayscale(100%) contrast(125%) brightness(95%)',
  },
  {
    id: 'invert',
    label: 'INVERT',
    filter: 'invert(100%) contrast(115%)',
  },
];

// 100% solid, fully opaque monochrome gray tiers (zero color bleed from underlying photo)
const MONOCHROME_TIERS = [
  '#1C1C1C',
  '#383838',
  '#60605E',
  '#989691',
  '#CDCAC3',
  '#F0EDE6',
];

function processImageData(img, cols) {
  const w = img.naturalWidth || img.width || 500;
  const h = img.naturalHeight || img.height || 850;
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

  const sampleCanvas = document.createElement('canvas');
  sampleCanvas.width = w;
  sampleCanvas.height = h;
  const sampleCtx = sampleCanvas.getContext('2d');
  if (!sampleCtx) return null;
  sampleCtx.drawImage(img, 0, 0, w, h);
  const imgData = sampleCtx.getImageData(0, 0, w, h).data;

  const cellSize = w / cols;
  const gap = Math.max(1.1, cellSize * 0.2);
  const maxSquareSize = Math.max(1, cellSize - gap);
  const rows = Math.ceil(h / cellSize);

  const alphaGrid = new Uint8Array(w * h);
  const squares = [];

  for (let r = 0; r < rows; r++) {
    const y = Math.round(r * cellSize);
    for (let c = 0; c < cols; c++) {
      const x = Math.round(c * cellSize);
      const sampleX = Math.min(Math.round(x + cellSize / 2), w - 1);
      const sampleY = Math.min(Math.round(y + cellSize / 2), h - 1);
      const idx = (sampleY * w + sampleX) * 4;

      const alpha = imgData[idx + 3] / 255;
      if (alpha < 0.15) continue;

      const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];

      let tierIdx;
      if (lum < 35) tierIdx = 0;
      else if (lum < 75) tierIdx = 1;
      else if (lum < 125) tierIdx = 2;
      else if (lum < 170) tierIdx = 3;
      else if (lum < 215) tierIdx = 4;
      else tierIdx = 5;

      const cx = x + maxSquareSize / 2;
      const cy = y + maxSquareSize / 2;

      squares.push({
        x,
        y,
        cx,
        cy,
        baseSize: maxSquareSize,
        tierIdx,
      });
    }
  }

  // Precompute hit-test alpha grid
  for (let i = 0; i < w * h; i++) {
    if (imgData[i * 4 + 3] >= 38) { // > 0.15
      alphaGrid[i] = 1;
    }
  }

  return {
    w,
    h,
    dpr,
    squares,
    alphaGrid,
    cellSize,
    gap,
    maxSquareSize,
  };
}

function drawSquares(canvas, data, mouseState) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { dpr, squares } = data;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(dpr, dpr);

  const { active, mx, my, reach } = mouseState;

  // 1. Idle state: all squares fully intact and purely monochrome gray
  if (!active || reach <= 0) {
    const paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    for (let i = 0; i < squares.length; i++) {
      const sq = squares[i];
      paths[sq.tierIdx].rect(sq.x, sq.y, sq.baseSize, sq.baseSize);
    }
    for (let t = 0; t < 6; t++) {
      ctx.fillStyle = MONOCHROME_TIERS[t];
      ctx.fill(paths[t]);
    }
    ctx.restore();
    return;
  }

  // 2. Active cursor reach: squares within reach dynamically dissolve / disappear!
  // Inner clear threshold: squares completely vanish (88% of reach clear for unobstructed view)
  const innerClear = reach * 0.88;
  const fadeRange = reach - innerClear;

  const paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];

  for (let i = 0; i < squares.length; i++) {
    const sq = squares[i];
    // Chebyshev distance (square reach window aligned with cursor)
    const dx = Math.abs(sq.cx - mx);
    const dy = Math.abs(sq.cy - my);
    const dist = Math.max(dx, dy);

    if (dist < innerClear) {
      // Disappears completely within reach to clearly reveal the photo!
      continue;
    }

    if (dist < reach) {
      // Near reach boundary: subtle shrink dissolve
      const progress = (dist - innerClear) / fadeRange;
      const factor = progress * progress;
      if (factor < 0.12) continue;

      const size = sq.baseSize * factor;
      const offset = (sq.baseSize - size) / 2;
      paths[sq.tierIdx].rect(sq.x + offset, sq.y + offset, size, size);
    } else {
      // Beyond reach: intact square
      paths[sq.tierIdx].rect(sq.x, sq.y, sq.baseSize, sq.baseSize);
    }
  }

  for (let t = 0; t < 6; t++) {
    ctx.fillStyle = MONOCHROME_TIERS[t];
    ctx.fill(paths[t]);
  }

  ctx.restore();
}

// Background pre-warm
if (typeof window !== 'undefined') {
  const preImg = new Image();
  preImg.src = defaultPhoto;
  const prewarm = () => {
    try {
      const desktop = processImageData(preImg, 76);
      if (desktop) portraitCache.set(`${defaultPhoto}-76-v4`, desktop);
      const mobile = processImageData(preImg, 24);
      if (mobile) portraitCache.set(`${defaultPhoto}-24-v4`, mobile);
    } catch {
      // Ignore
    }
  };
  if (preImg.complete && preImg.naturalWidth > 0) {
    prewarm();
  } else {
    preImg.onload = prewarm;
  }
}

export default function PixelPortrait({
  src,
  alt = 'Portrait',
  className = '',
  imgClassName = '',
  cols = 68,
  spotlight = false,
  spotlightSize = 220,
  spotlightRadius,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const photoContainerRef = useRef(null);
  const dataRef = useRef(null);
  const animFrameRef = useRef(null);
  const currentReachRef = useRef(0);
  const lastCanvasMouseRef = useRef({ x: -999, y: -999 });
  const lastScreenPosRef = useRef({ x: -999, y: -999 });

  const cacheKey = `${src}-${cols}-v4`;
  const [isHovered, setIsHovered] = useState(false);
  const [isReady, setIsReady] = useState(() => portraitCache.has(cacheKey));
  // Default to 0: COLOR (Full natural vibrant photo)
  const [modeIndex, setModeIndex] = useState(0);

  const effectiveSquareSize = spotlightSize || (spotlightRadius ? spotlightRadius * 1.2 : 220);
  const targetReach = effectiveSquareSize / 2;
  const currentMode = SPOTLIGHT_MODES[modeIndex];

  const initCanvas = (data) => {
    dataRef.current = data;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = Math.floor(data.w * data.dpr);
    canvas.height = Math.floor(data.h * data.dpr);
    drawSquares(canvas, data, { active: false, mx: -999, my: -999, reach: 0 });
    setIsReady(true);
  };

  useLayoutEffect(() => {
    if (portraitCache.has(cacheKey)) {
      initCanvas(portraitCache.get(cacheKey));
      return;
    }

    const img = new Image();
    img.src = src;

    const onLoad = () => {
      const data = processImageData(img, cols);
      if (data) {
        portraitCache.set(cacheKey, data);
        initCanvas(data);
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      onLoad();
    } else {
      img.onload = onLoad;
    }
  }, [src, cols, cacheKey]);

  // Check if click/cursor hits actual non-transparent pixels of the portrait
  const isPixelOnImage = (clientX, clientY) => {
    if (!containerRef.current || !dataRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const { w, h, alphaGrid } = dataRef.current;
    if (rect.width <= 0 || rect.height <= 0) return false;

    const normX = Math.min(Math.max(0, Math.floor((x / rect.width) * w)), w - 1);
    const normY = Math.min(Math.max(0, Math.floor((y / rect.height) * h)), h - 1);

    const idx = normY * w + normX;
    return alphaGrid ? Boolean(alphaGrid[idx]) : true;
  };

  // 144Hz pointer tracking: squares within reach dissolve away AND photo is only revealed within reach
  const handlePointerMove = (e) => {
    if (!containerRef.current || !canvasRef.current || !dataRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    lastScreenPosRef.current = { x, y };

    const { w, h } = dataRef.current;
    const scaleX = w / rect.width;
    const scaleY = h / rect.height;

    const canvasMx = x * scaleX;
    const canvasMy = y * scaleY;
    const canvasReach = targetReach * scaleX;

    lastCanvasMouseRef.current = { x: canvasMx, y: canvasMy };
    currentReachRef.current = canvasReach;

    // Synchronously clip the photo to ONLY exist within the cursor reach window
    // Outside this window, the photo is completely clipped out so NO color leaks through gaps!
    if (photoContainerRef.current) {
      const x1 = Math.round(x - targetReach);
      const y1 = Math.round(y - targetReach);
      const x2 = Math.round(x + targetReach);
      const y2 = Math.round(y + targetReach);
      photoContainerRef.current.style.clipPath = `polygon(${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px)`;
      photoContainerRef.current.style.opacity = '1';
    }

    // Set cursor to pointer ONLY when hovering directly over the portrait image
    const isOverPortrait = isPixelOnImage(clientX, clientY);
    containerRef.current.style.cursor = isOverPortrait ? 'pointer' : 'default';

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      if (canvasRef.current && dataRef.current) {
        drawSquares(canvasRef.current, dataRef.current, {
          active: true,
          mx: canvasMx,
          my: canvasMy,
          reach: canvasReach,
        });
      }
    });
  };

  // Pointer leave: squares smoothly reform and photo clips out cleanly
  const handlePointerLeave = () => {
    if (!canvasRef.current || !dataRef.current) return;
    if (containerRef.current) containerRef.current.style.cursor = 'default';

    const startReach = currentReachRef.current;
    if (startReach <= 0) {
      if (photoContainerRef.current) {
        photoContainerRef.current.style.opacity = '0';
        photoContainerRef.current.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
      }
      drawSquares(canvasRef.current, dataRef.current, { active: false, mx: -999, my: -999, reach: 0 });
      return;
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const startTime = performance.now();
    const duration = 160;
    const lastPos = { ...lastCanvasMouseRef.current };
    const lastScreenPos = { ...lastScreenPosRef.current };

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const cur = startReach * (1 - progress);
      currentReachRef.current = cur;

      if (progress < 1 && canvasRef.current && dataRef.current) {
        const curScreenReach = targetReach * (1 - progress);
        if (photoContainerRef.current) {
          const x1 = Math.round(lastScreenPos.x - curScreenReach);
          const y1 = Math.round(lastScreenPos.y - curScreenReach);
          const x2 = Math.round(lastScreenPos.x + curScreenReach);
          const y2 = Math.round(lastScreenPos.y + curScreenReach);
          photoContainerRef.current.style.clipPath = `polygon(${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px)`;
        }

        drawSquares(canvasRef.current, dataRef.current, {
          active: true,
          mx: lastPos.x,
          my: lastPos.y,
          reach: cur,
        });
        animFrameRef.current = requestAnimationFrame(step);
      } else if (canvasRef.current && dataRef.current) {
        currentReachRef.current = 0;
        if (photoContainerRef.current) {
          photoContainerRef.current.style.opacity = '0';
          photoContainerRef.current.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
        }
        drawSquares(canvasRef.current, dataRef.current, { active: false, mx: -999, my: -999, reach: 0 });
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  // Click handler: ONLY change color mode if clicking directly on the portrait image
  const handleClick = (e) => {
    if (!isPixelOnImage(e.clientX, e.clientY)) {
      return; // Clicked on empty space / background - IGNORED!
    }

    e.stopPropagation();
    setModeIndex((prev) => (prev + 1) % SPOTLIGHT_MODES.length);
  };

  // ── MODE 1: Squares dissolve within reach, photo underneath, click ONLY on image ──
  if (spotlight) {
    return (
      <div
        ref={containerRef}
        className={`relative select-none group ${className}`}
        onPointerEnter={handlePointerMove}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        {/* Invisible natural layout sizer to ensure 100% exact container dimensions */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`invisible block select-none pointer-events-none ${imgClassName}`}
        />

        {/* Real Photo sits inside a clipped viewport directly under cursor */}
        {/* Strictly hidden outside reach so NO color picture is visible at the gaps! */}
        <div
          ref={photoContainerRef}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)',
            opacity: 0,
            transition: 'opacity 0.15s ease-out',
            willChange: 'clip-path, opacity',
          }}
        >
          <img
            src={src}
            alt={alt}
            className={`block object-contain object-top select-none pointer-events-none ${imgClassName}`}
            style={{
              filter: currentMode.filter,
              transition: 'filter 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        {/* Top Layer: Retro Gray Pixel Squares Matrix (100% solid, fully opaque gray) */}
        {/* Squares within reach of the cursor dissolve away, revealing the real color photo! */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full block pointer-events-none transition-opacity duration-200 ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    );
  }

  // ── MODE 2: Classic Full Pixel Matrix (Hover to reveal full photo) ──
  return (
    <div
      className={`relative select-none group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered((p) => !p)}
    >
      {/* Real Photo (Revealed on hover) */}
      <img
        src={src}
        alt={alt}
        className={`block transition-all duration-300 ease-out ${imgClassName} ${
          isHovered ? 'scale-[1.01] opacity-100' : 'scale-100 opacity-0'
        }`}
      />

      {/* Gray Squares Matrix (Displayed on idle, fades out on hover) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ease-out ${
          isHovered || !isReady ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
