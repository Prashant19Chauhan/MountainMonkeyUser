import { useQuery } from "@tanstack/react-query";
import { fetchApprovedStoriesPublic, fetchApprovedStoryByIdPublic } from "@/services/story.services";

export const useApprovedStories = () => {
  return useQuery({
    queryKey: ["public-traveler-stories"],
    queryFn: fetchApprovedStoriesPublic
  });
};

export const useApprovedStory = (id: string) => {
  return useQuery({
    queryKey: ["public-traveler-story", id],
    queryFn: () => fetchApprovedStoryByIdPublic(id),
    enabled: !!id
  });
};
