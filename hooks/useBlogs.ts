import { useQuery } from "@tanstack/react-query";
import { getBlogsUserApi, getBlogDetailUserApi } from "../services/blogs.services";

export const useBlogsUser = (page = 1, limit = 10, search = "", category = "", enabled: boolean = true) => {
  return useQuery({
    queryKey: ['blogs-user', page, limit, search, category],
    queryFn: () => getBlogsUserApi(page, limit, search, category),
    enabled,
  });
};

export const useBlogDetailUser = (slug: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['blog-detail-user', slug],
    queryFn: () => getBlogDetailUserApi(slug),
    enabled: enabled && !!slug,
  });
};
