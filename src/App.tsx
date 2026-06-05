/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicTransition from './components/CinematicTransition';
import RoomsSection from './components/RoomsSection';
import Experience360 from './components/Experience360';
import Amenities from './components/Amenities';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import BookingSystem from './components/BookingSystem';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  // Sync room reservation state from room card selects into the slider booking wizard
  const [selectedBookingRoom, setSelectedBookingRoom] = useState<string>('deluxe');

  const scrollToSectionId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    scrollToSectionId('booking-section');
  };

  const handleExploreRooms = () => {
    scrollToSectionId('suites');
  };

  const handleBookClick = (params?: { checkIn: string; checkOut: string; guests: string; roomType: string }) => {
    if (params?.roomType) {
      setSelectedBookingRoom(params.roomType);
    }
    scrollToSectionId('booking-section');
  };

  const handleVirtualTour = (roomId: string) => {
    // When click-triggered on suites grid, scroll to 360 viewer
    scrollToSectionId('experience');
  };

  const handleBookNowRoom = (roomId: string) => {
    // Populate active room selecting parameters, then scroll straight to price form
    setSelectedBookingRoom(roomId);
    scrollToSectionId('booking-section');
  };

  return (
    <div className="bg-luxury-black text-white min-h-screen font-sans selection:bg-royal-gold selection:text-luxury-black">
      {/* 1. Global Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 2. Full-Screen Cinematic Video Hero with Booking banner */}
      <Hero 
        onExploreClick={handleExploreRooms} 
        onBookClick={handleBookClick} 
      />

      {/* 3. Special Scroll Effect: Zooming Building Walk-in Corridor */}
      <CinematicTransition />

      {/* 4. Luxury Accommodation Room Cards */}
      <RoomsSection 
        onVirtualTourClick={handleVirtualTour} 
        onBookNowClick={handleBookNowRoom} 
      />

      {/* 5. Immersive 360° Panoramic Suite Viewer with Hotspots */}
      <Experience360 />

      {/* 6. High-Fidelity Animated Curated Amenities Grid */}
      <Amenities />

      {/* 7. Pinterest Masonry Portfolio with Filters & Lightbox view */}
      <GallerySection />

      {/* 8. Verified Guest Reflections & Interview Modal Testimonials */}
      <Testimonials />

      {/* 9. Interactive Check-Out Calendar booking with instant price tallying */}
      <BookingSystem initialRoomType={selectedBookingRoom} />

      {/* 10. Satellite Map Coordinates & Concierge Form */}
      <ContactSection />

      {/* 11. Custom Footnote Alignment */}
      <Footer />
    </div>
  );
}
