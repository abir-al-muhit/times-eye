import { useState } from "react";
import { motion } from "framer-motion";
import { pieces, tabs, type Piece } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";
import FrameGlyph from "./FrameGlyph";
import ProductDetail from "./ProductDetail";

// SHOP — the store's core. Tabs (New Arrivals / Best Sellers /
// Most Ordered) from ONE data file. Each card shows the frame as a
// clean white "ghost product" with LIVE color swatches (the
// GlassesBD color-changing idea) and a strikethrough sale price.
// Click the card to open the product-build modal (prescription +
// lens selection).
export default function Shop() {
  const [active, setActive] = useState(tabs[0].id);
  const [sel, setSel] = useState<Piece | null>(null);
  const [tone, setTone] = useState<Record<string, number>>({});

  const current = tabs.find((t) => t.id === active)!;
  const shown = pieces.filter(current.match);
  const color = (p: Piece) => p.swatches[tone[p.id] ?? 0] ?? p.swatches[0];

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
              {/* white ghost product card */}
              <div
                onClick={() => setSel(p)}
                className="relative cursor-pointer rounded-2xl border border-line bg-white p-4 pb-3 shadow-[0_8px_30px_-18px_rgba(32,26,19,0.35)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_50px_-30px_rgba(32,26,19,0.5)]"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl" style={{ background: `linear-gradient(160deg, ${p.tone}, #ffffff)` }}>
                  <motion.div
                    key={color(p)}
                    initial={{ opacity: 0.6, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <FrameGlyph shape={p.shape} stroke={color(p)} fill="rgba(255,255,255,0.25)" className="w-32 h-32 md:w-36 md:h-36" />
                  </motion.div>

                  {p.tag && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-ink px-2.5 py-1 eyebrow text-[0.48rem] text-canvas">
                      {p.tag}
                    </span>
                  )}
                </div>

                {/* live color swatches */}
                <div className="mt-3 flex items-center gap-2">
                  {p.swatches.map((sw, si) => (
                    <button
                      key={sw}
                      onClick={(e) => { e.stopPropagation(); setTone((m) => ({ ...m, [p.id]: si })); }}
                      aria-label={`Color ${si + 1}`}
                      className={`h-4 w-4 rounded-full border-2 transition-transform duration-200 ${si === (tone[p.id] ?? 0) ? "scale-110 border-blue" : "border-line-strong hover:scale-110"}`}
                      style={{ background: sw }}
                    />
                  ))}
                  <span className="ml-auto text-[10px] text-smoke">tap to change</span>
                </div>

                {/* info */}
                <div className="mt-2 flex items-start justify-between">
                  <div>
                    <h3 className="display text-base text-ink">{p.name}</h3>
                    <p className="text-[11px] text-smoke uppercase tracking-wide">{p.lens} lens</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-ink-soft">{p.price}</span>
                    {p.compareAt && <div className="text-[11px] text-smoke line-through">{p.compareAt}</div>}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <ProductDetail product={sel} onClose={() => setSel(null)} />
    </section>
  );
}