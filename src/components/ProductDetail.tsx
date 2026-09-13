import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Piece } from "../data/brand";
import { lensTypes } from "../data/brand";
import { useCart } from "./cart";
import FrameGlyph from "./FrameGlyph";

const EASE = [0.16, 1, 0.3, 1] as const;

// PRODUCT DETAIL — modal shown when a frame is clicked.
// Real e-com behavior: choose prescription (none / doctor-prescribed
// with power fields) + lens type, sized, then add to bag.
type Props = { product: Piece | null; onClose: () => void };

export default function ProductDetail({ product, onClose }: Props) {
  const { add } = useCart();
  const [needRx, setNeedRx] = useState(false);
  const [rx, setRx] = useState("");
  const [lens, setLens] = useState(lensTypes[1]); // default Blue Cut
  const [frameIdx, setFrameIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const swatches = product?.swatches ?? ["#201a13"];
  const frameIdxName = ["Onyx", "Tortoise", "Gunmetal", "Gold", "Clear", "Classic"][frameIdx] ?? `Color ${frameIdx + 1}`;
  const frameStroke = swatches[frameIdx] ?? "#201a13";

  const lensCost = lens && lens.price ? Number(lens.price.replace(/[^\d]/g, "")) : 0;
  const productCost = product ? Number(product.price.replace(/[^\d]/g, "")) : 0;
  const total = (productCost + lensCost) * qty;

  const summary = useMemo(
    () =>
      product
        ? `${product.name} · ${product.category} · ${product.gender}\n` +
          `Frame: ${frameIdxName}\nLens: ${lens.name} (+${lens.price})\n` +
          (needRx ? `Prescription: ${rx || "(to be provided)"}\n` : "") +
          `Qty: ${qty}`
        : "",
    [product, frameIdxName, lens, needRx, rx, qty],
  );

  const addToBag = () => {
    if (!product) return;
    add(product, { label: `${frameIdxName} · ${lens.name}${needRx ? " · Rx" : ""}`, qty, note: summary });
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[85] bg-ink/40"
          />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-0 left-1/2 z-[95] max-h-[96vh] w-full max-w-3xl -translate-x-1/2 overflow-y-auto rounded-t-3xl bg-canvas shadow-[0_-20px_60px_-30px_rgba(32,26,19,0.4)]"
          >
            <div className="flex items-center justify-between border-b border-line px-7 py-5">
              <span className="eyebrow text-blue">{product.category.toUpperCase()} · DETAIL</span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-blue hover:text-blue"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-8 p-7 md:grid-cols-2">
              {/* LEFT visual */}
              <div className="rounded-2xl border border-line bg-white p-8">
                <div className="flex items-center justify-center" style={{ background: product.tone }}>
                  <FrameGlyph shape={product.shape} stroke={frameStroke} fill="rgba(255,255,255,0.2)" className="w-56 h-56" />
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="display text-2xl text-ink">{product.name}</div>
                      <div className="text-xs text-smoke uppercase tracking-wide">
                        {product.gender} · {product.brand}
                      </div>
                    </div>
                    {product.compareAt && <div className="text-sm text-smoke line-through">{product.compareAt}</div>}
                  </div>
                  <div className="mt-3 display text-3xl text-blue">{product.price}</div>
                </div>

                {/* live frame swatches */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="eyebrow text-smoke">FRAME</span>
                  {swatches.map((sw, si) => (
                    <button
                      key={sw + si}
                      onClick={() => setFrameIdx(si)}
                      aria-label={`Frame color ${si + 1}`}
                      className={`h-7 w-7 rounded-full border-2 transition-transform duration-200 ${frameIdx === si ? "scale-110 border-blue" : "border-line-strong"}`}
                      style={{ background: sw }}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT customizer */}
              <div className="flex flex-col">
                {/* prescription */}
                <div className="eyebrow mb-3 text-ink-soft">PRESCRIPTION</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setNeedRx(false)}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition-all ${
                      !needRx ? "border-blue bg-blue text-canvas" : "border-line-strong bg-white text-ink hover:border-blue"
                    }`}
                  >
                    No prescription
                  </button>
                  <button
                    onClick={() => setNeedRx(true)}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition-all ${
                      needRx ? "border-blue bg-blue text-canvas" : "border-line-strong bg-white text-ink hover:border-blue"
                    }`}
                  >
                    Doctor prescribed
                  </button>
                </div>
                {needRx && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs text-smoke">
                      Enter your sphere power (or note it and share on WhatsApp while ordering):
                    </p>
                    <input
                      value={rx}
                      onChange={(e) => setRx(e.target.value)}
                      placeholder="e.g. Right -2.00 / Left -1.75"
                      className="w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue"
                    />
                  </div>
                )}

                {/* lens type */}
                <div className="eyebrow mb-3 mt-6 text-ink-soft">LENS TYPE</div>
                <div className="grid grid-cols-2 gap-2">
                  {lensTypes.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLens(l)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all ${
                        lens.id === l.id ? "border-blue bg-blue/10" : "border-line-strong bg-white hover:border-blue/50"
                      }`}
                    >
                      <span className="text-sm font-semibold text-ink">{l.short}</span>
                      <span className={`text-xs ${lens.id === l.id ? "text-blue" : "text-smoke"}`}>
                        {l.price === "৳ 0" ? "Incl." : `+${l.price}`}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 min-h-[2.2rem] text-[12px] leading-snug text-ink-soft">{lens.blurb}</p>

                {/* qty + total + add */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-line-strong bg-white">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-ink" aria-label="Decrease">
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-ink">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-ink" aria-label="Increase">
                      +
                    </button>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="eyebrow text-smoke">Total</div>
                    <div className="text-2xl text-ink">৳ {total.toLocaleString()}</div>
                  </div>
                </div>

                <button
                  onClick={addToBag}
                  className="mt-4 w-full rounded-full bg-ink py-4 text-sm font-semibold tracking-wide text-canvas transition-colors hover:bg-blue"
                >
                  Add to bag · ৳ {total.toLocaleString()}
                </button>
                <p className="mt-3 text-center text-[11px] text-smoke">
                  Lens upgrade + prescription included in your bag. Pay on delivery.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}