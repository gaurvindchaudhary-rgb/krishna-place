/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Maximize, Orbit, Sparkles, X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ROOMS } from '../data';

const HOTSPOTS_DATA: Record<string, Array<{ title: string; text: string; x: number; y: number }>> = {
  deluxe: [
    { title: 'Bespoke King Bed', text: 'Stitched with 1000-thread Italian cotton linen and down feather crowns.', x: 32, y: 56 },
    { title: 'Smart Control Screen', text: 'Unified central screen to customize atmospheric music, window shades, lighting, and prompt butler service.', x: 48, y: 60 },
    { title: 'Atelier Mini Bar', text: 'Stocked with vintage French champagnes, organic custom-batch luxury chocolates, and single-source cold brews.', x: 15, y: 55 },
    { title: 'Private Outlook Balcony', text: 'Glass balustrade terrace that frames clear, calm views over our reflective water gardens.', x: 74, y: 44 }
  ],
  premium: [
    { title: 'Imperial Day Bed', text: 'An exquisite chaise longue placed perfectly for taking in the city sunset.', x: 28, y: 54 },
    { title: 'Greek Soaking Tub', text: 'Solid, handworked Pentelic white marble framing a deep high-end spa tub.', x: 70, y: 62 },
    { title: 'Premium Sound Proxies', text: 'Omnidirectional hidden acoustic arrays that map sound to natural room resonance.', x: 48, y: 35 }
  ],
  executive: [
    { title: 'Executive Board Desk', text: 'Dressed in smooth grain leather with biometric encryption vaults and hidden outlets.', x: 18, y: 48 },
    { title: 'Lounge Hearth Fire', text: 'Seamless vapor-fire column creating an inviting soft amber glow at twilight.', x: 65, y: 58 },
    { title: 'Atelier Espresso Pod', text: 'Limited-edition single-origin capsules roasted exclusively for Krishna Place.', x: 42, y: 52 }
  ],
  presidential: [
    { title: 'Private Wellness Plunge', text: 'An indoor thermal heated pool with counter-current jets and water cascades.', x: 22, y: 65 },
    { title: 'Steinway grand Piano', text: 'A historical masterpiece tuned and voiced by visiting artists.', x: 50, y: 56 },
    { title: 'Finnish Bio-Sauna', text: 'Spike-cedar sauna enclosure with intelligent thermal custom humidity adjustments.', x: 80, y: 45 }
  ]
};

