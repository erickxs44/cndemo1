import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Truck, ShieldCheck, CreditCard, RefreshCw, ArrowRight } from "lucide-react";
import heroModel from "@/assets/hero-model-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import productShirt from "@/assets/product-shirt-1.jpg";

type Slide = {
  layout: "editorial" | "centered";
  image?: string;
  content: ReactNode;
};

const EditorialSlide = () => (
  <div className="relative w-full h-full bg-[#0a0805]">
    {/* Backdrop gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_55%,#1a1208_0%,#070503_60%,#000_100%)]" />

    {/* Model */}
    <div className="absolute inset-0 flex items-end justify-center lg:justify-end lg:pr-[10%]">
      <img
        src={heroModel}
        alt="CN Store — modelo vestindo camisa premium"
        className="h-[78%] sm:h-[82%] lg:h-[95%] w-auto object-contain object-bottom drop-shadow-[0_0_80px_rgba(212,168,76,0.18)]"
        loading="eager"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(212,168,76,0.14)_0%,transparent_50%)]" />
    </div>

    {/* Mobile readability scrim */}
    <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85" />

    {/* Giant brand wordmark — solid white, top */}
    <div className="pointer-events-none absolute inset-x-0 top-2 sm:top-3 lg:top-6 z-20 flex justify-center overflow-hidden px-2">
      <h2 className="font-display font-black text-white tracking-[-0.04em] leading-none whitespace-nowrap text-[19vw] lg:text-[15vw] select-none drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
        +CN<span className="text-[var(--gold)]">✱</span>STORE
      </h2>
    </div>

    {/* Content grid */}
    <div className="relative z-30 h-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-[22vw] lg:pt-[14vw] pb-24 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end lg:items-center">
      {/* Left — copy */}
      <div className="lg:col-span-5 text-left">
        <p className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-3 font-bold">
          CN STORE
        </p>
        <h1 className="font-display font-black text-white leading-[0.88] tracking-tight">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem]">SUPREMO</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem]">DO VESTUÁRIO</span>
        </h1>
        <p className="mt-5 max-w-md text-xs sm:text-sm md:text-base text-white/75 leading-relaxed font-light">
          Multimarca casual premium, sofisticado standard-fit com o refinamento que você merece.
        </p>
        <div className="mt-6">
          <Link
            to="/categoria/$slug"
            params={{ slug: "lancamentos" }}
            className="btn-magnetic group inline-flex items-center gap-3 bg-[var(--gold)] text-black px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase rounded-md shadow-[0_10px_40px_-10px_rgba(212,168,76,0.6)] hover:bg-[var(--gold-bright)] hover:shadow-[0_15px_50px_-10px_rgba(212,168,76,0.85)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Conhecer Lançamentos
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4" />

      <div className="lg:col-span-3 flex lg:justify-end">
        <div className="group relative w-full max-w-[220px] sm:max-w-[240px] ml-auto lg:mx-0 bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] animate-[float_5s_ease-in-out_infinite] hover:border-[var(--gold)]/60 transition-colors duration-500">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--gold)] font-bold">New Arrival</span>
            <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg bg-[#1a1410] mb-3">
            <img
              src={productShirt}
              alt="Camisa Premium CN Multimarca"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-semibold mb-1">Premium CN Multimarca</p>
          <p className="text-[10px] text-white/60 mb-1.5 leading-snug">Editorial Creations, Detailed Finishes</p>
          <p className="font-display text-lg sm:text-xl text-white font-bold mb-3">R$ 79,90</p>
          <Link
            to="/marcas"
            className="block w-full text-center bg-[var(--gold)] text-black py-2 text-[10px] font-bold tracking-[0.25em] uppercase rounded-md hover:bg-[var(--gold-bright)] transition-colors"
          >
            Ver as Marcas
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const SLIDES: Slide[] = [
  { layout: "editorial", content: <EditorialSlide /> },
  {
    layout: "centered",
    image: slide2,
    content: (
      <>
        <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-[var(--gold)] mb-6">Entrega Premium</p>
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
    layout: "centered",
    image: slide3,
    content: (
      <>
        <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-[var(--gold)] mb-6">Novidades</p>
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

const AUTOPLAY_MS = 6000;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
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
      className="relative w-full overflow-hidden bg-black select-none min-h-[100svh] lg:min-h-screen"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
          aria-hidden={i !== active}
        >
          {s.layout === "editorial" ? (
            s.content
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
              <div className="relative z-10 min-h-[100svh] lg:min-h-screen flex items-center justify-center text-center px-6 max-w-6xl mx-auto">
                {s.content}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Benefits strip — bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/75 backdrop-blur-md border-t border-white/10">
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
