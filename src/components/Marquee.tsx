import { motion } from "framer-motion";
import { marquee } from "../data/brand";

// Kinetic marquee — lens types cycling in an ink band (editorial
// closing rule between sections). One dark strip keeps depth.
export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden bg-ink py-4">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display text-2xl tracking-[0.04em] text-canvas/85">{w}</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-tortoise">
              <path d="M12 5c4.4 0 8.2 2.8 10 7-1.8 4.2-5.6 7-10 7s-8.2-2.8-10-7c1.8-4.2 5.6-7 10-7zm0 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
}