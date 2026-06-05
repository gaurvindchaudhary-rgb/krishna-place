/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Instagram, Facebook, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxury-black text-white relative z-20 border-t border-white/5 py-16 md:py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Core signature row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 border-b border-white/5 pb-16">
          <div className="text-left">
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.25em] text-white">
              KRISHNA PLACE
            </span>
            <span className="text-[10px] font-sans tracking-[0.55em] text-royal-gold block mt-1.5 uppercase font-medium">
              ETHEREAL GRANDEUR
            </span>
            <p className="font-sans font-light text-white/50 text-xs md:text-sm max-w-sm mt-6 leading-relaxed">
              Quiet luxury, invisible services, and classical structural symmetry. Welcome to a sanctuary crafted for the sovereign traveler.
            </p>
          </div>

          {/* Social connections & address info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left text-xs">
            <div>
              <h4 className="font-serif text-white tracking-widest uppercase mb-4 text-[10px] font-bold text-royal-gold">PRESTIGE LOGS</h4>
              <ul className="space-y-2.5 font-light text-white/60">
                <li><a href="#" className="hover:text-royal-gold transition-colors">The Royal Standard</a></li>
                <li><a href="#" className="hover:text-royal-gold transition-colors">Michelin Kitchens</a></li>
                <li><a href="#" className="hover:text-royal-gold transition-colors">Somatheeram Treat</a></li>
                <li><a href="#" className="hover:text-royal-gold transition-colors">Artisanal Heli-Tarmac</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-white tracking-widest uppercase mb-4 text-[10px] font-bold text-royal-gold">PRIVACY CHANNELS</h4>
              <ul className="space-y-2.5 font-light text-white/60">
                <li><a href="#" className="hover:text-royal-gold transition-colors">Corporate Accounts</a></li>
                <li><a href="#" className="hover:text-royal-gold transition-colors">Encrypted Bookings</a></li>
                <li><a href="#" className="hover:text-royal-gold transition-colors">Press Credentials</a></li>
                <li><a href="#" className="hover:text-royal-gold transition-colors">Sovereignty Logins</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-serif text-white tracking-widest uppercase mb-4 text-[10px] font-bold text-royal-gold font-sans">CONNECT DIGITAL</h4>
              <div className="flex space-x-3.5 mt-2">
                <a href="#" className="p-2 bg-white/5 hover:bg-royal-gold hover:text-black rounded-full border border-white/10 transition-all cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-royal-gold hover:text-black rounded-full border border-white/10 transition-all cursor-pointer">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-royal-gold hover:text-black rounded-full border border-white/10 transition-all cursor-pointer">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright alignment */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-6 text-[10px] text-white/40 tracking-widest uppercase font-sans">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-royal-gold" />
            <span>© 2026 KRISHNA PLACE HOTELS & RESORTS IND. UNPARALLELED SERVICE.</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="hover:text-royal-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-royal-gold transition-colors">Terms of Use</a>
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-1.5 text-royal-gold hover:text-white transition-colors uppercase font-semibold cursor-pointer"
            >
              <span>Back to Zenith</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
