import { motion } from "framer-motion";
import { brand } from "../data/brand";
import { EASE } from "./anim";
import LensConfigurator from "./LensConfigurator";

// Hero — two-column split. Left: stacked editorial headline +
// CTAs. Right: the live Lens & Frame configurator (signature).
// Mobile: copy first, configurator below (order handled by grid).
const line = {
  hidden: { y: "110%", rotate: 3 },
  show: (i: number = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.85, delay: 0.15 + i * 0.11, ease: EASE },
  }),
};

export default function Hero() {
  const jump = (id: string) => {
    const el = document.querySelector(`#${id}`) as HTMLElement | null;
    if (el) window.__lenis?.scrollTo(el, { offset: -70 });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-12 pt-24 md:py-28 lg:pt-32"
    >
      {/* giant background watermark */}
      <div
        aria-hidden
        className="display-outline pointer-events-none absolute -right-4 top-[26%] select-none hidden lg:block"
        style={{ fontSize: "20vw", lineHeight: 0.8 }}
      >
        EYE
      </div>
      {/* soft cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-cyan)" }}
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-8 lg:grid-cols-2 lg:gap-8 lg:py-0">
        {/* LEFT — copy */}
        <div className="order-1 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-[2px] w-10 bg-cyan" />
            <span className="eyebrow text-cyan">{brand.tagline.toUpperCase()}</span>
          </motion.div>

          <h1 className="display text-ink">
            <span className="block overflow-hidden">
              <motion.span variants={line} custom={0} initial="hidden" animate="show" className="inline-block text-[min(17vw,15vh)] lg:text-[min(7.5rem,15vh)]">
                See better.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} custom={1} initial="hidden" animate="show" className="inline-block text-[min(17vw,15vh)] text-cyan lg:text-[min(7.5rem,15vh)]">
                Look sharper.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/80"
          >
            Eyeglasses, sunglasses, watches and pro-grade lenses — crystal white, blue cut,
            multi-coated, photosun and more. Fitted properly, priced honestly, delivered
            nationwide on cash on delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => jump("eyewear")}
              className="group inline-flex items-center gap-3 bg-cyan px-8 py-4 text-sm font-semibold tracking-wide text-canvas transition-colors hover:bg-cyan-soft"
            >
              Browse eyewear
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => jump("lenses")}
              className="inline-flex items-center gap-3 text-sm font-medium tracking-wide text-ink transition-colors hover:text-cyan"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-line transition-colors hover:border-cyan">
                ◆
              </span>
              Explore lenses
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex items-center gap-2 text-xs text-smoke"
          >
            <span className="h-2 w-2 rounded-full bg-cyan" />
            {brand.location.split(",")[0].toUpperCase()} · TRUSTED EYEWEAR
          </motion.div>
        </div>

        {/* RIGHT — the configurator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="order-2 relative z-10"
        >
          <LensConfigurator />
        </motion.div>
      </div>
    </section>
  );
}