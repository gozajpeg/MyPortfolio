import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const innerRef = useRef(null);
  const isPointerRef = useRef(false);
  const isVisibleRef = useRef(false);
  const lastTargetRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const handlePointerMove = (e) => {
      const node = cursorRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        node.style.opacity = '1';
      }

      const target = e.target;
      if (target && target !== lastTargetRef.current) {
        lastTargetRef.current = target;
        const clickable = Boolean(
          target.closest?.(
            'a, button, [role="button"], input, textarea, [tabindex="0"], [data-interactive="true"]'
          )
        );
        if (isPointerRef.current !== clickable) {
          isPointerRef.current = clickable;
          if (innerRef.current) {
            innerRef.current.style.transform = clickable
              ? 'scale(1.16)'
              : 'scale(1)';
          }
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        isVisibleRef.current = false;
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        isVisibleRef.current = true;
        cursorRef.current.style.opacity = '1';
      }
    };

    setMounted(true);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!mounted) return null;

  const cursorNode = (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999999] hidden md:block will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        opacity: 0,
      }}
    >
      <div
        ref={innerRef}
        style={{
          transform: 'scale(1)',
          transition: 'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)',
          transformOrigin: '3px 3px',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 2L19 11L11.5 13.5L8 20L3 2Z"
            style={{
              fill: 'var(--color-ink)',
              stroke: 'var(--color-bg)',
            }}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(cursorNode, document.body)
    : null;
}
