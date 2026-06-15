import { Link } from "@tanstack/react-router";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import cap1 from "@/assets/cap-1.jpg";
import cap2 from "@/assets/cap-2.jpg";
import cap3 from "@/assets/cap-3.jpg";
import cap4 from "@/assets/cap-4.jpg";
import capHero from "@/assets/cap-hero.jpg";

const caps = [
  { img: cap1, name: "Cap Black Patch CN", price: "89,90", oldPrice: "129,90", color: "Preto", tag: "Best Seller" },
  { img: cap2, name: "Cap Desert Sand", price: "94,90", color: "Caramelo", tag: "Novo" },
  { img: cap3, name: "Cap Off White Minimal", price: "84,90", color: "Off-White" },
  { img: cap4, name: "Cap Royal Crest Gold", price: "119,90", oldPrice: "149,90", color: "Marinho", tag: "Premium" },
];

export function CapsShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 lg:py-32 border-y border-[var(--gold)]/20">
      {/* Glow de fundo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px 500px at 80% 20%, rgba(212,168,76,0.18), transparent 60%), radial-gradient(700px 400px at 10% 90%, rgba(212,168,76,0.10), transparent 60%)",
        }}
      />
      {/* Grade decorativa */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* HEADER + HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 lg:mb-20">
          {/* Texto */}
          <div className="lg:col-span-7 flex flex-col justify-center reveal">
            <div className="inline-flex items-center gap-2 self-start mb-6 px-3 py-1.5 border border-[var(--gold)]/40 bg-[var(--gold)]/5">
              <Sparkles className="w-3 h-3 text-[var(--gold)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] font-semibold">
                Coleção Headwear
              </span>
            </div>

            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.88] tracking-tight">
              BONÉS
              <br />
              <span className="italic text-[var(--gold)]">na cabeça,</span>
              <br />
              estilo no <span className="italic">topo.</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-white/60 max-w-lg leading-relaxed">
              Da rua ao rooftop. Modelos premium em algodão pesado, sarja e
              poliéster técnico — bordados, snapbacks e dad hats que coroam
              qualquer look.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/categoria/$slug"
                params={{ slug: "lancamentos" }}
                className="btn-magnetic inline-flex items-center gap-3 bg-[var(--gold)] text-black px-8 py-4 text-[10px] tracking-[0.35em] uppercase font-bold hover:-translate-y-0.5 transition-transform"
              >
                Comprar Bonés <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/50">
                <span className="w-8 h-px bg-white/30" />
                a partir de <span className="text-white">R$ 84,90</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="lg:col-span-5 relative reveal">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <img
                src={capHero}
                alt="Homem usando boné premium CN"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-2">
                  Drop 02 / 26
                </p>
                <p className="font-display text-2xl md:text-3xl text-white leading-tight">
                  Coroe o seu visual.
                </p>
              </div>
              {/* Tag preço flutuante */}
              <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-[var(--gold)]/40 px-4 py-3">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--gold)]">Coleção</p>
                <p className="text-white font-display text-lg leading-none mt-1">+12 modelos</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRID DE BONÉS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {caps.map((c, i) => (
            <article
              key={i}
              className="group relative cursor-pointer reveal bg-[#0a0a0a] border border-white/5 hover:border-[var(--gold)]/50 transition-colors duration-500"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {c.tag && (
                <span className="absolute top-3 left-3 z-10 bg-[var(--gold)] text-black text-[9px] tracking-[0.25em] font-bold uppercase px-2 py-1">
                  {c.tag}
                </span>
              )}

              <div className="relative overflow-hidden aspect-square">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(400px 200px at 50% 100%, rgba(212,168,76,0.25), transparent 70%)",
                  }}
                />
                <button
                  aria-label={`Comprar ${c.name}`}
                  className="absolute bottom-3 right-3 grid place-items-center w-11 h-11 bg-[var(--gold)] text-black translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-1.5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{c.color}</p>
                <h3 className="text-sm text-white group-hover:text-[var(--gold)] transition-colors leading-snug">
                  {c.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-1">
                  {c.oldPrice && (
                    <span className="text-xs text-white/40 line-through">R$ {c.oldPrice}</span>
                  )}
                  <span className="text-sm text-white font-semibold">R$ {c.price}</span>
                </div>
                <p className="text-[10px] text-white/40 pt-1">ou 3x sem juros</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-14 flex justify-center reveal">
          <Link
            to="/categoria/$slug"
            params={{ slug: "lancamentos" }}
            className="group inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-white/70 hover:text-[var(--gold)] transition border-b border-white/20 hover:border-[var(--gold)] pb-2"
          >
            Ver todos os bonés
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
