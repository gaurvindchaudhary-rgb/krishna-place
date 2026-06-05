/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, GalleryItem, Testimonial } from './types';

export const ROOMS: Room[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Heritage Room',
    tagline: 'Refinement in every detail',
    description: 'An elegant sanctuary combining classical architecture with contemporary comfort. Features exquisite silk linens, custom hand-carved mahogany panels, and views of our lush botanical gardens.',
    price: 45000,
    size: '48 m²',
    capacity: '2 Guests',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Custom Marble Bath', 'Smart Automation', 'Butler Pantry', 'Nespresso Atelier', 'Private Balcony'],
    virtualTourId: 'deluxe_360'
  },
  {
    id: 'premium',
    name: 'Premium Horizon Room',
    tagline: 'Floating above the city sky',
    description: 'Bask in immense natural light through floor-to-ceiling high-fidelity glass panels. Located on our premier upper floors, offering a curated design filled with soft velvet textures and advanced automation.',
    price: 65000,
    size: '60 m²',
    capacity: '3 Guests',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Deep Soaking Tub', 'Floor-to-Ceiling Windows', 'Pillow Concierge', 'Premium Sound System', 'Spirits Collection'],
    virtualTourId: 'premium_360'
  },
  {
    id: 'executive',
    name: 'Grand Executive Suite',
    tagline: 'The pinnacle of private luxury',
    description: 'Designed for effortless transitions between productivity and leisure. Features a spacious architectural living room, fully private office salon, and handcrafted Italian marble bathrooms.',
    price: 110000,
    size: '110 m²',
    capacity: '3 Guests',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Interactive Media Lounge', 'Dedicated Private Office', 'In-Suite Fine Dining Counter', 'Walk-in Closet', 'Hermès Bathroom Amenities'],
    virtualTourId: 'executive_360'
  },
  {
    id: 'presidential',
    name: 'The Royal Krishna Presidential Suite',
    tagline: 'An unrivaled monument to grandeur',
    description: 'Our most prestigious residence. A stunning duplex layout boasting a private indoor wellness spa, custom grand piano, separate staff entrance, and absolute 360-degree views of the capital skyline.',
    price: 350000,
    size: '280 m²',
    capacity: '4 Guests',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Private Heated Plunge Pool', 'Personal Dedicated Concierge', 'Chef-in-Residence Kitchen', 'Private Bio-Sauna & Steam Gym', 'Secure Bulletproof Reinforcement'],
    virtualTourId: 'presidential_360'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'ext1',
    category: 'exterior',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    title: 'The Golden Hour Façade',
    description: 'Sunset highlighting the soaring glass geometry of Krishna Place.'
  },
  {
    id: 'room1',
    category: 'rooms',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    title: 'Deluxe Suite Sanctuary',
    description: 'Bespoke minimal aesthetics curated for absolute sleep restoration.'
  },
  {
    id: 'dining1',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    title: 'Aura Gastronomy',
    description: 'Michelin-starred sensory dining and vintage wine pairings.'
  },
  {
    id: 'pool1',
    category: 'pool',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
    title: 'Horizon Infinity Pool',
    description: 'Swim on the precipice of absolute serenity and skyline vistas.'
  },
  {
    id: 'event1',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    title: 'Grand Ballroom Majesty',
    description: 'Host to historic conferences and magnificent galas.'
  },
  {
    id: 'dining2',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    title: 'The Chef’s Atelier',
    description: 'Intimate artisanal dessert plating from world renowned master pâtissiers.'
  },
  {
    id: 'pool2',
    category: 'pool',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    title: 'The Pool Atrium at Dawn',
    description: 'Warm light falling over marble decks and tranquil currents.'
  },
  {
    id: 'ext2',
    category: 'exterior',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    title: 'Water Gardens',
    description: 'Reflective water canvases echoing the tranquil architectural design.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    author: 'Lady Victoria Sinclair',
    location: 'London, UK',
    rating: 5,
    text: 'Krishna Place is an ethereal masterpiece. The invisible service is absolute perfection—every request was anticipated with grace before I even voiced it. An unrivaled sanctuary of quiet luxury.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test2',
    author: 'Alexander Vasseur',
    location: 'Paris, France',
    rating: 5,
    text: 'Exquisite modern geometry. The 360-degree panorama of the Presidential Suite is breath-taking, and the design exhibits an architectural rigor rarely found outside private modern estates. Spectacular.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test3',
    author: 'Serena Lin',
    location: 'Singapore',
    rating: 5,
    text: 'A profound mindfulness experience. The private bio-sauna and customized pillow concierge rejuvenated me completely. It is not just lodging; it is an incredible journey of physical and mental restoration.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  }
];
