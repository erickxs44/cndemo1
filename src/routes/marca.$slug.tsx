import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { BRANDS, PRODUCTS, type Product } from "@/lib/store-data";
import brandLacoste from "@/assets/brand-lacoste.jpg";
import brandArmani from "@/assets/brand-armani.jpg";
import brandReserva from "@/assets/brand-reserva.jpg";
import brandAramis from "@/assets/brand-aramis.jpg";

const IMG: Record<string, string> = {
  lacoste: brandLacoste,
  armani: brandArmani,
  reserva: brandReserva,
  aramis: brandAramis,
};

export const Route = createFileRoute("/marca/$slug")({
  loader: ({ params }) => {
    const brand = BRANDS.find(b => b.slug === params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.brand.name ?? "Marca"} — CN STORE` },
      { name: "description", content: loaderData?.brand.description ?? "Coleção exclusiva CN STORE." },
    ],
  }),
  component: BrandPage,
  notFoundComponent: () => <Layout><div className="pt-40 text-center text-white/60">Marca não encontrada.</div></Layout>,
  errorComponent: () => <Layout><div className="pt-40 text-center text-white/60">Erro ao carregar.</div></Layout>,
});

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const [quick, setQuick] = useState<Product | null>(null);
  const products = PRODUCTS.filter(p => p.brand.toLowerCase().includes(brand.name.toLowerCase().split(" ")[0].toLowerCase()));
  const image = IMG[brand.slug];

  return (
    <Layout>
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img src={image} alt={brand.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="relative z-10 h-full flex items-end max-w-[1600px] mx-auto px-6 lg:px-10 pb-20">
          <div className="animate-fade-up">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Marca Parceira</p>
            <h1 className="font-display text-7xl md:text-9xl text-white">{brand.name}</h1>
            <p className="font-display italic text-xl text-white/70 mt-4">"{brand.tagline}"</p>
            <p className="mt-6 max-w-xl text-white/60 leading-relaxed">{brand.description}</p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-[1600px] mx-auto py-24">
        <div className="flex items-end justify-between mb-12 reveal">
          <h2 className="font-display text-4xl md:text-5xl text-white">A Coleção</h2>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40">{products.length} peças</p>
        </div>
        {products.length === 0 ? (
          <p className="text-center text-white/50 py-32">Em breve, peças exclusivas desta marca.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
            {products.map(p => <ProductCard key={p.id} product={p} onClick={() => setQuick(p)} />)}
          </div>
        )}
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </Layout>
  );
}
