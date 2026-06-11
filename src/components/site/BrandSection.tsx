import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

type Props = {
  brandSlug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  reverse?: boolean;
};

export function BrandSection({ brandSlug, name, image, reverse }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative block w-full overflow-hidden align-top m-0 p-0"
    >
      <div className="relative w-full">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`block w-full h-auto object-cover transition-all duration-[1600ms] ease-out ${
            visible ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            reverse ? "bg-gradient-to-l" : "bg-gradient-to-r"
          } from-black/70 via-black/10 to-transparent`}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 pb-10 lg:pb-16 flex ${
          reverse ? "justify-end" : "justify-start"
        }`}
      >
        <Link
          to="/marca/$slug"
          params={{ slug: brandSlug }}
          aria-label={`Ver roupas da marca ${name}`}
          className={`group relative inline-flex items-center gap-4 px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase text-white
            backdrop-blur-md bg-white/5 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]
            hover:bg-[var(--gold)]/80 hover:text-black hover:border-[var(--gold)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.45)]
            transition-all duration-500 ease-out overflow-hidden
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: visible ? "600ms" : "0ms" }}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <span className="relative">Ver Coleção</span>
          <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
