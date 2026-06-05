/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  capacity: string;
  image: string;
  gallery: string[];
  amenities: string[];
  tagline: string;
  virtualTourId: string;
}

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  videoUrl?: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  category: 'rooms' | 'dining' | 'pool' | 'events' | 'exterior';
  image: string;
  title: string;
  description: string;
}
