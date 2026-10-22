import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const innerRef = useRef(null);
  const isPointerRef = useRef(false);
  const isClickingRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with a fine mouse pointer
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const updateScale = () => {
      if (!innerRef.current) return;
      const scale = isClickingRef.current ? 0.85 : isPointerRef.current ? 1.18 : 1;
      innerRef.current.style.transform = `scale(${scale})`;
    };

    const handleMouseMove = (e) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      if (cursorRef.current.style.opacity !== '1') {
        cursorRef.current.style.opacity = '1';
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const clickable = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, [tabindex="0"], [data-interactive="true"]')
      );
      if (isPointerRef.current !== clickable) {
        isPointerRef.current = clickable;
        updateScale();
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      updateScale();
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      updateScale();
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  const cursorNode = (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999999] hidden md:block will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        opacity: 0,
        transition: 'opacity 0.15s ease',
      }}
    >
      <div
        ref={innerRef}
        style={{
          transform: 'scale(1)',
          transition: 'transform 0.14s cubic-bezier(0.22, 1, 0.36, 1)',
          transformOrigin: '3px 3px',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.22)]"
        >
          <path
            d="M3 2L19 11L11.5 13.5L8 20L3 2Z"
            style={{
              fill: 'var(--color-ink)',
              stroke: 'var(--color-bg)',
              transition: 'fill 0.25s ease, stroke 0.25s ease',
            }}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(cursorNode, document.body) : null;
}
