import api from "@/lib/api";

export const getActiveLocations = async () => {
  try {
    const response = await api.get('/locations/active');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching active locations:", error);
    throw error;
  }
};

export const getCitiesPageSections = async () => {
  try {
    const response = await api.get('/cities-page/page/sections');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities page sections:", error);
    throw error;
  }
};

export const getCityRelatedDetails = async (cityId: string) => {
  try {
    const response = await api.get(`/locations/${cityId}/related`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching city related details for ${cityId}:`, error);
    throw error;
  }
};
