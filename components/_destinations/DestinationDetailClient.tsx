"use client";

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { 
  useDestinationDetails, 
  useDestinationActivities, 
  useDestinationStays,
  useDestinationLocalInfo,
  useDestinationPackages 
} from '@/hooks/useDestinations';

import { DestinationHero } from './DestinationHero';
import { DestinationLocalHighlights } from './DestinationLocalHighlights';
import { DestinationOverview } from './DestinationOverview';
import { DestinationPackages } from './DestinationPackages';
import { DestinationStays } from './DestinationStays';
import { DestinationActivities } from './DestinationActivities';
import { DestinationCuisine } from './DestinationCuisine';
import { DestinationMustVisit } from './DestinationMustVisit';
import { DestinationSafetyTips } from './DestinationSafetyTips';
import { DestinationBudgetEstimate } from './DestinationBudgetEstimate';
import { DestinationPhrases } from './DestinationPhrases';
import { DestinationCulture } from './DestinationCulture';
import { DestinationVerifiedFooter } from './DestinationVerifiedFooter';

type DestinationDetailClientProps = {
  destinationId: string;
};

export const DestinationDetailClient = ({ destinationId }: DestinationDetailClientProps) => {
  // Fetch all destination data
  const { data: destinationData, isLoading: isLoadingDestination } = useDestinationDetails(destinationId);
  const { data: activitiesData, isLoading: isLoadingActivities } = useDestinationActivities(destinationId);
  const { data: staysData, isLoading: isLoadingStays } = useDestinationStays(destinationId);
  const { data: localInfoData, isLoading: isLoadingLocalInfo } = useDestinationLocalInfo(destinationId);
  const { data: packagesData, isLoading: isLoadingPackages } = useDestinationPackages(destinationId);

  const [activeTab, setActiveTab] = useState<'all' | 'packages' | 'stays' | 'activities'>('all');

  // Extract data
  const destination = destinationData;
  const activities = activitiesData || [];
  const stays = staysData || [];
  const localInfo = localInfoData?.[0];
  const packages = packagesData || [];

  // Fallback images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80"
  ];

  const destinationImages = destination?.images && destination.images.length > 0 
    ? destination.images 
    : fallbackImages;

  // Loading state
  if (isLoadingDestination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Error state
  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-slate-500">Destination not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800 antialiased font-sans pt-20">
      
      {/* 1. MEDIA CANVAS & DETAILS HEADER */}
      <DestinationHero destination={destination} destinationImages={destinationImages} />

      {/* 2. LOCAL ESSENTIAL HIGHLIGHTS STRIP */}
      {localInfo && <DestinationLocalHighlights localInfo={localInfo} />}

      {/* 3. CATEGORY TABS BAR */}
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 pt-10">
        <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-8">
          {(['all', 'packages', 'stays', 'activities'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-black uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'all' ? 'Destination Hub' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. BALANCED SPLIT GRID ARCHITECTURE */}
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN CONTENT */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* GENERAL HUB INSIGHT OVERVIEW */}
          {activeTab === 'all' && <DestinationOverview destination={destination} />}

          {/* TOUR PACKAGES COLLECTION */}
          {(activeTab === 'all' || activeTab === 'packages') && (
            <DestinationPackages packages={packages} destinationImages={destinationImages} />
          )}

          {/* ECO STAYS & CURATED LODGING */}
          {(activeTab === 'all' || activeTab === 'stays') && (
            <DestinationStays stays={stays} destinationImages={destinationImages} />
          )}

          {/* LOCAL ACTIVITIES GRID MATRIX */}
          {(activeTab === 'all' || activeTab === 'activities') && (
            <DestinationActivities activities={activities} destinationImages={destinationImages} />
          )}

          {/* LOCAL CUISINE SECTION */}
          {activeTab === 'all' && <DestinationCuisine localInfo={localInfo} />}

          {/* FAMOUS PLACES TIMELINE */}
          {activeTab === 'all' && <DestinationMustVisit localInfo={localInfo} />}

          {/* SAFETY & TIPS SECTION */}
          {activeTab === 'all' && <DestinationSafetyTips localInfo={localInfo} />}

        </div>

        {/* RIGHT TRANSACT BLOCK SIDEBAR */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          
          {/* Dynamic AI Expense Calculator */}
          <DestinationBudgetEstimate destination={destination} />

          {/* Local Phrases */}
          <DestinationPhrases localInfo={localInfo} />

          {/* Culture & Festivals */}
          <DestinationCulture localInfo={localInfo} />

        </div>
      </div>

      {/* 5. BRAND INCLUSIONS / DEEP FOOTER */}
      <DestinationVerifiedFooter />

    </div>
  );
};
