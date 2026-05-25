import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MountainMonkey | AI-Powered Premium Himalayan Adventures & Eco-Travel",
  description: "Discover curated, premium Himalayan journeys with MountainMonkey. Experience high-altitude trekking, paragliding, bespoke tour packages, and curated eco-lodging with our personalized AI guide.",
};

// Section Components
import { CuratedPackagesSection } from '@/components/_home/CuratedPackagesSection';
import { AiPromoBanner } from '@/components/_home/AiPromoBanner';
import { TopDestinationsSection } from '@/components/_home/TopDestinationsSection';
import { TravelerStoriesSection } from '@/components/_home/TravelerStoriesSection';
import { TestimonialsSection } from '@/components/_home/TestimonialsSection';
import { PopularActivitiesSection } from '@/components/_home/PopularActivitiesSection';
import { UpcomingPackagesSection } from '@/components/_home/UpcomingPackagesSection';
import { UniqueStaysSection } from '@/components/_home/UniqueStaysSection';
import { TravelModesSection } from '@/components/_home/TravelModesSection';

const HomePage = () => {
  return (
    <div className="min-h-screen text-foreground text-dynamic-shadow font-sans relative">
      <div>
        {/* Instant View Sections */}
        <CuratedPackagesSection />
        <AiPromoBanner />
        <TopDestinationsSection />

        {/* Lazy/In-View Sections (Each handles its own scroll logic internally) */}
        <TravelerStoriesSection />
        <TestimonialsSection />
        <PopularActivitiesSection />
        <UpcomingPackagesSection />
        <UniqueStaysSection />

        {/* Static Navigation Section */}
        <TravelModesSection />
      </div>
    </div>
  );
};

export default HomePage;