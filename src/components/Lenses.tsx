import { motion } from "framer-motion";
import { lensProducts } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";

// Premium Lens catalogue — Luxotix-style. Each card is a tinted
// lens panel (base gradient + tint overlay) with the lens type,
// its benefits, and a demo price. Payment gateway comes later.
// Scratch = the "multi-coat" ridge feel.
export default function Lenses() {
  return (
    <section id="lenses" className="relative bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-cyan" />
              <span className="eyebrow text-cyan">The Lenses</span>
            </div>
            <h2 className="display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
              A lens for every
              <br />
              way you use your eyes.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
            From clear everyday to auto-darkening photosun — pick the protection your skull
            actually needs. Prices are indicative for the demo; your shop sets the final rate.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {lensProducts.map((l) => (
            <motion.article
              key={l.id}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50"
            >
              {/* tinted lens panel */}
              <div className="relative mb-6 h-36 overflow-hidden rounded-xl border border-line/70 lens-shine" style={{ background: l.base }}>
                <div className="absolute inset-0 transition-all duration-500" style={{ background: l.tint }} />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 20% 15%, rgba(255,255,255,0.35), transparent 55%)",
                  }}
                />
                <span className="pointer-events-none absolute right-4 top-4 display text-6xl leading-none text-white/10">
                  {l.name[0]}
                </span>
                <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 eyebrow text-[0.52rem] text-ink">
                  {l.tag}
                </span>
              </div>

              <h3 className="display text-2xl text-ink">{l.name}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{l.desc}</p>

              <ul className="mt-4 space-y-2">
                {l.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                    <span className="text-cyan">▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <span className="display text-xl text-cyan">{l.price}</span>
                <span className="eyebrow text-[0.5rem] text-smoke">FROM · DEMO</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}