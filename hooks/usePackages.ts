import { useQuery } from "@tanstack/react-query";
import { 
    getFeaturedPackages, 
    getTropicalPackages, 
    getPopularPackages, 
    getPackageAdvertisements, 
    getPackagesDetails,
    getPackageLocalInfo,
    getSimilarPackages
} from "../services/packages.services";

export const useFeaturedPackages = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['packages', 'featured'],
        queryFn: getFeaturedPackages,
        enabled,
    });
};

export const useTropicalPackages = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['packages', 'tropical'],
        queryFn: getTropicalPackages,
        enabled,
    });
};

export const usePopularPackages = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['packages', 'popular'],
        queryFn: getPopularPackages,
        enabled,
    });
};

export const usePackageAdvertisements = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['packages', 'advertisements'],
        queryFn: getPackageAdvertisements,
        enabled,
    });
};


export const usePackageDetails = (packageId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['packages', packageId],
        queryFn: () => getPackagesDetails(packageId),
        enabled,
    });
};

export const usePackageLocalInfo = (packageId: string, destinationId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['packages', packageId, 'local-info'],
        queryFn: () => getPackageLocalInfo(packageId, destinationId),
        enabled,
    });
};

export const useSimilarPackages = (packageId: string, destinationId: string, category: string[], enabled: boolean = true) => {
    return useQuery({
        queryKey: ['packages', packageId, 'similar'],
        queryFn: () => getSimilarPackages(packageId, destinationId, category),
        enabled,
    });
};

