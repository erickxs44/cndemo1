import { Link } from "@tanstack/react-router";

type Props = {
  brandSlug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  reverse?: boolean;
};

export function BrandSection({ brandSlug, name, image }: Props) {
  return (
    <section className="relative w-full px-6 lg:px-10 py-12 reveal">
      <Link
        to="/marca/$slug"
        params={{ slug: brandSlug }}
        aria-label={`Ver coleção ${name}`}
        className="group relative block w-full max-w-[1400px] mx-auto aspect-[16/10] md:aspect-[21/9] overflow-hidden border border-white/5 hover:border-[var(--gold)] transition-colors duration-500"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain bg-black transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* sutil gradiente apenas embaixo para legibilidade do CTA, sem cobrir o logo */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="absolute bottom-5 right-5 glass inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          Ver Coleção
          <span className="text-[var(--gold)]">→</span>
        </span>
      </Link>
    </section>
  );
}
