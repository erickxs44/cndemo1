import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { BrandSection } from "@/components/site/BrandSection";
import { HeroSlider } from "@/components/site/HeroSlider";
import { BermudasShowcase } from "@/components/site/BermudasShowcase";
import { CapsShowcase } from "@/components/site/CapsShowcase";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { PRODUCTS, BRANDS, CATEGORIES, BRAND_IMAGES, type Product } from "@/lib/store-data";

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
  const [quick, setQuick] = useState<Product | null>(null);
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
            <ProductCard key={p.id} product={p} onClick={() => setQuick(p)} />
          ))}
        </div>
      </section>

      {/* BRAND SECTIONS - cada uma em tela cheia */}
      {BRANDS.map((b, i) => (
        <BrandSection
          key={b.slug}
          brandSlug={b.slug}
          name={b.name}
          tagline={b.tagline}
          description={b.description}
          image={BRAND_IMAGES[b.slug]}
          reverse={i % 2 === 1}
        />
      ))}

      <BermudasShowcase />

      <CapsShowcase />


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

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </Layout>
  );
}
