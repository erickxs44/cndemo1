import { useEffect, useMemo, useState } from "react";
import { X, Check } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/store-data";
import { useCart } from "@/store/cart";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [current, setCurrent] = useState<Product | null>(product);

  useEffect(() => {
    setCurrent(product);
  }, [product]);

  useEffect(() => {
    if (!current) return;
    setSize(null);
    setAdded(false);
    setColor(current.colors[0]?.name ?? null);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [current, onClose]);

  const suggestions = useMemo(() => {
    if (!current) return [];
    const sameCat = PRODUCTS.filter(p => p.id !== current.id && p.category === current.category);
    const sameBrand = PRODUCTS.filter(p => p.id !== current.id && p.brand === current.brand && p.category !== current.category);
    const others = PRODUCTS.filter(p => p.id !== current.id);
    const combined = [...sameCat, ...sameBrand, ...others];
    const seen = new Set<string>();
    return combined.filter(p => (seen.has(p.id) ? false : (seen.add(p.id), true))).slice(0, 4);
  }, [current]);

  if (!current) return null;

  const handleAdd = () => {
    if (!size || !color) return;
    add({ product: current, size, color, quantity: 1 });
    setAdded(true);
    setTimeout(() => {
      const el = document.getElementById("qv-suggestions");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in" onClick={onClose} />
      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-5xl max-h-[92vh] overflow-y-auto animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/70 hover:text-[var(--gold)] bg-black/60 p-2 backdrop-blur"><X size={20} /></button>

        <div className="grid md:grid-cols-2">
          <div className="bg-black aspect-square md:aspect-auto">
            <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 lg:p-12 flex flex-col">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">{current.brand}</p>
            <h2 className="font-display text-3xl lg:text-4xl text-white mt-2">{current.name}</h2>
            <div className="flex items-baseline gap-3 mt-4">
              {current.oldPrice && <span className="text-base text-white/40 line-through">R$ {current.oldPrice}</span>}
              <span className="font-display text-3xl text-[var(--gold)]">R$ {current.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mt-6">{current.description}</p>

            <div className="mt-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Cor: <span className="text-white">{color}</span></p>
              <div className="flex gap-2">
                {current.colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${color === c.name ? "border-[var(--gold)] scale-110" : "border-white/20 hover:border-white/50"}`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Tamanho</p>
              <div className="grid grid-cols-4 gap-2">
                {current.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-3 text-sm border transition-all duration-300 ${size === s ? "bg-[var(--gold)] text-black border-[var(--gold)]" : "border-white/15 text-white hover:border-white/40"}`}
                  >{s}</button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!size}
              className={`btn-magnetic mt-8 w-full py-4 text-xs font-bold tracking-[0.3em] uppercase transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                added ? "bg-emerald-500 text-black" : "bg-[var(--gold)] text-black hover:bg-[var(--gold-bright)]"
              }`}
            >
              {added ? (<><Check size={16} /> Adicionado à Sacola</>) : (size ? "Adicionar à Sacola" : "Selecione um Tamanho")}
            </button>
            <p className="text-[10px] text-center text-white/30 tracking-wider mt-4">Frete grátis acima de R$ 499 · Troca em 30 dias</p>
          </div>
        </div>

        <div id="qv-suggestions" className="px-6 md:px-10 py-10 border-t border-white/10 bg-[#070707]">
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="font-display text-2xl md:text-3xl text-white">
              Você também pode <span className="text-[var(--gold)] italic">gostar</span>
            </h3>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 hidden md:block">Curadoria CN</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {suggestions.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrent(p)}
                className="group text-left animate-fade-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="relative overflow-hidden bg-black aspect-[4/5]">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <span className="absolute bottom-3 left-3 right-3 text-[10px] tracking-[0.3em] uppercase text-white text-center backdrop-blur-xl bg-white/10 border border-white/20 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Ver Peça
                  </span>
                </div>
                <div className="pt-3 space-y-1">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--gold)]">{p.brand}</p>
                  <p className="text-xs text-white group-hover:text-[var(--gold)] transition line-clamp-1">{p.name}</p>
                  <p className="text-xs text-white/80">R$ {p.price.toFixed(2)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
