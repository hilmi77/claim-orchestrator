import { useQuery } from "@tanstack/react-query";
import { fetchClaim } from "../api/claim.api";

export function useClaim() {
  return useQuery({
    queryKey: ["claim"],
    queryFn: fetchClaim,
    staleTime: Infinity, // Mock data hiç stale olmaz
    retry: 1,
  });
}
