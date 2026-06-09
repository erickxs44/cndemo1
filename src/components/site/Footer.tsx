import { Link } from "@tanstack/react-router";
import { CATEGORIES, BRANDS } from "@/lib/store-data";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-display text-2xl tracking-[0.2em] text-white">CN <span className="text-[var(--gold)]">STORE</span></h3>
          <p className="text-white/50 text-sm mt-4 leading-relaxed">O padrão supremo do vestuário masculino. Curadoria das melhores grifes do mundo.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-5">Categorias</p>
          <ul className="space-y-2 text-sm text-white/60">
            {CATEGORIES.map(c => (
              <li key={c.slug}><Link to="/categoria/$slug" params={{ slug: c.slug }} className="hover:text-[var(--gold)] transition">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-5">Marcas</p>
          <ul className="space-y-2 text-sm text-white/60">
            {BRANDS.map(b => (
              <li key={b.slug}><Link to="/marca/$slug" params={{ slug: b.slug }} className="hover:text-[var(--gold)] transition">{b.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-5">Newsletter</p>
          <p className="text-white/50 text-sm mb-4">Receba lançamentos exclusivos e acesso antecipado.</p>
          <form className="flex border border-white/15 focus-within:border-[var(--gold)] transition">
            <input type="email" placeholder="seu@email.com" className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none" />
            <button className="px-5 bg-[var(--gold)] text-black text-xs font-bold tracking-widest hover:bg-[var(--gold-bright)] transition">OK</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 px-6 lg:px-10 text-center text-xs text-white/30 tracking-widest">
        © {new Date().getFullYear()} CN STORE · Todos os direitos reservados
      </div>
    </footer>
  );
}
