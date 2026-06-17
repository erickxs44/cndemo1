import { Link } from "@tanstack/react-router";
import shirt1 from "@/assets/product-shirt-1.jpg";
import shirt2 from "@/assets/product-shirt-2.jpg";
import shirt3 from "@/assets/product-polo-1.jpg";
import shirt4 from "@/assets/product-polo-2.jpg";

const shirts = [
  { id: "2", img: shirt1, name: "Camisa Linho Italiana", price: "789,00" },
  { id: "6", img: shirt2, name: "Camisa Oxford Tailored", price: "549,00" },
  { id: "1", img: shirt3, name: "Polo Piquet Premium", price: "459,00" },
  { id: "5", img: shirt4, name: "Polo Manga Curta Pima", price: "389,00" },
];

export function ShirtsShowcase() {
  return (
    <section className="py-28 lg:py-32 px-6 lg:px-10 max-w-[1600px] mx-auto reveal">
      <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight text-center mb-16">
        Novas Camisas
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {shirts.map((s, i) => (
          <Link
            key={s.id}
            to="/produto/$id"
            params={{ id: s.id }}
            className="group cursor-pointer block"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <article className="flex flex-col h-full">
              <div className="relative overflow-hidden bg-[#0a0a0a] aspect-[4/5] mb-5">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-col flex-1 items-center justify-between space-y-4">
                <div className="text-center">
                  <h3 className="text-sm text-white/90 group-hover:text-[var(--gold)] transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-xs text-white/60 mt-1">R$ {s.price}</p>
                </div>
                <div className="mt-auto">
                  <span className="inline-flex items-center justify-center border border-white/20 text-white/80 text-[10px] tracking-[0.2em] uppercase px-8 py-3 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    Ver Detalhes
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
