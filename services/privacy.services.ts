import api from "@/lib/api";

export const getPrivacyPageSections = async () => {
  try {
    const response = await api.get('/privacy/page/sections');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching privacy sections:", error);
    throw error;
  }
};
