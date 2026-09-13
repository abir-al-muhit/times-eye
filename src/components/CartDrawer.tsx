import { AnimatePresence, motion } from "framer-motion";
import { brand } from "../data/brand";
import { useCart, type CartLine } from "./cart";

const EASE = [0.16, 1, 0.3, 1] as const;

function linePrice(i: CartLine) {
  return Number(i.product.price.replace(/[^\d]/g, "")) * i.qty;
}

// Cart drawer — slide-in bag with items (frame + lens + Rx), qty,
// remove, WhatsApp checkout. Online gateway comes later.
export default function CartDrawer() {
  const { items, open, setOpen, remove } = useCart();
  const total = items.reduce((s, i) => s + linePrice(i), 0);

  const msg =
    "Hi Times Eye! I'd like to order:\n" +
    items
      .map((i) => {
        const base = `• ${i.product.name} (${i.product.category})`;
        const cfg = i.meta ? `\n   ${i.meta}` : "";
        const note = i.note ? `\n   ${i.note.split("\n").join("\n   ")}` : "";
        return `${base}${cfg}${note}\n   × ${i.qty} — ${i.product.price}`;
      })
      .join("\n") +
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
            className="fixed inset-0 z-[90] bg-ink/45"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: EASE }}
            className="fixed bottom-0 right-0 top-0 z-[95] flex w-full max-w-md flex-col border-l border-line bg-canvas"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <span className="display text-xl text-ink">Your bag</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-blue hover:text-blue"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-16 text-center text-smoke">Your bag is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li key={i.key} className="rounded-xl border border-line bg-white/60 p-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
                          <svg viewBox="0 0 180 120" className="w-9" aria-hidden>
                            <ellipse cx="52" cy="60" rx="44" ry="52" fill="rgba(32,26,19,0.04)" stroke={i.product.accent} strokeWidth="4.5" />
                            <ellipse cx="128" cy="60" rx="44" ry="52" fill="rgba(32,26,19,0.04)" stroke={i.product.accent} strokeWidth="4.5" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="display text-sm text-ink">{i.product.name}</p>
                          <p className="text-xs text-smoke uppercase tracking-wide">
                            {i.product.gender} · {i.product.category}
                          </p>
                          {i.meta && (
                            <p className="mt-1 text-[11px] font-medium text-blue">{i.meta}</p>
                          )}
                          <p className="mt-1 text-sm text-ink-soft">
                            {i.product.price} × {i.qty}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(i.key)}
                          className="text-xs underline text-smoke transition-colors hover:text-blue"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow text-smoke">Total</span>
                <span className="display text-xl text-blue">৳ {total.toLocaleString()}</span>
              </div>
              <a
                href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noreferrer"
                className={`block rounded-full bg-ink py-4 text-center text-sm font-semibold tracking-wide text-canvas transition-colors hover:bg-blue ${
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