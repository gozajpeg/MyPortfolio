import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Editorial Archival Preloader (0.75s)
 * - Warm Archival Paper (#F4F1EA) & Deep Carbon (#111110) with Instrument Serif italic accent.
 * - Counts 00 -> 100 and lifts the curtain automatically.
 */
export default function IntroSequence({ onComplete }) {
  const [shouldSkip] = useState(() => {
    if (typeof window === 'undefined') return true;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const hasHash = Boolean(window.location.hash && window.location.hash.length > 1);
    return Boolean(prefersReduced || hasHash);
  });

  const [done, setDone] = useState(shouldSkip);
  const curtainRef = useRef(null);
  const numberRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (shouldSkip) {
      onComplete?.();
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete?.();
        },
      });

      tl.to(
        counter,
        {
          val: 100,
          duration: 0.7,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (numberRef.current) {
              const v = Math.round(counter.val);
              numberRef.current.textContent = v < 10 ? `0${v}` : `${v}`;
            }
          },
        },
        0
      );

      tl.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power2.inOut', transformOrigin: 'left center' },
        0
      );

      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 0.65,
          ease: 'expo.inOut',
        },
        0.75
      );
    });

    return () => ctx.revert();
  }, [shouldSkip, onComplete]);

  if (done) return null;

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9990] flex flex-col justify-between bg-[#111110] text-[#F4F1EA] p-6 sm:p-10 lg:p-14 select-none pointer-events-none will-change-transform"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between w-full border-b border-[#262522] pb-4">
        <span className="font-mono text-xs text-[#F4F1EA]">
          ROMMEL ANGELO GOZA / ARCHIVE 2026
        </span>
        <span className="font-mono text-xs text-[#8E8A80]">
          BACOLOD CITY, PH
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 w-full">
        <div>
          <span className="font-serif italic text-3xl sm:text-5xl text-[#EA5B44] block">
            Software &amp; Tooling
          </span>
          <p className="font-sans text-xs sm:text-sm text-[#B5B1A8] max-w-xs leading-relaxed mt-2 m-0">
            Full-stack web applications, relational schemas, and open-source CLI packages.
          </p>
        </div>

        <span
          ref={numberRef}
          className="font-display font-extrabold text-7xl sm:text-8xl lg:text-9xl leading-none tracking-tight text-[#F4F1EA] tabular-nums"
        >
          00
        </span>
      </div>

      <div className="w-full h-[2px] bg-[#262522] overflow-hidden">
        <div ref={barRef} className="w-full h-full bg-[#EA5B44] origin-left scale-x-0" />
      </div>
    </div>
  );
}
