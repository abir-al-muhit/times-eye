import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
  const { pathname } = useLocation();

  const links = [
    { label: "Shop", to: "/" },
    { label: "All Collections", to: "/collections/all" },
    { label: "Men", to: "/collections/men" },
    { label: "Women", to: "/collections/women" },
    { label: "Brand", to: "/collections/brand" },
    { label: "Premium", to: "/collections/premium" },
  ];

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <EyeMark />
          <span className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            TIMES<span className="text-blue"> EYE</span>
          </span>
        </Link>

        {/* desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                  pathname === l.to ? "text-blue" : "text-ink-soft hover:text-blue"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-blue text-canvas transition-colors hover:brightness-110"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/collections/custom"
            className="hidden rounded-full border border-line bg-white px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink transition-colors hover:border-blue hover:text-blue sm:inline-flex"
          >
            Custom Build
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}