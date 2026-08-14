import { useEffect, useRef, useState } from "react";
import { clamp } from "../lib/motion";

/**
 * Tracks how far the viewer has scrolled through `containerRef` as a 0→1
 * value, damped every frame like a scrubbed video playhead easing toward
 * its target time. Falls back to an un-damped value when the user prefers
 * reduced motion.
 */
export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const rawRef = useRef(0);
  const dampedRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const computeRaw = () => {
      const el = containerRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return 0;
      return clamp(-rect.top / total, 0, 1);
    };

    const onScroll = () => {
      rawRef.current = computeRaw();
      if (prefersReduced) {
        dampedRef.current = rawRef.current;
        setProgress(rawRef.current);
      }
    };

    let rafId: number;
    const tick = () => {
      if (!prefersReduced) {
        const diff = rawRef.current - dampedRef.current;
        dampedRef.current += diff * 0.1;
        if (Math.abs(diff) < 0.0005) dampedRef.current = rawRef.current;
        setProgress(dampedRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return progress;
}
