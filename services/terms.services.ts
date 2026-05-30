import api from "@/lib/api";

export const getTermsPageSections = async () => {
  try {
    const response = await api.get('/terms/page/sections');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching terms sections:", error);
    throw error;
  }
};
