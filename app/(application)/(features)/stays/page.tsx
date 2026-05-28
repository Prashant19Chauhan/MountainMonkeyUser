import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Curated Himalayan Eco-Stays & Boutique Luxury Hotels | MountainMonkey",
  description: "Discover premier boutique hotels, mountain villas, and premium rustic eco-lodges in the Himalayas. Experience premium comfort in nature.",
};

import { StayFilterHeader } from '@/components/_stays/StayFilterHeader';
import { StayMapPreview } from '@/components/_stays/StayMapPreview';
import { DynamicStaysCategories } from '@/components/_stays/DynamicStaysCategories';
import { StayListingsSection } from '@/components/_stays/StayListingsSection';
import { StayPromoBanner } from '@/components/_stays/StayPromoBanner';

export default function StayPage() {
  return (
    <div>
      {/* 1. Category Icons & Sort Filter Bar Header */}
      <StayFilterHeader />
      
      {/* 2. Main Content Experiential Layout Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 font-sans space-y-12">
        <StayMapPreview />
        
        {/* 3. Dynamic Category themed panels */}
        <DynamicStaysCategories />

        {/* 4. Complete Stays Listings */}
        <StayListingsSection />
        
        <StayPromoBanner />
      </div>
    </div>
  );
}