import { useState, useEffect, type RefObject } from 'react';

export function useSceneVisibility(containerRef: RefObject<HTMLElement>): boolean {
  const [isInViewport, setIsInViewport] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  // Tab visibility
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Viewport intersection
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return isInViewport && isDocumentVisible;
}
