import axios from "axios";

// Determine the base URL dynamically
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/mm/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getDestinations = async () => {
    try {
        const response = await api.get('/user/destinations');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        throw error;
    }
};

export const getTrendingDestinations = async () => {
    try {
        const response = await api.get('/user/destinations/trending');
        return response.data;
    } catch (error) {
        console.error("Error fetching trending destinations:", error);
        throw error;
    }
};

export const getTropicalDestinations = async () => {
    try {
        const response = await api.get('/user/destinations/tropical');
        return response.data;
    } catch (error) {
        console.error("Error fetching tropical destinations:", error);
        throw error;
    }
};

export const getHistoryDestinations = async () => {
    try {
        const response = await api.get('/user/destinations/history');
        return response.data;
    } catch (error) {
        console.error("Error fetching history destinations:", error);
        throw error;
    }
};

export const getDestinationAdvertisements = async () => {
    try {
        const response = await api.get('/user/destinations/advertisements');
        return response.data;
    } catch (error) {
        console.error("Error fetching destination advertisements:", error);
        throw error;
    }
};

export const getDestinationDetails = async (destinationId: string) => {
    try {
        const response = await api.get(`/user/destinations/details/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination details:", error);
        throw error;
    }
};

export const getDestinationActivities = async (destinationId: string) => {
    try {
        const response = await api.get(`/user/destinations/activities/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination activities:", error);
        throw error;
    }
};

export const getDestinationStays = async (destinationId: string) => {
    try {
        const response = await api.get(`/user/destinations/stays/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination stays:", error);
        throw error;
    }
};

export const getDestinationLocalInfo = async (destinationId: string) => {
    try {
        const response = await api.get(`/user/destinations/local-info/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination local info:", error);
        throw error;
    }
};

export const getDestinationPackages = async (destinationId: string) => {
    try {
        const response = await api.get(`/user/destinations/packages/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination packages:", error);
        throw error;
    }
};

