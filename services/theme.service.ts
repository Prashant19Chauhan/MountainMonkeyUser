import api from "../lib/api";

export interface VisualElement {
  type: string;
  className?: string;
  style?: any;
  animate?: any;
  transition?: any;
  viewBox?: string;
  paths?: string[];
  props?: any;
  children?: any[];
}

export interface Mood {
  name: string;
  label: string;
  bgColor: string;
  fgColor: string;
  visualElements?: VisualElement[];
}

export interface ThemeMetaDataResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    moods: Mood[];
    travelStyle: string[];
    theme: string[];
  };
}

export const getThemeMetaData = async (): Promise<ThemeMetaDataResponse> => {
  try {
    const response = await api.get("/theme-meta-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching theme metadata:", error);
    throw error;
  }
};
