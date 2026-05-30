import { useQuery } from "@tanstack/react-query";
import { getApprovedTestimonials } from "../services/testimonials.services";

export const useApprovedTestimonials = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['approved-testimonials'],
    queryFn: getApprovedTestimonials,
    enabled,
  });
};
