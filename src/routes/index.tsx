import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { BrandSection } from "@/components/site/BrandSection";
import { HeroSlider } from "@/components/site/HeroSlider";
import { BermudasShowcase } from "@/components/site/BermudasShowcase";
import { CapsShowcase } from "@/components/site/CapsShowcase";
import { ProductCard } from "@/components/site/ProductCard";
import { PartnerBrands } from "@/components/site/PartnerBrands";
import { ShirtsShowcase } from "@/components/site/ShirtsShowcase";
import { PRODUCTS, BRANDS, CATEGORIES, BRAND_IMAGES } from "@/lib/store-data";
import aramisLogo from "@/assets/brands/aramis.jpg.asset.json";
import reservaLogo from "@/assets/brands/reserva.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CN STORE — O Padrão Supremo do Vestuário Masculino" },
      { name: "description", content: "Vestuário masculino premium. Lacoste, Armani, Reserva, Aramis e mais." },
    ],
  }),
  component: Index,
});


function Index() {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <Layout>
      <HeroSlider />


      {/* MARQUEE */}
      <section className="bg-[var(--gold)] text-black py-5 overflow-hidden border-y border-black/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({length:2}).map((_,j) => (
            <div key={j} className="flex shrink-0">
              {["Frete grátis acima de R$ 499","Troca em 30 dias","Parcele em 10x sem juros","Curadoria das melhores grifes","Atendimento personalizado"].map((t,i) => (
                <span key={i} className="mx-12 text-xs font-bold tracking-[0.4em] uppercase">{t} ✦</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-32 px-6 lg:px-10 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-16 reveal">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Seleção do Editor</p>
            <h2 className="font-display text-5xl md:text-7xl text-white">Peças <span className="italic">essenciais</span></h2>
          </div>
          <Link to="/categoria/$slug" params={{ slug: "lancamentos" }} className="hidden md:block text-xs tracking-[0.3em] uppercase text-white/60 hover:text-[var(--gold)] transition border-b border-white/20 pb-1">
            Ver Tudo →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BRAND SECTIONS - Substituída pela nova seção de 2 quadrados */}
      <PartnerBrands />

      {/* PARCEIROS EXTRAS - Glassmorphism */}
      <section className="relative py-24 px-6 lg:px-10 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[var(--gold)]/10 blur-[140px]" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#e94560]/15 blur-[140px]" />
        </div>
        <div className="relative max-w-[1400px] mx-auto reveal">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-3">Também na CN</p>
            <h2 className="font-display text-4xl md:text-6xl text-white">Marcas <span className="italic">parceiras</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { name: "Aramis", logo: aramisLogo.url, tagline: "Alfaiataria contemporânea brasileira" },
              { name: "Reserva", logo: reservaLogo.url, tagline: "Estilo carioca, atitude única" },
            ].map((b) => (
              <div
                key={b.name}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[var(--gold)]/50 hover:bg-white/[0.08] transition-all duration-500 p-10 lg:p-14 flex flex-col items-center justify-center min-h-[280px]"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                <span className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative bg-white rounded-xl p-6 lg:p-8 w-full max-w-[320px] flex items-center justify-center shadow-lg group-hover:scale-[1.03] transition-transform duration-500">
                  <img src={b.logo} alt={`Logo ${b.name}`} loading="lazy" className="w-full h-auto object-contain max-h-24" />
                </div>
                <p className="relative mt-6 text-xs tracking-[0.3em] uppercase text-white/60 text-center">{b.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BermudasShowcase />

      <CapsShowcase />

      <ShirtsShowcase />
      {/* CATEGORIES STRIP */}
      <section className="py-32 px-6 lg:px-10 max-w-[1600px] mx-auto reveal">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4 text-center">Universo CN</p>
        <h2 className="font-display text-5xl md:text-7xl text-white text-center mb-16">Navegue por <span className="italic">categoria</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-[var(--gold)] transition-all duration-500 hover-lift"
              style={{ animationDelay: `${i*100}ms` }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <span className="font-display text-2xl lg:text-3xl text-white group-hover:text-[var(--gold)] transition text-center">{c.name}</span>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-white/40 opacity-0 group-hover:opacity-100 transition">
                Explorar →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-40 px-6 lg:px-10 bg-[#050505] border-y border-white/5 reveal">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-6">Manifesto</p>
          <p className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
            "Vestir-se bem não é vaidade, é <span className="italic text-[var(--gold)]">respeito</span> por si mesmo e pelo mundo ao redor."
          </p>
          <p className="mt-10 text-xs tracking-[0.4em] uppercase text-white/40">— CN Store, desde 2018</p>
        </div>
      </section>


    </Layout>
  );
}
