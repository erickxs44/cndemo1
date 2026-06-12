import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Truck, ShieldCheck, CreditCard, RefreshCw } from "lucide-react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import productShirt from "@/assets/product-shirt-1.jpg";

type Slide = {
  image: string;
  layout: "editorial" | "centered" | "image-only";
  content: ReactNode;
};


const SLIDES: Slide[] = [
  {
    image: slide1,
    layout: "image-only",
    content: null,
  },

  {
    image: slide2,
    layout: "centered",
    content: (
      <>
        <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-[var(--gold)] mb-6">
          Entrega Premium
        </p>
        <h1 className="font-display font-bold leading-[0.9]">
          <span className="block text-[var(--gold)] text-4xl md:text-7xl lg:text-8xl tracking-tight">
            ENVIAMOS PARA<br />TODO O BRASIL
          </span>
          <span className="block text-white text-base md:text-xl lg:text-2xl tracking-[0.2em] mt-8 max-w-2xl mx-auto font-sans font-light normal-case">
            Receba o melhor da moda premium no conforto da sua casa.
          </span>
        </h1>
        <div className="mt-10 flex items-center justify-center gap-10 text-white/80">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase">Frete para todo o país</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase">Compra Segura</span>
          </div>
        </div>
      </>
    ),
  },
  {
    image: slide3,
    layout: "centered",
    content: (
      <>
        <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-[var(--gold)] mb-6">
          Novidades
        </p>
        <h1 className="font-display font-bold leading-[0.9]">
          <span className="block text-[var(--gold)] text-5xl md:text-8xl lg:text-9xl tracking-tight">
            LANÇAMENTOS<br />EXCLUSIVOS
          </span>
          <span className="block text-white text-base md:text-xl lg:text-2xl tracking-[0.2em] mt-8 max-w-2xl mx-auto font-sans font-light normal-case">
            As marcas mais desejadas do mundo em um só lugar.
          </span>
        </h1>
        <div className="mt-10 flex items-center justify-center">
          <Link
            to="/categoria/$slug"
            params={{ slug: "lancamentos" }}
            className="btn-magnetic inline-flex items-center gap-4 bg-[var(--gold)] text-black px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[var(--gold-bright)]"
          >
            Ver Lançamentos <span>→</span>
          </Link>
        </div>
      </>
    ),
  },
];

const AUTOPLAY_MS = 5000;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      setActive((i) =>
        delta < 0 ? (i + 1) % SLIDES.length : (i - 1 + SLIDES.length) % SLIDES.length,
      );
    }
    touchStartX.current = null;
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-black select-none aspect-[1083/982] lg:aspect-auto lg:min-h-screen"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >

      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === active ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== active}
        >
          {s.layout === "image-only" ? (
            <div className="relative w-full h-full">
              <img
                src={s.image}
                alt="CN Store — Supremo do Vestuário"
                className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  i === active ? "scale-105" : "scale-100"
                }`}
              />
              {/* Live clickable hotspots over the printed buttons in the image */}
              <Link
                to="/categoria/$slug"
                params={{ slug: "lancamentos" }}
                aria-label="Conhecer Lançamentos"
                className="group absolute left-[2%] top-[68%] w-[32%] h-[6.5%] rounded-md ring-0 hover:ring-2 hover:ring-[var(--gold)] transition-all duration-300 hover:scale-[1.04] active:scale-95"
              >
                <span className="absolute inset-0 rounded-md bg-[var(--gold)]/0 group-hover:bg-[var(--gold)]/20 transition-colors duration-300" />
                <span className="absolute inset-0 rounded-md shadow-[0_0_0_0_rgba(212,168,76,0)] group-hover:shadow-[0_0_30px_4px_rgba(212,168,76,0.55)] transition-shadow duration-300" />
              </Link>
              <Link
                to="/marcas"
                aria-label="Ver as Marcas"
                className="group absolute right-[2.5%] top-[70.5%] w-[14%] h-[4.5%] rounded-md hover:ring-2 hover:ring-[var(--gold)] transition-all duration-300 hover:scale-[1.06] active:scale-95"
              >
                <span className="absolute inset-0 rounded-md bg-[var(--gold)]/0 group-hover:bg-[var(--gold)]/20 transition-colors duration-300" />
              </Link>
            </div>
          ) : s.layout === "editorial" ? (


            <>
              {/* dark gradient base */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1408_0%,#000_70%)]" />
              {/* model centered, contained */}
              <img
                src={s.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-contain object-bottom lg:object-center transition-transform duration-[6000ms] ease-out opacity-90 ${
                  i === active ? "scale-105" : "scale-100"
                }`}
              />
              {/* side fades to blend with copy */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/70 lg:via-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </>
          ) : (
            <>
              <img
                src={s.image}
                alt=""
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                  i === active ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </>
          )}
        </div>
      ))}

      {/* Slide content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`w-full transition-all duration-700 ${
              i === active
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none absolute inset-0"
            } ${s.layout === "centered" ? "text-center px-6 max-w-6xl mx-auto flex items-center justify-center" : ""}`}
          >
            {i === active && s.content}
          </div>
        ))}
      </div>

      {/* Benefits strip — bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-md border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 py-3 grid grid-cols-3 gap-2 text-white">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <Truck className="w-4 h-4 md:w-5 md:h-5 text-[var(--gold)] shrink-0" />
            <span className="text-[9px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold truncate">Frete Grátis</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3 border-x border-white/10">
            <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-[var(--gold)] shrink-0" />
            <span className="text-[9px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold truncate">Até 6x sem juros</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-[var(--gold)] shrink-0" />
            <span className="text-[9px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold truncate">Troca Fácil</span>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-[2px] transition-all duration-500 ${
              i === active ? "w-10 bg-[var(--gold)]" : "w-5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