export default function Experience360() {
  const [selectedSuite, setSelectedSuite] = useState('deluxe');
  const [isDragHintVisible, setIsDragHintVisible] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<{ title: string; text: string } | null>(null);
  const [panOffset, setPanOffset] = useState(-150); // Initial central pan alignment (percentage/pixels)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPanRef = useRef(0);

  // Setup room images
  const getRoomImg = (suiteId: string) => {
    switch (suiteId) {
      case 'deluxe': return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2600&q=90';
      case 'premium': return 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2600&q=90';
      case 'executive': return 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2600&q=90';
      case 'presidential': return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2600&q=90';
      default: return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2600&q=90';
    }
  };

  // Drag listeners
  const handleStart = (clientX: number) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startPanRef.current = panOffset;
    setIsDragHintVisible(false);
  };

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - startXRef.current;
    
    // Scale movement to panorama boundaries
    let nextOffset = startPanRef.current + dx * 0.45;
    
    // Set bounds to avoid empty gaps (wider panorama canvas panning constraint)
    if (nextOffset > 0) nextOffset = 0;
    if (nextOffset < -450) nextOffset = -450;
    
    setPanOffset(nextOffset);
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) {
      isDraggingRef.current = false;
    }
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch gesture drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Handle Fullscreen request
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Sync fullscreen state if changed by Esc key
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Sync selected suite changes directly to active hotspots
  const currentHotspots = HOTSPOTS_DATA[selectedSuite] || [];

  return (
    <section id="experience" className="py-24 bg-luxury-black relative overflow-hidden z-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold text-royal-gold tracking-[0.4em] uppercase block mb-3">
            IMMERSIVE VIRTUAL RESIDENCE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest">
            360° Panoramic Showcase
          </h2>
          <p className="font-sans font-light text-white/70 text-xs md:text-sm mt-4 leading-relaxed tracking-wider">
            Virtually enter our exquisite reserves. Click and drag left or right to inspect materials, and tap gold active hotspots to inspect luxurious room appointments.
          </p>
        </div>

        {/* Room Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedSuite(r.id);
                setPanOffset(-150); // reset view slightly
                setActiveHotspot(null);
              }}
              className={`px-5 py-2.5 font-poppins text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                selectedSuite === r.id
                  ? 'bg-royal-gold text-luxury-black border-royal-gold'
                  : 'bg-transparent text-white border-white/10 hover:border-royal-gold/60 hover:text-royal-gold'
              }`}
            >
              {r.id === 'presidential' ? 'Royal Presidential' : r.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* 360 Core View Frame */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative select-none overflow-hidden border border-royal-gold/15 bg-luxury-gray cursor-grab active:cursor-grabbing ${
            isFullscreen ? 'fixed inset-0 w-screen h-screen z-50 p-0' : 'h-[62vh] rounded-lg'
          }`}
        >
          {/* Panoramic wide background image */}
          <div
            className="absolute top-0 bottom-0 flex h-full transition-transform duration-75 ease-out select-none pointer-events-none"
            style={{
              width: '550%',
              transform: `translateX(${panOffset}px)`,
            }}
          >
            <img
              src={getRoomImg(selectedSuite)}
              alt="Krishna Place immersive room panoramas"
              className="w-full h-full object-cover filter brightness-[0.70] shadow-inner select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Render Active Hotspots dynamically layered on top of the panning panorama div */}
          {/* Note that hotspots scale/translate along with target background pan offset */}
          <div
            className="absolute top-0 bottom-0 absolute-full flex h-full pointer-events-none"
            style={{
              width: '550%',
              transform: `translateX(${panOffset}px)`,
            }}
          >
            {currentHotspots.map((h, i) => (
              <div
                key={i}
                className="absolute pointer-events-auto"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                }}
              >
                <div className="relative group/hot">
                  {/* Ping effect */}
                  <div className="absolute w-8 h-8 rounded-full bg-royal-gold/40 animate-ping -left-2 -top-2 flex items-center justify-center" />
                  
                  {/* Glowing clickable node */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot({ title: h.title, text: h.text });
                    }}
                    className="w-4 h-4 rounded-full bg-royal-gold border-2 border-white flex items-center justify-center shadow-lg transition-transform hover:scale-125 cursor-pointer"
                  >
                    <span className="sr-only">{h.title}</span>
                  </button>

                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-luxury-black/90 text-white border border-royal-gold/30 px-3 py-1.5 rounded text-[10px] uppercase font-sans tracking-widest opacity-0 group-hover/hot:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                    {h.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-6 right-6 z-30 p-3 bg-luxury-black/80 hover:bg-royal-gold hover:text-black border border-royal-gold/30 text-white rounded-full transition-all duration-300 shadow-xl cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <X className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>

          {/* Orbit Navigation Badge */}
          <div className="absolute top-6 left-6 z-30 flex items-center space-x-2 bg-luxury-black/85 px-4 py-2 border border-royal-gold/25">
            <Orbit className="w-4 h-4 text-royal-gold animate-spin-slow" />
            <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-white">
              360° PARALLEL GYRO ACTIVE
            </span>
          </div>

          {/* Direct Controls (Helpful on desktop if user prefers buttons) */}
          <div className="absolute bottom-6 left-6 z-30 flex items-center space-x-3">
            <button
              onClick={() => setPanOffset(prev => Math.min(prev + 60, 0))}
              className="p-2 bg-luxury-black/85 hover:bg-royal-gold hover:text-black border border-white/10 rounded-full text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPanOffset(prev => Math.max(prev - 60, -450))}
              className="p-2 bg-luxury-black/85 hover:bg-royal-gold hover:text-black border border-white/10 rounded-full text-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-white/50 font-sans uppercase">Drag to Pan</span>
          </div>

          {/* Dynamic Drag Hint overlay */}
          <AnimatePresence>
            {isDragHintVisible && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 pointer-events-none"
              >
                <Compass className="w-12 h-12 text-royal-gold animate-pulse mb-3" />
                <span className="font-poppins font-semibold text-xs tracking-[0.2em] text-white uppercase bg-luxury-black/80 px-6 py-2 border border-royal-gold/30 rounded-full">
                  DRAG MOUSE OR SWIPE TO PAN
                </span>
                <span className="text-[10px] text-white/60 tracking-normal mt-1">
                  Tap active hotspots for item details
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hotspot details focus card */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-luxury-black/95 border border-royal-gold p-5 w-[85%] max-w-sm shadow-2xl"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-royal-gold" />
                    <h4 className="font-serif text-sm text-royal-gold font-bold tracking-wide">
                      {activeHotspot.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-white/60 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                  {activeHotspot.text}
                </p>
                <div className="mt-3 flex justify-end">
                  <span className="text-[9px] font-sans tracking-widest text-royal-gold uppercase">
                    Krishna Place Select Specs
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
