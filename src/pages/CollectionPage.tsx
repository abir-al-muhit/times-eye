import { useParams, Link } from "react-router-dom";
import { collections, matchesCollection, pieces } from "../data/brand";
import ProductCard from "../components/ProductCard";
import FrameGlyph from "../components/FrameGlyph";

// COLLECTION PAGE — one dedicated page per collection
// (/collections/all, /men, /women, /brand, /premium, /custom).
export default function CollectionPage() {
  const { id = "all" } = useParams();
  const col = collections.find((c) => c.id === id);
  const items = pieces.filter((p) => matchesCollection(id, p));

  if (!col) {
    return (
      <div className="mx-auto grid max-w-6xl place-items-center px-6 py-32 text-center">
        <div>
          <p className="font-display text-2xl font-bold text-ink">Collection not found</p>
          <Link to="/collections/all" className="mt-2 inline-block text-blue hover:underline">
            ← Back to all collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      {/* page header */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center">
        <Link
          to="/collections/all"
          className="text-sm font-semibold text-ink-mute transition-colors hover:text-blue"
        >
          ← All Collections
        </Link>
        <div className="flex items-center gap-4">
          <div
            className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl"
            style={{ background: col.tone }}
          >
            <FrameGlyph shape={col.shape} stroke={col.frame} fill="rgba(255,255,255,0.2)" className="h-12 w-12" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">{col.type}</span>
            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{col.name}</h1>
            <p className="text-sm text-ink-mute">{items.length} styles</p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="grid place-items-center py-24 text-center text-ink-mute">
          <p className="font-display text-xl font-semibold text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm">This collection is being restocked.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}