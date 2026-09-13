import { motion } from "framer-motion";
import { collections } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";
import FrameGlyph from "./FrameGlyph";

// COLLECTIONS — the shop's category doors. Each pulled from ONE
// data file (Men's / Women's / Brand / Premium / Custom).
export default function Collections() {
  const jump = (id: string) => {
    const el = document.querySelector(`#${id}`) as HTMLElement | null;
    if (el) window.__lenis?.scrollTo(el, { offset: -70 });
  };

  return (
    <section id="collections" className="relative bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-blue" />
              <span className="eyebrow text-blue">Collections</span>
            </div>
            <h2 className="display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Shop by collection.
            </h2>
          </div>
          <span className="eyebrow text-smoke">FIND YOUR STYLE · SIGN UP IN STORE</span>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {collections.map((c, idx) => {
            const tall = idx % 3 === 0;
            return (
              <motion.button
                key={c.id}
                variants={fadeUp}
                onClick={() => jump("shop")}
                className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-40px_rgba(32,26,19,0.5)] ${
                  tall ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative flex aspect-[4/5] flex-col justify-between p-6" style={{ background: c.tone }}>
                  {/* glyph */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.94, opacity: 0.6 }}
                      whileHover={{ scale: 1.08, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <FrameGlyph shape={c.shape} stroke={c.frame} fill="rgba(255,255,255,0.16)" className="w-40 h-40" />
                    </motion.div>
                  </div>
                  {/* label */}
                  <div className="relative flex items-center gap-2">
                    <span className="rounded-full bg-canvas/85 px-3 py-1 eyebrow text-[0.5rem] text-ink backdrop-blur-sm">
                      {c.type}
                    </span>
                    <span className="eyebrow text-[0.5rem] text-canvas/80">{c.count}</span>
                  </div>
                  <div className="relative">
                    <h3 className="display text-2xl leading-tight text-canvas">{c.name}</h3>
                    <span className="mt-1 inline-flex items-center gap-2 eyebrow text-[0.5rem] text-canvas/85">
                      SHOP <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}