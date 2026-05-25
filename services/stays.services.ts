import axios from "axios";

// Determine the base URL dynamically
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/mm/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllStays = async () => {
    try {
        const response = await api.get('/user/stays');
        return response.data;
    } catch (error) {
        console.error("Error fetching stays:", error);
        throw error;
    }
};

export const getStayAdvertisements = async () => {
    try {
        const response = await api.get('/user/stays/advertisements');
        return response.data;
    } catch (error) {
        console.error("Error fetching stay advertisements:", error);
        throw error;
    }
};

export const getStayLocalInfo = async ({destinationId}: {destinationId: string}) => {
    try {
        const response = await api.get(`/user/stays/local-info/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stay local info:", error);
        throw error;
    }
};

export const getStayDetails = async ({stayId}: {stayId: string}) => {
    try {
        const response = await api.get(`/user/stays/details/${stayId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stay details:", error);
        throw error;
    }
};


