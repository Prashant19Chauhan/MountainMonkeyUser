import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchMyStories, createStory, updateStory, deleteStory, CreateStoryPayload } from "@/services/story.services";

export const useMyStories = () => {
  return useQuery({
    queryKey: ["myStories"],
    queryFn: fetchMyStories,
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStoryPayload) => createStory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
      toast.success("Story submitted for review!");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to submit story");
    },
  });
};

export const useUpdateStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateStoryPayload> }) =>
      updateStory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
      toast.success("Story updated successfully!");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to update story");
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
      toast.success("Story deleted successfully");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to delete story");
    },
  });
};
