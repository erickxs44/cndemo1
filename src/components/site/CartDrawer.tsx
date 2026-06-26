import { useEffect } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";


export function CartDrawer() {
  const { open, setOpen, items, remove, updateQty, total, checkout, isSyncing } = useCart();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in" onClick={() => setOpen(false)} />
      <aside className="absolute top-0 right-0 h-full w-full md:w-[480px] bg-black border-l border-white/10 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="font-display text-xl tracking-[0.2em] text-white">SACOLA <span className="text-[var(--gold)]">({items.length})</span></h3>
          <button onClick={() => setOpen(false)} aria-label="Fechar" className="text-white/70 hover:text-[var(--gold)] p-2"><X size={22} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="font-display text-2xl mb-2">Sua sacola está vazia</p>
              <p className="text-sm tracking-wider">Explore o catálogo e adicione peças exclusivas.</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item, i) => (
                <li key={i} className="flex gap-4 pb-5 border-b border-white/5 animate-fade-up">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover bg-white/5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{item.product.brand}</p>
                    <p className="text-sm text-white truncate mt-1">{item.product.name}</p>
                    <p className="text-xs text-white/40 mt-1">{item.size} · {item.color}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-white/15">
                        <button onClick={() => updateQty(i, item.quantity - 1)} className="px-2 py-1 hover:text-[var(--gold)]"><Minus size={12} /></button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQty(i, item.quantity + 1)} className="px-2 py-1 hover:text-[var(--gold)]"><Plus size={12} /></button>
                      </div>
                      <p className="text-sm text-white">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => remove(i)} className="text-white/40 hover:text-red-500 transition self-start"><Trash2 size={16} /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-white">
              <span className="text-xs tracking-[0.3em] uppercase text-white/60">Subtotal</span>
              <span className="font-display text-2xl text-[var(--gold)]">R$ {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={checkout} 
              disabled={isSyncing}
              className="btn-magnetic w-full py-4 bg-[var(--gold)] text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-[var(--gold-bright)] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isSyncing ? (
                <>
                  <span className="inline-block w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Redirecionando...
                </>
              ) : (
                'Finalizar Compra →'
              )}
            </button>
            <p className="text-[10px] text-center text-white/30 tracking-wider">Checkout seguro via Nuvemshop</p>
          </div>
        )}
      </aside>
    </div>
  );
}
