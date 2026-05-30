import api from "@/lib/api";

export const getFaqPageSections = async () => {
  try {
    const response = await api.get('/faq/page/sections');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching FAQ sections:", error);
    throw error;
  }
};
