/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, ChevronDown, Compass } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBookClick: (bookingParams?: any) => void;
}

export default function Hero({ onExploreClick, onBookClick }: HeroProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('deluxe');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookClick({ checkIn, checkOut, guests, roomType });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-black">
      {/* Cinematic Looping Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.05] filter brightness-[0.55]"
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054273b9e7317e067cde67104b281f6&profile_id=139&oauth2_token_id=57447761"
        />
        {/* Deep luxurious vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/60 z-1" />
        <div className="absolute inset-0 bg-black/30 z-2" />
      </div>

      {/* Main Core Content Panel */}
      <div className="relative z-10 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center">
        {/* Small royal crown/crest separator or luxury eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="h-[1px] w-8 bg-royal-gold/65" />
          <span className="text-[11px] font-sans font-semibold tracking-[0.35em] text-royal-gold uppercase">
            A New Standard of Quiet Luxury
          </span>
          <div className="h-[1px] w-8 bg-royal-gold/65" />
        </motion.div>

        {/* Major Headline with Playfair Display and staggered load */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1] mb-6 select-none"
        >
          Experience Luxury <br />
          <span className="text-royal-gold italic font-normal text-gold-glow">Beyond Expectations</span>
        </motion.h1>

        {/* Premium Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="font-sans font-light text-sm md:text-lg text-white/80 max-w-2xl mb-10 leading-relaxed tracking-wide"
        >
          Discover world-class hospitality, breathtaking rooms, exceptional dining, and unforgettable experiences curated purely for the discerning traveler.
        </motion.p>

        {/* Call to Actions with Glowing effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 z-20"
        >
          <button
            onClick={() => onBookClick()}
            className="px-8 py-4 bg-royal-gold text-luxury-black font-poppins font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(200,169,107,0.5)] cursor-pointer"
          >
            Book Your Stay
          </button>
          <button
            onClick={onExploreClick}
            className="px-8 py-4 bg-transparent border border-white/30 text-white font-poppins font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/10 hover:border-royal-gold cursor-pointer"
          >
            Explore Rooms
          </button>
        </motion.div>
      </div>

      {/* Floating Booking Widget */}
      <div className="absolute bottom-10 left-0 right-0 z-20 hidden lg:block px-12">
        <div className="max-w-6xl mx-auto glass-card shadow-2xl p-4 border border-royal-gold/10">
          <form onSubmit={handleBookingSubmit} className="flex items-center justify-between space-x-6">
            {/* Check-In */}
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-sans font-semibold tracking-wider text-royal-gold uppercase mb-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-royal-gold" /> Check-In
              </span>
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent border-b border-white/20 pb-1 text-white text-xs font-light focus:outline-none focus:border-royal-gold placeholder-white/30 cursor-pointer"
              />
            </div>

            {/* Check-Out */}
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-sans font-semibold tracking-wider text-royal-gold uppercase mb-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-royal-gold" /> Check-Out
              </span>
              <input
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent border-b border-white/20 pb-1 text-white text-xs font-light focus:outline-none focus:border-royal-gold placeholder-white/30 cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-sans font-semibold tracking-wider text-royal-gold uppercase mb-1 flex items-center">
                <Users className="w-3 h-3 mr-1 text-royal-gold" /> Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent border-b border-white/20 pb-1 text-white text-xs font-light focus:outline-none focus:border-royal-gold cursor-pointer"
              >
                <option value="1" className="bg-luxury-black text-white">1 Guest</option>
                <option value="2" className="bg-luxury-black text-white">2 Guests</option>
                <option value="3" className="bg-luxury-black text-white">3 Guests</option>
                <option value="4" className="bg-luxury-black text-white">4 Guests</option>
              </select>
            </div>

            {/* Suite Type */}
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-sans font-semibold tracking-wider text-royal-gold uppercase mb-1 flex items-center">
                <Compass className="w-3 h-3 mr-1 text-royal-gold" /> Room Type
              </span>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent border-b border-white/20 pb-1 text-white text-xs font-light focus:outline-none focus:border-royal-gold cursor-pointer"
              >
                <option value="deluxe" className="bg-luxury-black text-white">Deluxe Heritage Room</option>
                <option value="premium" className="bg-luxury-black text-white">Premium Horizon Room</option>
                <option value="executive" className="bg-luxury-black text-white">Grand Executive Suite</option>
                <option value="presidential" className="bg-luxury-black text-white">The Royal Presidential Suite</option>
              </select>
            </div>

            {/* Booking action button */}
            <div className="flex-none">
              <button
                type="submit"
                className="px-8 py-3 bg-royal-gold text-luxury-black hover:bg-white hover:text-black font-poppins font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
