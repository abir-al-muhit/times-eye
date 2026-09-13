import { motion } from "framer-motion";
import { pieces } from "../data/brand";
import { useCart } from "./cart";
import { fadeUp, stagger, viewport } from "./anim";

// Eyewear grid — focused frame "specimens" on white cards so the
// frame glyph + lens + tag each breathe. Real photos replace them
// when they arrive.
export default function Eyewear() {
  const { add } = useCart();

  return (
    <section id="eyewear" className="relative border-y border-line bg-[#efe9dc] py-24 lg:py-32">
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
              <span className="h-[2px] w-8 bg-tortoise" />
              <span className="eyebrow text-tortoise">The Frames</span>
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_50px_-40px_rgba(32,26,19,0.4)]">
                {/* frame glyph on air */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 180 120" className="w-[60%] transition-all duration-500 group-hover:scale-105" aria-hidden>
                    <ellipse cx="52" cy="60" rx="44" ry="52" fill="rgba(32,26,19,0.03)" stroke={p.frame} strokeWidth="6" />
                    <ellipse cx="128" cy="60" rx="44" ry="52" fill="rgba(32,26,19,0.03)" stroke={p.frame} strokeWidth="6" />
                    <path d="M96 40 c 3 -8, 9 -8, 12 0" fill="none" stroke={p.frame} strokeWidth="6" />
                  </svg>
                </div>

                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 eyebrow text-[0.5rem] text-canvas">
                    {p.tag}
                  </span>
                )}

                {/* quick add */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <button
                    onClick={() => add(p)}
                    className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-canvas transition-colors hover:bg-tortoise"
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