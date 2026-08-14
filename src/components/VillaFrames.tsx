import { useEffect, useRef } from "react";
import noyMark from "../assets/noy-mark.png";

interface VillaFramesProps {
  progress: number;
}

// Pre-extracted JPEG sequence of the villa build video, sorted by filename
// (frame-001.jpg, frame-002.jpg, ...). Swapping an already-loaded <img> src
// is a display-list change the browser can paint immediately — no decode
// chain to walk like a compressed video seek — so this is what makes
// scroll-scrubbing on touch devices cheap enough to be smooth.
const frameModules = import.meta.glob("../assets/frames/*.jpg", { eager: true, import: "default" }) as Record<
  string,
  string
>;
const FRAME_URLS = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

/**
 * Same "scroll drives the drawing" effect as VillaVideo, but backed by a
 * preloaded image sequence instead of video.currentTime scrubbing.
 */
export default function VillaFrames({ progress }: VillaFramesProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const loadedRef = useRef<boolean[]>(new Array(FRAME_URLS.length).fill(false));
  const shownIndexRef = useRef(-1);

  useEffect(() => {
    let cancelled = false;
    FRAME_URLS.forEach((url, i) => {
      const img = new Image();
      img.onload = () => {
        if (!cancelled) loadedRef.current[i] = true;
      };
      img.src = url;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const target = Math.round(progress * (FRAME_URLS.length - 1));
    let index = target;
    while (index > 0 && !loadedRef.current[index]) index--;
    if (index !== shownIndexRef.current && imgRef.current) {
      imgRef.current.src = FRAME_URLS[index];
      shownIndexRef.current = index;
    }
  }, [progress]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <img ref={imgRef} src={FRAME_URLS[0]} alt="" className="h-full w-full object-cover" />
      {/* Covers the source video's watermark with our own mark. */}
      <div className="absolute bottom-4 right-4 flex h-12 w-12 translate-x-[-60%] translate-y-[-65%] items-center justify-center rounded-xl bg-ink/90 shadow-lg backdrop-blur-sm sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 md:bottom-8 md:right-10 md:h-20 md:w-20">
        <img src={noyMark} alt="" width={600} height={427} className="h-2/3 w-2/3 object-contain" />
      </div>
    </div>
  );
}
