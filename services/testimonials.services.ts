import api from "@/lib/api";

export interface Testimonial {
  _id: string;
  message: string;
  rating: number;
  isFeatured: boolean;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export const getApprovedTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await api.get('/testimonial/approved');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching approved testimonials:", error);
    throw error;
  }
};
