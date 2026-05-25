import { useQuery } from "@tanstack/react-query";
import { homeHeroContent } from "@/services/home.services";

export const useHeroContent = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["home-hero-section"],
    queryFn: homeHeroContent,
    enabled
  });
};

// @/hooks/useCuratedPackages.ts
import { homeCuratedPackagesContent } from "@/services/home.services";

export const useCuratedPackages = () => {
  return useQuery({
    queryKey: ["home-curated-packages"],
    queryFn: homeCuratedPackagesContent

  });
};

// @/hooks/useTopDestinations.ts
import { homeTopDestinationsContent } from "@/services/home.services";

export const useTopDestinations = () => {
  return useQuery({
    queryKey: ["home-top-destinations"],
    queryFn: homeTopDestinationsContent

  });
};


// @/hooks/usePopularActivities.ts
import { homePopularActivitiesContent } from "@/services/home.services";

export const usePopularActivities = (
  enabled = true
) => {
  return useQuery({
    queryKey: ["home-popular-activities"],
    queryFn: homePopularActivitiesContent,

    enabled
  });
};

// @/hooks/useUniqueStays.ts
import { homeUniqueStaysContent } from "@/services/home.services";

export const useUniqueStays = (
  enabled = true
) => {
  return useQuery({
    queryKey: ["home-unique-stays"],
    queryFn: homeUniqueStaysContent,

    enabled

  });
};

// @/hooks/useUpcomingPackages.ts
import { homeUpcomingPackagesContent } from "@/services/home.services";

export const useUpcomingPackages = (
  enabled = true
) => {
  return useQuery({
    queryKey: ["home-upcoming-packages"],
    queryFn: homeUpcomingPackagesContent,

    enabled

  });
};

// @/hooks/useHomeAds.ts
import { homeAdvertisementsContent } from "@/services/home.services";

export const useHomeAds = () => {
  return useQuery({
    queryKey: [
      "home-advertisements",
      "home-ai-promo",
    ],

    queryFn: () =>
      homeAdvertisementsContent("home-ai-promo"),
  });
};

// @/hooks/useTravelerStories.ts
import { homeTravelerStoriesContent } from "@/services/home.services";

export const useTravelerStories = (
  enabled = true
) => {
  return useQuery({
    queryKey: ["home-traveler-stories"],
    queryFn: homeTravelerStoriesContent,

    enabled

  });
};

// @/hooks/useTestimonials.ts
import { homeTestimonialsContent } from "@/services/home.services";

export const useTestimonials = (
  enabled = true
) => {
  return useQuery({
    queryKey: ["home-testimonials"],
    queryFn: homeTestimonialsContent,

    enabled

  });
};

// @/hooks/useSearchState.ts

import { useState } from "react";

export const useSearchState = () => {

  const [searchData, setSearchData] = useState({
    query: "",
    category: "",
  });

  const handleSearchChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setQuery = (query: string) => {
    setSearchData((prev) => ({
      ...prev,
      query,
    }));
  };

  const handleSearchSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log(searchData);
  };

  return {
    searchData,
    setSearchData,
    setQuery,
    handleSearchChange,
    handleSearchSubmit,
  };
};

