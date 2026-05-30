import { useQuery } from "@tanstack/react-query";
import { fetchMyEnquiries } from "@/services/enquiry.services";

export const useMyEnquiries = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["myEnquiries", page, limit],
    queryFn: () => fetchMyEnquiries(page, limit),
    staleTime: 1000 * 60 * 2,
  });
};
