import { AxiosError } from "axios";
import api from "@/lib/api";

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  language: string;
  countriesVisited: string[];
  dreamDestination: string[];
  travelTypes: string[];
  frequency: string;
  adventureLevel: number;
  isProfileCompleted: boolean;
  isVerified: boolean;
  role: string;
  mood: string;
  createdAt: string;
}

export interface ProfileUpdatePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
  address?: string;
  language?: string;
  countriesVisited?: string[];
  dreamDestination?: string[];
  travelTypes?: string[];
  frequency?: string;
  adventureLevel?: number;
  mood?: string;
}

export const fetchProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get("/profile");
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
    throw new Error("Failed to fetch profile");
  }
};

export const updateProfile = async (payload: ProfileUpdatePayload): Promise<void> => {
  try {
    await api.post("/profile", payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
    throw new Error("Failed to update profile");
  }
};
