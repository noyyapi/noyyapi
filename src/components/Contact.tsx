import { Mail, MapPin } from "lucide-react";
import { WhatsappIcon } from "./BrandIcons";

const CONTACT_WHATSAPP_HREF = "https://wa.me/905461711656";
const CONTACT_EMAIL = "noyyapiiletisim@gmail.com";

const CARDS = [
  {
    Icon: WhatsappIcon,
    title: "WhatsApp",
    value: "Bizimle WhatsApp üzerinden iletişime geçin",
    href: CONTACT_WHATSAPP_HREF,
  },
  {
    Icon: Mail,
    title: "E-posta",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    Icon: MapPin,
    title: "Hizmet Bölgesi",
    value: "Türkiye Geneli",
    href: undefined,
  },
];

export default function Contact() {
  return (
    <section id="iletisim" className="relative bg-ink-soft px-4 py-24 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="font-mono-label mb-3 text-[11px] uppercase tracking-[0.32em] text-gold">
          İLETİŞİM
        </div>
        <div className="rule mb-6 w-24" />
        <h2 className="font-display mb-14 max-w-2xl text-4xl font-light tracking-[-0.03em] text-white sm:text-5xl">
          Konuşalım, <span className="accent-word">birlikte</span> inşa edelim.
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CARDS.map(({ Icon, title, value, href }) => {
            const Wrapper = href ? "a" : "div";
            return (
              <Wrapper
                key={title}
                {...(href ? { href } : {})}
                className="liquid-glass rounded-2xl p-7 transition-opacity hover:opacity-90"
              >
                <Icon size={24} className="text-gold mb-4" strokeWidth={1.5} />
                <div className="font-mono-label mb-1 text-[10px] uppercase tracking-[0.25em] text-white/45">
                  {title}
                </div>
                <div className="font-display text-lg text-white">{value}</div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
