import { motion } from "framer-motion";
import { pieces } from "../data/brand";
import { useCart } from "./cart";
import { fadeUp, stagger, viewport } from "./anim";

// Eyewear grid — the store's core. Tone-walled frame panels with
// lens type, tag badges, hover lift, add-to-cart. Real product
// photos replace the tone panels when they arrive.
export default function Eyewear() {
  const { add } = useCart();

  return (
    <section id="eyewear" className="relative bg-onyx py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-cyan" />
              <span className="eyebrow text-cyan">The Frames</span>
            </div>
            <h2 className="display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Eyewear worth
              <br />
              showing off.
            </h2>
          </div>
          <span className="eyebrow text-smoke">6 STYLES · LENS UPGRADES IN STORE</span>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
        >
          {pieces.map((p, i) => (
            <motion.article key={p.id} variants={fadeUp} custom={i} className="group">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line transition-transform duration-300 group-hover:-translate-y-1.5"
                style={{ background: `linear-gradient(155deg, ${p.tone}, #0c1116)` }}
              >
                {/* frame glyph placeholder — smaller so corner badges never overlap */}
                <div className="absolute inset-0 flex items-center justify-center pt-3">
                  <svg viewBox="0 0 180 120" className="w-[55%] opacity-50 transition-all duration-500 group-hover:opacity-80" aria-hidden>
                    <ellipse cx="52" cy="60" rx="44" ry="52" fill="none" stroke={p.frame} strokeWidth="4.5" />
                    <ellipse cx="128" cy="60" rx="44" ry="52" fill="none" stroke={p.frame} strokeWidth="4.5" />
                    <path d="M96 40 c 3 -8, 9 -8, 12 0" fill="none" stroke={p.frame} strokeWidth="4.5" />
                  </svg>
                </div>

                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 eyebrow text-[0.5rem] text-ink backdrop-blur-sm">
                    {p.tag}
                  </span>
                )}

                {/* quick add overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <button
                    onClick={() => add(p)}
                    className="w-full rounded-xl bg-cyan py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cyan-soft"
                  >
                    Add to bag
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-start justify-between px-1">
                <div>
                  <h3 className="display text-lg text-ink">{p.name}</h3>
                  <p className="text-xs text-smoke uppercase tracking-wide">{p.lens} lens</p>
                </div>
                <span className="text-sm font-semibold text-ink-soft">{p.price}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}