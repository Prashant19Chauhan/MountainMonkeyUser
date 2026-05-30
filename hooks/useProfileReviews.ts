import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchMyReviews, submitReview, deleteReview, CreateReviewPayload } from "@/services/review.services";

export const useMyReviews = () => {
  return useQuery({
    queryKey: ["myReviews"],
    queryFn: fetchMyReviews,
    staleTime: 1000 * 60 * 2,
  });
};

export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => submitReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      toast.success("Review submitted for approval!");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to submit review");
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      toast.success("Review deleted");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to delete review");
    },
  });
};
