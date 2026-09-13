import { motion } from "framer-motion";
import { brands } from "../data/brand";

// POPULAR BRANDS — a competitor-standard logo strip (the kind the
// client's reference shots show). Clean wordmarks on white air.
export default function Brands() {
  return (
    <section className="border-b border-line bg-white py-10">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="eyebrow text-smoke">Our Popular Brands</span>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {brands.map((b) => (
              <span key={b} className="display text-xl text-ink/45 transition-colors hover:text-ink">
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}