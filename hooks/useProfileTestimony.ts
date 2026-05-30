import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api";
import { AxiosError } from "axios";

export interface UserTestimonial {
  _id: string;
  message: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  isFeatured: boolean;
  createdAt: string;
}

const fetchMyTestimonials = async (): Promise<UserTestimonial[]> => {
  try {
    const response = await api.get("/testimonial/my-testimonials");
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch testimonials");
    }
    throw new Error("Failed to fetch testimonials");
  }
};

const submitTestimonial = async (payload: { message: string; rating: number }): Promise<UserTestimonial> => {
  try {
    const response = await api.post("/testimonial", payload);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to submit testimonial");
    }
    throw new Error("Failed to submit testimonial");
  }
};

const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    await api.delete(`/testimonial/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to delete testimonial");
    }
    throw new Error("Failed to delete testimonial");
  }
};

export const useMyTestimonials = () => {
  return useQuery({
    queryKey: ["myTestimonials"],
    queryFn: fetchMyTestimonials,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSubmitTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { message: string; rating: number }) => submitTestimonial(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTestimonials"] });
      toast.success("Testimonial submitted for review!");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to submit testimonial");
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTestimonials"] });
      toast.success("Testimonial deleted");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to delete testimonial");
    },
  });
};
