interface ScrollRailProps {
  progress: number;
  label: string;
}

export default function ScrollRail({ progress, label }: ScrollRailProps) {
  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      <div className="h-40 w-px overflow-hidden bg-white/10">
        <div
          className="w-full bg-gold"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="font-mono-label max-w-[8ch] text-center text-[10px] uppercase tracking-[0.25em] text-white/45">
        {label}
      </span>
    </div>
  );
}
