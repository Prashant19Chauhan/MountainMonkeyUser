import { useQuery } from "@tanstack/react-query";
import { 
    getAllActivities,
    getFeaturedActivities, 
    getPopularActivities, 
    getExploreActivities, 
    getActivityAdvertisements, 
    getActivityDetails,
    getActivityLocalInfo,
    getActivitiesPageSections,
    getActivityDetailSections
} from "../services/activities.services";

export const useAllActivities = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities', 'all'],
        queryFn: getAllActivities,
        enabled,
    });
};

export const useFeaturedActivities = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities', 'featured'],
        queryFn: getFeaturedActivities,
        enabled,
    });
};

export const usePopularActivities = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities', 'popular'],
        queryFn: getPopularActivities,
        enabled,
    });
};

export const useExploreActivities = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities', 'explore'],
        queryFn: getExploreActivities,
        enabled,
    });
};

export const useActivityAdvertisements = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities', 'advertisements'],
        queryFn: getActivityAdvertisements,
        enabled,
    });
};

export const useActivityDetails = (activityId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities', activityId],
        queryFn: () => getActivityDetails(activityId),
        enabled,
    });
};  

export const useActivityLocalInfo = (destinationId: string | undefined, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities', 'local-info', destinationId],
        queryFn: () => getActivityLocalInfo({destinationId: destinationId || ""}),
        enabled: enabled && !!destinationId,
    });
};

export const useActivitiesPageSections = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activities-page-sections'],
        queryFn: getActivitiesPageSections,
        enabled,
    });
};

export const useActivityDetailSections = (activitySlug: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['activity-detail-sections', activitySlug],
        queryFn: () => getActivityDetailSections(activitySlug),
        enabled: enabled && !!activitySlug,
    });
};
