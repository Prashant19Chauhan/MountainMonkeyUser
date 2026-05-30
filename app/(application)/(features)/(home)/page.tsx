import React from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("home-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "MountainMonkey | AI-Powered Premium Himalayan Adventures & Eco-Travel",
        description: "Discover curated, premium Himalayan journeys with MountainMonkey. Experience high-altitude trekking, paragliding, bespoke tour packages, and curated eco-lodging with our personalized AI guide.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for home page:", error);
  }

  return {
    title: "MountainMonkey | AI-Powered Premium Himalayan Adventures & Eco-Travel",
    description: "Discover curated, premium Himalayan journeys with MountainMonkey. Experience high-altitude trekking, paragliding, bespoke tour packages, and curated eco-lodging with our personalized AI guide.",
  };
}

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
import { CustomContentSections } from '@/components/_home/CustomContentSections';

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

        {/* Dynamic CMS Sections from Backend */}
        <CustomContentSections />
      </div>
    </div>
  );
};

export default HomePage;