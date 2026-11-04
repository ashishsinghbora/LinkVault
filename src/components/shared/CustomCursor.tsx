import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const ringX = useRef(-100);
  const ringY = useRef(-100);

  useEffect(() => {
    // Only enable on desktop fine pointer devices that do NOT prefer reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onPointerMove = (e: PointerEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [role="option"], canvas, summary'
        );
        setIsHovering(!!interactive);
      }
    };

    const onPointerDown = () => setIsPressed(true);
    const onPointerUp = () => setIsPressed(false);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    let animationFrameId: number;

    // Smooth lerp loop for the trailing ring
    const render = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.22;
      ringY.current += (mouseY.current - ringY.current) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-75 ease-out will-change-transform ${
          isHovering
            ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_#22d3ee]'
            : 'bg-violet-electric scale-100 shadow-[0_0_6px_#a855f7]'
        }`}
      />

      {/* Smooth Trailing Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-3.5 -mt-3.5 rounded-full border transition-all duration-200 ease-out will-change-transform ${
          isPressed
            ? 'w-6 h-6 border-cyan-400/80 bg-cyan-400/15 scale-90'
            : isHovering
            ? 'w-10 h-10 -ml-5 -mt-5 border-cyan-400/60 bg-cyan-400/10 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
            : 'w-7 h-7 border-violet-electric/40 bg-transparent scale-100'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
