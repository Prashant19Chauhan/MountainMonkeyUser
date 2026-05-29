import api from "@/lib/api";

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  enquiryType: 'stay' | 'package' | 'activity' | 'destination';
  itemId: string;
  itemTitle: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: number;
  roomType?: string;
  message: string;
}

export const submitEnquiry = async (payload: EnquiryPayload) => {
    try {
        const response = await api.post('/enquiry', payload);
        return response.data;
    } catch (error) {
        console.error("Error submitting enquiry:", error);
        throw error;
    }
};
