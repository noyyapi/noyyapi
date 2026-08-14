import { useRef } from "react";
import { ArrowRight, ChevronsDown, PencilRuler, PhoneCall, Ruler, Sparkles } from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { BEATS } from "../lib/beats";
import VillaVideo from "./VillaVideo";
import { ReadabilityScrim } from "./StageOverlays";
import ScrollRail from "./ScrollRail";
import BeatBlock from "./BeatBlock";

function railLabel(progress: number) {
  if (progress < BEATS.design[0]) return "GİRİŞ";
  if (progress < BEATS.frame[0]) return "TASARIM";
  if (progress < BEATS.cladding[0]) return "ÇELİK İSKELET";
  if (progress < BEATS.handover[0]) return "KAPLAMA";
  return "TESLİM";
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);

  // Switch points sit at the midpoint of each gap between beats so that
  // exactly one beat is ever active at a time — otherwise two captions
  // render at full opacity simultaneously during the shared buffer zone.
  const designFrameSwitch = (BEATS.design[1] + BEATS.frame[0]) / 2;
  const frameCladdingSwitch = (BEATS.frame[1] + BEATS.cladding[0]) / 2;
  const claddingHandoverSwitch = (BEATS.cladding[1] + BEATS.handover[0]) / 2;

  const heroActive = progress < BEATS.design[0];
  const designActive = progress >= BEATS.design[0] && progress < designFrameSwitch;
  const frameActive = progress >= designFrameSwitch && progress < frameCladdingSwitch;
  const claddingActive = progress >= frameCladdingSwitch && progress < claddingHandoverSwitch;
  const handoverActive = progress >= claddingHandoverSwitch;

  return (
    <section id="top" ref={containerRef} className="relative h-[360vh] md:h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <VillaVideo progress={progress} />
        <ReadabilityScrim />

        {/* Hero beat */}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-start justify-end px-4 pb-20 transition-opacity duration-700 sm:px-6 md:px-12 md:pb-28 ${
            heroActive ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="relative max-w-3xl">
            <div
              className="font-mono-label animate-blur-fade-up mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-white/50"
              style={{ animationDelay: "300ms", textShadow: "0 1px 12px rgba(0,0,0,0.85)" }}
            >
              <span className="flex items-center gap-1.5">
                <Ruler size={14} /> ÖLÇEK 1:1
              </span>
              <span className="flex items-center gap-1.5">
                <PencilRuler size={14} /> PROJE NO 001
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} /> REV. A
              </span>
            </div>
            <div className="rule animate-draw-line mb-5 w-28" />
            <h1
              className="font-display animate-blur-fade-up mb-5 text-5xl font-light leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ animationDelay: "450ms", textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}
            >
              Siz hayal edin, <span className="accent-word">biz yapalım</span>.
            </h1>
            <p
              className="font-display animate-blur-fade-up mt-5 max-w-lg text-base text-white/60 sm:text-lg"
              style={{ animationDelay: "560ms", textShadow: "0 1px 14px rgba(0,0,0,0.85)" }}
            >
              Her hafif çelik yapı, tek tek birleşen parçalardan doğar. Kaydırarak izleyin.
            </p>
            <div
              className="font-mono-label animate-blur-fade-up mt-8 flex items-center gap-2 text-[11px] tracking-[0.3em] text-white/40"
              style={{ animationDelay: "680ms", textShadow: "0 1px 12px rgba(0,0,0,0.85)" }}
            >
              AŞAĞI KAYDIR
              <ChevronsDown size={16} className="animate-bounce-down" />
            </div>
          </div>
        </div>

        <BeatBlock
          active={designActive}
          align="left"
          kicker="01 · TASARIM"
          heading={<>Bir fikirle <span className="accent-word">başlar</span>.</>}
          sub="Mimari proje ve statik hesaplarla hayalinizdeki yapı kağıt üzerinde şekillenir."
          specs={[
            { label: "PROJE · MİMARİ", value: "mimari" },
            { label: "HESAP · STATİK", value: "statik" },
            { label: "SÜREÇ · İZİNLİ", value: "izinli" },
          ]}
        />

        <BeatBlock
          active={frameActive}
          align="left"
          kicker="02 · ÇELİK İSKELET"
          heading={<>İskelet <span className="accent-word">yükselir</span>.</>}
          sub="Hafif çelik profiller fabrikada hazırlanır, sahada hızla monte edilir."
          specs={[
            { label: "DEPREME DAYANIKLI ÇELİK YAPILAR", value: "" },
            { label: "HIZLI MONTAJ VE GÜVENLİ TESLİMAT", value: "" },
            { label: "EKONOMİK VE ERGONOMİK", value: "" },
          ]}
        />

        <BeatBlock
          active={claddingActive}
          align="left"
          kicker="03 · KAPLAMA & YALITIM"
          heading={<>Dış ve cephe <span className="accent-word">kaplaması</span>.</>}
          sub="Isı ve su yalıtımlı paneller ile yapı her mevsime hazır hale gelir."
          specs={[
            { label: "YALITIM · ISI / SU", value: "" },
            { label: "CEPHE · KOMPOZİT", value: "" },
            { label: "ENERJİ · A SINIFI", value: "" },
          ]}
        />

        <BeatBlock
          active={handoverActive}
          align="left"
          kicker="04 · TESLİM"
          heading={
            <>
              Anahtar <span className="accent-word">elinizde</span>.
            </>
          }
          sub="Kontrolden geçmiş, eksiksiz ve anahtar teslim. Hayaliniz artık gerçek."
          specs={[]}
          renderExtra={(hasEntered) => (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#hizmetler"
                className={`bg-gold flex items-center gap-2 rounded-full px-7 py-3 font-medium text-ink ${
                  hasEntered ? "animate-blur-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: "560ms" }}
              >
                Hizmetlerimizi Gör
                <ArrowRight size={18} />
              </a>
              <a
                href="#iletisim"
                className={`liquid-glass flex items-center gap-2 rounded-full px-7 py-3 text-white ${
                  hasEntered ? "animate-blur-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: "680ms" }}
              >
                <PhoneCall size={18} />
                Bize Ulaşın
              </a>
            </div>
          )}
        />

        <ScrollRail progress={progress} label={railLabel(progress)} />
      </div>
    </section>
  );
}
