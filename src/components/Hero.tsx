import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "../data/brand";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

// HERO — full-width banner slider (the exact pattern from the
// proven Basic Collection store). The image fills an aspect-ratio
// container with object-cover so it always fits ANY screen —
// desktop, tablet, mobile. Caption sits overlaid at bottom-left
// with small retail typography. No split, no huge headline.
export default function Hero() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5200);
    return () => clearInterval(id);
  }, [count]);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  const jump = (id: string) => {
    const el = document.querySelector(`#${id}`) as HTMLElement | null;
    if (el) window.__lenis?.scrollTo(el, { offset: -70 });
  };

  const slide = heroSlides[index];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-5 md:px-6 md:pt-8">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative aspect-[16/9] w-full overflow-hidden bg-card"
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            {/* caption — bottom-left, over the image, small type */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 sm:p-6 md:p-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a34e] sm:text-[11px]">
                {slide.kicker}
              </span>
              <h2 className="mt-1 font-display text-xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                {slide.title}
              </h2>
              <p className="mt-1 hidden max-w-xl text-sm text-white/85 sm:block md:text-base">
                {slide.line}
              </p>
              <button
                onClick={() => jump(slide.scrollTo)}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#c9a34e] px-4 py-2 text-xs font-semibold text-[#101014] transition-colors hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {slide.cta} →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous banner"
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35 sm:left-3 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next banner"
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35 sm:right-3 sm:h-10 sm:w-10"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Banner ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-[#c9a34e]" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}