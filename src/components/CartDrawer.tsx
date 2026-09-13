import { AnimatePresence, motion } from "framer-motion";
import { brand } from "../data/brand";
import { useCart } from "./cart";

const EASE = [0.16, 1, 0.3, 1] as const;

// Cart drawer — slide-in with items, qty, remove, WhatsApp checkout.
export default function CartDrawer() {
  const { items, open, setOpen, remove } = useCart();

  const total = items.reduce((s, i) => s + Number(i.product.price.replace(/[^\d]/g, "")) * i.qty, 0);
  const msg =
    "Hi Times Eye! I'd like to order:\n" +
    items.map(({ product: p, qty }) => `• ${p.name} (${p.lens} lens) × ${qty} — ${p.price}`).join("\n") +
    `\n\nTotal: ৳${total.toLocaleString()}\n(Payment via COD / gateway to be confirmed)`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-black/60"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: EASE }}
            className="fixed bottom-0 right-0 top-0 flex w-full max-w-md flex-col border-l border-line bg-canvas"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <span className="display text-xl text-ink">Your bag</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-line text-ink transition-colors hover:border-cyan hover:text-cyan"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-16 text-center text-smoke">Your bag is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ product: p, qty }) => (
                    <li key={p.id} className="flex items-center gap-4 rounded-xl border border-line bg-panel p-3">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-line"
                        style={{ background: `linear-gradient(150deg, ${p.tone}, #0c1116)` }}
                      >
                        <span className="display text-xl text-white/20">{p.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="display text-sm text-ink">{p.name}</p>
                        <p className="text-xs text-smoke uppercase tracking-wide">{p.lens} lens</p>
                        <p className="mt-1 text-sm text-ink-soft">
                          {p.price} × {qty}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(p.id)}
                        className="text-xs underline text-smoke transition-colors hover:text-cyan"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow text-[0.6rem] text-smoke">Total</span>
                <span className="display text-xl text-cyan">৳ {total.toLocaleString()}</span>
              </div>
              <a
                href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noreferrer"
                className={`block rounded-xl bg-cyan py-4 text-center text-sm font-semibold tracking-wide text-canvas transition-colors hover:bg-cyan-soft ${
                  items.length === 0 ? "pointer-events-none opacity-40" : ""
                }`}
              >
                Checkout on WhatsApp
              </a>
              <p className="mt-3 text-center text-[11px] text-smoke">
                Online payment gateway coming soon — order now, pay on delivery.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}