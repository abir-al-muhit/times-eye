import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { collections } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";
import FrameGlyph from "./FrameGlyph";

// COLLECTIONS — the shop's category doors. Each links to its OWN
// dedicated page (/collections/all, /men, /women, /brand, /premium,
// /custom). Men / Women / Brand / Premium / Custom.
export default function Collections() {
  return (
    <section id="collections" className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex items-end justify-between gap-4"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-[2px] w-8 bg-blue" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">Collections</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Shop by collection.</h2>
        </div>
        <Link to="/collections/all" className="shrink-0 text-sm font-semibold text-ink-mute transition-colors hover:text-blue">
          All collections →
        </Link>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6"
      >
        {collections.map((c) => (
          <motion.div key={c.id} variants={fadeUp}>
            <Link
              to={c.href}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_rgba(32,26,19,0.5)]"
              style={{ background: c.tone }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <FrameGlyph shape={c.shape} stroke={c.frame} fill="rgba(255,255,255,0.16)" className="h-24 w-24 md:h-28 md:w-28" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/75">{c.type}</div>
                <div className="font-display text-sm font-bold leading-tight text-white md:text-base">{c.name}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}