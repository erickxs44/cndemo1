import { Link } from "@tanstack/react-router";
import aramisImg from "@/assets/brands/aramis.svg";
import reservaImg from "@/assets/brands/reserva.svg";

export function PartnerBrands() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-10 max-w-[1200px] mx-auto reveal">
      <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-16">Marcas Parceiras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Aramis */}
        <div className="relative group overflow-hidden aspect-square bg-[#f5f5f5] flex items-center justify-center">
           <img 
              src={aramisImg}
              alt="Aramis"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Link 
                to="/marca/$slug"
                params={{ slug: "aramis" }}
                className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-bold shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-colors"
              >
                Ver coleção
              </Link>
           </div>
        </div>

        {/* Reserva */}
        <div className="relative group overflow-hidden aspect-square bg-[#f5f5f5] flex items-center justify-center">
           <img 
              src={reservaImg}
              alt="Reserva"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Link 
                to="/marca/$slug"
                params={{ slug: "reserva" }}
                className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-bold shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-colors"
              >
                Ver coleção
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
