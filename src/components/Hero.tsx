import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "../data/brand";
import { EASE } from "./anim";

// HERO — real client banners as a slide carousel in a SPLIT layout.
// Left = solid ivory copy panel (headline + CTAs always legible),
// right = the banner image in its own column. Text never overlaps
// the photo — guaranteed clean, matches the client's split reference.
export default function Hero() {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = heroSlides.length;

  const go = useCallback((next: number) => setI(((next % n) + n) % n), [n]);

  useEffect(() => {
    timer.current = setInterval(() => setI((p) => (p + 1) % n), 5600);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [n]);

  const reset = () => { if (timer.current) clearInterval(timer.current); };

  const jump = (id: string) => {
    const el = document.querySelector(`#${id}`) as HTMLElement | null;
    if (el) window.__lenis?.scrollTo(el, { offset: -70 });
  };

  const slide = heroSlides[i];

  return (
    <section id="top" className="relative flex min-h-[92vh] flex-col overflow-hidden md:pt-16">
      {/* split: text + banner */}
      <div className="grid flex-1 lg:grid-cols-2">
        {/* LEFT — ivory copy panel */}
        <div className="order-2 flex min-h-[52vh] items-center bg-canvas px-5 py-12 lg:order-1 lg:min-h-0 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="mx-auto w-full max-w-2xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-blue" />
                <span className="eyebrow text-blue">{slide.kicker}</span>
              </div>
              <h1 className="display text-[min(14vw,12vh)] leading-[0.96] tracking-tight text-ink lg:text-[min(5.5rem,14vh)]">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft">{slide.line}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => jump(slide.scrollTo)}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold tracking-wide text-canvas transition-colors hover:bg-blue"
                >
                  {slide.cta}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — banner image column */}
        <div className="order-1 lg:order-2">
          <AnimatePresence>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative h-[46vh] sm:h-[52vh] lg:h-full lg:min-h-[80vh]"
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* arrows + dots */}
      <div className="flex items-center justify-between border-t border-line bg-canvas px-5 py-4 lg:px-10">
        <div className="flex items-center gap-2">
          {heroSlides.map((s) => {
            const idx = heroSlides.indexOf(s);
            return (
              <button
                key={s.id}
                onClick={() => { reset(); go(idx); }}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${s.id === slide.id ? "w-8 bg-blue" : "w-2 bg-line-strong"}`}
              />
            );
          })}
        </div>
        <span className="eyebrow hidden text-smoke sm:block">TRUSTED EYEWEAR · GAZIPUR, DHAKA</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { reset(); go(i - 1); }}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink transition-colors hover:border-blue hover:text-blue"
          >
            ←
          </button>
          <button
            onClick={() => { reset(); go(i + 1); }}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink transition-colors hover:border-blue hover:text-blue"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}