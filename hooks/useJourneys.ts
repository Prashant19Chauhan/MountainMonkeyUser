"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getActiveLocations } from "@/services/cities.services";
import { getHubsApi, searchJourneysApi, SearchJourneysParams, getRouteDetailApi } from "@/services/journeys.services";
import { useState } from "react";
import { searchJourneysSchema } from "@/lib/validations/journeys.validation";

export default function useJourneys() {
  const [journeys, setJourneys] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // 1. Fetch Dynamic Cities / Locations
  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ["active-locations"],
    queryFn: getActiveLocations
  });

  // 2. Fetch Active Transit Hubs
  const { data: hubs = [], isLoading: isLoadingHubs } = useQuery({
    queryKey: ["hubs-all"],
    queryFn: getHubsApi
  });

  // 3. Search Journeys Mutation
  const searchMutation = useMutation({
    mutationFn: async (params: SearchJourneysParams) => {
      // Validate inputs using Zod schema
      const validation = searchJourneysSchema.safeParse(params);
      if (!validation.success) {
        const errors = validation.error.issues.map((err: any) => err.message);
        setValidationErrors(errors);
        throw new Error(errors.join(", "));
      }
      setValidationErrors([]);
      return searchJourneysApi(params);
    },
    onSuccess: (data) => {
      setJourneys(data || []);
    },
    onError: (err: any) => {
      console.error("Pathfinder search error:", err);
    }
  });

  const isLoading = isLoadingLocations || isLoadingHubs || searchMutation.isPending;

  return {
    locations,
    hubs,
    journeys,
    isLoading,
    isSearching: searchMutation.isPending,
    validationErrors,
    searchJourneys: searchMutation.mutate,
    searchJourneysAsync: searchMutation.mutateAsync
  };
}

export function useRouteDetail(id: string, enabled = true) {
  return useQuery({
    queryKey: ["route-detail", id],
    queryFn: () => getRouteDetailApi(id),
    enabled: !!id && enabled
  });
}
