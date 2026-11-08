import React from 'react';
import CatalogSection from '@/components/CatalogSection';
import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error conectando con la API:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-moss-950 text-parchment selection:bg-fairy-gold selection:text-moss-950">
      {/* HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center justify-center px-6 overflow-hidden border-b border-fairy-gold/20">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-moss-950/80 via-moss-950/75 to-moss-950" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-moss-900/90 border border-fairy-gold/40 text-fairy-gold text-xs uppercase tracking-[0.2em]">
            ✨ Segunda estrella a la derecha, directo hasta el amanecer
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-parchment leading-tight">
            El Postre de los que <span className="text-fairy-gold">Nunca Crecen</span>
          </h1>

          <p className="text-base md:text-xl text-parchment/85 max-w-2xl mx-auto leading-relaxed">
            Tiramisú de autor inspirado en el Bosque de Nunca Jamás y la guarida de los Niños Perdidos. Capas de mascarpone batido, cacao profundo y frutas silvestres con un toque de polvo de hadas.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#catalogo"
              className="px-8 py-3.5 rounded-full bg-fairy-gold text-moss-950 font-bold text-sm uppercase tracking-wider hover:bg-fairy-glow transition shadow-lg shadow-fairy-gold/20"
            >
              Descubrir el Catálogo
            </a>
            <a
              href="#nosotros"
              className="px-8 py-3.5 rounded-full bg-moss-900 border border-fairy-gold/40 text-parchment font-semibold text-sm uppercase tracking-wider hover:border-fairy-gold transition"
            >
              Nuestra Leyenda
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN NOSOTROS: MISIÓN Y VISIÓN */}
      <section id="nosotros" className="py-20 px-6 bg-bark-900/40 border-b border-fairy-gold/15">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 md:p-10 rounded-2xl bg-moss-900/70 border border-fairy-gold/25 space-y-4">
            <span className="text-xs uppercase tracking-widest text-fairy-gold font-bold">
              01 · Nuestro Propósito
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-fairy-glow">
              Nuestra Misión
            </h2>
            <p className="text-parchment/85 leading-relaxed">
              Devolver la capacidad de asombro de la infancia a través de la alta repostería artesanal. Elaboramos cada tiramisú con ingredientes nobles y técnicas precisas para que cada cucharada transporte a nuestros comensales al refugio cálido y mágico del Bosque de Nunca Jamás.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-2xl bg-moss-900/70 border border-fairy-gold/25 space-y-4">
            <span className="text-xs uppercase tracking-widest text-fairy-gold font-bold">
              02 · Nuestro Horizonte
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-fairy-glow">
              Nuestra Visión
            </h2>
            <p className="text-parchment/85 leading-relaxed">
              Consolidarnos como la casa de tiramisú temático referente en experiencia gastronómica e identidad visual, donde la narrativa literaria, la innovación en sabores de autor y la calidez artesanal conviertan un postre cotidiano en un recuerdo inolvidable.
            </p>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DINÁMICO + MODAL */}
      <CatalogSection products={products} />
    </main>
  );
}
