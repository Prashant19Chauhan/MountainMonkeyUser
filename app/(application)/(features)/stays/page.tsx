import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Curated Himalayan Eco-Stays & Boutique Luxury Hotels | MountainMonkey",
  description: "Discover premier boutique hotels, mountain villas, and premium rustic eco-lodges in the Himalayas. Experience premium comfort in nature.",
};

import { StayFilterHeader } from '@/components/_stays/StayFilterHeader';
import { StayMapPreview } from '@/components/_stays/StayMapPreview';
import { StayListingsSection } from '@/components/_stays/StayListingsSection';
import { StayPromoBanner } from '@/components/_stays/StayPromoBanner';

export default function StayPage() {
  return (
    <div>
      {/* 1. Category Icons & Sort Filter Bar Header */}
      <StayFilterHeader />
      
      {/* 2. Main Content Experiential Layout Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
        <StayMapPreview />
        <StayListingsSection />
        <StayPromoBanner />
      </div>
    </div>
  );
}