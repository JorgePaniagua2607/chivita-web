'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const items = product.carouselItems || [];
  const activeItem = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 md:p-6"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col w-full max-w-5xl h-[88vh] md:h-[640px] rounded-2xl overflow-hidden bg-moss-900 border border-fairy-gold/30 shadow-2xl text-parchment"
        >
          {/* CABECERA: Nombre del Producto y Botón "X" */}
          <header className="flex items-center justify-between px-6 py-4 bg-moss-950/90 border-b border-fairy-gold/20 shrink-0">
            <div>
              <span className="text-xs uppercase tracking-widest text-fairy-gold font-semibold">
                {product.disfrazTag}
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-parchment">
                {product.nombre}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-bark-800/80 text-fairy-glow hover:bg-fairy-gold hover:text-moss-950 transition-colors font-bold text-lg"
            >
              ✕
            </button>
          </header>

          {/* CUERPO: Grid de 2 Columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
            {/* COLUMNA IZQUIERDA: Imagen Vertical Principal */}
            <div className="relative h-64 md:h-full w-full overflow-hidden bg-bark-900">
              <img
                src={product.imagenPrincipal}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-moss-950/90 border border-fairy-gold/40 text-fairy-gold font-bold text-lg shadow-lg">
                  Bs. {product.precio.toFixed(2)}
                </span>
                <span className="text-xs text-parchment/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  Porción Artesanal
                </span>
              </div>
            </div>

            {/* COLUMNA DERECHA: Flex-Col (50% Carrusel Arriba / 50% Descripción Dinámica Abajo) */}
            <div className="flex flex-col h-full min-h-[420px] md:min-h-0 bg-moss-900">
              {/* ARRIBA (50%): Carrusel Navegable de Imágenes */}
              <div className="relative h-1/2 w-full bg-bark-900 overflow-hidden select-none">
                {items.length > 0 && activeItem ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeItem.id}
                        src={activeItem.imagenUrl}
                        alt={activeItem.tituloPaso}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-moss-950/70 via-transparent to-black/30" />

                    <button
                      onClick={handlePrev}
                      aria-label="Imagen anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-moss-950/75 border border-fairy-gold/40 text-fairy-glow hover:bg-fairy-gold hover:text-moss-950 transition flex items-center justify-center"
                    >
                      ‹
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Siguiente imagen"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-moss-950/75 border border-fairy-gold/40 text-fairy-glow hover:bg-fairy-gold hover:text-moss-950 transition flex items-center justify-center"
                    >
                      ›
                    </button>

                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {items.map((item, idx) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveIndex(idx)}
                          aria-label={`Ir al detalle ${idx + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            idx === activeIndex
                              ? 'w-7 bg-fairy-gold'
                              : 'w-2 bg-parchment/50 hover:bg-parchment'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-parchment/50">
                    Sin imágenes de detalle
                  </div>
                )}
              </div>

              {/* ABAJO (50%): Texto Descriptivo Sincronizado con la Imagen Activa */}
              <div className="h-1/2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-moss-900 to-moss-950 border-t border-fairy-gold/20">
                {activeItem ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-fairy-gold">
                          Secreto de Elaboración ({activeIndex + 1} de {items.length})
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-serif font-bold text-fairy-glow">
                        {activeItem.tituloPaso}
                      </h3>

                      <p className="text-sm md:text-base text-parchment/90 leading-relaxed">
                        {activeItem.descripcion}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <p className="text-parchment/70">{product.resumenCorto}</p>
                )}

                <div className="pt-4 border-t border-moss-800 flex items-center justify-between text-xs text-parchment/60">
                  <span>Navega las flechas para descubrir cada capa</span>
                  <span className="text-fairy-gold font-medium">✨ Hecho en Nunca Jamás</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
