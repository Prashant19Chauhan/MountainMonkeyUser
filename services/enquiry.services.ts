import { AxiosError } from "axios";
import api from "@/lib/api";

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: "stay" | "package" | "activity" | "destination";
  itemId: string;
  itemTitle: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: number;
  roomType?: string;
  message: string;
  status: "Pending" | "Reviewed" | "Completed";
  createdAt: string;
}

export interface EnquiryListResponse {
  data: Enquiry[];
  meta: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface SubmitEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  enquiryType: "stay" | "package" | "activity" | "destination";
  itemId: string;
  itemTitle: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: number;
  roomType?: string;
  message: string;
}

export const submitEnquiry = async (payload: SubmitEnquiryPayload): Promise<Enquiry> => {
  try {
    const response = await api.post("/enquiry", payload);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to submit enquiry");
    }
    throw new Error("Failed to submit enquiry");
  }
};

export const fetchMyEnquiries = async (page = 1, limit = 10): Promise<EnquiryListResponse> => {
  try {
    const response = await api.get(`/enquiry/my-enquiries?page=${page}&limit=${limit}`);
    return { data: response.data.data, meta: response.data.meta };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch enquiries");
    }
    throw new Error("Failed to fetch enquiries");
  }
};
