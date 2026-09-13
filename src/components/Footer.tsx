import { brand, navbar } from "../data/brand";

export default function Footer() {
  const jump = (id: string) => {
    const el = document.querySelector(`#${id}`) as HTMLElement | null;
    if (el) window.__lenis?.scrollTo(el, { offset: -70 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className="relative border-t border-line bg-canvas pb-10 pt-16">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          {/* brand */}
          <div className="flex items-start gap-3">
            <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
              <g stroke="var(--color-tortoise)" strokeWidth="1.8" fill="none">
                <path d="M3 20 C 10 8, 30 8, 37 20 C 30 32, 10 32, 3 20 Z" />
                <circle cx="20" cy="20" r="7" fill="var(--color-tortoise)" />
                <circle cx="20" cy="20" r="2.4" fill="var(--color-canvas)" />
              </g>
            </svg>
            <div>
              <div className="display text-3xl leading-none tracking-[0.02em] text-ink">
                TIMES<span className="text-tortoise"> EYE</span>
              </div>
              <div className="mt-1 eyebrow text-smoke">{brand.tagline}</div>
            </div>
          </div>

          {/* nav */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {navbar.map((item) => (
              <button
                key={item.id}
                onClick={() => jump(item.id)}
                className="eyebrow text-ink-soft transition-colors hover:text-tortoise"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* contact */}
          <div className="space-y-1 text-sm text-ink-soft">
            <a href={`tel:${`+${brand.whatsapp}`}`} className="block hover:text-tortoise">
              +{brand.whatsapp}
            </a>
            <a href={`mailto:${brand.email}`} className="block hover:text-tortoise">
              {brand.email}
            </a>
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
              className="text-tortoise hover:text-tortoise-deep"
            >
              MATRO CREATIVE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}