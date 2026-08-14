import { useEffect, useRef, useState } from "react";
import { clamp } from "../lib/motion";

/**
 * Tracks how far the viewer has scrolled through `containerRef` as a 0→1
 * value, damped every frame like a scrubbed video playhead easing toward
 * its target time. The rAF loop is what keeps updates paced to the
 * display's refresh rate instead of firing once per raw scroll event
 * (which on some phones fire faster than the page can usefully re-render);
 * removing it entirely made mobile worse, not better. What actually caused
 * the post-flick stutter was the *slow* 10%-per-frame easing: after a fast
 * flick the raw target jumps far away and it took ~70 frames (over a
 * second) of continuous re-rendering to catch up, fighting the browser's
 * own momentum-scroll animation. Touch devices now use a much faster
 * catch-up factor (still rAF-paced, just converges in ~6 frames instead of
 * ~70) since native touch scrolling already supplies its own momentum feel
 * and doesn't need the slow cinematic ease desktop wheel input benefits
 * from. Falls back to an un-damped value when the user prefers reduced
 * motion.
 */
export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const rawRef = useRef(0);
  const dampedRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const easeFactor = isCoarsePointer ? 0.55 : 0.1;

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
        dampedRef.current += diff * easeFactor;
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
