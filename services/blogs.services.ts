import api from "@/lib/api";

export const getBlogsUserApi = async (page = 1, limit = 10, search = "", category = "") => {
  try {
    const response = await api.get(`/blogs/?page=${page}&limit=${limit}&search=${search}&category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogDetailUserApi = async (slug: string) => {
  try {
    const response = await api.get(`/blogs/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching blog details for slug ${slug}:`, error);
    throw error;
  }
};
