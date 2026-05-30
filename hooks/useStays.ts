import { useQuery } from "@tanstack/react-query";
import { 
    getAllStays, 
    getStayAdvertisements, 
    getStayDetails,
    getStayLocalInfo,
    getStaysPageSections,
    getStayDetailSections
} from "../services/stays.services";

export const useAllStays = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['stays', 'all'],
        queryFn: getAllStays,
        enabled,
    });
};

export const useStayAdvertisements = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['stays', 'advertisements'],
        queryFn: getStayAdvertisements,
        enabled,
    });
};

export const useStayDetails = (stayId: string) => {
    return useQuery({
        queryKey: ['stays', 'details', stayId],
        queryFn: () => getStayDetails({stayId}),
        enabled: !!stayId
    });
};


export const useStayLocalInfo = (destinationId: string) => {
    return useQuery({
        queryKey: ['stays', 'local-info', destinationId],
        queryFn: () => getStayLocalInfo({destinationId}),
        enabled: !!destinationId
    });
};

export const useStaysPageSections = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['stays-page-sections'],
        queryFn: getStaysPageSections,
        enabled,
    });
};

export const useStayDetailSections = (staySlug: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['stay-detail-sections', staySlug],
        queryFn: () => getStayDetailSections(staySlug),
        enabled: enabled && !!staySlug,
    });
};
