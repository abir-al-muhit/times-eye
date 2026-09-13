import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { lensTypes, pieces } from "../data/brand";
import { useCart } from "../components/cart";
import FrameGlyph from "../components/FrameGlyph";
import ProductCard from "../components/ProductCard";

const ease = [0.16, 1, 0.3, 1] as const;

// PRODUCT PAGE — a real route (/product/:id). Pick prescription +
// lens type + frame colour + qty, then add to bag.
export default function ProductPage() {
  const { id = "" } = useParams();
  const { add } = useCart();
  const product = pieces.find((p) => p.id === id);

  const [needRx, setNeedRx] = useState(false);
  const [rx, setRx] = useState("");
  const [lens, setLens] = useState(lensTypes[1]);
  const [frameIdx, setFrameIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCat = pieces.filter((p) => p.category === product.category && p.id !== product.id);
    return (sameCat.length ? sameCat : pieces.filter((p) => p.id !== product.id)).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto grid max-w-6xl place-items-center px-6 py-32 text-center">
        <div>
          <p className="font-display text-2xl font-bold text-ink">Product not found</p>
          <Link to="/" className="mt-2 inline-block text-blue hover:underline">← Back to store</Link>
        </div>
      </div>
    );
  }

  const swatches = product.swatches;
  const frameIdxName = ["Onyx", "Tortoise", "Gunmetal", "Gold", "Clear", "Classic"][frameIdx] ?? `Color ${frameIdx + 1}`;
  const frameStroke = swatches[frameIdx] ?? "#201a13";
  const lensCost = Number(lens.price.replace(/[^\d]/g, ""));
  const productCost = Number(product.price.replace(/[^\d]/g, ""));
  const total = (productCost + lensCost) * qty;

  const summary =
    `${product.name} · ${product.category} · ${product.gender}\n` +
    `Frame: ${frameIdxName}\nLens: ${lens.name} (+${lens.price})\n` +
    (needRx ? `Prescription: ${rx || "(to be provided)"}\n` : "") +
    `Qty: ${qty}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-mute hover:text-blue">
        ← Back to store
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease }}
          className="flex items-center justify-center rounded-3xl border border-line bg-white p-8"
          style={{ background: `linear-gradient(160deg, ${product.tone}, #ffffff)` }}
        >
          <FrameGlyph shape={product.shape} stroke={frameStroke} fill="rgba(255,255,255,0.25)" className="h-64 w-64 md:h-72 md:w-72" />
        </motion.div>

        {/* RIGHT — info + build */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue">{product.category}</div>
              <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">{product.name}</h1>
              <p className="mt-1 text-sm text-ink-mute">{product.gender} · {product.lens} lens</p>
            </div>
            {product.tag && <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">{product.tag}</span>}
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-ink">{product.price}</span>
            {product.compareAt && <span className="text-lg text-ink-mute line-through">{product.compareAt}</span>}
          </div>

          {/* frame swatches */}
          <div className="mt-6 flex items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink-mute">Frame</span>
            {swatches.map((sw, si) => (
              <button
                key={sw + si}
                onClick={() => setFrameIdx(si)}
                aria-label={`Color ${si + 1}`}
                className={`h-7 w-7 rounded-full border-2 transition-transform ${frameIdx === si ? "scale-110 border-blue" : "border-line hover:scale-110"}`}
                style={{ background: sw }}
              />
            ))}
          </div>

          {/* prescription */}
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-mute">Prescription</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setNeedRx(false)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold ${!needRx ? "border-blue bg-blue text-white" : "border-line bg-white text-ink hover:border-blue"}`}
              >
                No prescription
              </button>
              <button
                onClick={() => setNeedRx(true)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold ${needRx ? "border-blue bg-blue text-white" : "border-line bg-white text-ink hover:border-blue"}`}
              >
                Doctor prescribed
              </button>
            </div>
            {needRx && (
              <input
                value={rx}
                onChange={(e) => setRx(e.target.value)}
                placeholder="e.g. Right -2.00 / Left -1.75"
                className="mt-3 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-mute focus:border-blue"
              />
            )}
          </div>

          {/* lens type */}
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-mute">Lens type</div>
            <div className="grid grid-cols-2 gap-2">
              {lensTypes.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLens(l)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all ${
                    lens.id === l.id ? "border-blue bg-blue/10" : "border-line bg-white hover:border-blue/50"
                  }`}
                >
                  <span className="text-sm font-semibold text-ink">{l.short}</span>
                  <span className={`text-xs ${lens.id === l.id ? "text-blue" : "text-ink-mute"}`}>
                    {l.price === "৳ 0" ? "Incl." : `+${l.price}`}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-mute">{lens.blurb}</p>
          </div>

          {/* qty + total + add */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-line bg-white">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-ink" aria-label="Decrease">−</button>
              <span className="w-6 text-center text-sm font-semibold text-ink">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-ink" aria-label="Increase">+</button>
            </div>
          </div>

          <button
            onClick={() => add(product, { label: `${frameIdxName} · ${lens.name}${needRx ? " · Rx" : ""}`, qty, note: summary })}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue py-4 font-display text-lg font-bold text-white transition-transform active:scale-[0.98] hover:brightness-110"
          >
            Add to bag · ৳ {total.toLocaleString()}
          </button>
          <p className="mt-3 text-center text-[11px] text-ink-mute">
            Lens upgrade + prescription included. Pay on delivery — gateway coming soon.
          </p>
        </motion.div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-[2px] w-8 bg-blue" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">You might also like</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Related frames</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}