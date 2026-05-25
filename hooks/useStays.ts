import { useQuery } from "@tanstack/react-query";
import { 
    getAllStays, 
    getStayAdvertisements, 
    getStayDetails,
    getStayLocalInfo
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
