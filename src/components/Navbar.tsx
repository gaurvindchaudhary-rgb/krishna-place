/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-luxury-black/85 border-b border-royal-gold/15 shadow-2xl py-4 backdrop-blur-md'
          : 'bg-gradient-to-b from-luxury-black/70 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Branding */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="cursor-pointer group flex flex-col"
        >
          <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-white group-hover:text-royal-gold transition-colors duration-300">
            KRISHNA PLACE
          </span>
          <span className="text-[9px] font-sans tracking-[0.45em] text-royal-gold/90 font-medium">
            ETHEREAL GRANDEUR
          </span>
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {[
            { label: 'Suites', id: 'suites' },
            { label: '360° Experience', id: 'experience' },
            { label: 'Amenities', id: 'amenities' },
            { label: 'Gallery', id: 'gallery' },
            { label: 'Reviews', id: 'reviews' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white/80 hover:text-royal-gold font-sans font-light text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-1 group cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-royal-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-transparent border border-royal-gold text-royal-gold text-xs font-poppins font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-royal-gold hover:text-luxury-black cursor-pointer"
          >
            Reserve Your Stay
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white/95 hover:text-royal-gold transition-colors p-1 cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-luxury-black/98 z-40 flex flex-col justify-between py-12 px-8 border-t border-royal-gold/10">
          <div className="flex flex-col space-y-6">
            {[
              { label: 'The Suites', id: 'suites' },
              { label: 'Virtual 360° Tour', id: 'experience' },
              { label: 'Hotel Amenities', id: 'amenities' },
              { label: 'Estate Gallery', id: 'gallery' },
              { label: 'Guest Reflections', id: 'reviews' },
              { label: 'Location & Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-white text-lg font-serif tracking-[0.1em] hover:text-royal-gold transition-all py-2"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-6">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 bg-royal-gold text-luxury-black text-center text-xs font-poppins font-semibold uppercase tracking-widest transition-transform hover:scale-[1.02]"
            >
              Reserve Your Stay
            </button>
            <div className="text-center text-[10px] text-white/40 tracking-wider">
              HOTEL KRISHNA PLACE • UNPARALLELED GRANDEUR
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
