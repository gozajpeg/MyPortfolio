import { useState, useEffect, useRef } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  const innerRef = useRef(null);
  const pathRef = useRef(null);
  const isPointerRef = useRef(false);
  const isClickingRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      if (!innerRef.current) return;
      const scale = isClickingRef.current ? 0.88 : isPointerRef.current ? 1.15 : 1;
      innerRef.current.style.transform = `scale(${scale})`;
      if (pathRef.current) {
        pathRef.current.setAttribute('fill', isPointerRef.current ? '#EDEAE3' : '#FFFFFF');
      }
    };

    const handleMouseMove = (e) => {
      if (!cursorRef.current) return;
      // Instantaneous 1:1 hardware tracking with 0ms transition delay
      cursorRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      if (cursorRef.current.style.opacity !== '1') {
        cursorRef.current.style.opacity = '1';
      }
    };

    // Event delegation: only check for interactive elements when entering/leaving DOM nodes
    const handleMouseOver = (e) => {
      const target = e.target;
      const clickable = Boolean(target?.closest('a, button, [role="button"], .keycap-queue, input, textarea, [tabindex="0"]'));
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
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
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

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block will-change-transform"
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
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: '4px 4px',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]"
        >
          <path
            ref={pathRef}
            d="M3 2L19 11L11.5 13.5L8 20L3 2Z"
            fill="#FFFFFF"
            stroke="#090909"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default CustomCursor;