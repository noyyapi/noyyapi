import { Fragment, useEffect, useState, type ReactNode } from "react";

export interface SpecItem {
  label: string;
  value: string;
}

interface BeatBlockProps {
  active: boolean;
  align: "left" | "right" | "center";
  kicker: string;
  heading: ReactNode;
  sub: string;
  specs: SpecItem[];
  renderExtra?: (hasEntered: boolean) => ReactNode;
}

function SpecRow({ specs, hasEntered }: { specs: SpecItem[]; hasEntered: boolean }) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-6 ${
        hasEntered ? "animate-blur-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: "440ms" }}
    >
      {specs.map((s, i) => (
        <Fragment key={s.label}>
          {i > 0 && <div className="rule sm:hidden" />}
          {i > 0 && <div className="rule-v hidden h-10 sm:block" />}
          <div className="font-mono-label whitespace-nowrap text-[11px] uppercase tracking-[0.22em] text-white/70">
            {s.label}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default function BeatBlock({ active, align, kicker, heading, sub, specs, renderExtra }: BeatBlockProps) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (active && !hasEntered) setHasEntered(true);
  }, [active, hasEntered]);

  const justify = align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";

  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col justify-end px-4 pb-20 transition-opacity duration-700 ease-out sm:px-6 md:px-12 md:pb-28 lg:pr-28 ${justify} ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className={`relative max-w-md ${align === "right" ? "ml-auto" : align === "center" ? "mx-auto max-w-lg" : ""}`}>
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-4xl bg-ink/55 blur-2xl" />
        <div
          className={`font-mono-label mb-3 text-[11px] uppercase tracking-[0.32em] text-gold ${
            hasEntered ? "animate-blur-fade-up" : "opacity-0"
          }`}
        >
          {kicker}
        </div>
        <div
          className={`rule mb-5 w-24 ${hasEntered ? "animate-draw-line" : "scale-x-0"}`}
          style={{ animationDelay: "120ms" }}
        />
        <h3
          className={`font-display mb-4 text-3xl font-light leading-[0.98] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl ${
            hasEntered ? "animate-blur-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          {heading}
        </h3>
        <p
          className={`font-display mb-8 text-base text-white/60 sm:text-lg ${
            hasEntered ? "animate-blur-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "320ms" }}
        >
          {sub}
        </p>
        <SpecRow specs={specs} hasEntered={hasEntered} />
        {renderExtra?.(hasEntered)}
      </div>
    </div>
  );
}
