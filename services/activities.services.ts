import api from "@/lib/api";

export const getAllActivities = async () => {
    try {
        const response = await api.get('/activities/all');
        return response.data;
    } catch (error) {
        console.error("Error fetching all activities:", error);
        throw error;
    }
};

export const getFeaturedActivities = async () => {
    try {
        const response = await api.get('/activities/featured');
        return response.data;
    } catch (error) {
        console.error("Error fetching featured activities:", error);
        throw error;
    }
};

export const getPopularActivities = async () => {
    try {
        const response = await api.get('/activities/popular');
        return response.data;
    } catch (error) {
        console.error("Error fetching popular activities:", error);
        throw error;
    }
};

export const getExploreActivities = async () => {
    try {
        const response = await api.get('/activities/explore');
        return response.data;
    } catch (error) {
        console.error("Error fetching explore activities:", error);
        throw error;
    }
};

export const getActivityAdvertisements = async () => {
    try {
        const response = await api.get('/activities/advertisements');
        return response.data;
    } catch (error) {
        console.error("Error fetching activity advertisements:", error);
        throw error;
    }
};

export const getActivityDetails = async (activityId: string) => {
    try {
        const response = await api.get(`/activities/${activityId}/details`);
        return response.data;
    } catch (error) {
        console.error("Error fetching activity details:", error);
        throw error;
    }
};

export const getActivityLocalInfo = async ({destinationId}: {destinationId: string}) => {
    try {
        const response = await api.get(`/activities/${destinationId}/local-info`);
        return response.data;
    } catch (error) {
        console.error("Error fetching activity local info:", error);
        throw error;
    }
};

export const getActivitiesPageSections = async () => {
    try {
        const response = await api.get('/activities/page/sections');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching activities page sections:", error);
        throw error;
    }
};

export const getActivityDetailSections = async (activitySlug: string) => {
    try {
        const response = await api.get(`/activities/detail-sections/${activitySlug}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching activity detail sections:", error);
        throw error;
    }
};