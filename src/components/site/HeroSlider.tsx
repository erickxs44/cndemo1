import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Truck, CreditCard, RefreshCw, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroModel from "@/assets/hero-model-dark.png";
import slide2 from "@/assets/hero-imported.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import productShirt from "@/assets/product-shirt-1.jpg";

type Slide = {
  layout: "editorial" | "centered";
  image?: string;
  content: ReactNode;
};

const EditorialSlide = () => (
  <div className="relative w-full h-full bg-[#080604] overflow-hidden">
    {/* Subtle warm radial glow behind the model */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#1a1208_0%,#080604_55%,#000_100%)]" />

    {/* Model image — centered/right, blended into the dark bg */}
    <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
      <img
        src={heroModel}
        alt="CN Store — modelo editorial premium"
        className="h-full w-auto object-cover object-center opacity-70 lg:opacity-100 max-w-none lg:mr-[5%]"
        loading="eager"
      />
      {/* Mobile scrim for better text readability */}
      <div className="lg:hidden absolute inset-0 bg-[#080604]/50" />
      {/* Left fade overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080604] via-[#080604]/80 to-transparent lg:via-[#080604]/40" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080604] to-transparent" />
    </div>

    {/* Content grid */}
    <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 flex items-center pt-16 lg:pt-0 pb-32 lg:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full mt-10 lg:mt-0">

        {/* Left — Copy block */}
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center">
          {/* Small label */}
          <p className="text-[9px] sm:text-[11px] tracking-[0.5em] uppercase text-[var(--gold)]/80 mb-3 sm:mb-5 font-medium">
            Feito para
          </p>

          {/* Main heading — large serif-style */}
          <h1 className="font-display text-white leading-[1.05] tracking-tight drop-shadow-md">
            <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold">
              Quem Deixa
            </span>
            <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold">
              Sua <span className="italic text-[var(--gold)]">Marca.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 max-w-md lg:max-w-lg text-xs sm:text-base text-white/70 lg:text-white/60 leading-relaxed font-light">
            Vestuário masculino premium que define sua presença e eleva cada momento.
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <Link
              to="/categoria/$slug"
              params={{ slug: "lancamentos" }}
              className="group inline-flex items-center justify-center w-full sm:w-auto bg-[var(--gold)] text-black px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase rounded-full shadow-[0_8px_30px_-8px_rgba(212,168,76,0.5)] hover:bg-[var(--gold-bright)] hover:shadow-[0_12px_40px_-8px_rgba(212,168,76,0.7)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Conhecer Lançamentos
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/marcas"
              className="text-[10px] sm:text-sm tracking-[0.15em] uppercase text-white/80 hover:text-[var(--gold)] transition-colors duration-300 font-medium w-full sm:w-auto text-center py-2 sm:py-0"
            >
              Explorar Marcas
            </Link>
          </div>

          {/* Trust badges — avatars + text */}
          <div className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4">
            <div className="flex -space-x-2.5">
              {[
                "https://i.pravatar.cc/80?img=11",
                "https://i.pravatar.cc/80?img=12",
                "https://i.pravatar.cc/80?img=14",
                "https://i.pravatar.cc/80?img=33",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#080604] object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-white/90">+10K clientes</p>
              <p className="text-[8px] sm:text-[10px] text-white/50">satisfeitos no Brasil</p>
            </div>
          </div>
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
    overlayClass: "bg-gradient-to-t from-black/60 to-transparent",
    content: (
      <div className="flex flex-col items-center justify-center h-full pt-10">
        <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-white/80 mb-4 sm:mb-6">Curadoria Internacional</p>
        <h1 className="font-display font-light leading-[1.1]">
          <span className="block text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest drop-shadow-lg">
            PRODUTOS
          </span>
          <span className="block text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest drop-shadow-lg font-bold italic">
            IMPORTADOS
          </span>
        </h1>
        <p className="text-white/80 text-xs md:text-sm tracking-[0.2em] mt-6 max-w-lg mx-auto font-sans font-light uppercase">
          As melhores marcas globais, agora ao seu alcance.
        </p>
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <Link
            to="/categoria/$slug"
            params={{ slug: "importados" }}
            className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase rounded-none hover:border-white/60 hover:bg-white/5 transition-all duration-300"
          >
            Ver Peças Importadas
            <ArrowRight className="w-4 h-4 text-[var(--gold)] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
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
            className="inline-flex items-center gap-4 bg-[var(--gold)] text-black px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase rounded-full hover:bg-[var(--gold-bright)] transition-colors"
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

  const goPrev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setActive((i) => (i + 1) % SLIDES.length);

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
              <div className={`absolute inset-0 ${s.overlayClass || "bg-gradient-to-t from-black via-black/60 to-black/30"}`} />
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

      {/* Dots + arrows — bottom area */}
      <div className="absolute bottom-16 left-0 right-0 z-30 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`rounded-full transition-all duration-500 ${
                i === active
                  ? "w-8 h-2 bg-[var(--gold)]"
                  : "w-2 h-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            aria-label="Slide anterior"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            aria-label="Próximo slide"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
