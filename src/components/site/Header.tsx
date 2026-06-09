import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/store/cart";
import { CategoryDrawer } from "./CategoryDrawer";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-black/80 border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl tracking-[0.2em] text-white">
              CN <span className="text-[var(--gold)]">STORE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.25em] uppercase text-white/70">
            <Link to="/" className="hover:text-[var(--gold)] transition-colors duration-300">Home</Link>
            <Link to="/categoria/$slug" params={{ slug: "lancamentos" }} className="hover:text-[var(--gold)] transition-colors duration-300">Lançamentos</Link>
            <Link to="/marcas" className="hover:text-[var(--gold)] transition-colors duration-300">Marcas</Link>
            <Link to="/sobre" className="hover:text-[var(--gold)] transition-colors duration-300">Sobre</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button aria-label="Buscar" className="text-white/70 hover:text-[var(--gold)] transition-colors duration-300 p-2">
              <Search size={18} />
            </button>
            <button aria-label="Sacola" onClick={() => setOpen(true)} className="relative text-white/80 hover:text-[var(--gold)] transition-colors duration-300 p-2">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--gold)] text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                  {count}
                </span>
              )}
            </button>
            <button
              aria-label="Menu de categorias"
              onClick={() => setMenuOpen(true)}
              className="group flex flex-col items-center justify-center gap-1 w-10 h-10 ml-1 border border-white/15 hover:border-[var(--gold)] transition-colors duration-300"
            >
              <span className="kebab-dot block w-1 h-1 rounded-full bg-white" />
              <span className="kebab-dot block w-1 h-1 rounded-full bg-white" />
              <span className="kebab-dot block w-1 h-1 rounded-full bg-white" />
            </button>
          </div>
        </div>
      </header>
      <CategoryDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
