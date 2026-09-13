import { motion } from "framer-motion";
import { brand, visit } from "../data/brand";
import { fadeUp, stagger, viewport } from "./anim";

// Visit — closing CTA, light theme. Amber CTA card + WhatsApp.
export default function Visit() {
  const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(visit.waText)}`;

  return (
    <section id="visit" className="relative overflow-hidden border-t border-line bg-canvas py-24 lg:py-32">
      <span
        aria-hidden
        className="display-outline pointer-events-none absolute -left-6 bottom-4 select-none hidden lg:block"
        style={{ fontSize: "18vw", lineHeight: 0.8 }}
      >
        EYE
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "var(--color-tortoise)" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-2 lg:gap-12 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col justify-center"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-tortoise" />
            <span className="eyebrow text-tortoise">{visit.label}</span>
          </div>
          <h2 className="display text-6xl leading-none tracking-tight text-ink sm:text-7xl">
            {visit.title.map((l, i) => (
              <span key={l} className={`block ${i === visit.title.length - 1 ? "text-tortoise" : ""}`}>
                {l}
              </span>
            ))}
          </h2>

          <div className="mt-9 space-y-5">
            {visit.details.map((d) => (
              <div key={d.label} className="border-l-2 border-tortoise/50 pl-5">
                <div className="eyebrow text-smoke">{d.label}</div>
                <div className="mt-1 text-lg text-ink">{d.value}</div>
              </div>
            ))}
          </div>

          <motion.a
            variants={fadeUp}
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold tracking-wide text-canvas transition-colors hover:bg-tortoise"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-canvas">
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.2-3.6-.8-3-1.2-4.9-4.2-5-4.4-.2-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.6c-.2.2-.3.4-.1.7.2.3.8 1.4 1.8 2.2 1.2 1 2.3 1.4 2.6 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.1 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.4z" />
            </svg>
            Order on WhatsApp
          </motion.a>
          <p className="mt-3 text-xs text-smoke">Payment gateway coming soon · COD available</p>
        </motion.div>

        {/* CTA card */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col justify-center"
        >
          <motion.div
            variants={fadeUp}
            className="lens-shine relative overflow-hidden rounded-3xl bg-tortoise p-10 text-canvas"
          >
            <span className="pointer-events-none absolute -right-6 -top-12 select-none display text-[11rem] leading-none text-canvas/15">
              ✦
            </span>
            <div className="eyebrow text-canvas/75">About the store</div>
            <div className="mt-3 display text-4xl leading-tight text-canvas">
              Gazipur's trusted eyewear house.
            </div>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-canvas/85">
              Wide frame stock, premium lenses, and watches — all fitted properly in store. Come
              in, try a few, and leave seeing better.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-canvas/15 p-5">
                <div className="display text-3xl text-canvas">5+</div>
                <div className="eyebrow mt-2 text-canvas/70">YEARS IN GAZIPUR</div>
              </div>
              <div className="rounded-2xl bg-canvas/15 p-5">
                <div className="display text-3xl text-canvas">100%</div>
                <div className="eyebrow mt-2 text-canvas/70">GENUINE LENSES</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}