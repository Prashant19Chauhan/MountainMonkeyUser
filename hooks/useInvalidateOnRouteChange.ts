"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook that invalidates all react-query queries whenever the pathname changes.
 * Works with Next.js App Router (no need for next/router events).
 */
export const useInvalidateOnRouteChange = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate all queries on navigation change.
    queryClient.invalidateQueries();
  }, [pathname, queryClient]);
};
