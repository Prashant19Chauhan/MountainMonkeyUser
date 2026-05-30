import api from "../lib/api";

export interface VisualElement {
  type: string;
  className?: string;
  style?: React.CSSProperties | Record<string, string | number>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  viewBox?: string;
  paths?: string[];
  props?: Record<string, unknown>;
  children?: VisualElement[];
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

export const getPageMetaData = async (pageId: string): Promise<any> => {
  try {
    const response = await api.get(`/theme-meta-data/page/${pageId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching meta data for page ${pageId}:`, error);
    return null;
  }
};
