import api from "@/lib/api";

export const getAboutPageSections = async () => {
  try {
    const response = await api.get('/about/page/sections');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching about page sections:", error);
    throw error;
  }
};
