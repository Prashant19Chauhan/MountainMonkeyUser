import { useQuery } from "@tanstack/react-query";
import { getPrivacyPageSections } from "../services/privacy.services";

export const usePrivacyPageSections = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['privacy-page-sections'],
    queryFn: getPrivacyPageSections,
    enabled,
  });
};
