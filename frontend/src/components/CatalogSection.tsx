'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import ProductModal from './ProductModal';

interface CatalogSectionProps {
  products: Product[];
}

export default function CatalogSection({ products }: CatalogSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="catalogo" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-fairy-gold font-semibold">
          Colección de la Guarida Secreta
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-parchment mt-2">
          Nuestros Tiramisús
        </h2>
        <p className="text-parchment/75 mt-4">
          Cada receta representa el disfraz y el espíritu de uno de los Niños Perdidos. Haz clic en cualquier creación para explorar sus capas en detalle.
        </p>
      </div>

      {/* GRILLA DE 3 COLUMNAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => setSelectedProduct(product)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-moss-900/90 border border-fairy-gold/20 hover:border-fairy-gold transition-all duration-300 flex flex-col shadow-xl hover:shadow-fairy-gold/10"
          >
            <div className="relative h-72 w-full overflow-hidden bg-bark-900">
              <img
                src={product.imagenPrincipal}
                alt={product.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-moss-950/85 border border-fairy-gold/40 text-xs text-fairy-glow font-medium backdrop-blur-sm">
                {product.disfrazTag}
              </div>
              <div className="absolute bottom-3 right-3 px-3.5 py-1 rounded-full bg-fairy-gold text-moss-950 font-bold text-sm shadow">
                Bs. {product.precio.toFixed(2)}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-parchment group-hover:text-fairy-gold transition-colors">
                  {product.nombre}
                </h3>
                <p className="text-sm text-parchment/75 mt-2 line-clamp-2">
                  {product.resumenCorto}
                </p>
              </div>

              <div className="pt-3 border-t border-moss-800 flex items-center justify-between text-xs font-semibold text-fairy-gold">
                <span>Explorar capas e historia</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* MODAL INTERACTIVO */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
