import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Piece } from "../data/brand";
import FrameGlyph from "./FrameGlyph";

const ease = [0.16, 1, 0.3, 1] as const;

// Product card — clean white "ghost product" with LIVE frame color
// swatches (the GlassesBD color-changing idea) + strikethrough sale
// price. Links to the product page.
export default function ProductCard({ p, index }: { p: Piece; index: number }) {
  const [toneIdx, setToneIdx] = useState(0);
  const color = p.swatches[toneIdx] ?? p.swatches[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease }}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass-strong hover:shadow-[0_16px_50px_-20px_rgba(32,26,19,0.35)]"
    >
      <Link to={`/product/${p.id}`} className="relative aspect-[4/3] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(160deg, ${p.tone}, #ffffff)` }}>
          <motion.div key={color} initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <FrameGlyph shape={p.shape} stroke={color} fill="rgba(255,255,255,0.25)" className="h-28 w-28 md:h-32 md:w-32" />
          </motion.div>
        </div>
        {p.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {p.tag}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
        {/* color swatches */}
        <div className="flex items-center gap-1.5">
          {p.swatches.map((sw, si) => (
            <button
              key={sw + si}
              onClick={() => setToneIdx(si)}
              aria-label={`Color ${si + 1}`}
              className={`h-4 w-4 rounded-full border-2 transition-all ${
                si === toneIdx ? "scale-110 border-blue" : "border-line hover:scale-110"
              }`}
              style={{ background: sw }}
            />
          ))}
        </div>

        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-blue">{p.category}</div>
            <Link
              to={`/product/${p.id}`}
              className="font-display text-base font-bold leading-tight text-ink transition-colors hover:text-blue"
            >
              {p.name}
            </Link>
            <div className="text-[11px] text-ink-mute">{p.lens} lens</div>
          </div>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-lg font-bold text-ink">{p.price}</span>
          {p.compareAt && <span className="text-sm text-ink-mute line-through">{p.compareAt}</span>}
        </div>
      </div>
    </motion.div>
  );
}