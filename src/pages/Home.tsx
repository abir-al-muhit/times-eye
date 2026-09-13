import { Link } from "react-router-dom";
import { pieces } from "../data/brand";
import Hero from "../components/Hero";
import Brands from "../components/Brands";
import ProductCard from "../components/ProductCard";
import Collections from "../components/Collections";
import Lenses from "../components/Lenses";
import Watches from "../components/Watches";
import Story from "../components/Story";
import Visit from "../components/Visit";

function SectionHeader({ eyebrow, title, to, link }: { eyebrow: string; title: string; to?: string; link?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-[2px] w-8 bg-blue" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">{eyebrow}</span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="shrink-0 text-sm font-semibold text-ink-mute transition-colors hover:text-blue">
          {link || "View all"} →
        </Link>
      )}
    </div>
  );
}

function ProductRow({ title, eyebrow, items, link }: { title: string; eyebrow: string; items: (typeof pieces)[number][]; link: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <SectionHeader eyebrow={eyebrow} title={title} to={link} link="View all" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {items.map((p, i) => (
          <ProductCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const newArrivals = pieces.filter((p) => p.tag === "New" || p.tag === "Premium");
  const bestSellers = pieces.filter((p) => p.tag === "Bestseller");
  const mostOrdered = pieces.filter((p) => p.tag === "Hot");

  return (
    <>
      <Hero />
      <Brands />
      <ProductRow
        eyebrow="New Arrivals"
        title="Just landed"
        items={newArrivals}
        link="/collections/all"
      />
      <ProductRow
        eyebrow="Best Sellers"
        title="Customer favourites"
        items={bestSellers}
        link="/collections/all"
      />
      <ProductRow
        eyebrow="Most Ordered"
        title="People keep coming back"
        items={mostOrdered}
        link="/collections/all"
      />
      <Collections />
      <Lenses />
      <Watches />
      <Story />
      <Visit />
    </>
  );
}