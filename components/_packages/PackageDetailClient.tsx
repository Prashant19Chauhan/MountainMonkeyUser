"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { usePackageDetails, usePackageLocalInfo, useSimilarPackages } from '@/hooks/usePackages';

import { PackageHero } from './PackageHero';
import { PackageHighlights } from './PackageHighlights';
import { PackageOverview } from './PackageOverview';
import { PackageItinerary } from './PackageItinerary';
import { PackageActivities } from './PackageActivities';
import { PackageStays } from './PackageStays';
import { PackageCuisine } from './PackageCuisine';
import { PackageMustVisit } from './PackageMustVisit';
import { PackageSafetyTips } from './PackageSafetyTips';
import { PackageCulture } from './PackageCulture';
import { PackageBookingLedger } from './PackageBookingLedger';
import { PackageSimilarAdventures } from './PackageSimilarAdventures';

type PackageDetailClientProps = {
  packageId: string;
};

export const PackageDetailClient = ({ packageId }: PackageDetailClientProps) => {
  // Fetch package data
  const { data: packageData, isLoading: isLoadingPackage } = usePackageDetails(packageId);
  const destinationId = packageData?.packageDetails?.destination?.id?._id || '';
  const { data: localInfoData, isLoading: isLoadingLocalInfo } = usePackageLocalInfo(packageId, destinationId, !!destinationId);
  const { data: similarPackagesData, isLoading: isLoadingSimilar } = useSimilarPackages(
    packageId,
    destinationId,
    packageData?.packageDetails?.categories || [],
    !!packageData?.packageDetails
  );

  // Extract data
  const packageDetails = packageData?.packageDetails;
  const localInfo = localInfoData?.packageDetailsLocalInfo?.[0];
  const similarPackages = similarPackagesData?.similarPackageList || [];

  // Hero images from package or fallback
  const heroImages = packageDetails?.images && packageDetails.images.length > 0 
    ? packageDetails.images 
    : [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80"
      ];

  // Calculate discount percentage
  const pricingBasePrice = packageDetails?.pricing?.basePrice ?? 0;
  const pricingDiscountedPrice = packageDetails?.pricing?.discountedPrice ?? 0;
  const discountPercentage = pricingBasePrice > 0 && pricingDiscountedPrice > 0
    ? Math.round(((pricingBasePrice - pricingDiscountedPrice) / pricingBasePrice) * 100)
    : 0;

  // Loading state
  if (isLoadingPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Error state
  if (!packageDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-slate-500">Package not found</p>
      </div>
    );
  }

  // Calculate total price with taxes
  const baseTotal = (pricingDiscountedPrice || pricingBasePrice) * 2; // Assuming 2 adults
  const taxes = Math.round(baseTotal * 0.05); // 5% taxes
  const totalPrice = baseTotal + taxes;
  const totalDiscount = pricingBasePrice > 0 && pricingDiscountedPrice > 0
    ? (pricingBasePrice - pricingDiscountedPrice) * 2
    : 0;

  return (
    <div className="min-h-screen pb-20 font-sans">
      
      {/* --- HERO SECTION --- */}
      <PackageHero packageDetails={packageDetails} heroImages={heroImages} />

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-8xl mx-auto px-4 md:px-12 lg:px-24 py-8 relative">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT COLUMN - CONTENT */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Quick Highlights Grid */}
            <PackageHighlights packageDetails={packageDetails} />

            {/* About the Journey */}
            <PackageOverview packageDetails={packageDetails} />

            {/* Itinerary Details */}
            <PackageItinerary packageDetails={packageDetails} heroImages={heroImages} />

            {/* Included Activities */}
            <PackageActivities packageDetails={packageDetails} heroImages={heroImages} />

            {/* Top Places to Stay */}
            <PackageStays packageDetails={packageDetails} heroImages={heroImages} />

            {/* Local Information Section */}
            {localInfo && (
              <>
                {/* Famous Food */}
                <PackageCuisine localInfo={localInfo} />

                {/* Famous Places */}
                <PackageMustVisit localInfo={localInfo} />
              </>
            )}

            {/* Important Info & Policies */}
            <PackageSafetyTips packageDetails={packageDetails} localInfo={localInfo} />

            {/* Local Culture & Phrases */}
            <PackageCulture localInfo={localInfo} heroImages={heroImages} />

          </div>

          {/* RIGHT COLUMN - STICKY BOOKING CARD */}
          <div className="w-full lg:w-1/3">
            <PackageBookingLedger 
              packageDetails={packageDetails}
              discountPercentage={discountPercentage}
              baseTotal={baseTotal}
              taxes={taxes}
              totalDiscount={totalDiscount}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>

      {/* --- SIMILAR ADVENTURES SECTION --- */}
      <PackageSimilarAdventures 
        similarPackages={similarPackages} 
        heroImages={heroImages} 
        isLoadingSimilar={isLoadingSimilar} 
      />
      
    </div>
  );
};
