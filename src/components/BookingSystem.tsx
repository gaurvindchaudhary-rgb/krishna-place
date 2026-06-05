/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Percent, Sparkles, Check, ChevronRight, ShieldCheck, Ticket } from 'lucide-react';
import { ROOMS } from '../data';

interface BookingSystemProps {
  initialRoomType?: string;
}

export default function BookingSystem({ initialRoomType = 'deluxe' }: BookingSystemProps) {
  // Booking Form States
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [roomType, setRoomType] = useState<string>(initialRoomType);
  const [promoCode, setPromoCode] = useState<string>('');
  
  // Custom Interaction States
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  
  // Form personal fields
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');

  // Sync with prop if it updates externally (e.g., clicking Virtual Tour or Reserve on room cards)
  useEffect(() => {
    setActiveDetails(roomType);
  }, [roomType]);

  const [activeRoom, setActiveRoom] = useState(
    ROOMS.find((r) => r.id === roomType) || ROOMS[0]
  );

  const setActiveDetails = (id: string) => {
    const selected = ROOMS.find((r) => r.id === id);
    if (selected) {
      setActiveRoom(selected);
    }
  };

  // Math: Calculate nights
  const [nightsCount, setNightsCount] = useState<number>(1);
  useEffect(() => {
    if (checkIn && checkOut) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNightsCount(diffDays > 0 ? diffDays : 1);
      setIsCalculated(true);
    } else {
      setNightsCount(1);
      setIsCalculated(false);
    }
  }, [checkIn, checkOut]);

  // Apply code checks
  const handleApplyPromo = () => {
    const normalized = promoCode.trim().toUpperCase();
    if (normalized === 'GRANDEUR20') {
      setAppliedPromo('GRANDEUR20');
      setDiscountPercent(20);
    } else if (normalized === 'ROYALTY') {
      setAppliedPromo('ROYALTY');
      setDiscountPercent(15);
    } else {
      alert('Invalid code. Try "GRANDEUR20" for 20% off or "ROYALTY" for 15% off.');
      setPromoCode('');
      setDiscountPercent(0);
      setAppliedPromo('');
    }
  };

  // Calculations
  const baseCost = activeRoom.price * nightsCount;
  const discountAmount = Math.round(baseCost * (discountPercent / 100));
  const serviceCharge = Math.round(baseCost * 0.12); // Luxury Hospitality charge 12%
  const totalCost = baseCost - discountAmount + serviceCharge;

  // Handle Form Submission
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      alert('Please fill out your identity credentials to log reservation.');
      return;
    }
    
    // Generate simulated luxury reference keys
    const randomizedKey = `KP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(randomizedKey);
    setIsConfirmed(true);
  };

  return (
    <section id="booking-section" className="py-24 bg-luxury-black relative z-20 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans font-semibold text-royal-gold tracking-[0.4em] uppercase block mb-3">
            SECURE INTEGRAL TRANSACTION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest leading-tight">
            Reserve Your Residence
          </h2>
          <div className="h-[2px] w-20 bg-royal-gold mx-auto mt-6" />
          <p className="font-sans font-light text-white/60 text-xs md:text-sm mt-4">
            Bespoke suite allocations with real-time tariff calculations. Choose your arrival date and apply credits securely.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isConfirmed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Form Input fields (7 columns) */}
              <form 
                onSubmit={handleConfirmReservation}
                className="lg:col-span-7 bg-luxury-gray border border-white/5 p-8 md:p-10 flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <h3 className="font-serif text-xl text-white mb-6 tracking-wide flex items-center">
                    <Sparkles className="w-5 h-5 text-royal-gold mr-3" /> Suite Configuration
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Choose Room */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">
                        Reserves & Suites
                      </label>
                      <select
                        value={roomType}
                        onChange={(e) => {
                          setRoomType(e.target.value);
                          setActiveDetails(e.target.value);
                        }}
                        className="bg-transparent border border-white/10 px-4 py-3 rounded text-white text-xs font-light tracking-wide focus:outline-none focus:border-royal-gold cursor-pointer"
                      >
                        {ROOMS.map((r) => (
                          <option key={r.id} value={r.id} className="bg-luxury-black text-white">
                            {r.name} (₹{r.price.toLocaleString('en-IN')}/night)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guests Count */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">
                        Guest Capacity
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="bg-transparent border border-white/10 px-4 py-3 rounded text-white text-xs font-light tracking-wide focus:outline-none focus:border-royal-gold cursor-pointer"
                      >
                        <option value={1} className="bg-luxury-black text-white">1 Adult</option>
                        <option value={2} className="bg-luxury-black text-white">2 Adults</option>
                        <option value={3} className="bg-luxury-black text-white">3 Adults</option>
                        <option value={4} className="bg-luxury-black text-white">4 Adults</option>
                      </select>
                    </div>

                    {/* Arrival Date */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="bg-transparent border border-white/10 px-4 py-3 rounded text-white text-xs font-light focus:outline-none focus:border-royal-gold cursor-pointer"
                      />
                    </div>

                    {/* Departure Date */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="bg-transparent border border-white/10 px-4 py-3 rounded text-white text-xs font-light focus:outline-none focus:border-royal-gold cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Personal Contact Details */}
                  <h3 className="font-serif text-xl text-white mb-6 border-t border-white/5 pt-8 tracking-wide">
                    Identity Credentials
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elizabeth Vance"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="bg-transparent border border-white/10 px-4 py-3 rounded text-white text-xs font-light focus:outline-none focus:border-royal-gold placeholder-white/30"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elizabeth@vancecorp.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="bg-transparent border border-white/10 px-4 py-3 rounded text-white text-xs font-light focus:outline-none focus:border-royal-gold placeholder-white/30"
                      />
                    </div>
                  </div>

                  {/* Promo Banner Code integration */}
                  <div className="flex flex-col space-y-2 border-t border-white/5 pt-6">
                    <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider">
                      Promo Code
                    </label>
                    <div className="flex space-x-3 max-w-sm">
                      <input
                        type="text"
                        placeholder="GRANDEUR20"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-transparent border border-white/10 px-4 py-3 rounded text-white text-xs font-light focus:outline-none focus:border-royal-gold placeholder-white/20 uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-6 bg-white/10 hover:bg-white text-white hover:text-black font-poppins text-xs uppercase font-light tracking-widest border border-white/10 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    <span className="text-[10px] text-white/40 block mt-1">
                      Tip: Enter <strong className="text-royal-gold">GRANDEUR20</strong> for 20% discount or <strong className="text-royal-gold">ROYALTY</strong> for 15% off.
                    </span>
                  </div>
                </div>

                <div className="mt-12 text-left">
                  <button
                    type="submit"
                    className="w-full py-4.5 bg-royal-gold hover:bg-white text-luxury-black hover:text-black font-poppins font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    Confirm Secure Reservation
                  </button>
                </div>
              </form>

              {/* Dynamic Bill Pricing Sheet Panel (5 columns) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-luxury-gray to-luxury-black border border-royal-gold/15 p-8 flex flex-col justify-between shadow-2xl relative">
                <div className="absolute top-0 right-8 w-[1px] h-12 bg-royal-gold/40" />

                <div>
                  <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-royal-gold mb-1 block">
                    TARIFF BREAKDOWN
                  </span>
                  <h3 className="font-serif text-2xl text-white mb-6">
                    Invoice Summary
                  </h3>

                  {/* Active Selected Suite Preview Card */}
                  <div className="relative h-40 overflow-hidden mb-6 border border-white/5">
                    <img
                      src={activeRoom.image}
                      alt={activeRoom.name}
                      className="w-full h-full object-cover filter brightness-[0.65]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-left">
                      <span className="text-[9px] font-sans tracking-widest bg-royal-gold text-luxury-black px-2 py-0.5 font-semibold uppercase">
                        Selected Suite
                      </span>
                      <h4 className="font-serif text-white text-lg tracking-wide mt-1">
                        {activeRoom.name}
                      </h4>
                    </div>
                  </div>

                  {/* Details calculations */}
                  <div className="space-y-4 border-b border-white/5 pb-6 text-white/80">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-light">Base rate / overnight:</span>
                      <span className="font-semibold text-white">₹{activeRoom.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="font-light">Reservation length:</span>
                      <span className="font-semibold text-white">{nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}</span>
                    </div>

                    {isCalculated && (
                      <div className="flex justify-between items-center text-xs border-t border-white/5 pt-4">
                        <span className="font-light">Overnight total:</span>
                        <span className="font-semibold text-white">₹{baseCost.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    {appliedPromo && (
                      <div className="flex justify-between items-center text-xs text-royal-gold-light">
                        <span className="font-light flex items-center">
                          <Ticket className="w-3.5 h-3.5 mr-1.5 text-royal-gold" /> Promo code applied ({appliedPromo}):
                        </span>
                        <span>-{discountPercent}% (-₹{discountAmount.toLocaleString('en-IN')})</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs">
                      <span className="font-light">Luxury service charge (12%):</span>
                      <span className="font-semibold text-white">₹{serviceCharge.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Final calculated total summary */}
                <div className="pt-6">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-white/50">
                      ESTIMATED TOTAL DUE
                    </span>
                    <span className="font-serif text-3xl md:text-4xl text-royal-gold font-light tracking-wide text-gold-glow">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex space-x-2 text-[10px] text-white/40 leading-relaxed font-sans uppercase border-t border-white/5 pt-4">
                    <ShieldCheck className="w-4 h-4 text-royal-gold shrink-0" />
                    <span>SECURE TRANSACTION ENCRYPTED BY QUANTUM SECURITY ALGORITHMS. ALL FARES INDUCTIVE OF EXCLUSIVE TAXATION PLANS.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Form success confirmation template
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto bg-luxury-gray border border-royal-gold p-8 md:p-12 text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-royal-gold/10 border border-royal-gold rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-8 h-8 text-royal-gold" />
              </div>

              <span className="text-[10px] font-sans tracking-[0.45em] text-royal-gold uppercase mb-2 block">
                RESERVATION COMPLETED SECURELY
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                Thank You for Choosing Krishna Place, {guestName}
              </h3>
              <p className="font-sans font-light text-white/70 text-xs md:text-sm leading-relaxed mb-8">
                Your private allocation is logged under reference code <strong className="text-royal-gold font-bold tracking-wider">{bookingRef}</strong>. A curated confirmation brochure containing your arrival details, custom butler choices, and estate transfers has been dispatched to <strong className="text-white font-normal">{guestEmail}</strong>.
              </p>

              <div className="border-y border-white/5 py-6 my-6 flex flex-wrap gap-4 items-center justify-around text-xs text-white/60">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-royal-gold" /> Length: {nightsCount} Nights
                </span>
                <span className="flex items-center">
                  <Users className="w-3.5 h-3.5 mr-2 text-royal-gold" /> Guests: {guests}
                </span>
                <span className="flex items-center">
                  <Check className="w-3.5 h-3.5 mr-2 text-royal-gold" /> Suite: {activeRoom.name}
                </span>
              </div>

              <div className="flex gap-4 max-w-sm mx-auto mt-10">
                <button
                  onClick={() => {
                    setIsConfirmed(false);
                    setCheckIn('');
                    setCheckOut('');
                    setGuestName('');
                    setGuestEmail('');
                    setAppliedPromo('');
                    setPromoCode('');
                  }}
                  className="w-full py-4.5 bg-transparent hover:bg-white text-royal-gold hover:text-black font-poppins text-xs font-semibold uppercase tracking-widest border border-royal-gold transition-colors cursor-pointer"
                >
                  Book Another Suite
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
