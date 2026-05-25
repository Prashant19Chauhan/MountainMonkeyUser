"use client"

import React from 'react';
import { Plane, Train, Ship, Car } from 'lucide-react';
import { ModeCard } from '@/components/cards/ModeCard';

export const TravelModesSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold mb-2">Travel Modes</h2>
      <p className="text-slate-500 mb-8">How do you want to get there?</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ModeCard type="flights" icon={<Plane />} label="Flights" sub="10,000+ Routes" />
        <ModeCard type="trains" icon={<Train />} label="Trains" sub="500+ Scenic lines" />
        <ModeCard type="cruises" icon={<Ship />} label="Cruises" sub="200+ Voyages" />
        <ModeCard type="cars" icon={<Car />} label="Car Rentals" sub="Global coverage" />
        <ModeCard type="transfers" icon={<Car />} label="Private Transfers" sub="Chauffeur driven" />
      </div>
    </section>
  );
};