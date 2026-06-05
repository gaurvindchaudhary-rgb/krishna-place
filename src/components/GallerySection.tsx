/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items
  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  // Navigate lightbox
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <section id="gallery" className="py-24 bg-luxury-black relative z-20 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans font-semibold text-royal-gold tracking-[0.4em] uppercase block mb-3">
            ESTATE VISUAL LOGS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest">
            The Grand Gallery
          </h2>
          <div className="h-[2px] w-16 bg-royal-gold mx-auto mt-6 mb-8" />

          {/* Luxury Categories Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {['all', 'rooms', 'dining', 'pool', 'events', 'exterior'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-[10px] font-sans font-semibold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-royal-gold text-luxury-black border-royal-gold'
                    : 'bg-transparent text-white/60 border-white/5 hover:border-royal-gold/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Container */}
        {/* We use our pre-built CSS masonry-grid / masonry-item classes or responsive grid columns with balanced heights */}
        <motion.div 
          layout 
          className="masonry-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                onClick={() => setLightboxIndex(index)}
                className="masonry-item group relative overflow-hidden bg-luxury-gray border border-white/5 cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  
                  {/* Subtle glassmorphic interactive hover veil */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[9px] font-sans tracking-[0.25em] text-royal-gold uppercase mb-1 block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-white text-lg tracking-wide mb-1">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[11px] text-white/70 font-light leading-snug">
                        {item.description}
                      </p>
                      <span className="mt-3 inline-flex items-center text-[10px] text-royal-gold font-poppins uppercase tracking-widest font-semibold">
                        <Maximize2 className="w-3.5 h-3.5 mr-1.5" /> Fullscreen View
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal Carousel */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/98 p-6 md:p-10 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar with actions */}
            <div className="flex justify-between items-center z-10">
              <div className="text-white/60 text-xs tracking-widest uppercase font-sans">
                {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} of {filteredItems.length}
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-3 bg-white/5 border border-white/10 text-white hover:text-royal-gold transition-colors rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage with Image & controls */}
            <div className="flex-1 flex items-center justify-center relative my-6">
              {/* Prev control */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 p-4 bg-luxury-black/75 hover:bg-royal-gold hover:text-black border border-white/10 text-white rounded-full transition-all duration-300 cursor-pointer z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Core Image Slide */}
              <motion.div
                key={filteredItems[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="max-w-5xl max-h-[72vh] rounded border border-royal-gold/10 overflow-hidden relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full max-h-[72vh] object-contain"
                />
              </motion.div>

              {/* Next control */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 p-4 bg-luxury-black/75 hover:bg-royal-gold hover:text-black border border-white/10 text-white rounded-full transition-all duration-300 cursor-pointer z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom info banner */}
            <div className="text-center md:max-w-xl mx-auto z-10" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-serif text-white text-xl tracking-wide mb-2">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="font-sans text-white/70 text-xs md:text-sm font-light">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
