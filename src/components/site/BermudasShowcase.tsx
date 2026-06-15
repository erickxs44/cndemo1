import { Link } from "@tanstack/react-router";
import { ShoppingBag, Truck, ArrowRight } from "lucide-react";
import bermuda1 from "@/assets/product-bermuda-1.jpg";
import bermuda2 from "@/assets/product-bermuda-2.jpg";
import bermuda3 from "@/assets/product-bermuda-3.jpg";
import bermuda4 from "@/assets/product-bermuda-4.jpg";
import promoRack from "@/assets/promo-rack.jpg";
import promoNew from "@/assets/promo-newarrivals.jpg";
import promoSummer from "@/assets/promo-summer.jpg";

const bermudas = [
  { img: bermuda1, name: "Bermuda Chino Premium CN", price: "119,90", color: "Marinho" },
  { img: bermuda2, name: "Bermuda Chino Sahara", price: "129,90", color: "Cáqui" },
  { img: bermuda3, name: "Bermuda Linho Areia", price: "149,90", color: "Areia" },
  { img: bermuda4, name: "Bermuda Tech Graphite", price: "139,90", color: "Grafite" },
];

export function BermudasShowcase() {
  return (
    <>
      {/* BERMUDAS PREMIUM */}
      <section className="py-28 lg:py-32 px-6 lg:px-10 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-12 lg:mb-16 reveal">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Verão CN</p>
            <h2 className="font-display text-4xl md:text-6xl text-white tracking-tight">
              Bermudas <span className="italic">Premium</span>
            </h2>
          </div>
          <Link
            to="/categoria/$slug"
            params={{ slug: "bermudas" }}
            className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white/60 hover:text-[var(--gold)] transition border-b border-white/20 pb-1"
          >
            Ver Tudo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {bermudas.map((b, i) => (
            <article
              key={i}
              className="group cursor-pointer reveal"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative overflow-hidden bg-[#0a0a0a] aspect-[4/5]">
                <img
                  src={b.img}
                  alt={b.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <button
                  aria-label={`Comprar ${b.name}`}
                  className="absolute bottom-4 right-4 grid place-items-center w-11 h-11 bg-[var(--gold)] text-black translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-4 space-y-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{b.color}</p>
                <h3 className="text-sm text-white group-hover:text-[var(--gold)] transition-colors">
                  {b.name}
                </h3>
                <p className="text-sm text-white">R$ {b.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAIXA DE FRETE */}
      <section className="bg-black border-y border-[var(--gold)]/30 py-5">
        <div className="flex items-center justify-center gap-4 px-6 text-center">
          <Truck className="w-5 h-5 text-[var(--gold)] shrink-0" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white font-semibold">
            Frete grátis para todo o Brasil em compras acima de{" "}
            <span className="text-[var(--gold)]">R$ 199</span>
          </p>
        </div>
      </section>

      {/* BANNERS EM BLOCOS */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 lg:py-28 max-w-[1600px] mx-auto space-y-5 lg:space-y-6">
        {/* Bloco superior */}
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-white/5 reveal">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
            <img
              src={promoRack}
              alt="Cabideiro com peças premium"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div
            className="relative flex flex-col justify-center items-start gap-6 p-10 lg:p-16"
            style={{
              background:
                "linear-gradient(135deg, #d4a84c 0%, #b8893a 60%, #8a6326 100%)",
            }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-black/70">Oferta Limitada</p>
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-black leading-[0.95] tracking-tight">
              Até <span className="italic">40% OFF</span>
              <br />em itens selecionados
            </h3>
            <p className="text-sm text-black/70 max-w-md">
              As melhores marcas com preços únicos. Selecione, escolha e leve hoje.
            </p>
            <Link
              to="/categoria/$slug"
              params={{ slug: "lancamentos" }}
              className="btn-magnetic inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[10px] tracking-[0.35em] uppercase font-bold hover:-translate-y-0.5 transition-transform"
            >
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Blocos inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* NEW ARRIVALS */}
          <div className="relative grid grid-cols-2 overflow-hidden border border-white/5 bg-[#e8e1d4] min-h-[360px] reveal">
            <div className="flex flex-col justify-center gap-5 p-7 lg:p-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-black/60">Novidades</p>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-black leading-tight tracking-tight">
                New <span className="italic">Arrivals</span>
              </h3>
              <p className="text-xs lg:text-sm text-black/70">
                Estilos frescos que acabaram de chegar na loja.
              </p>
              <Link
                to="/categoria/$slug"
                params={{ slug: "lancamentos" }}
                className="btn-magnetic inline-flex w-fit items-center gap-2 bg-black text-white px-6 py-3 text-[10px] tracking-[0.35em] uppercase font-bold hover:-translate-y-0.5 transition-transform"
              >
                Shop Now <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={promoNew}
                alt="Novos lançamentos masculinos"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* SUMMER COLLECTION */}
          <div className="relative grid grid-cols-2 overflow-hidden border border-white/5 bg-[#d9c9a8] min-h-[360px] reveal">
            <div className="flex flex-col justify-center gap-5 p-7 lg:p-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-black/60">Verão 26</p>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-black leading-tight tracking-tight">
                Summer <span className="italic">Collection</span>
              </h3>
              <p className="text-xs lg:text-sm text-black/70">
                Leve, fresco e sem esforço.
              </p>
              <Link
                to="/categoria/$slug"
                params={{ slug: "camisas" }}
                className="btn-magnetic inline-flex w-fit items-center gap-2 bg-black text-white px-6 py-3 text-[10px] tracking-[0.35em] uppercase font-bold hover:-translate-y-0.5 transition-transform"
              >
                Explore Now <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={promoSummer}
                alt="Coleção de verão em camisas leves"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
