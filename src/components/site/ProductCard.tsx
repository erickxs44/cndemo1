import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/store-data";

export function ProductCard({ product }: { product: Product; onClick?: () => void }) {
  return (
    <Link
      to="/produto/$id"
      params={{ id: product.id }}
      className="product-card group cursor-pointer reveal block"
    >
      <article>
        <div className="relative overflow-hidden bg-[#0a0a0a] aspect-[4/5]">
          {product.isNew && (
            <span className="absolute top-3 left-3 z-10 bg-[var(--gold)] text-black text-[9px] tracking-[0.25em] font-bold uppercase px-2 py-1">Novo</span>
          )}
          <img src={product.image} alt={product.name} loading="lazy" className="product-img w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 inset-x-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="block text-center text-[10px] tracking-[0.3em] uppercase text-white bg-white/10 backdrop-blur-md border border-white/20 py-3">
              Ver Produto
            </span>
          </div>
        </div>
        <div className="pt-4 space-y-1">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{product.brand}</p>
          <h3 className="text-sm text-white group-hover:text-[var(--gold)] transition-colors">{product.name}</h3>
          <div className="flex items-baseline gap-2">
            {product.oldPrice && <span className="text-xs text-white/40 line-through">R$ {product.oldPrice}</span>}
            <span className="text-sm text-white">R$ {product.price.toFixed(2)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
