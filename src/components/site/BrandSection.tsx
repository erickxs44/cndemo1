import { Link } from "@tanstack/react-router";

type Props = {
  brandSlug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  reverse?: boolean;
};

export function BrandSection({ brandSlug, name, image, reverse }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-end reveal">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover scale-105"
        />
        <div
          className={`absolute inset-0 ${
            reverse ? "bg-gradient-to-l" : "bg-gradient-to-r"
          } from-black/90 via-black/40 to-transparent`}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div
        className={`relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 py-20 flex ${
          reverse ? "justify-end" : "justify-start"
        }`}
      >
        <Link
          to="/marca/$slug"
          params={{ slug: brandSlug }}
          aria-label={`Ver roupas da marca ${name}`}
          className="btn-magnetic group inline-flex items-center gap-4 bg-[var(--gold)] text-black px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[var(--gold-bright)] transition-colors"
        >
          Ver Roupas
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
