/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function CinematicTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress inside this 180vh scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Exterior building zoom-in and fade-out
  // Scale zooms from 1 to 4.5. It focuses on the central door.
  const exteriorScale = useTransform(scrollYProgress, [0, 0.5, 0.7], [1.0, 3.2, 5.0]);
  const exteriorOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.7], [1.0, 0.5, 0.0]);
  const exteriorBlur = useTransform(scrollYProgress, [0.2, 0.5], ['0px', '8px']);

  // Lobby portal gates zoom and scale
  const gateScale = useTransform(scrollYProgress, [0.25, 0.55, 0.85], [0.8, 1.25, 2.5]);
  const gateOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65], [0.0, 1.0, 0.0]);

  // Selected suite room interior zoom and fade-in
  // Fades in from 0 to 1 between progress 0.4 and 0.8.
  // Scales out from 1.3 to 1 to simulate a camera walking/settling into the room.
  const interiorOpacity = useTransform(scrollYProgress, [0.4, 0.7, 1.0], [0.0, 1.0, 1.0]);
  const interiorScale = useTransform(scrollYProgress, [0.4, 0.8, 1.0], [1.3, 1.05, 1.0]);

  // Subtle floating labels
  const text1Opacity = useTransform(scrollYProgress, [0, 0.3], [1.0, 0.0]);
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.65], [0.0, 1.0]);
  const text2Translation = useTransform(scrollYProgress, [0.35, 0.65], [30, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.75, 1.0], [0.0, 1.0]);

  return (
    <div ref={containerRef} className="relative h-[220vh] w-full bg-luxury-black">
      {/* Sticky presentation view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Selected Suite Room Interior (Deepest layer, reveals as exterior zooms past) */}
        <motion.div
          style={{
            opacity: interiorOpacity,
            scale: interiorScale,
          }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=85"
            alt="Room Interior"
            className="w-full h-full object-cover filter brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-black/40" />
        </motion.div>

        {/* Layer 2: Portal / Gold Lattice Lobby Gate (Mid-ground transiting layer) */}
        <motion.div
          style={{
            opacity: gateOpacity,
            scale: gateScale,
          }}
          className="absolute inset-0 w-full h-full z-20 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[80vw] h-[80vh] border-[1px] border-royal-gold/30 flex items-center justify-center relative">
            <div className="absolute inset-4 border border-royal-gold/10" />
            <div className="absolute inset-20 border-[2px] border-royal-gold/5" />
            <span className="font-serif text-white/50 text-[10vw] select-none tracking-[0.25em] italic">
              WELCOME
            </span>
          </div>
        </motion.div>

        {/* Layer 3: Hotel Building Exterior (Frontmost layer, zooms in and out of viewport) */}
        <motion.div
          style={{
            opacity: exteriorOpacity,
            scale: exteriorScale,
            filter: `blur(${exteriorBlur})`,
          }}
          className="absolute inset-0 w-full h-full z-30"
        >
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85"
            alt="Hotel Building Exterior"
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-black/35 to-luxury-black" />
        </motion.div>

        {/* Text Overlays linked to stages of scroll progress */}
        <div className="absolute inset-x-0 h-full flex flex-col items-center justify-center z-40 pointer-events-none px-6">
          
          {/* Scroll progress text stage 1: Beginning */}
          <motion.div
            style={{ opacity: text1Opacity }}
            className="text-center"
          >
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.4em] text-royal-gold uppercase block mb-3">
              SCROLL DOWN TO CROSS THE THRESHOLD
            </span>
            <h2 className="font-serif text-4xl md:text-7xl text-white tracking-widest max-w-4xl select-none">
              Step Into Absolute Tranquility
            </h2>
            <div className="mt-8 flex justify-center animate-bounce">
              <div className="w-[1px] h-12 bg-royal-gold/70" />
            </div>
          </motion.div>

          {/* Scroll progress text stage 2: Midway */}
          <motion.div
            style={{ 
              opacity: text2Opacity,
              y: text2Translation
            }}
            className="text-center absolute"
          >
            <span className="font-serif text-2xl md:text-4xl italic text-royal-gold font-light mb-4 block">
              Entering the Grand Lobby
            </span>
            <p className="font-sans text-xs md:text-sm text-white/70 max-w-lg font-light tracking-widest uppercase">
              Where quiet grandeur meets impeccable service. Preparing your custom suite...
            </p>
          </motion.div>

          {/* Scroll progress text stage 3: Loaded inside Suite */}
          <motion.div
            style={{ opacity: text3Opacity }}
            className="text-center absolute"
          >
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.55em] text-royal-gold uppercase mb-3 block">
              SANCTUARY GATES ARE OPEN
            </span>
            <h2 className="font-serif text-4xl md:text-7xl text-white tracking-wide max-w-4xl font-light">
              Your Suite Awaits
            </h2>
            <p className="font-sans text-xs md:text-sm text-white/80 mt-4 max-w-md font-light tracking-wider mx-auto">
              Bespoke minimalist spaces meticulously designed for pure rest. Explore indices below.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
