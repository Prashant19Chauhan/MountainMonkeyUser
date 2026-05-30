import { AxiosError } from "axios";
import api from "@/lib/api";

export interface TravelerStory {
  _id: string;
  title: string;
  shortDescription: string;
  content: string;
  tripExperience: string;
  storyAboutTrip: string;
  coverImage: string;
  images: string[];
  location: string;
  destination: string;
  tripDate?: string;
  tripDuration: string;
  tags: string[];
  rating: number;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  slug?: string;
  metaData?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  createdAt: string;
  updatedAt: string;
  author?: {
    _id: string;
    name: string;
  };
}

export interface CreateStoryPayload {
  title: string;
  shortDescription?: string;
  content: string;
  tripExperience?: string;
  storyAboutTrip?: string;
  coverImage?: string;
  images?: string[];
  location?: string;
  destination?: string;
  tripDate?: string;
  tripDuration?: string;
  tags?: string[];
  rating?: number;
}

export const fetchMyStories = async (): Promise<TravelerStory[]> => {
  try {
    const response = await api.get("/traveler-story/my-stories");
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch stories");
    }
    throw new Error("Failed to fetch stories");
  }
};

export const createStory = async (payload: CreateStoryPayload): Promise<TravelerStory> => {
  try {
    const response = await api.post("/traveler-story", payload);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to create story");
    }
    throw new Error("Failed to create story");
  }
};

export const updateStory = async (id: string, payload: Partial<CreateStoryPayload>): Promise<TravelerStory> => {
  try {
    const response = await api.put(`/traveler-story/${id}`, payload);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to update story");
    }
    throw new Error("Failed to update story");
  }
};

export const deleteStory = async (id: string): Promise<void> => {
  try {
    await api.delete(`/traveler-story/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to delete story");
    }
    throw new Error("Failed to delete story");
  }
};

export const fetchApprovedStoriesPublic = async (): Promise<TravelerStory[]> => {
  try {
    const response = await api.get("/traveler-story/public");
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch stories");
    }
    throw new Error("Failed to fetch stories");
  }
};

export const fetchApprovedStoryByIdPublic = async (id: string): Promise<TravelerStory> => {
  try {
    const response = await api.get(`/traveler-story/public/${id}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch story");
    }
    throw new Error("Failed to fetch story");
  }
};
