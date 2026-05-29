import api from "@/lib/api";

export const getDestinations = async () => {
    try {
        const response = await api.get('/destinations');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        throw error;
    }
};

export const getTrendingDestinations = async () => {
    try {
        const response = await api.get('/destinations/trending');
        return response.data;
    } catch (error) {
        console.error("Error fetching trending destinations:", error);
        throw error;
    }
};

export const getTropicalDestinations = async () => {
    try {
        const response = await api.get('/destinations/tropical');
        return response.data;
    } catch (error) {
        console.error("Error fetching tropical destinations:", error);
        throw error;
    }
};

export const getHistoryDestinations = async () => {
    try {
        const response = await api.get('/destinations/history');
        return response.data;
    } catch (error) {
        console.error("Error fetching history destinations:", error);
        throw error;
    }
};

export const getDestinationAdvertisements = async () => {
    try {
        const response = await api.get('/destinations/advertisements');
        return response.data;
    } catch (error) {
        console.error("Error fetching destination advertisements:", error);
        throw error;
    }
};

export const getDestinationDetails = async (destinationId: string) => {
    try {
        const response = await api.get(`/destinations/details/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination details:", error);
        throw error;
    }
};

export const getDestinationActivities = async (destinationId: string) => {
    try {
        const response = await api.get(`/destinations/activities/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination activities:", error);
        throw error;
    }
};

export const getDestinationStays = async (destinationId: string) => {
    try {
        const response = await api.get(`/destinations/stays/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination stays:", error);
        throw error;
    }
};

export const getDestinationLocalInfo = async (destinationId: string) => {
    try {
        const response = await api.get(`/destinations/local-info/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination local info:", error);
        throw error;
    }
};

export const getDestinationPackages = async (destinationId: string) => {
    try {
        const response = await api.get(`/destinations/packages/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination packages:", error);
        throw error;
    }
};

export const getDestinationsPageSections = async () => {
    try {
        const response = await api.get('/destinations/page/sections');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching destinations page sections:", error);
        throw error;
    }
};

export const getDestinationDetailSections = async (destinationSlug: string) => {
    try {
        const response = await api.get(`/destinations/detail-sections/${destinationSlug}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching destination detail sections:", error);
        throw error;
    }
};
