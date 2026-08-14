import { Award, Cpu, PencilRuler, ShieldCheck } from "lucide-react";
import noyLockup from "../assets/noy-lockup.png";

const VALUES = [
  { title: "Güven", desc: "Sözleşmeden teslimata, şeffaf ve zamanında iş takibi.", Icon: ShieldCheck },
  { title: "Kalite", desc: "Sertifikalı malzeme ve titiz uygulama standartları.", Icon: Award },
  { title: "Dizayn", desc: "Fonksiyonel ve estetik mimari çözümler.", Icon: PencilRuler },
  { title: "Teknoloji", desc: "Hafif çelik mühendisliğinde güncel yöntemler.", Icon: Cpu },
];

const STATS = [
  { value: "50+", label: "TAMAMLANAN PROJE" },
  { value: "10+", label: "YIL TECRÜBE" },
  { value: "15 - 60", label: "ORTALAMA GÜN MONTAJ" },
];

export default function About() {
  return (
    <section id="hakkimizda" className="relative bg-ink-soft px-4 py-24 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="font-mono-label mb-3 text-[11px] uppercase tracking-[0.32em] text-gold">
            HAKKIMIZDA
          </div>
          <div className="rule mb-6 w-24" />
          <h2 className="font-display mb-6 text-4xl font-light tracking-[-0.03em] text-white sm:text-5xl">
            Naif Oğulları'ndan, <span className="accent-word">geleceğin</span> yapılarına.
          </h2>
          <p className="font-display mb-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            NOY Yapı, hafif çelik konstrüksiyon alanında villa, fabrika, otel, depolama alanı,
            düğün salonu ve prefabrik yapı projelerini anahtar teslim olarak hayata geçirir. Mimari
            projeden statik hesaba, üretimden montaja kadar tüm süreci kendi bünyemizde yönetir;
            ayrıca yapı malzemesi tedariki de sağlarız.
          </p>
          <p className="font-display mb-10 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Güven, kalite, dizayn ve teknolojiyi tek çatı altında birleştirerek, hızlı, dayanıklı ve
            enerji verimli yapılar üretiyoruz.
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-x-10">
                <div>
                  <div className="font-display text-3xl font-light text-white">{s.value}</div>
                  <div className="font-mono-label mt-1 text-[10px] tracking-[0.2em] text-white/45">
                    {s.label}
                  </div>
                </div>
                {i < STATS.length - 1 && <div className="rule-v hidden h-10 sm:block" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="liquid-glass mb-8 flex items-center justify-center rounded-2xl px-8 py-14">
            <img
              src={noyLockup}
              alt="NOY Yapı, Naif Oğulları Yapı - hafif çelik villa ve yapı çözümleri"
              width={1200}
              height={913}
              className="w-full max-w-xs"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {VALUES.map(({ title, desc, Icon }) => (
              <div key={title} className="liquid-glass rounded-xl p-5">
                <Icon size={22} className="text-gold mb-3" strokeWidth={1.5} />
                <div className="font-display text-base font-medium text-white">{title}</div>
                <div className="font-display mt-1 text-xs leading-relaxed text-white/50">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
