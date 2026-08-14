import { useState } from "react";
import { Menu, X } from "lucide-react";
import noyMark from "../assets/noy-mark.png";
import { InstagramIcon, WhatsappIcon } from "./BrandIcons";

const LINKS = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "İletişim", href: "#iletisim" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/noyyapi/", Icon: InstagramIcon },
  { label: "WhatsApp", href: "https://wa.me/905461711656", Icon: WhatsappIcon },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
        <a
          href="#top"
          className="animate-blur-fade-up flex items-center gap-3"
          style={{ animationDelay: "0ms" }}
        >
          <img src={noyMark} alt="NOY Yapı logosu" width={600} height={427} className="h-8 w-auto sm:h-9" />
          <div className="rule-v h-6" />
          <span className="font-mono-label text-[9px] tracking-[0.15em] text-gold-dim sm:text-[11px] sm:tracking-[0.28em]">
            NAİF OĞULLARI YAPI
          </span>
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/60 transition-colors hover:text-gold"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="rule-v h-5" />

          <div className="flex items-center gap-8">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="animate-blur-fade-up font-display text-sm text-white/70 transition-colors hover:text-white"
                style={{ animationDelay: `${100 + i * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
          className="liquid-glass animate-blur-fade-up flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
          style={{ animationDelay: "300ms" }}
        >
          <span
            className="grid place-items-center transition-transform duration-500"
            style={{ transform: open ? "rotate(180deg) scale(0.5)" : "none" }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden bg-ink/95 backdrop-blur transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 pb-6 pt-2 sm:px-6">
          <div className="mb-2 flex items-center gap-5 border-b border-white/10 pb-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => setOpen(false)}
                className="text-white/70 transition-colors hover:text-gold"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-white/10 py-3 text-white/80"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
