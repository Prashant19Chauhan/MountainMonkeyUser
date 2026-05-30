import api from "@/lib/api";

export const getAllPackages = async () => {
    try {
        const response = await api.get('/packages');
        return response.data;
    } catch (error) {
        console.error("Error fetching all packages:", error);
        throw error;
    }
};

export const getFeaturedPackages = async () => {
    try {
        const response = await api.get('/packages/featured');
        return response.data;
    } catch (error) {
        console.error("Error fetching featured packages:", error);
        throw error;
    }
};

export const getTropicalPackages = async () => {
    try {
        const response = await api.get('/packages/tropical');
        return response.data;
    } catch (error) {
        console.error("Error fetching tropical packages:", error);
        throw error;
    }
};

export const getPopularPackages = async () => {
    try {
        const response = await api.get('/packages/popular');
        return response.data;
    } catch (error) {
        console.error("Error fetching popular packages:", error);
        throw error;
    }
};

export const getPackageAdvertisements = async () => {
    try {
        const response = await api.get('/packages/advertisements');
        return response.data;
    } catch (error) {
        console.error("Error fetching package advertisements:", error);
        throw error;
    }
};

export const getPackagesDetails = async (packageId: string) => {
    try {
        const response = await api.get(`/packages/details/${packageId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching packages details:", error);
        throw error;
    }
};


export const getPackageLocalInfo = async (packageId: string, destinationId: string) => {
    try {
        const response = await api.get(`/packages/details/${packageId}/destination-local-info/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching package local info:", error);
        throw error;
    }
};

export const getSimilarPackages = async (packageId: string, destinationId: string, category?: Array<string>) => {
    try {
        const response = await api.get(`/packages/details/${packageId}/similar-packages?destinationId=${destinationId}&category=${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching similar packages:", error);
        throw error;
    }
};

export const getPackagesPageSections = async () => {
    try {
        const response = await api.get('/packages/page/sections');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching packages page sections:", error);
        throw error;
    }
};

export const getPackageDetailSections = async (packageSlug: string) => {
    try {
        const response = await api.get(`/packages/detail-sections/${packageSlug}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching package detail sections:", error);
        throw error;
    }
};
