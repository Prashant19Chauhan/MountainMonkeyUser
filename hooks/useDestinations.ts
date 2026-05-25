import { useQuery } from "@tanstack/react-query";
import { 
    getDestinations, 
    getTrendingDestinations, 
    getTropicalDestinations, 
    getHistoryDestinations,
    getDestinationAdvertisements,
    getDestinationPackages,
    getDestinationLocalInfo,
    getDestinationStays,
    getDestinationActivities,
    getDestinationDetails
} from "../services/destinations.services";

export const useAllDestinations = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', 'all'],
        queryFn: getDestinations,
        enabled,
    });
};

export const useTrendingDestinations = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', 'trending'],
        queryFn: getTrendingDestinations,
        enabled,
    });
};

export const useTropicalDestinations = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', 'tropical'],
        queryFn: getTropicalDestinations,
        enabled,
    });
};

export const useHistoryDestinations = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', 'history'],
        queryFn: getHistoryDestinations,
        enabled,
    });
};

export const useDestinationAdvertisements = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', 'advertisements'],
        queryFn: getDestinationAdvertisements,
        enabled,
    });
};

export const useDestinationDetails = (destinationId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', destinationId],
        queryFn: () => getDestinationDetails(destinationId),
        enabled,
    });
};

export const useDestinationActivities = (destinationId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', destinationId, 'activities'],
        queryFn: () => getDestinationActivities(destinationId),
        enabled,
    });
};

export const useDestinationStays = (destinationId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', destinationId, 'stays'],
        queryFn: () => getDestinationStays(destinationId),
        enabled,
    });
};

export const useDestinationLocalInfo = (destinationId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', destinationId, 'local-info'],
        queryFn: () => getDestinationLocalInfo(destinationId),
        enabled,
    });
};  

export const useDestinationPackages = (destinationId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['destinations', destinationId, 'packages'],
        queryFn: () => getDestinationPackages(destinationId),
        enabled,
    });
};  


