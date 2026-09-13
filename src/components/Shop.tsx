import { useState } from "react";
import { motion } from "framer-motion";
import { pieces, tabs, type Piece } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";
import FrameGlyph from "./FrameGlyph";
import ProductDetail from "./ProductDetail";

// SHOP — the store's core. Tabs (New Arrivals / Best Sellers /
// Most Ordered) from ONE data file; each card opens a product
// detail with prescription + lens selection.
export default function Shop() {
  const [active, setActive] = useState(tabs[0].id);
  const [sel, setSel] = useState<Piece | null>(null);

  const current = tabs.find((t) => t.id === active)!;
  const shown = pieces.filter(current.match);

  return (
    <section id="shop" className="relative border-y border-line bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-blue" />
              <span className="eyebrow text-blue">Shop</span>
            </div>
            <h2 className="display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
              What's on the shelf.
            </h2>
          </div>
          <span className="eyebrow text-smoke">{shown.length} STYLES · CLICK A FRAME TO BUILD</span>
        </motion.div>

        {/* tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active === t.id
                  ? "border-ink bg-ink text-canvas"
                  : "border-line-strong bg-white text-ink-soft hover:border-blue hover:text-blue"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
        >
          {shown.map((p, i) => (
            <motion.article key={p.id} variants={fadeUp} custom={i} className="group">
              <button
                onClick={() => setSel(p)}
                className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-white text-left transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_50px_-40px_rgba(32,26,19,0.45)]"
              >
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(160deg, ${p.tone}, #ffffff)` }}>
                  <motion.div transition={{ duration: 0.4 }}>
                    <FrameGlyph shape={p.shape} stroke={p.accent} fill="rgba(255,255,255,0.18)" className="w-40 h-40 md:w-48 md:h-48 group-hover:scale-105" />
                  </motion.div>
                </div>

                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 eyebrow text-[0.5rem] text-canvas">
                    {p.tag}
                  </span>
                )}
                {p.compareAt && (
                  <span className="absolute right-3 top-3 rounded-full bg-blue/10 px-3 py-1 eyebrow text-[0.5rem] text-blue">
                    SALE
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="block w-full rounded-full bg-ink py-3 text-center text-sm font-semibold text-canvas transition-colors group-hover:bg-blue">
                    Customize · {p.price}
                  </span>
                </div>
              </button>

              <div className="mt-3 flex items-start justify-between px-1">
                <div>
                  <h3 className="display text-lg text-ink">{p.name}</h3>
                  <p className="text-xs text-smoke uppercase tracking-wide">
                    {p.gender} · {p.category}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-ink-soft">{p.price}</span>
                  {p.compareAt && <div className="text-[11px] text-smoke line-through">{p.compareAt}</div>}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* product detail / build modal */}
      <ProductDetail product={sel} onClose={() => setSel(null)} />
    </section>
  );
}