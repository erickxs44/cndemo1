import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Product } from "@/lib/store-data";
import { useCart } from "@/store/cart";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (!product) return;
    setSize(null);
    setColor(product.colors[0]?.name ?? null);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!size || !color) return;
    add({ product, size, color, quantity: 1 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in" onClick={onClose} />
      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-5xl max-h-[92vh] overflow-y-auto animate-fade-up grid md:grid-cols-2">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/70 hover:text-[var(--gold)] bg-black/60 p-2 backdrop-blur"><X size={20} /></button>
        <div className="bg-black aspect-square md:aspect-auto">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 lg:p-12 flex flex-col">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">{product.brand}</p>
          <h2 className="font-display text-3xl lg:text-4xl text-white mt-2">{product.name}</h2>
          <div className="flex items-baseline gap-3 mt-4">
            {product.oldPrice && <span className="text-base text-white/40 line-through">R$ {product.oldPrice}</span>}
            <span className="font-display text-3xl text-[var(--gold)]">R$ {product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mt-6">{product.description}</p>

          <div className="mt-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Cor: <span className="text-white">{color}</span></p>
            <div className="flex gap-2">
              {product.colors.map(c => (
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
              {product.sizes.map(s => (
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
            className="btn-magnetic mt-8 w-full py-4 bg-[var(--gold)] text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-[var(--gold-bright)] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {size ? "Adicionar à Sacola" : "Selecione um Tamanho"}
          </button>
          <p className="text-[10px] text-center text-white/30 tracking-wider mt-4">Frete grátis acima de R$ 499 · Troca em 30 dias</p>
        </div>
      </div>
    </div>
  );
}
