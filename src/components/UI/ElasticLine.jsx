import { useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Architectural Elastic SVG String Divider
 * - A 1px structural line between chapters that bends dynamically on pointer crossing
 *   and snaps back with elastic physics via GSAP.
 */
export default function ElasticLine({ className = '' }) {
  const pathRef = useRef(null);
  const progressRef = useRef(0.5);
  const yOffsetRef = useRef(0);

  const updatePath = (xRatio, yOffset) => {
    if (!pathRef.current) return;
    const x = Math.round(xRatio * 1000);
    const y = Math.round(50 + yOffset);
    pathRef.current.setAttribute('d', `M 0 50 Q ${x} ${y} 1000 50`);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width));
    const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 1.35;
    const clampedY = Math.max(-44, Math.min(44, deltaY));

    progressRef.current = xRatio;
    yOffsetRef.current = clampedY;
    gsap.killTweensOf(yOffsetRef);
    updatePath(xRatio, clampedY);
  };

  const handleMouseLeave = () => {
    const state = { y: yOffsetRef.current };
    gsap.to(state, {
      y: 0,
      duration: 1.1,
      ease: 'elastic.out(1.2, 0.25)',
      onUpdate: () => {
        yOffsetRef.current = state.y;
        updatePath(progressRef.current, state.y);
      },
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-8 -my-4 flex items-center justify-center z-20 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-24 overflow-visible pointer-events-none"
      >
        <path
          ref={pathRef}
          d="M 0 50 Q 500 50 1000 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="text-border-strong"
        />
      </svg>
    </div>
  );
}

