import { useQuery } from "@tanstack/react-query";
import { fetchShopsData } from "@/api/getShops";

export function useShops() {
  return useQuery({
    queryKey: ['shops'],
    queryFn: fetchShopsData,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}