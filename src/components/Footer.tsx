import noyMark from "../assets/noy-mark.png";

export default function Footer() {
  return (
    <footer className="relative bg-ink px-4 pt-10 sm:px-6 md:px-12">
      <div className="rule mb-8" />
      <div className="flex flex-col items-center justify-between gap-6 pb-10 text-xs text-white/40 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={noyMark} alt="NOY Yapı logosu" width={600} height={427} className="h-6 w-auto opacity-80" loading="lazy" />
          <span className="font-mono-label tracking-[0.15em]">
            © 2026 Noy Yapı Tüm hakları saklıdır.
          </span>
        </div>
        <div className="font-mono-label flex items-center gap-4 tracking-[0.15em]">
          <a href="#hizmetler" className="transition-colors hover:text-white">
            Hizmetler
          </a>
          <a href="#hakkimizda" className="transition-colors hover:text-white">
            Hakkımızda
          </a>
          <a href="#iletisim" className="transition-colors hover:text-white">
            İletişim
          </a>
        </div>
      </div>
    </footer>
  );
}
