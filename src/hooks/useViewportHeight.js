import { useEffect } from 'react';

/**
 * Tracks the real-time visual viewport height across mobile browsers (iOS Safari, Android Chrome).
 * Updates the CSS custom property `--app-height` so layout never overflows behind browser toolbars.
 */
export function useViewportHeight() {
  useEffect(() => {
    const isIOS =
      typeof navigator !== 'undefined' &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

    if (isIOS) {
      document.documentElement.classList.add('is-ios');
      document.documentElement.style.setProperty(
        '--bento-bottom-padding',
        'max(7.5rem, calc(env(safe-area-inset-bottom, 0px) + 6rem))'
      );
    } else {
      document.documentElement.classList.remove('is-ios');
      document.documentElement.style.setProperty(
        '--bento-bottom-padding',
        'max(5rem, calc(env(safe-area-inset-bottom, 0px) + 4.5rem))'
      );
    }

    const update = () => {
      const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${Math.round(h)}px`);
    };

    update();

    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', update);
      window.visualViewport.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', update);
        window.visualViewport.removeEventListener('scroll', update);
      }
    };
  }, []);
}
