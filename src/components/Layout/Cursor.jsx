import { useState, useEffect, useRef } from 'react';

function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cursorType, setCursorType] = useState('default'); // default | pointer | text
    const [isClicking, setIsClicking] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const idleTimerRef = useRef(null);

    useEffect(() => {
        const resetIdleTimer = () => {
            setIsIdle(false);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => setIsIdle(true), 5000);
        };

        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            resetIdleTimer();

            const target = e.target;
            if (target.closest('a, button, [role="button"]')) {
                setCursorType('pointer');
            } else if (target.closest('p, h1, h2, h3, h4, span, input, textarea')) {
                setCursorType('text');
            } else {
                setCursorType('default');
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        resetIdleTimer();

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

    const getCursorStyles = () => {
        const base = {
            left: position.x,
            top: position.y,
            transform: `translate(-50%, -50%) ${isClicking ? 'scale(0.85)' : 'scale(1)'}`,
        };

        if (cursorType === 'pointer') {
            return {
                ...base,
                width: '20px',
                height: '20px',
                backgroundColor: '#ff0000ff',
                border: '3px solid #050505',
                boxShadow: '4px 4px 0px #050505',
                transform: `translate(-50%, -50%) rotate(45deg) ${isClicking ? 'scale(0.85)' : 'scale(1)'}`,
            };
        }

        if (cursorType === 'text') {
            return {
                ...base,
                width: '4px',
                height: '28px',
                backgroundColor: '#050505',
                border: 'none',
                boxShadow: 'none',
            };
        }

        // default
        return {
            ...base,
            width: '20px',
            height: '20px',
            backgroundColor: '#37ff00ff',
            border: '2px solid #050505',
            boxShadow: '3px 3px 0px #220035ff',
        };
    };

    // Determine which quadrant of the screen the cursor is in,
    // so the tooltip + arrow can flip to the opposite side and never clip off-screen.
    const getTooltipPlacement = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const isRight = position.x > vw / 2;
        const isBottom = position.y > vh / 2;

        return {
            horizontal: isRight ? 'left' : 'right', // opposite side of cursor = more room
            vertical: isBottom ? 'top' : 'bottom',
        };
    };

    const renderIdleTooltip = () => {
        if (!isIdle) return null;

        const { horizontal, vertical } = getTooltipPlacement();

        const configs = {
            'right-bottom': {
                wrapperStyle: { left: position.x, top: position.y },
                svgStyle: { top: 0, left: 0 },
                path: 'M55 55 Q35 45 15 15',
                labelStyle: { top: '55px', left: '45px' },
                labelRotate: '-rotate-2',
            },
            'left-bottom': {
                wrapperStyle: { left: position.x, top: position.y },
                svgStyle: { top: 0, right: 0 },
                path: 'M15 55 Q35 45 55 15',
                labelStyle: { top: '55px', right: '45px' },
                labelRotate: 'rotate-2',
            },
            'right-top': {
                wrapperStyle: { left: position.x, top: position.y },
                svgStyle: { bottom: 0, left: 0 },
                path: 'M55 15 Q35 25 15 55',
                labelStyle: { bottom: '55px', left: '45px' },
                labelRotate: 'rotate-2',
            },
            'left-top': {
                wrapperStyle: { left: position.x, top: position.y },
                svgStyle: { bottom: 0, right: 0 },
                path: 'M15 15 Q35 25 55 55',
                labelStyle: { bottom: '55px', right: '45px' },
                labelRotate: '-rotate-2',
            },
        };

        const key = `${horizontal}-${vertical}`;
        const config = configs[key];

        return (
            <div
                className="fixed pointer-events-none z-[9998] hidden md:block animate-idle-pop"
                style={config.wrapperStyle}
            >
                <svg
                    width="70"
                    height="70"
                    viewBox="0 0 70 70"
                    className="absolute"
                    style={config.svgStyle}
                >
                    <path
                        d={config.path}
                        stroke="#050505"
                        strokeWidth="2.5"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                            <path d="M0,0 L8,4 L0,8 Z" fill="#050505" />
                        </marker>
                    </defs>
                </svg>

                <div
                    className={`absolute bg-[#fde047] border-4 border-[#050505] shadow-[4px_4px_0px_#050505] px-3 py-1.5 font-display font-black text-xs uppercase tracking-wide text-[#050505] whitespace-nowrap ${config.labelRotate}`}
                    style={config.labelStyle}
                >
                    This is your mouse cursor
                </div>
            </div>
        );
    };

    return (
        <>
            <div
                className="fixed pointer-events-none z-[9999] transition-[width,height,background-color,box-shadow] duration-150 ease-out hidden md:block"
                style={getCursorStyles()}
            ></div>

            {renderIdleTooltip()}
        </>
    );
}

export default CustomCursor;