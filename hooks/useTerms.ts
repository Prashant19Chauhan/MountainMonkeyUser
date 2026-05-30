import { useQuery } from "@tanstack/react-query";
import { getTermsPageSections } from "../services/terms.services";

export const useTermsPageSections = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['terms-page-sections'],
    queryFn: getTermsPageSections,
    enabled,
  });
};
