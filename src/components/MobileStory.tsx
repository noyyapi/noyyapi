import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Blocks,
  ChevronsDown,
  Compass,
  KeyRound,
  Layers,
  PencilRuler,
  PhoneCall,
  Ruler,
  Sparkles,
} from "lucide-react";
import villaVideoSrc from "../assets/villa-build.mp4";
import { ReadabilityScrim } from "./StageOverlays";

interface Beat {
  Icon: typeof Compass;
  kicker: string;
  heading: ReactNode;
  sub: string;
  specs: string[];
}

const BEATS: Beat[] = [
  {
    Icon: Compass,
    kicker: "01 · TASARIM",
    heading: (
      <>
        Bir fikirle <span className="accent-word">başlar</span>.
      </>
    ),
    sub: "Mimari proje ve statik hesaplarla hayalinizdeki yapı kağıt üzerinde şekillenir.",
    specs: ["PROJE · MİMARİ", "HESAP · STATİK", "SÜREÇ · İZİNLİ"],
  },
  {
    Icon: Blocks,
    kicker: "02 · ÇELİK İSKELET",
    heading: (
      <>
        İskelet <span className="accent-word">yükselir</span>.
      </>
    ),
    sub: "Hafif çelik profiller fabrikada hazırlanır, sahada hızla monte edilir.",
    specs: ["DEPREME DAYANIKLI ÇELİK YAPILAR", "HIZLI MONTAJ VE GÜVENLİ TESLİMAT", "EKONOMİK VE ERGONOMİK"],
  },
  {
    Icon: Layers,
    kicker: "03 · KAPLAMA & YALITIM",
    heading: (
      <>
        Dış ve cephe <span className="accent-word">kaplaması</span>.
      </>
    ),
    sub: "Isı ve su yalıtımlı paneller ile yapı her mevsime hazır hale gelir.",
    specs: ["YALITIM · ISI / SU", "CEPHE · KOMPOZİT", "ENERJİ · A SINIFI"],
  },
  {
    Icon: KeyRound,
    kicker: "04 · TESLİM",
    heading: (
      <>
        Anahtar <span className="accent-word">elinizde</span>.
      </>
    ),
    sub: "Kontrolden geçmiş, eksiksiz ve anahtar teslim. Hayaliniz artık gerçek.",
    specs: [],
  },
];

function RevealSection({ children, tone }: { children: ReactNode; tone: "ink" | "soft" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative px-4 py-16 sm:px-6 ${tone === "ink" ? "bg-ink" : "bg-ink-soft"} ${
        visible ? "animate-blur-fade-up" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function BeatSection({ beat, tone }: { beat: Beat; tone: "ink" | "soft" }) {
  const { Icon, kicker, heading, sub, specs } = beat;
  return (
    <RevealSection tone={tone}>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-soft">
        <Icon size={22} className="text-gold" strokeWidth={1.5} />
      </div>
      <div className="font-mono-label mb-3 text-[11px] uppercase tracking-[0.32em] text-gold">{kicker}</div>
      <div className="rule mb-5 w-20" />
      <h3 className="font-display mb-4 text-3xl font-light leading-[1.05] tracking-[-0.03em] text-white">
        {heading}
      </h3>
      <p className="font-display mb-6 max-w-md text-base leading-relaxed text-white/60">{sub}</p>
      {specs.length > 0 && (
        <div className="flex flex-col gap-2">
          {specs.map((s) => (
            <div key={s} className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/50">
              — {s}
            </div>
          ))}
        </div>
      )}
      {specs.length === 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <a
            href="#hizmetler"
            className="bg-gold flex items-center gap-2 rounded-full px-6 py-3 font-medium text-ink"
          >
            Hizmetlerimizi Gör
            <ArrowRight size={16} />
          </a>
          <a
            href="#iletisim"
            className="liquid-glass flex items-center gap-2 rounded-full px-6 py-3 text-white"
          >
            <PhoneCall size={16} />
            Bize Ulaşın
          </a>
        </div>
      )}
    </RevealSection>
  );
}

/**
 * Mobile gets its own, much simpler story: the video autoplays once on its
 * own (native playback — no scroll-driven seeking, no JS in the scroll
 * path at all) and the beats that were pinned/overlaid captions on desktop
 * become normal stacked sections that fade in via IntersectionObserver as
 * you reach them. Touch scrolling stays 100% native and untouched by JS,
 * which is the only way to guarantee it feels as smooth as every other app
 * on the phone.
 */
export default function MobileStory() {
  return (
    <section id="top" className="relative">
      <div className="relative h-screen w-full overflow-hidden">
        <video
          src={villaVideoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <ReadabilityScrim />

        <div className="relative z-10 flex h-full flex-col items-start justify-end px-4 pb-16 sm:px-6">
          <div
            className="font-mono-label mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/50"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.85)" }}
          >
            <span className="flex items-center gap-1.5">
              <Ruler size={13} /> ÖLÇEK 1:1
            </span>
            <span className="flex items-center gap-1.5">
              <PencilRuler size={13} /> PROJE NO 001
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} /> REV. A
            </span>
          </div>
          <div className="rule mb-5 w-24" />
          <h1
            className="font-display mb-4 text-5xl font-light leading-[0.95] tracking-[-0.03em] text-white"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}
          >
            Siz hayal edin, <span className="accent-word">biz yapalım</span>.
          </h1>
          <p
            className="font-display mb-8 max-w-sm text-base text-white/60"
            style={{ textShadow: "0 1px 14px rgba(0,0,0,0.85)" }}
          >
            Her hafif çelik yapı, tek tek birleşen parçalardan doğar.
          </p>
          <div
            className="font-mono-label flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.85)" }}
          >
            AŞAĞI KAYDIR
            <ChevronsDown size={15} className="animate-bounce-down" />
          </div>
        </div>
      </div>

      {BEATS.map((beat, i) => (
        <BeatSection key={beat.kicker} beat={beat} tone={i % 2 === 0 ? "ink" : "soft"} />
      ))}
    </section>
  );
}
