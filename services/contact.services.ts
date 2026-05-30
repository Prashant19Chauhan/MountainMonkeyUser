import api from "@/lib/api";

export const submitContactMessageApi = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  try {
    const response = await api.post('/contact/submit', data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact message:", error);
    throw error;
  }
};
