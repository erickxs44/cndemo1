import { Link } from "@tanstack/react-router";

type Props = {
  brandSlug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  reverse?: boolean;
  accentColor?: string;
};

export function BrandSection({ brandSlug, name, tagline, description, image, reverse }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center reveal">
      <div className="absolute inset-0">
        <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover scale-105" />
        <div className={`absolute inset-0 ${reverse ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black via-black/70 to-transparent`} />
      </div>

      <div className={`relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 py-32 grid md:grid-cols-2 gap-12 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="space-y-6 max-w-xl">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] animate-fade-up">Coleção Exclusiva</p>
          <h2 className="font-display text-6xl lg:text-8xl text-white leading-[0.95]">{name}</h2>
          <p className="text-lg italic text-white/70 font-display">"{tagline}"</p>
          <p className="text-sm text-white/60 leading-relaxed max-w-md">{description}</p>
          <div className="pt-4">
            <Link
              to="/marca/$slug"
              params={{ slug: brandSlug }}
              className="glass inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.3em] uppercase text-white transition-all duration-300"
            >
              Ver Coleção
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
