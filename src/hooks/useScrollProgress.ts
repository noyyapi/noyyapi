import { useEffect, useRef, useState } from "react";
import { clamp } from "../lib/motion";

/**
 * Tracks how far the viewer has scrolled through `containerRef` as a 0→1
 * value. Renders are always paced through a rAF loop rather than fired
 * directly off the native `scroll` event — that keeps updates capped to
 * the display's refresh rate instead of however often (and however
 * irregularly) the browser happens to dispatch scroll events, which is
 * what made an earlier direct-from-scroll-event version feel worse, not
 * better, on phones.
 *
 * On top of that pacing, desktop mouse/trackpad input gets a gentle
 * exponential ease (10%/frame) toward the raw scroll value for a smooth,
 * cinematic feel — wheel input arrives in coarse discrete steps, so a
 * little inertia reads as polish. Touch devices mirror the raw value
 * every frame with no easing at all: touchscreens already track the
 * finger with zero added latency natively, and any extra smoothing on
 * top of that reads as constant lag ("heavy" scrolling) rather than
 * polish, even when it converges quickly.
 */
export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const rawRef = useRef(0);
  const dampedRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const instant = prefersReduced || isCoarsePointer;

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
    };

    let rafId: number;
    const tick = () => {
      if (instant) {
        dampedRef.current = rawRef.current;
      } else {
        const diff = rawRef.current - dampedRef.current;
        dampedRef.current += diff * 0.1;
        if (Math.abs(diff) < 0.0005) dampedRef.current = rawRef.current;
      }
      setProgress(dampedRef.current);
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
