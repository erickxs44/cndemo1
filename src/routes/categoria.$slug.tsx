import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES } from "@/lib/store-data";
import { getProductsByCategoryFn } from "@/lib/queries/products";

export const Route = createFileRoute("/categoria/$slug")({
  loader: async ({ params }) => {
    const cat = CATEGORIES.find(c => c.slug === params.slug);
    if (!cat) throw notFound();
    const products = await getProductsByCategoryFn({ data: params.slug });
    return { cat, products };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Categoria"} — CN STORE` },
      { name: "description", content: `Explore a coleção de ${loaderData?.cat.name} da CN STORE.` },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => <Layout><div className="pt-40 text-center text-white/60">Categoria não encontrada.</div></Layout>,
  errorComponent: () => <Layout><div className="pt-40 text-center text-white/60">Erro ao carregar.</div></Layout>,
});

function CategoryPage() {
  const { cat, products } = Route.useLoaderData();

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1600px] mx-auto">
        <div className="reveal">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Categoria</p>
          <h1 className="font-display text-6xl md:text-8xl text-white">{cat.name}</h1>
          <p className="mt-6 text-white/50 max-w-xl">
            {products.length} {products.length === 1 ? "peça" : "peças"} cuidadosamente selecionadas.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-[1600px] mx-auto pb-32">
        {products.length === 0 ? (
          <p className="text-center text-white/50 py-32">Em breve, novas peças nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>


    </Layout>
  );
}
