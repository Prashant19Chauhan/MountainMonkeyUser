import api from "@/lib/api";

export interface SearchJourneysParams {
  sourceCityId: string;
  destinationCityId: string;
  travelDate: string;
  passengers: number;
  preferences?: {
    sortBy: "CHEAPEST" | "FASTEST" | "RECOMMENDED";
    maxTransfers: number;
  };
}

export const searchJourneysApi = async (params: SearchJourneysParams) => {
  try {
    const response = await api.post("/journeys/search", params);
    return response.data?.data?.journeys || [];
  } catch (error) {
    console.error("Error searching journeys:", error);
    throw error;
  }
};

export const getHubsApi = async () => {
  try {
    const response = await api.get("/journeys/hubs");
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching hubs:", error);
    throw error;
  }
};

export const getRouteDetailApi = async (id: string) => {
  try {
    const response = await api.get(`/journeys/route/${id}`);
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching route detail:", error);
    throw error;
  }
};
