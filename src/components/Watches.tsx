import { motion } from "framer-motion";
import { watches } from "../data/brand";
import { EASE } from "./anim";

// Watches strip — the store also carries watches (real brand feature).
export default function Watches() {
  return (
    <section id="watches" className="relative overflow-hidden border-y border-line bg-panel/40 py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-cyan" />
              <span className="eyebrow text-cyan">{watches.label}</span>
            </div>
            <h2 className="display text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {watches.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{watches.line}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-wrap gap-4"
          >
            {watches.items.map((w, i) => (
              <div
                key={w}
                className="flex items-center gap-3 rounded-2xl border border-line bg-canvas px-6 py-5"
              >
                <span className="eyebrow text-cyan">0{i + 1}</span>
                <span className="display text-xl text-ink">{w}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}