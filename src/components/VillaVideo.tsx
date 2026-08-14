import { useEffect, useRef, useState } from "react";
import villaVideoSrc from "../assets/villa-build.mp4";
import noyMark from "../assets/noy-mark.png";

interface VillaVideoProps {
  progress: number;
}

// Scrubbing currentTime on every animation frame (~60/s) forces the decoder
// to seek-and-decode that often. The source video is encoded all-intra
// (every frame a keyframe) specifically so each seek is a cheap direct
// decode instead of walking a GOP chain, but capping the rate still avoids
// firing more seeks than the eye can tell apart.
const SEEK_INTERVAL_MS = 1000 / 24;

/**
 * Scrubs the villa-build video frame-by-frame against scroll progress,
 * instead of letting it play: same "scroll drives the drawing" feel the
 * old SVG animation had, now driven by video.currentTime.
 */
export default function VillaVideo({ progress }: VillaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const lastSeekAtRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => setDuration(video.duration);
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) setDuration(video.duration);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const now = performance.now();
    if (now - lastSeekAtRef.current < SEEK_INTERVAL_MS) return;
    const target = progress * duration;
    if (Math.abs(video.currentTime - target) > 0.03) {
      video.currentTime = target;
      lastSeekAtRef.current = now;
    }
  }, [progress, duration]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        src={villaVideoSrc}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      />
      {/* Covers the source video's watermark with our own mark. */}
      <div className="absolute bottom-4 right-4 flex h-12 w-12 translate-x-[-60%] translate-y-[-65%] items-center justify-center rounded-xl bg-ink/90 shadow-lg backdrop-blur-sm sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 md:bottom-8 md:right-10 md:h-20 md:w-20">
        <img src={noyMark} alt="" width={600} height={427} className="h-2/3 w-2/3 object-contain" />
      </div>
    </div>
  );
}
