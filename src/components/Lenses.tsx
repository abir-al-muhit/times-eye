import { motion } from "framer-motion";
import { lensProducts } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";

// Premium Lens catalogue — a "specimen shelf". Each card is a
// tinted lens panel with the lens type, benefits, and demo price.
// Clean hairlines + generous space; payment gateway comes later.
export default function Lenses() {
  return (
    <section id="lenses" className="relative bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-tortoise" />
              <span className="eyebrow text-tortoise">The Lenses</span>
            </div>
            <h2 className="display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
              A lens for every
              <br />
              way you use your eyes.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
            From clear everyday to auto-darkening photosun — pick the protection your eyes
            actually need. Prices are indicative for the demo; your shop sets the final rate.
          </p>
        </div>

        {/* lens specimen shelf — too-clean grids feel templated, so show the lens as the object */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {lensProducts.map((l, i) => (
            <motion.article
              key={l.id}
              variants={fadeUp}
              custom={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-tortoise/50 hover:shadow-[0_24px_50px_-40px_rgba(32,26,19,0.4)]"
            >
              {/* lens panel */}
              <div className="relative m-3 h-40 overflow-hidden rounded-xl border border-line lens-shine" style={{ background: l.base }}>
                <div className="absolute inset-0 transition-all duration-500" style={{ background: l.tint }} />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 20% 14%, rgba(255,255,255,0.7), transparent 55%)",
                  }}
                />
                {/* rounded lens silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 100" className="w-[62%] opacity-70" aria-hidden>
                    <ellipse cx="66" cy="50" rx="58" ry="66" fill="rgba(255,255,255,0.14)" stroke="rgba(32,26,19,0.25)" strokeWidth="2.5" />
                    <ellipse cx="134" cy="50" rx="58" ry="66" fill="rgba(255,255,255,0.14)" stroke="rgba(32,26,19,0.25)" strokeWidth="2.5" />
                    <path d="M124 18 c 3 -8, 9 -8, 12 0" fill="none" stroke="rgba(32,26,19,0.25)" strokeWidth="2.5" />
                  </svg>
                </div>
                <span className="absolute bottom-3 left-4 rounded-full bg-ink/85 px-3 py-1 eyebrow text-[0.5rem] text-canvas">
                  {l.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
                <h3 className="display text-2xl text-ink">{l.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{l.desc}</p>

                <ul className="mt-4 space-y-2">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                      <span className="text-tortoise">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                  <span className="display text-xl text-tortoise">{l.price}</span>
                  <span className="eyebrow text-smoke">FROM · DEMO</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}