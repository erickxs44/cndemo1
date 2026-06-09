import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { X } from "lucide-react";
import { CATEGORIES, BRANDS } from "@/lib/store-data";

export function CategoryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      <aside
        className="absolute top-0 right-0 h-full w-full md:w-[520px] bg-black border-l border-white/10 animate-slide-in-right overflow-y-auto"
        style={{ animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <span className="font-display text-xl tracking-[0.3em] text-[var(--gold)]">MENU</span>
          <button onClick={onClose} aria-label="Fechar" className="text-white/70 hover:text-[var(--gold)] transition p-2">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 lg:p-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-6">Categorias</p>
          <ul className="space-y-1">
            {CATEGORIES.map((c, i) => (
              <li key={c.slug} style={{ animationDelay: `${100 + i * 60}ms` }} className="animate-fade-up">
                <Link
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  onClick={onClose}
                  className="group flex items-center justify-between py-4 border-b border-white/5 text-white hover:text-[var(--gold)] transition-colors duration-300"
                >
                  <span className="font-display text-3xl lg:text-4xl">{c.name}</span>
                  <span className="text-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-6 mt-12">Marcas</p>
          <ul className="grid grid-cols-2 gap-3">
            {BRANDS.map((b, i) => (
              <li key={b.slug} style={{ animationDelay: `${400 + i * 60}ms` }} className="animate-fade-up">
                <Link
                  to="/marca/$slug"
                  params={{ slug: b.slug }}
                  onClick={onClose}
                  className="block px-4 py-3 border border-white/10 hover:border-[var(--gold)] hover:bg-white/5 transition-all duration-300 text-sm tracking-wide"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-white/10 text-xs text-white/40 tracking-wider">
            <p>CN STORE · O padrão supremo do vestuário masculino</p>
            <p className="mt-2">Atendimento: contato@cnstore.com</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
