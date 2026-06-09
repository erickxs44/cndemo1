import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { BRANDS } from "@/lib/store-data";
import brandLacoste from "@/assets/brand-lacoste.jpg";
import brandArmani from "@/assets/brand-armani.jpg";
import brandReserva from "@/assets/brand-reserva.jpg";
import brandAramis from "@/assets/brand-aramis.jpg";

const IMG: Record<string,string> = { lacoste:brandLacoste, armani:brandArmani, reserva:brandReserva, aramis:brandAramis };

export const Route = createFileRoute("/marcas")({
  head: () => ({ meta: [{ title: "Marcas — CN STORE" }, { name: "description", content: "Conheça as marcas premium parceiras da CN STORE." }] }),
  component: Marcas,
});

function Marcas() {
  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1600px] mx-auto reveal">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Curadoria</p>
        <h1 className="font-display text-6xl md:text-8xl text-white">Marcas Parceiras</h1>
      </section>
      <section className="px-6 lg:px-10 max-w-[1600px] mx-auto pb-32 grid md:grid-cols-2 gap-8">
        {BRANDS.map(b => (
          <Link
            key={b.slug}
            to="/marca/$slug"
            params={{ slug: b.slug }}
            className="group relative aspect-[4/5] overflow-hidden border border-white/5 hover:border-[var(--gold)] transition reveal"
          >
            <img src={IMG[b.slug]} alt={b.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h2 className="font-display text-5xl text-white group-hover:text-[var(--gold)] transition">{b.name}</h2>
              <p className="font-display italic text-white/70 mt-2">"{b.tagline}"</p>
              <span className="mt-4 text-xs tracking-[0.3em] uppercase text-white/60 group-hover:text-[var(--gold)] transition">Ver Coleção →</span>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
