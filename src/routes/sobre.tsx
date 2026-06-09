import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: [{ title: "Sobre — CN STORE" }, { name: "description", content: "A história da CN STORE, referência em vestuário masculino premium." }] }),
  component: Sobre,
});

function Sobre() {
  return (
    <Layout>
      <section className="pt-40 pb-24 px-6 lg:px-10 max-w-4xl mx-auto reveal">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Nossa História</p>
        <h1 className="font-display text-5xl md:text-7xl text-white leading-tight">Vestir o homem que constrói o próprio caminho.</h1>
        <div className="mt-12 space-y-6 text-white/70 text-lg leading-relaxed">
          <p>A CN STORE nasceu da inquietação de quem entende que o vestir é uma forma de comunicar quem se é antes mesmo da primeira palavra. Desde 2018, reunimos sob o mesmo teto a curadoria das marcas mais respeitadas do vestuário masculino global.</p>
          <p>De <span className="text-[var(--gold)]">Lacoste</span> a <span className="text-[var(--gold)]">Emporio Armani</span>, passando por <span className="text-[var(--gold)]">Reserva</span> e <span className="text-[var(--gold)]">Aramis</span> — cada peça é selecionada por sua excelência em construção, materiais e atemporalidade.</p>
          <p>Não vendemos roupas. Entregamos padrão.</p>
        </div>
      </section>
      <section className="px-6 lg:px-10 max-w-[1600px] mx-auto pb-32 grid md:grid-cols-3 gap-6 reveal">
        {[
          {t:"Originalidade",d:"100% das peças são autênticas, importadas diretamente das marcas oficiais."},
          {t:"Curadoria",d:"Cada item passa por uma seleção criteriosa de design, caimento e qualidade."},
          {t:"Atendimento",d:"Concierge dedicado para orientar sobre tamanhos, combinações e ocasiões."},
        ].map(x => (
          <div key={x.t} className="border border-white/10 p-10 hover:border-[var(--gold)] transition hover-lift">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">{x.t}</p>
            <p className="text-white/70">{x.d}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
