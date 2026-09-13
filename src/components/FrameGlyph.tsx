// Shared frame glyph — clean line-art aviator/round/square/cat.
type Props = { shape?: string; stroke?: string; className?: string; fill?: string };
const VIEW = 200;

function LensPair({ shape, stroke, fill }: { shape: string; stroke: string; fill: string }) {
  const s = stroke || "#201a13";
  const f = fill || "rgba(32,26,19,0.04)";
  const common = { stroke: s, strokeWidth: 6, fill: f };
  switch (shape) {
    case "round":
      return (
        <g>
          <circle cx="66" cy="60" r="52" {...common} />
          <circle cx="134" cy="60" r="52" {...common} />
          <path d="M118 30 c 5 -10, 12 -10, 17 0" fill="none" stroke={s} strokeWidth="6" />
        </g>
      );
    case "square":
      return (
        <g>
          <rect x="14" y="20" width="104" height="88" rx="18" {...common} />
          <rect x="82" y="20" width="104" height="88" rx="18" {...common} />
          <path d="M96 26 c 4 -10, 12 -10, 18 0" fill="none" stroke={s} strokeWidth="6" />
        </g>
      );
    case "cat":
      return (
        <g>
          <path d="M4 44 C 16 18, 60 22, 74 46 L 70 104 C 52 112, 24 108, 12 92 Z" {...common} />
          <path d="M126 46 C 140 22, 184 18, 196 44 L 196 88 C 184 108, 152 112, 134 102 L 130 46 Z" {...common} />
          <path d="M76 40 C 96 26, 104 26, 124 40" fill="none" stroke={s} strokeWidth="6" />
        </g>
      );
    default:
      // aviator
      return (
        <g>
          <ellipse cx="62" cy="66" rx="52" ry="48" {...common} />
          <ellipse cx="138" cy="66" rx="52" ry="48" {...common} />
          <path d="M114 46 c 3 -12, 10 -12, 16 0" fill="none" stroke={s} strokeWidth="6" />
        </g>
      );
  }
}

export default function FrameGlyph({ shape, stroke, className, fill }: Props) {
  return (
    <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className={className} aria-hidden>
      <LensPair shape={shape || "aviator"} stroke={stroke || "#201a13"} fill={fill || "rgba(32,26,19,0.04)"} />
    </svg>
  );
}