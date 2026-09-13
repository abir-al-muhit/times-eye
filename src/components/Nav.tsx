import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navbar } from "../data/brand";
import { useCart } from "./cart";

const EASE = [0.16, 1, 0.3, 1] as const;

function EyeMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8 fill-none" aria-hidden>
      <g stroke="var(--color-blue)" strokeWidth="1.8">
        <path d="M3 20 C 10 8, 30 8, 37 20 C 30 32, 10 32, 3 20 Z" />
        <circle cx="20" cy="20" r="7" fill="var(--color-blue)" stroke="none" />
        <circle cx="20" cy="20" r="2.4" fill="var(--color-canvas)" stroke="none" />
      </g>
    </svg>
  );
}

export default function Nav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpenMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    setOpenMenu(false);
    setTimeout(() => {
      const el = document.querySelector(`#${id}`) as HTMLElement | null;
      if (el) window.__lenis?.scrollTo(el, { offset: -70 });
      else window.scrollTo({ top: 0 });
    }, 40);
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled ? "border-b border-line bg-canvas/90" : "bg-canvas/70"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-10">
        <button onClick={() => jump("top")} className="group flex items-center gap-2.5">
          <EyeMark />
          <span className="display text-2xl tracking-[0.02em] text-ink">
            TIMES<span className="text-blue"> EYE</span>
          </span>
        </button>

        <ul className="hidden items-center gap-9 lg:flex">
          {navbar.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => jump(item.id)}
                className="eyebrow text-ink-soft transition-colors hover:text-blue"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/60 px-5 py-2.5 display text-sm tracking-wide text-ink transition-colors hover:border-blue hover:text-blue"
          >
            Bag
            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue text-canvas text-xs font-bold">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpenMenu((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <span className={`h-0.5 w-6 bg-ink transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-blue transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-ink transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-line bg-canvas lg:hidden"
          >
            <ul className="flex flex-col px-6 py-6">
              {navbar.map((item) => (
                <li key={item.id} className="border-b border-line py-3.5">
                  <button
                    onClick={() => jump(item.id)}
                    className="display text-2xl text-ink hover:text-blue"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}