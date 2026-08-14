const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
  );

export function ReadabilityScrim() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-2 backdrop-blur-[1px]"
      style={{
        background: "linear-gradient(to top, rgba(6,7,9,0.75) 0%, transparent 42%)",
        maskImage: "linear-gradient(to top, black 0%, transparent 42%)",
        WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 42%)",
      }}
    />
  );
}

export function Grain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-3"
      style={{
        opacity: 0.05,
        mixBlendMode: "overlay",
        backgroundImage: `url("${GRAIN_SVG}")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}
