import api from "@/lib/api";
export const getFeaturedPackages = async () => {
    try {
        const response = await api.get('/user/packages/featured');
        return response.data;
    } catch (error) {
        console.error("Error fetching featured packages:", error);
        throw error;
    }
};

export const getTropicalPackages = async () => {
    try {
        const response = await api.get('/user/packages/tropical');
        return response.data;
    } catch (error) {
        console.error("Error fetching tropical packages:", error);
        throw error;
    }
};

export const getPopularPackages = async () => {
    try {
        const response = await api.get('/user/packages/popular');
        return response.data;
    } catch (error) {
        console.error("Error fetching popular packages:", error);
        throw error;
    }
};

export const getPackageAdvertisements = async () => {
    try {
        const response = await api.get('/user/packages/advertisements');
        return response.data;
    } catch (error) {
        console.error("Error fetching package advertisements:", error);
        throw error;
    }
};

export const getPackagesDetails = async (packageId: string) => {
    try {
        const response = await api.get(`/user/packages/details/${packageId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching packages details:", error);
        throw error;
    }
};


export const getPackageLocalInfo = async (packageId: string, destinationId: string) => {
    try {
        const response = await api.get(`/user/packages/details/${packageId}/destination-local-info/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching package local info:", error);
        throw error;
    }
};

export const getSimilarPackages = async (packageId: string, destinationId: string, category?: Array<string>) => {
    try {
        const response = await api.get(`/user/packages/details/${packageId}/similar-packages?destinationId=${destinationId}&category=${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching similar packages:", error);
        throw error;
    }
};
