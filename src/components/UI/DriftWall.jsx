import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

// Module-scoped persistent offsets across route/section transitions so DriftWall NEVER teleports or snaps
let persistentOffsets = null;
let persistentVelocities = null;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const DriftWall = ({
  items = [],
  columns = 5,
  tileWidth = 320,
  tileHeight = 215,
  gap = 22,
  radius = 14,
  tilt = 14,
  turn = -12,
  roll = 0,
  perspective = 1200,
  depth = 110,
  speed = 36,
  direction = 'up',
  variance = 0.45,
  parallax = 0.65,
  pauseOnHover = false,
  lift = 72,
  fade = 0.45,
  dim = 0.65,
  grayscale = false,
  overlayColor = '#090909',
  isActive = true,
  onTileClick,
  className = '',
  style
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(() => {
    if (typeof window !== 'undefined') {
      return Math.max(500, window.innerHeight - 130);
    }
    return 700;
  });

  const [activeId, setActiveId] = useState(null);
  const activeIdRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const safeItems = useMemo(() => {
    return items && items.length > 0 ? items : [];
  }, [items]);

  const columnItems = useMemo(() => {
    if (safeItems.length === 0) return Array.from({ length: columns }, () => []);
    const cols = Array.from({ length: columns }, () => []);
    safeItems.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col) => (col.length ? col : safeItems.slice(0, 1)));
  }, [safeItems, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  const defaultOffsets = useMemo(() => {
    return columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
  }, [columnMeta]);

  // Use persistent offsets if already drifting so section transitions have 100% position continuity
  const offsetsRef = useRef(
    persistentOffsets && persistentOffsets.length === columnMeta.length
      ? persistentOffsets
      : defaultOffsets
  );
  const velocitiesRef = useRef(
    persistentVelocities && persistentVelocities.length === columnItems.length
      ? persistentVelocities
      : columnItems.map(() => 0)
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const h = containerRef.current.clientHeight;
    if (h > 0 && Math.abs(h - containerHeight) > 60) {
      setContainerHeight(h);
    }

    const ro = new ResizeObserver(([entry]) => {
      const newH = Math.round(entry.contentRect.height);
      if (newH > 0) {
        setContainerHeight((prev) => (Math.abs(prev - newH) > 60 ? newH : prev));
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerHeight]);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  // Keep existing column scroll offsets stable
  useEffect(() => {
    if (!offsetsRef.current || offsetsRef.current.length !== columnMeta.length) {
      offsetsRef.current =
        persistentOffsets && persistentOffsets.length === columnMeta.length
          ? persistentOffsets
          : defaultOffsets;
      velocitiesRef.current =
        persistentVelocities && persistentVelocities.length === columnItems.length
          ? persistentVelocities
          : columnItems.map(() => 0);
    }
  }, [columnMeta.length, columnItems.length, defaultOffsets]);

  const applyPlaneTransform = useCallback(
    (px, py) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.26) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  // Position plane and track offsets immediately on layout before frame 0 paint
  useLayoutEffect(() => {
    applyPlaneTransform(0, 0);
    trackRefs.current.forEach((el, c) => {
      if (el && offsetsRef.current?.[c] != null) {
        el.style.transform = `translate3d(0, ${-offsetsRef.current[c]}px, 0)`;
      }
    });
  }, [applyPlaneTransform, columnMeta]);

  useEffect(() => {
    if (!isActive) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const animate = (ts) => {
      if (lastTsRef.current === null) {
        lastTsRef.current = ts;
      }
      const dt = Math.min(0.04, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
        persistentOffsets = offsetsRef.current;
        persistentVelocities = velocitiesRef.current;
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform, isActive]);

  const activate = useCallback((id, index) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const rectRef = useRef(null);

  const updateRect = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateRect, { passive: true });
    return () => window.removeEventListener('resize', updateRect);
  }, [updateRect]);

  const handlePointerEnterWall = useCallback(() => {
    wallHoveredRef.current = true;
    updateRect();
  }, [updateRect]);

  const handlePointerMove = useCallback(
    (e) => {
      if (!isActive) return;
      if (!rectRef.current) {
        updateRect();
      }
      const rect = rectRef.current;
      if (!rect || rect.width === 0) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        };
      }
    },
    [isActive, parallax, reduced, updateRect]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    rectRef.current = null;
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      '--dw-tile-w': `${tileWidth}px`,
      '--dw-tile-h': `${tileHeight}px`,
      '--dw-gap': `${gap}px`,
      '--dw-radius': `${radius}px`,
      '--dw-perspective': `${perspective}px`,
      '--dw-lift': `${lift}px`,
      '--dw-dim': dim,
      '--dw-gray': grayscale ? 1 : 0,
      '--dw-overlay': overlayColor,
      '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
      ...style
    }),
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style]
  );

  const handleTileClick = useCallback(
    (item, e) => {
      if (onTileClick) {
        e.preventDefault();
        onTileClick(item);
      }
    },
    [onTileClick]
  );

  const renderTile = (item, id, colIndex) => {
    const subtitle = item.tech || item.languages?.[0] || item.category || '';
    const inner = (
      <span className="drift-wall__inner">
        <img
          src={item.image}
          alt={item.title ?? ''}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="drift-wall__overlay" aria-hidden="true" />
        <span className="drift-wall__badge">VIEW ↗</span>
        <span className="drift-wall__meta">
          <span className="drift-wall__title">{item.title}</span>
          {subtitle && <span className="drift-wall__tag">{subtitle}</span>}
        </span>
      </span>
    );

    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onPointerEnter: () => activate(id, colIndex),
      onPointerLeave: release,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
      onClick: (e) => handleTileClick(item, e)
    };

    if (item.href && !onTileClick) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }

    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of tiles"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          if (!meta) return null;
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div
                className="drift-wall__track"
                ref={(el) => (trackRefs.current[c] = el)}
                style={{
                  transform: `translate3d(0, ${-(offsetsRef.current?.[c] ?? 0)}px, 0)`
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c))
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Soft Vignette Overlay without CSS mask-image (avoids 3D flattening & GPU stalls) */}
      <div className="drift-wall__vignette" aria-hidden="true" />
    </div>
  );
};

export default DriftWall;
