/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Waves,
  Flower2,
  UtensilsCrossed,
  Dumbbell,
  Briefcase,
  Car,
  Wifi,
  Sunset,
  Sparkles,
} from 'lucide-react';

interface AmenityItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AMENITIES_CATALOG: AmenityItem[] = [
  {
    id: 'pool',
    name: 'Horizon Infinity Pool',
    description: 'An expansive thermal infinity sky-pool merging with the deep horizons of the skyline.',
    icon: Waves,
  },
  {
    id: 'spa',
    name: 'Somatheeram Holistic Spa',
    description: 'Bespoke traditional Ayurvedic and modern European therapies coupled with cold plunge reserves.',
    icon: Flower2,
  },
  {
    id: 'dining',
    name: 'Aura Fine Dining',
    description: 'Two Michelin-starred culinary theaters with custom-crafted multi-sensory gourmet menus.',
    icon: UtensilsCrossed,
  },
  {
    id: 'gym',
    name: 'Precor Elite Gym',
    description: 'State-of-the-art diagnostic cardio gear, personal coaches, and customized recovery bars.',
    icon: Dumbbell,
  },
  {
    id: 'hall',
    name: 'The Durbar Assembly',
    description: 'A grand high-acoustics ballroom featuring modular layout designs for global meetings.',
    icon: Briefcase,
  },
  {
    id: 'pickup',
    name: 'Royal Chauffeur Service',
    description: 'Airport transit in our private fleet of Rolls-Royce Phantoms and bullet-secure towncars.',
    icon: Car,
  },
  {
    id: 'wifi',
    name: 'High-Density WiFi 7',
    description: 'Symmetric high-speed connections paired with personal VPN protocols for absolute privacy.',
    icon: Wifi,
  },
  {
    id: 'lounge',
    name: 'Zephyr Rooftop Cigar Lounge',
    description: 'Exclusive open-air space serving hand-selected single malts and limited humidor selections.',
    icon: Sunset,
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-luxury-black relative z-20 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-semibold text-royal-gold tracking-[0.4em] uppercase block mb-3">
            WORLD-CLASS LUXURY PRESETS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest leading-tight">
            Curated Services of Sovereign Leisure
          </h2>
          <div className="h-[2px] w-20 bg-royal-gold mx-auto mt-6 mb-4" />
          <p className="font-sans font-light text-white/60 text-xs md:text-sm max-w-lg mx-auto">
            Enjoy total tranquility with our customized services designed to satisfy your requests immediately, seamlessly, and invisibly.
          </p>
        </div>

        {/* Amenity Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {AMENITIES_CATALOG.map((a, i) => {
            const IconComponent = a.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group bg-luxury-gray border border-white/5 p-8 flex flex-col justify-between hover:border-royal-gold/40 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(200,169,107,0.06)] select-none text-left"
              >
                <div>
                  {/* Glowing Icon Frame */}
                  <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-royal-gold/5 group-hover:border-royal-gold/55 transition-all duration-500">
                    <IconComponent className="w-6 h-6 text-royal-gold group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h3 className="font-serif text-lg text-white group-hover:text-royal-gold tracking-wide mb-3 transition-colors">
                    {a.name}
                  </h3>

                  <p className="font-sans font-light text-white/60 text-xs md:text-sm leading-relaxed">
                    {a.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center space-x-2 text-[10px] font-sans tracking-widest text-royal-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PRESTIGE LEVEL</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
