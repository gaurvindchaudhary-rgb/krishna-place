/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize, Users, Compass, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { ROOMS } from '../data';
import { Room } from '../types';

interface RoomsSectionProps {
  onVirtualTourClick: (roomId: string) => void;
  onBookNowClick: (roomType: string) => void;
}

export default function RoomsSection({ onVirtualTourClick, onBookNowClick }: RoomsSectionProps) {
  const [activeGalleryRoom, setActiveGalleryRoom] = useState<Room | null>(null);

  return (
    <section id="suites" className="py-24 bg-luxury-black relative z-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-sans font-semibold text-royal-gold tracking-[0.4em] uppercase block mb-3">
              ACCOMMODATIONS ACROSS GRANDEUR
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest leading-tight">
              Bespoke Sanctuaries of Sleep
            </h2>
            <div className="h-[2px] w-24 bg-royal-gold mt-6" />
          </div>
          <p className="font-sans font-light text-white/70 max-w-md mt-6 lg:mt-0 leading-relaxed text-sm">
            Each residence is detailed with authentic custom limestone flooring, acoustic privacy panels, private outdoor terrace retreats, and invisible services dialed to your preference.
          </p>
        </div>

        {/* Room Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ROOMS.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="group bg-luxury-gray relative flex flex-col justify-between overflow-hidden border border-white/5 gold-glow-hover cursor-pointer"
            >
              {/* Image Container with scale zooms */}
              <div className="relative overflow-hidden aspect-[16/10] w-full">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 px-4 py-1.5 bg-luxury-black/90 border border-royal-gold/35 text-royal-gold text-[10px] font-sans tracking-[0.2em] uppercase">
                  {room.id === 'presidential' ? 'The Ultimate Choice' : 'Highly Exclusive'}
                </div>

                {/* Light reflection glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-black/30 opacity-70" />
              </div>

              {/* Core Suite Information */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between bg-luxury-gray">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-royal-gold">
                      {room.tagline}
                    </span>
                    <span className="text-white font-serif text-lg md:text-xl font-light">
                      ₹{room.price.toLocaleString('en-IN')} <span className="text-xs text-white/50 font-sans">/ night</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl text-white tracking-wide mb-4 transition-colors group-hover:text-royal-gold">
                    {room.name}
                  </h3>

                  <p className="font-sans font-light text-white/70 text-xs md:text-sm leading-relaxed mb-6">
                    {room.description}
                  </p>

                  {/* Suite properties / sizes */}
                  <div className="flex items-center space-x-6 border-y border-white/5 py-4 mb-6 text-white/60 text-xs">
                    <span className="flex items-center">
                      <Maximize className="w-3.5 h-3.5 mr-2 text-royal-gold" />
                      {room.size}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3.5 h-3.5 mr-2 text-royal-gold" />
                      {room.capacity}
                    </span>
                  </div>

                  {/* Amenities highlights */}
                  <div className="mb-6">
                    <span className="text-[9px] font-sans font-bold tracking-widest text-royal-gold uppercase block mb-2">
                      In-Suite Splendors
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white/5 text-[10px] font-sans tracking-normal text-white/80 flex items-center border border-white/5"
                        >
                          <Sparkles className="w-2.5 h-2.5 mr-1 text-royal-gold" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub Action panel */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={() => {
                      setActiveGalleryRoom(room);
                    }}
                    className="flex-1 py-3 bg-white/5 text-white/90 hover:bg-white/15 hover:text-white border border-white/10 text-xs font-poppins font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 mr-2" /> Gallery
                  </button>
                  <button
                    onClick={() => onVirtualTourClick(room.id)}
                    className="flex-1 py-3 bg-transparent text-royal-gold border border-royal-gold/45 hover:border-royal-gold hover:bg-royal-gold/5 text-xs font-poppins font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 mr-2" /> Virtual Tour
                  </button>
                  <button
                    onClick={() => onBookNowClick(room.id)}
                    className="flex-1 py-3 bg-royal-gold text-luxury-black font-poppins font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white cursor-pointer"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In-Suite Gallery Lightbox Popup */}
      <AnimatePresence>
        {activeGalleryRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <div className="relative max-w-4xl w-full bg-luxury-black border border-royal-gold/20 p-6 shadow-2xl">
              <button
                onClick={() => setActiveGalleryRoom(null)}
                className="absolute top-4 right-4 text-white hover:text-royal-gold text-2xl font-sans cursor-pointer z-10 p-2"
              >
                &times; Close
              </button>

              <span className="text-[10px] font-sans tracking-[0.35em] text-royal-gold uppercase block mb-1">
                IN-RESIDENCE VISUALS
              </span>
              <h3 className="font-serif text-2xl text-white mb-6">
                {activeGalleryRoom.name} Showcase
              </h3>

              {/* Slider / Image Gallery list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeGalleryRoom.gallery.map((imgSrc, i) => (
                  <div key={i} className="overflow-hidden aspect-[4/3] border border-white/5">
                    <img
                      src={imgSrc}
                      alt={`${activeGalleryRoom.name} visual ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center text-xs text-white/50">
                <p>Authentic bespoke imagery representing exact suite layout.</p>
                <button
                  onClick={() => {
                    const id = activeGalleryRoom.id;
                    setActiveGalleryRoom(null);
                    onBookNowClick(id);
                  }}
                  className="px-6 py-2.5 bg-royal-gold text-luxury-black hover:bg-white font-poppins font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Reserve Suite
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
