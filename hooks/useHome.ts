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

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useSearchState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL Search Params
  const [searchData, setSearchData] = useState({
    query: searchParams.get("query") || searchParams.get("search") || "",
    category: searchParams.get("category") || searchParams.get("type") || "",
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    date: searchParams.get("date") || searchParams.get("dates") || "",
    duration: searchParams.get("duration") || "",
    travelers: searchParams.get("travelers") || searchParams.get("guests") || "",
    rooms: searchParams.get("rooms") || "",
  });

  // Sync state with URL updates (essential for back-navigation or reset)
  useEffect(() => {
    setSearchData({
      query: searchParams.get("query") || searchParams.get("search") || "",
      category: searchParams.get("category") || searchParams.get("type") || "",
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      date: searchParams.get("date") || searchParams.get("dates") || "",
      duration: searchParams.get("duration") || "",
      travelers: searchParams.get("travelers") || searchParams.get("guests") || "",
      rooms: searchParams.get("rooms") || "",
    });
  }, [searchParams]);

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
    e?: React.FormEvent
  ) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    
    // Add active fields to params
    if (searchData.query) params.set("query", searchData.query);
    if (searchData.category) params.set("category", searchData.category);
    if (searchData.from) params.set("from", searchData.from);
    if (searchData.to) params.set("to", searchData.to);
    if (searchData.date) params.set("date", searchData.date);
    if (searchData.duration) params.set("duration", searchData.duration);
    if (searchData.travelers) params.set("travelers", searchData.travelers);
    if (searchData.rooms) params.set("rooms", searchData.rooms);

    let targetPath = pathname;
    if (pathname === "/") {
      // Home page search defaults to packages
      targetPath = "/packages";
    }

    router.push(`${targetPath}?${params.toString()}`);
  };

  return {
    searchData,
    setSearchData,
    setQuery,
    handleSearchChange,
    handleSearchSubmit,
  };
};


