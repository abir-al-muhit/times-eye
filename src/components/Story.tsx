import { motion } from "framer-motion";
import { pillars, story } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";

// Story + trust pillars (Lunettes-style trust badges).
export default function Story() {
  return (
    <section id="why" className="relative bg-canvas py-24 lg:py-32">
      <span
        aria-hidden
        className="display-outline pointer-events-none absolute -left-6 top-8 select-none hidden lg:block"
        style={{ fontSize: "16vw", lineHeight: 0.8 }}
      >
        SEE
      </span>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          {/* LEFT heading + intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-cyan" />
              <span className="eyebrow text-cyan">{story.label}</span>
            </div>
            <h2 className="display text-6xl leading-none tracking-tight text-ink sm:text-7xl">
              {story.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink-soft">{story.body}</p>
          </motion.div>

          {/* RIGHT value rows */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col justify-center gap-2"
          >
            {story.points.map((v, i) => (
              <motion.div
                key={v.t}
                variants={fadeUp}
                className="group border-t border-line py-8 last:border-b"
              >
                <div className="flex items-baseline gap-5">
                  <span className="display text-sm text-cyan/70">0{i + 1}</span>
                  <div>
                    <h3 className="display text-3xl tracking-wide text-ink transition-colors group-hover:text-cyan">
                      {v.t}
                    </h3>
                    <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-soft">{v.d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* trusted-in strip */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.label}
              variants={fadeUp}
              className="rounded-2xl border border-line bg-panel p-7 text-center transition-colors hover:border-cyan/40"
            >
              <div className="display text-4xl text-cyan">{p.stat}</div>
              <div className="eyebrow mt-3 text-[0.6rem] text-ink-soft">{p.label}</div>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{p.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}