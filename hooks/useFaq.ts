import { useQuery } from "@tanstack/react-query";
import { getFaqPageSections } from "../services/faq.services";

export const useFaqPageSections = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['faq-page-sections'],
    queryFn: getFaqPageSections,
    enabled,
  });
};
