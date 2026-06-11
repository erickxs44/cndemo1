import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Truck, ShieldCheck } from "lucide-react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

type Slide = {
  image: string;
  content: ReactNode;
};

const SLIDES: Slide[] = [
  {
    image: slide1,
    content: (
      <>
        <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-[var(--gold)] mb-6">
          Coleção 2026
        </p>
        <h1 className="font-display font-bold leading-[0.85]">
          <span className="block text-[var(--gold)] text-6xl md:text-9xl lg:text-[11rem] tracking-tight">
            CN STORE
          </span>
          <span className="block text-white text-lg md:text-3xl lg:text-4xl tracking-[0.3em] mt-6 max-w-3xl mx-auto uppercase">
            O Padrão Supremo do Vestuário Masculino
          </span>
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            to="/categoria/$slug"
            params={{ slug: "lancamentos" }}
            className="btn-magnetic inline-flex items-center gap-4 bg-[var(--gold)] text-black px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[var(--gold-bright)]"
          >
            Explorar Coleção <span>→</span>
          </Link>
          <Link
            to="/sobre"
            className="glass inline-flex items-center gap-4 text-white px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase btn-magnetic"
          >
            Sobre Nós
          </Link>
        </div>
      </>
    ),
  },
  {
    image: slide2,
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none"
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
          <img
            src={s.image}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
              i === active ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
      ))}

      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ${
              i === active
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none absolute inset-0"
            }`}
          >
            {i === active && s.content}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
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
