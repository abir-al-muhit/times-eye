import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, heroSlides } from "../data/brand";
import { EASE } from "./anim";
import FrameGlyph from "./FrameGlyph";

// HERO — auto-advancing image-slide carousel (a real e-com hero,
// not a static headline). Each slide is a full-bleed product
// image panel; arrows + dots + auto-rotate. Copy overlays.
export default function Hero() {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = heroSlides.length;

  const go = useCallback(
    (next: number) => setI(((next % n) + n) % n),
    [n],
  );

  useEffect(() => {
    timer.current = setInterval(() => setI((p) => (p + 1) % n), 5200);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [n]);

  const reset = () => { if (timer.current) clearInterval(timer.current); };

  const jump = (id: string) => {
    const el = document.querySelector(`#${id}`) as HTMLElement | null;
    if (el) window.__lenis?.scrollTo(el, { offset: -70 });
  };

  const slide = heroSlides[i];

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-12 pt-20 md:pt-24">
      {/* sliding image panels */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0"
            style={{ background: slide.tone }}
          >
            {/* subtle frame + glyph stage — a real product visual, offset right */}
            <div className="absolute inset-0 flex items-center justify-end pr-[8%] lg:pr-[6%]">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                className="relative hidden lg:flex items-center justify-center"
              >
                {/* soft radial glow behind product */}
                <div
                  className="absolute h-[520px] w-[520px] rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle at 50% 55%, rgba(255,255,255,0.9), transparent 70%)" }}
                />
                {/* echo lenses in background */}
                <svg viewBox="0 0 200 200" className="absolute -left-16 top-4 w-40 opacity-20" aria-hidden>
                  <circle cx="100" cy="100" r="70" fill="none" stroke={slide.frame} strokeWidth="3" />
                  <circle cx="84" cy="84" r="34" fill="rgba(47,95,176,0.15)" />
                </svg>
                <svg viewBox="0 0 200 200" className="absolute -right-12 bottom-2 w-32 opacity-20" aria-hidden>
                  <circle cx="100" cy="100" r="62" fill="rgba(47,95,176,0.18)" />
                </svg>
                {/* the product */}
                <FrameGlyph
                  shape={slide.shape}
                  stroke={slide.frame}
                  fill="rgba(255,255,255,0.35)"
                  className="relative h-[30rem] w-[30rem] drop-shadow-[0_40px_60px_rgba(32,26,19,0.15)]"
                />
              </motion.div>
              {/* mobile product (smaller, always shown) */}
              <div className="flex items-center justify-center lg:hidden">
                <FrameGlyph shape={slide.shape} stroke={slide.frame} fill="rgba(255,255,255,0.3)" className="h-64 w-64 opacity-90" />
              </div>
            </div>
            {/* soft white wash so copy reads */}
            <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* copy */}
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 items-center px-5 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-2xl"
          >
            <motion.div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-blue" />
              <span className="eyebrow text-blue">{slide.kicker}</span>
            </motion.div>

            <h1 className="display text-[min(15vw,13vh)] leading-[0.95] tracking-tight text-ink lg:text-[min(6.5rem,15vh)]">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">{slide.line}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => jump("shop")}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold tracking-wide text-canvas transition-colors hover:bg-blue"
              >
                {slide.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => jump("lenses")}
                className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-white/50 px-6 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Explore lenses
              </button>
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs tracking-wide text-smoke">
              <span className="h-2 w-2 rounded-full bg-blue" />
              {brand.location.split(",")[0].toUpperCase()} · TRUSTED EYEWEAR
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* arrows + dots */}
      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <div className="flex items-center gap-2">
          {heroSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => { reset(); go(idx); }}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${idx === i ? "w-8 bg-blue" : "w-2 bg-line-strong"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { reset(); go(i - 1); }}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/60 text-ink transition-colors hover:border-blue hover:text-blue"
          >
            ←
          </button>
          <button
            onClick={() => { reset(); go(i + 1); }}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/60 text-ink transition-colors hover:border-blue hover:text-blue"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}