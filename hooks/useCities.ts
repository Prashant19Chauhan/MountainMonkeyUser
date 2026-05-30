import { useQuery } from "@tanstack/react-query";
import { getActiveLocations, getCitiesPageSections, getCityRelatedDetails } from "../services/cities.services";

export const useActiveLocations = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['active-locations'],
    queryFn: getActiveLocations,
    enabled,
  });
};

export const useCitiesPageSections = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['cities-page-sections'],
    queryFn: getCitiesPageSections,
    enabled,
  });
};

export const useCityRelatedDetails = (cityId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['city-related-details', cityId],
    queryFn: () => getCityRelatedDetails(cityId),
    enabled: enabled && !!cityId,
  });
};
