/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto sliding carousel triggers
  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    startTimer();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    startTimer();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    startTimer();
  };

  return (
    <section id="reviews" className="py-24 bg-luxury-black relative z-20 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:items-center">
        
        {/* Left Interactive Segment: Video Testimonial Anchor */}
        <div className="flex-1 text-left">
          <span className="text-xs font-sans font-semibold text-royal-gold tracking-[0.4em] uppercase block mb-3">
            VERIFIED REFLECTIONS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest leading-tight mb-6">
            Words of Our Honored Guests
          </h2>
          <p className="font-sans font-light text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
            Impeccable service, absolute luxury, and serene visual layouts. Our guests share their authentic private resort experiences from across the globe.
          </p>

          {/* Interactive Cinematic Review Video Banner Card */}
          <div 
            onClick={() => setIsVideoOpen(true)}
            className="group relative h-64 rounded-lg overflow-hidden border border-royal-gold/25 cursor-pointer shadow-xl max-w-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80" 
              alt="Krishna Place Video Guest Interview Cover" 
              className="w-full h-full object-cover filter brightness-[0.55] transition-transform duration-[1.5s] group-hover:scale-105"
            />
            
            {/* Absolute Play Vector Node */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <div className="w-16 h-16 rounded-full bg-royal-gold text-luxury-black flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-transform duration-300 shadow-2xl mb-4">
                <Play className="w-6 h-6 fill-current hover:ml-1 ml-0.5" />
              </div>
              <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-royal-gold group-hover:text-white">
                Play Guest Interview Video
              </span>
              <span className="text-[10px] text-white/50 tracking-wider mt-1">
                A Conversation with Dr. Elizabeth Vance (4:12)
              </span>
            </div>
          </div>
        </div>

        {/* Right Segment: Autoplay / Multi-Slider cards */}
        <div className="flex-1 flex flex-col justify-center bg-luxury-gray border border-white/5 p-8 md:p-14 relative shadow-2xl overflow-hidden min-h-[380px]">
          
          {/* Background watermarked Quote */}
          <Quote className="absolute right-8 top-8 w-28 h-28 text-white/[0.02]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.5 }}
              className="text-left flex flex-col justify-between h-full"
            >
              <div>
                {/* Gold Rating Stars */}
                <div className="flex space-x-1.5 mb-6">
                  {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-royal-gold text-royal-gold" />
                  ))}
                </div>

                {/* Main Quote */}
                <p className="font-serif text-lg md:text-xl text-white/95 leading-relaxed italic mb-8">
                  "{TESTIMONIALS[activeIndex].text}"
                </p>
              </div>

              {/* Guest Profile Details */}
              <div className="flex items-center space-x-4 border-t border-white/5 pt-6">
                <img
                  src={TESTIMONIALS[activeIndex].avatar}
                  alt={TESTIMONIALS[activeIndex].author}
                  className="w-12 h-12 rounded-full border border-royal-gold/30 object-cover"
                />
                <div>
                  <h4 className="font-serif text-white font-semibold tracking-wide">
                    {TESTIMONIALS[activeIndex].author}
                  </h4>
                  <p className="text-[11px] font-sans text-white/50 tracking-widest uppercase">
                    {TESTIMONIALS[activeIndex].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Silder navigation handles */}
          <div className="flex items-center justify-between mt-10 border-t border-white/5 pt-6">
            {/* Dot bullets */}
            <div className="flex space-x-2.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualSelect(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'bg-royal-gold w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Direction arrows */}
            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="p-2 border border-white/10 hover:border-royal-gold text-white/70 hover:text-royal-gold cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border border-white/10 hover:border-royal-gold text-white/70 hover:text-royal-gold cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Overlay Dialog */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <div 
              className="relative aspect-video max-w-4xl w-full bg-black border border-royal-gold/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-royal-gold text-xl cursor-pointer p-2 z-10"
              >
                &times; Close
              </button>

              {/* Embedding beautiful royalty free resort sample review stream */}
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/9X8FscSscZ4?autoplay=1&mute=0" 
                title="Lighthouse Suite Client Reflections" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
