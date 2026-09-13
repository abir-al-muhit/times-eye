import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { frameTones, lensTypes } from "../data/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

// ============================================================
// SIGNATURE MOMENT — the live Lens & Frame configurator.
// Pick a lens type and the lens tint visibly changes on the
// glasses below; pick a frame tone and the frame recolours.
// The GlassesBD "same model color changing" idea, elevated to
// an interactive lab-like tool. All lens+frame in ONE data file.
// ============================================================

function Glasses({ tint, frame, ridge }: { tint: string; frame: string; ridge?: boolean }) {
  return (
    <svg viewBox="0 0 520 300" className="w-full max-w-md h-auto" aria-hidden>
      <defs>
        {/* soft floor shadow */}
        <radialGradient id="floor" cx="50%" cy="100%" r="90%">
          <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* lens specular gradient */}
        <linearGradient id="spec" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* floor reflection */}
      <ellipse cx="260" cy="272" rx="210" ry="14" fill="url(#floor)" />

      {/* left lens */}
      <ellipse cx="150" cy="150" rx="104" ry="118" fill={tint} stroke={frame} strokeWidth="7" />
      <ellipse cx="150" cy="150" rx="104" ry="118" fill="url(#spec)" opacity="0.6" />

      {/* right lens */}
      <ellipse cx="370" cy="150" rx="104" ry="118" fill={tint} stroke={frame} strokeWidth="7" />
      <ellipse cx="370" cy="150" rx="104" ry="118" fill="url(#spec)" opacity="0.6" />

      {/* bridge */}
      <path d="M254 128 C 258 118, 262 118, 266 128 L 266 138" fill="none" stroke={frame} strokeWidth="9" strokeLinecap="round" />

      {/* temples */}
      <path d="M46 130 C 12 126, 6 108, 8 76" fill="none" stroke={frame} strokeWidth="9" strokeLinecap="round" />
      <path d="M474 130 C 508 126, 514 108, 512 76" fill="none" stroke={frame} strokeWidth="9" strokeLinecap="round" />

      {/* multi-coat rainbow ridge */}
      {ridge && (
        <g>
          <path d="M50 100 C 130 56, 250 40, 470 96" fill="none" stroke="rgba(127,227,216,0.55)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M40 118 C 140 78, 270 64, 480 114" fill="none" stroke="rgba(90,167,255,0.5)" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {/* lens highlight line */}
      <ellipse cx="118" cy="118" rx="34" ry="44" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
      <ellipse cx="402" cy="118" rx="34" ry="44" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
    </svg>
  );
}

export default function LensConfigurator() {
  const [lens, setLens] = useState(lensTypes[4]); // default: Blue Cut + Photosun
  const [frame, setFrame] = useState(frameTones[0]); // default: Onyx

  return (
    <div className="relative">
      {/* glass-reveal behind — slightly lifted so the onyx frame reads */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-3xl border border-line bg-gradient-to-b from-panel to-onyx shadow-[0_30px_80px_-30px_rgba(57,208,192,0.15)]"
      />
      <div className="text-center">
        <div className="relative mx-auto px-6 pt-6 pb-2">
          <motion.div
            key={lens.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Glasses tint={lens.tint} frame={frame.stroke} ridge={lens.ridge} />
          </motion.div>
        </div>

        {/* active readout */}
        <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6">
          <span className="eyebrow text-[0.6rem] text-cyan">{lens.name.toUpperCase()}</span>
          <span className="h-1 w-1 rounded-full bg-ink/30" />
          <span className="eyebrow text-[0.6rem] text-ink-soft">{frame.name.toUpperCase()} FRAME</span>
        </div>

        {/* lens picker */}
        <div className="px-4 pb-6 pt-5">
          <div className="eyebrow mb-3 text-center text-[0.58rem] text-smoke">1 · CHOOSE YOUR LENS</div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {lensTypes.map((l) => (
              <button
                key={l.id}
                onClick={() => setLens(l)}
                className={`w-full rounded-full border px-2 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                  lens.id === l.id
                    ? "border-cyan bg-cyan text-canvas"
                    : "border-line bg-canvas/60 text-ink-soft hover:border-cyan/50 hover:text-ink"
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>

          {/* frame picker */}
          <div className="eyebrow mb-3 mt-6 text-center text-[0.58rem] text-smoke">2 · PICK A FRAME</div>
          <div className="flex justify-center gap-3">
            {frameTones.map((f) => (
              <button
                key={f.id}
                onClick={() => setFrame(f)}
                aria-label={f.name}
                className={`h-8 w-8 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
                  frame.id === f.id ? "scale-110 border-cyan" : "border-line"
                }`}
                style={{ background: f.stroke }}
              />
            ))}
          </div>

          {/* blurb */}
          <AnimatePresence mode="wait">
            <motion.p
              key={lens.id + frame.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mx-auto mt-5 max-w-sm text-[13px] leading-relaxed text-ink-soft"
            >
              {lens.blurb}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}