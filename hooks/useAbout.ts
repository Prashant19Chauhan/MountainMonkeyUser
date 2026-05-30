import { useQuery } from "@tanstack/react-query";
import { getAboutPageSections } from "../services/about.services";

export const useAboutPageSections = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['about-page-sections'],
    queryFn: getAboutPageSections,
    enabled,
  });
};
