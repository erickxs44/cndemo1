import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Check, ShoppingBag, Truck, ShieldCheck, RefreshCw, ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PRODUCTS, type Product } from "@/lib/store-data";
import { getProductByIdFn, getProductsFn } from "@/lib/queries/products";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/produto/$id")({
  loader: async ({ params }) => {
    const product = await getProductByIdFn({ data: params.id });
    if (!product) throw notFound();
    const allProducts = await getProductsFn();
    return { product, allProducts };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: `${p?.name ?? "Produto"} — CN STORE` },
        { name: "description", content: p?.description ?? "Produto exclusivo CN Store." },
        { property: "og:title", content: `${p?.name ?? "Produto"} — CN STORE` },
        { property: "og:description", content: p?.description ?? "" },
        ...(p?.image ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => <Layout><div className="pt-40 text-center text-white/60">Produto não encontrado.</div></Layout>,
  errorComponent: () => <Layout><div className="pt-40 text-center text-white/60">Erro ao carregar.</div></Layout>,
});

function ProductPage() {
  const { product, allProducts } = Route.useLoaderData() as { product: Product, allProducts: Product[] };
  const navigate = useNavigate();
  const { add } = useCart();

  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string>(product.colors[0]?.name ?? "");
  const [added, setAdded] = useState(false);
  const [openTab, setOpenTab] = useState<"desc" | "spec">("desc");

  // gallery: main + 3 thumbs (reusing image; placeholder for multi-photo demo)
  const gallery = useMemo<string[]>(() => [product.image, product.image, product.image, product.image], [product.image]);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    // reset state when navigating to a different product
    setSize(null);
    setAdded(false);
    setColor(product.colors[0]?.name ?? "");
    setActiveImg(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product.id]);

  const related = useMemo(() => {
    const same = allProducts.filter(p => p.id !== product.id && p.category === product.category);
    const others = allProducts.filter(p => p.id !== product.id && p.category !== product.category);
    const combined = [...same, ...others];
    const seen = new Set<string>();
    return combined.filter(p => (seen.has(p.id) ? false : (seen.add(p.id), true))).slice(0, 4);
  }, [product.id, product.category, allProducts]);

  const installment = (product.price / 6).toFixed(2);

  const handleAdd = () => {
    if (!size) return;
    add({ product, size, color, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <Layout>
      <div className="pt-32 pb-20 px-5 sm:px-6 lg:px-10 max-w-[1500px] mx-auto">
        {/* breadcrumb */}
        <nav className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-[var(--gold)]">Home</Link>
          <span>/</span>
          <Link to="/categoria/$slug" params={{ slug: product.category }} className="hover:text-[var(--gold)]">{product.category}</Link>
          <span>/</span>
          <span className="text-white/70 truncate">{product.name}</span>
        </nav>

        {/* TOP — galeria + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Galeria */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-20 h-20 lg:w-24 lg:h-24 overflow-hidden border transition-all ${activeImg === i ? "border-[var(--gold)]" : "border-white/10 hover:border-white/30"}`}
                  aria-label={`Foto ${i + 1}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative bg-[#0a0a0a] aspect-[4/5] overflow-hidden">
              <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover animate-fade-in" />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-[var(--gold)] text-black text-[10px] tracking-[0.3em] font-bold uppercase px-3 py-1.5">Novo</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">{product.brand}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-3 leading-[1]">{product.name}</h1>

            <div className="mt-6 flex items-baseline gap-3 flex-wrap">
              {product.oldPrice && <span className="text-base text-white/40 line-through">R$ {product.oldPrice.toFixed(2)}</span>}
              <span className="font-display text-4xl text-[var(--gold)]">R$ {product.price.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-xs text-white/50">ou até <span className="text-white">6x de R$ {installment}</span> sem juros</p>
            <p className="text-[10px] text-white/40 mt-1">5% OFF no PIX · R$ {(product.price * 0.95).toFixed(2)}</p>

            {/* Cores */}
            <div className="mt-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Cor: <span className="text-white">{color}</span></p>
              <div className="flex gap-3">
                {product.colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    title={c.name}
                    className={`relative w-11 h-11 rounded-full border-2 transition-all duration-300 ${color === c.name ? "border-[var(--gold)] scale-110" : "border-white/20 hover:border-white/50"}`}
                    style={{ background: c.hex }}
                  >
                    {color === c.name && <span className="absolute inset-0 rounded-full ring-1 ring-[var(--gold)]/40 ring-offset-2 ring-offset-black" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tamanhos */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/50">Tamanho</p>
                <button className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-[var(--gold)]">Guia de medidas</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-3.5 text-sm border transition-all duration-300 ${size === s ? "bg-[var(--gold)] text-black border-[var(--gold)]" : "border-white/15 text-white hover:border-white/40"}`}
                  >{s}</button>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleAdd}
                disabled={!size}
                className={`btn-magnetic w-full py-5 text-xs font-bold tracking-[0.35em] uppercase transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  added ? "bg-emerald-500 text-black" : "bg-[var(--gold)] text-black hover:bg-[var(--gold-bright)]"
                }`}
              >
                {added ? (<><Check size={16} /> Adicionado à Sacola</>) : (
                  <><ShoppingBag size={16} /> {size ? "Adicionar à Sacola" : "Selecione um Tamanho"}</>
                )}
              </button>
              <button
                onClick={() => { if (!size) return; add({ product, size, color, quantity: 1 }); }}
                disabled={!size}
                className="w-full py-5 text-xs font-bold tracking-[0.35em] uppercase border border-white/20 text-white hover:border-[var(--gold)] hover:text-[var(--gold)] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Comprar Agora
              </button>
            </div>

            {/* Vantagens */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck className="w-5 h-5 text-[var(--gold)]" />
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/60">Frete grátis<br/>acima R$199</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RefreshCw className="w-5 h-5 text-[var(--gold)]" />
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/60">Troca grátis<br/>em 30 dias</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-[var(--gold)]" />
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/60">Compra<br/>100% segura</p>
              </div>
            </div>
          </div>
        </div>

        {/* MEIO — descrição/specs accordion */}
        <div className="mt-24 max-w-3xl mx-auto">
          <Section
            open={openTab === "desc"}
            onToggle={() => setOpenTab(openTab === "desc" ? "spec" : "desc")}
            title="Descrição do Produto"
          >
            <p className="text-sm text-white/70 leading-relaxed">{product.description}</p>
            <p className="text-sm text-white/60 leading-relaxed mt-4">
              Peça selecionada pela curadoria CN Store. Acabamento premium, etiqueta interna bordada e embalagem exclusiva.
              Ideal para compor looks modernos com identidade.
            </p>
          </Section>
          <Section
            open={openTab === "spec"}
            onToggle={() => setOpenTab(openTab === "spec" ? "desc" : "spec")}
            title="Especificações Técnicas"
          >
            <dl className="text-sm divide-y divide-white/10">
              {[
                ["Composição", "97% Algodão, 3% Elastano"],
                ["Caimento", "Regular Fit"],
                ["Origem", "Indústria Brasileira"],
                ["Cuidados", "Lavar à máquina · Não usar alvejante"],
                ["Coleção", "CN Drop 02 / 26"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 py-3">
                  <dt className="text-white/40 text-xs tracking-[0.2em] uppercase">{k}</dt>
                  <dd className="text-white/80">{v}</dd>
                </div>
              ))}
            </dl>
          </Section>
        </div>
      </div>

      {/* INFERIOR — Veja também */}
      <section className="bg-[#050505] border-t border-white/10 py-20 lg:py-24 px-5 sm:px-6 lg:px-10">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-3">Curadoria</p>
              <h2 className="font-display text-3xl md:text-5xl text-white tracking-tight">
                Quem comprou também <span className="italic">gostou</span>
              </h2>
            </div>
            <Link to="/categoria/$slug" params={{ slug: product.category }} className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-[var(--gold)] transition">
              Ver categoria <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, idx) => (
              <RelatedCard key={p.id} product={p} delay={idx * 80} onClick={() => navigate({ to: "/produto/$id", params: { id: p.id } })} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Section({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 last:border-b">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-xs tracking-[0.35em] uppercase text-white font-semibold">{title}</span>
        <ChevronDown className={`w-4 h-4 text-[var(--gold)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-6 animate-fade-up">{children}</div>}
    </div>
  );
}

function RelatedCard({ product, delay, onClick }: { product: Product; delay: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden bg-black aspect-[4/5]">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
        <span className="absolute bottom-3 left-3 right-3 text-[10px] tracking-[0.3em] uppercase text-white text-center backdrop-blur-xl bg-white/10 border border-white/20 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          Ver Peça
        </span>
      </div>
      <div className="pt-3 space-y-1">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--gold)]">{product.brand}</p>
        <p className="text-xs text-white group-hover:text-[var(--gold)] transition line-clamp-1">{product.name}</p>
        <p className="text-xs text-white/80">R$ {product.price.toFixed(2)}</p>
      </div>
    </button>
  );
}
