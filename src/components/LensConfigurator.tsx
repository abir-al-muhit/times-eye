import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { frameTones, lensTypes } from "../data/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

// ============================================================
// SIGNATURE MOMENT — the live Lens & Frame configurator.
// Pick a lens type and the lens tint visibly changes; pick a
// frame tone and the frame recolours. GlassesBD's "same model
// color changing", elevated into a clean optician's tool.
// All lens + frame data lives in ONE data file.
// ============================================================

function Glasses({ tint, frame, ridge }: { tint: string; frame: string; ridge?: boolean }) {
  return (
    <svg viewBox="0 0 520 300" className="w-full max-w-md h-auto" aria-hidden>
      <defs>
        {/* soft floor shadow */}
        <radialGradient id="floor" cx="50%" cy="100%" r="90%">
          <stop offset="0%" stopColor="var(--color-tortoise)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* lens specular gradient */}
        <linearGradient id="spec" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <ellipse cx="260" cy="272" rx="210" ry="14" fill="url(#floor)" />

      {/* left lens */}
      <ellipse cx="150" cy="150" rx="104" ry="118" fill={tint} stroke={frame} strokeWidth="7" />
      <ellipse cx="150" cy="150" rx="104" ry="118" fill="url(#spec)" opacity="0.5" />

      {/* right lens */}
      <ellipse cx="370" cy="150" rx="104" ry="118" fill={tint} stroke={frame} strokeWidth="7" />
      <ellipse cx="370" cy="150" rx="104" ry="118" fill="url(#spec)" opacity="0.5" />

      {/* bridge */}
      <path d="M254 128 C 258 118, 262 118, 266 128 L 266 138" fill="none" stroke={frame} strokeWidth="9" strokeLinecap="round" />

      {/* temples */}
      <path d="M46 130 C 12 126, 6 108, 8 76" fill="none" stroke={frame} strokeWidth="9" strokeLinecap="round" />
      <path d="M474 130 C 508 126, 514 108, 512 76" fill="none" stroke={frame} strokeWidth="9" strokeLinecap="round" />

      {/* multi-coat ridge */}
      {ridge && (
        <g>
          <path d="M50 100 C 130 56, 250 40, 470 96" fill="none" stroke="rgba(168,106,42,0.5)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M40 118 C 140 78, 270 64, 480 114" fill="none" stroke="rgba(32,26,19,0.3)" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {/* lens highlight line */}
      <ellipse cx="118" cy="118" rx="34" ry="44" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
      <ellipse cx="402" cy="118" rx="34" ry="44" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
    </svg>
  );
}

export default function LensConfigurator() {
  const [lens, setLens] = useState(lensTypes[4]); // default: Blue Cut + Photosun
  const [frame, setFrame] = useState(frameTones[0]); // default: Onyx

  return (
    <div className="relative">
      <div className="lens-card relative rounded-[28px] p-6 sm:p-8">
        <div className="text-center">
          <div className="relative mx-auto pt-2">
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
          <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="eyebrow text-tortoise-deep">{lens.name.toUpperCase()}</span>
            <span className="h-1 w-1 rounded-full bg-ink/30" />
            <span className="eyebrow text-ink">{frame.name.toUpperCase()} FRAME</span>
          </div>

          {/* lens picker */}
          <div className="pt-6">
            <div className="eyebrow mb-3 text-center text-ink-soft">1 · CHOOSE YOUR LENS</div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {lensTypes.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLens(l)}
                  className={`w-full rounded-full border px-2 py-2.5 text-xs font-bold tracking-wide transition-all duration-300 ${
                    lens.id === l.id
                      ? "border-tortoise bg-tortoise-deep text-canvas"
                      : "border-line-strong bg-white text-ink hover:border-tortoise hover:text-tortoise"
                  }`}
                >
                  {l.short}
                </button>
              ))}
            </div>

            {/* frame picker */}
            <div className="eyebrow mb-3 mt-6 text-center text-ink-soft">2 · PICK A FRAME</div>
            <div className="flex justify-center gap-3">
              {frameTones.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrame(f)}
                  aria-label={f.name}
                  className={`h-8 w-8 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
                    frame.id === f.id ? "scale-110 border-tortoise" : "border-line-strong"
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
                className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink-soft"
              >
                {lens.blurb}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}