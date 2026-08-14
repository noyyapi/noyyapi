import { useEffect, useRef, useState } from "react";
import {
  Blocks,
  Compass,
  Factory,
  Home,
  Hotel,
  KeyRound,
  Package,
  PartyPopper,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

const SERVICES: Array<{ title: string; desc: string; icon: LucideIcon }> = [
  { title: "Fabrikalar", desc: "Endüstriyel tesisler için hızlı ve dayanıklı hafif çelik yapılar.", icon: Factory },
  { title: "Depolama Alanları", desc: "Geniş açıklıklı, esnek kullanımlı depo ve antrepo yapıları.", icon: Warehouse },
  { title: "Oteller", desc: "Konaklama tesisleri için hızlı inşa, uzun ömürlü çelik konstrüksiyon.", icon: Hotel },
  { title: "Düğün Salonları", desc: "Geniş açıklıklı, estetik ve işlevsel etkinlik alanları.", icon: PartyPopper },
  { title: "Prefabrik Yapılar", desc: "Fabrikada üretim, sahada hızlı montaj: zamandan tasarruf.", icon: Blocks },
  { title: "Villa Projeleri", desc: "Hafif çelik villalar: enerji verimli, depreme dayanıklı, şık tasarım.", icon: Home },
  { title: "Mimarlık & Proje", desc: "Anahtar teslime giden yolda mimari ve statik proje çözümleri.", icon: Compass },
  { title: "Anahtar Teslim Çözümler", desc: "Tasarımdan teslimata, tüm süreci tek elden yönetiyoruz.", icon: KeyRound },
  { title: "Yapı Malzemesi Satışı", desc: "Hafif çelik ve yapı malzemelerinde toptan / perakende satış.", icon: Package },
];

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = service.icon;

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`liquid-glass rounded-2xl p-6 ${visible ? "animate-blur-fade-up" : "opacity-0"}`}
      style={{ animationDelay: `${(index % 3) * 100}ms` }}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-ink-soft">
        <Icon size={26} className="text-gold" strokeWidth={1.5} />
      </div>
      <h3 className="font-display mb-2 text-xl font-medium text-white">{service.title}</h3>
      <p className="font-display text-sm leading-relaxed text-white/55">{service.desc}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="hizmetler" className="relative bg-ink px-4 py-24 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="font-mono-label mb-3 text-[11px] uppercase tracking-[0.32em] text-gold">
          NE YAPIYORUZ
        </div>
        <div className="rule mb-6 w-24" />
        <h2 className="font-display mb-4 max-w-2xl text-4xl font-light tracking-[-0.03em] text-white sm:text-5xl">
          Hafif çelikten, <span className="accent-word">her ölçekte</span> yapı.
        </h2>
        <p className="font-display mb-14 max-w-xl text-base text-white/60 sm:text-lg">
          Villadan fabrikaya, oteldan depolama alanına, projelendirmeden anahtar teslime kadar
          tüm süreci hafif çelik teknolojisiyle yönetiyoruz. Ayrıca yapı malzemesi satışı yapıyoruz.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
