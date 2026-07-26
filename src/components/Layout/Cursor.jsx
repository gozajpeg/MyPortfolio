import { useState, useEffect, useRef } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default'); // default | pointer | text
  const [hoverText, setHoverText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
    };

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHasMoved(true);
      resetIdleTimer();

      const target = e.target;
      const hoverable = target.closest('a, button, [role="button"], .keycap-queue');
      const isProjectImg = target.closest('.cursor-zoom-in, [onClick*="Lightbox"], [onClick*="lightbox"]');

      if (hoverable) {
        setCursorType('pointer');
        
        // Smart Context Text Extraction:
        // Try reading explicit title attributes, button texts, or adjacent link handles
        const titleAttr = hoverable.getAttribute('title');
        const ariaLabel = hoverable.getAttribute('aria-label');
        const textContent = hoverable.innerText || hoverable.textContent || '';
        const normalized = textContent.trim().toLowerCase();

        if (titleAttr) {
          setHoverText(titleAttr);
        } else if (ariaLabel) {
          setHoverText(ariaLabel);
        } else if (normalized.includes('gmail') || hoverable.href?.includes('mailto:')) {
          setHoverText('connect with gmail');
        } else if (normalized.includes('github')) {
          setHoverText('visit github');
        } else if (normalized.includes('linkedin')) {
          setHoverText('visit linkedin');
        } else if (normalized.includes('instagram')) {
          setHoverText('visit instagram');
        } else if (normalized.includes('get in touch') || normalized.includes('message')) {
          setHoverText('send message');
        } else if (normalized.includes('open cv') || normalized.includes('resume')) {
          setHoverText('open cv profile');
        } else if (normalized.includes('view project')) {
          setHoverText('view live demo');
        } else if (['featured', 'screensavers', 'logos', 'npm', 'about', 'skills', 'connect', 'home'].some(term => normalized === term)) {
          setHoverText(`go to ${normalized}`);
        } else if (textContent.length > 0 && textContent.length < 24) {
          setHoverText(normalized);
        } else {
          setHoverText('click');
        }
      } else if (isProjectImg || (target.tagName === 'IMG' && target.closest('.cursor-zoom-in'))) {
        setCursorType('pointer');
        setHoverText('zoom image');
      } else if (target.closest('p, h1, h2, h3, h4, span, input, textarea')) {
        setCursorType('text');
        setHoverText('');
      } else {
        setCursorType('default');
        setHoverText('');
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
    const handleMouseUp = () => {
      setIsClicking(false);
      resetIdleTimer();
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Figma cursor offsets (placed at bottom right of arrow point)
  const getPillOffset = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Dynamic pill width estimate based on string content to prevent clipping
    const textLen = getPillText().length;
    const pillWidth = Math.max(60, textLen * 6.5 + 16);
    const pillHeight = 22;
    const cursorSize = 18; // offset from arrow pointer

    let left = cursorSize - 2;
    let top = cursorSize - 2;

    // Shift left if cursor is near right edge
    if (position.x + left + pillWidth > vw) {
      left = -(pillWidth + 4);
    }
    // Shift top if cursor is near bottom edge
    if (position.y + top + pillHeight > vh) {
      top = -(pillHeight + 4);
    }

    return { left: `${left}px`, top: `${top}px` };
  };

  const getPillText = () => {
    if (isIdle) return 'idle';
    if (isClicking) return 'click';
    if (cursorType === 'pointer' && hoverText) return hoverText;
    if (cursorType === 'text') return 'edit';
    return 'move';
  };

  const getPillBg = () => {
    if (isClicking) return 'bg-[#FF3884] text-white'; // Custom bright click accent
    if (cursorType === 'pointer') return 'bg-[#a3e635] text-black'; // hover color
    if (cursorType === 'text') return 'bg-[#00F0FF] text-black'; // edit color
    return 'bg-[#9F4FFF] text-white'; // Figma default purple
  };

  if (!hasMoved) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: isClicking ? 'scale(0.92)' : 'scale(1)',
          transition: 'transform 0.08s ease-out',
        }}
      >
        {/* Figma styled solid cursor vector arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'translate(-2px, -2px)' }}
        >
          <path
            d="M2.5 1.5L18.5 9.5L10.5 11.5L2.5 1.5Z"
            fill={isClicking ? '#FF3884' : '#9F4FFF'}
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Figma styled state indicator tag pill */}
        <div
          className={`absolute flex items-center justify-center rounded px-2.5 font-mono text-[9px] font-extrabold uppercase tracking-wide select-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/20 whitespace-nowrap transition-colors duration-150 ${getPillBg()}`}
          style={{
            ...getPillOffset(),
            height: '20px',
          }}
        >
          {getPillText()}
        </div>
      </div>
    </>
  );
}

export default CustomCursor;