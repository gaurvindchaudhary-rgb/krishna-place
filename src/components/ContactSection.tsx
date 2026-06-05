/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Check, CornerRightDown } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSent(true);
  };

  // WhatsApp concierge direct route
  const handleWhatsAppConcierge = () => {
    const phoneNumber = '919999999999'; // Simulated concierge hotline
    const messageText = encodeURIComponent('Hello, I would like to make an inquiry regarding the luxury suite reservations at Hotel Krishna Place.');
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${messageText}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-luxury-black relative z-20 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch">
          
          {/* Column Left (5 columns): Contact cards, Direct routes, WhatsApp */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="text-xs font-sans font-semibold text-royal-gold tracking-[0.4em] uppercase block mb-3">
                SECURE CONCIERGE CHANNELS
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest leading-tight mb-6">
                Connect Elegantly
              </h2>
              <div className="h-[2px] w-12 bg-royal-gold mb-8" />
              <p className="font-sans font-light text-white/70 text-xs md:text-sm leading-relaxed mb-10">
                Our elite reservations desk operates 24/7. Connect directly via encrypted lines, private email channels, or write to our instant on-call WhatsApp butler services.
              </p>

              {/* Direct indicators */}
              <div className="space-y-6">
                {/* Physical Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 border border-royal-gold/30 bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-royal-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-white font-semibold">The Estate Gardens</h4>
                    <p className="font-sans text-xs text-white/60 mt-1 leading-relaxed">
                      Lodi Estate Area, Near Humayun Gardens,<br />New Delhi, DL 110003, India
                    </p>
                  </div>
                </div>

                {/* Secure Hotlines */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 border border-royal-gold/30 bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-royal-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-white font-semibold">Reservations Helpline</h4>
                    <p className="font-sans text-xs text-white/60 mt-1">
                      +91 (11) 4890 0000 <br />
                      +91 (11) 4890 1111
                    </p>
                  </div>
                </div>

                {/* Secure Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 border border-royal-gold/30 bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-royal-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-white font-semibold">Concierge Channels</h4>
                    <p className="font-sans text-xs text-white/60 mt-1">
                      butler@krishnaplacesf.secure
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div className="mt-12">
              <span className="text-[10px] font-sans tracking-widest text-[#25D366] font-bold block mb-3 uppercase flex items-center">
                <CornerRightDown className="w-3.5 h-3.5 mr-1" /> Instant Chat Channels
              </span>
              <button
                onClick={handleWhatsAppConcierge}
                className="px-6 py-4 bg-[#25D366] text-black font-poppins font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#20ba59] flex items-center cursor-pointer shadow-lg hover:shadow-[#25D366]/20"
              >
                Chat on WhatsApp with Concierge
              </button>
            </div>
          </div>

          {/* Column Right (7 columns): Interactive contact form + Embed satellite Map */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Interactive Map Wrapper */}
            <div className="h-64 md:h-72 border border-white/5 rounded-lg overflow-hidden relative shadow-2xl">
              {/* Dynamic fully interactive Google Map (embed) */}
              {/* Designed with custom dark-palette constraints for elite hotel aesthetics */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.2085732104537!2d77.22849557685652!3d28.593506168041075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1544a0b2299%3A0xe53c07252067ae4!2sLodi%20Gardens!5e0!3m2!1sen!2sin!4v1717600862590!5m2!1sen!2sin" 
                className="w-full h-full border-0 grayscale invert brightness-90 contrast-125" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title="Google Map Locator of Krishna Place"
              />
              <div className="absolute top-4 left-4 bg-luxury-black/90 px-4 py-1.5 border border-royal-gold/40 text-[10px] text-white tracking-widest font-sans uppercase">
                GEOGRAPHIC POSITION CO-ORDINATES
              </div>
            </div>

            {/* Custom Contact Form */}
            <div className="bg-luxury-gray border border-white/5 p-8 md:p-10 shadow-xl flex-1 justify-between flex flex-col">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    <h3 className="font-serif text-lg text-white mb-6">Log Private Inquiry</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">Guest name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-transparent border-b border-white/20 pb-2 text-white text-xs font-light focus:outline-none focus:border-royal-gold"
                          placeholder="Lord Christopher Linley"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">Email address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-transparent border-b border-white/20 pb-2 text-white text-xs font-light focus:outline-none focus:border-royal-gold"
                          placeholder="linley@estate.co"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col pt-4">
                      <label className="text-[10px] font-sans font-semibold text-royal-gold uppercase tracking-wider mb-2">Detailed message</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-transparent border border-white/10 p-3 rounded text-white text-xs font-light focus:outline-none focus:border-royal-gold placeholder-white/20 resize-none"
                        placeholder="Detail your requirements (e.g. airport tarmac pickup, private bio-sauna temperature configs, tailored pillow material logs)..."
                      />
                    </div>

                    <div className="pt-4 text-right">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-royal-gold hover:bg-white text-luxury-black hover:text-black font-poppins font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 mr-2" />
                        <span>Send Secure Message</span>
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-royal-gold/10 border border-royal-gold flex items-center justify-center mx-auto mb-6">
                      <Check className="w-6 h-6 text-royal-gold" />
                    </div>
                    <span className="text-[10px] font-sans tracking-widest text-royal-gold uppercase mb-2 block animate-pulse">
                      MESSAGE ENCRYPTED & TRANSMITTED
                    </span>
                    <h3 className="font-serif text-2xl text-white mb-4">
                      Inquiry Dispatched Successfully, {name}
                    </h3>
                    <p className="font-sans font-light text-white/70 text-xs md:text-sm leading-relaxed max-w-sm mx-auto mb-8">
                      Your files have been logged in our central registry. Your designated personal guest master will reach out to you within the hour to coordinate further arrangements.
                    </p>
                    <button
                      onClick={() => {
                        setIsSent(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="px-6 py-2.5 border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-black text-xs font-poppins uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Write Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
