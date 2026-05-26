import api from "@/lib/api";
export const getAllStays = async () => {
    try {
        const response = await api.get('/stays');
        return response.data;
    } catch (error) {
        console.error("Error fetching stays:", error);
        throw error;
    }
};

export const getStayAdvertisements = async () => {
    try {
        const response = await api.get('/stays/advertisements');
        return response.data;
    } catch (error) {
        console.error("Error fetching stay advertisements:", error);
        throw error;
    }
};

export const getStayLocalInfo = async ({destinationId}: {destinationId: string}) => {
    try {
        const response = await api.get(`/stays/local-info/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stay local info:", error);
        throw error;
    }
};

export const getStayDetails = async ({stayId}: {stayId: string}) => {
    try {
        const response = await api.get(`/stays/details/${stayId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stay details:", error);
        throw error;
    }
};


