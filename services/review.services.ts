import { AxiosError } from "axios";
import api from "@/lib/api";

export interface Review {
  _id: string;
  itemId: string;
  itemType: "package" | "destination" | "activity" | "stay";
  itemTitle: string;
  rating: number;
  reviewText: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface CreateReviewPayload {
  itemId?: string;
  itemType: "package" | "destination" | "activity" | "stay";
  itemTitle?: string;
  itemSlug?: string;
  rating: number;
  reviewText: string;
}

export const fetchMyReviews = async (): Promise<Review[]> => {
  try {
    const response = await api.get("/reviews/my-reviews");
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch reviews");
    }
    throw new Error("Failed to fetch reviews");
  }
};

export const submitReview = async (payload: CreateReviewPayload): Promise<Review> => {
  try {
    const response = await api.post("/reviews", payload);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to submit review");
    }
    throw new Error("Failed to submit review");
  }
};

export const deleteReview = async (id: string): Promise<void> => {
  try {
    await api.delete(`/reviews/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to delete review");
    }
    throw new Error("Failed to delete review");
  }
};
