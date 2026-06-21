import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { HeroSlider } from "@/components/site/HeroSlider";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, type Product } from "@/lib/store-data";
import { getProductsFn } from "@/lib/queries/products";
import importadosImg from "@/assets/importados-section.jpg";

export const Route = createFileRoute("/")({
  loader: async () => {
    const allProducts = await getProductsFn();
    return { allProducts };
  },
  head: () => ({
    meta: [
      { title: "CN STORE — O Padrão Supremo do Vestuário Masculino" },
      { name: "description", content: "Vestuário masculino premium. Lacoste, Armani, Reserva, Aramis e mais." },
    ],
  }),
  component: Index,
});


function Index() {
  const { allProducts } = Route.useLoaderData() as { allProducts: Product[] };
  const featured = allProducts.slice(0, 6);

  return (
    <Layout>
      <HeroSlider />


      {/* MARQUEE */}
      <section className="bg-[var(--gold)] text-black py-5 overflow-hidden border-y border-black/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({length:2}).map((_,j) => (
            <div key={j} className="flex shrink-0">
              {["Frete grátis acima de R$ 399","3 camisas por R$139,9","Parcele em 10x sem juros","Curadoria das melhores grifes","Atendimento personalizado"].map((t,i) => (
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

      {/* SEÇÃO IMPORTADOS */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={importadosImg}
            alt="Coleção Importados"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Seleção Exclusiva</p>
          <h2 className="font-display text-6xl md:text-8xl text-white mb-8 tracking-tight">
            IMPORTADOS
          </h2>
          <Link
            to="/categoria/$slug"
            params={{ slug: "importados" }}
            className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-xs font-bold tracking-[0.3em] uppercase rounded-none hover:bg-[var(--gold)] transition-colors duration-300"
          >
            Conhecer Coleção <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="py-32 px-6 lg:px-10 max-w-[1600px] mx-auto reveal">
        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight text-center mb-16">
          Todos os Produtos
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {allProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
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
