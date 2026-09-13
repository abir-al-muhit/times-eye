import { Link } from "react-router-dom";
import { brand, collections } from "../data/brand";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-canvas pb-10 pt-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          {/* brand */}
          <div className="flex items-start gap-3">
            <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
              <g stroke="var(--color-blue)" strokeWidth="1.8" fill="none">
                <path d="M3 20 C 10 8, 30 8, 37 20 C 30 32, 10 32, 3 20 Z" />
                <circle cx="20" cy="20" r="7" fill="var(--color-blue)" />
                <circle cx="20" cy="20" r="2.4" fill="var(--color-canvas)" />
              </g>
            </svg>
            <div>
              <div className="font-display text-2xl font-bold leading-none text-ink">
                TIMES<span className="text-blue"> EYE</span>
              </div>
              <div className="mt-1 eyebrow text-smoke">{brand.tagline}</div>
            </div>
          </div>

          {/* shop links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {collections.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                to={c.href}
                className="text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:text-blue"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/" className="text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:text-blue">
              Shop
            </Link>
          </div>

          {/* contact */}
          <div className="space-y-1 text-sm text-ink-soft">
            <a href={`tel:+${brand.whatsapp}`} className="block hover:text-blue">+{brand.whatsapp}</a>
            <a href={`mailto:${brand.email}`} className="block hover:text-blue">{brand.email}</a>
            <div className="text-smoke">{brand.location}</div>
          </div>
        </div>

        <div className="hairline my-10 bg-line" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="eyebrow text-smoke">
            © {new Date().getFullYear()} TIMES EYE · Gazipur, Dhaka · COD nationwide
          </p>
          <p className="flex items-center gap-2 eyebrow text-smoke">
            Crafted by
            <a
              href="https://matrocreative.studio"
              target="_blank"
              rel="noreferrer"
              className="text-blue hover:text-blue-deep"
            >
              MATRO CREATIVE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}