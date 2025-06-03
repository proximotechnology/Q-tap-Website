import { getSpecialOffers } from "@/api/getSpecialOffers";

import { useQuery } from "@tanstack/react-query";


export function useSpecialOffers(branchId) {
    return useQuery({
        queryKey: ['restaurant-offers-data', branchId], // Include branchId in query key
        queryFn: () => getSpecialOffers(branchId),
        enabled: !!branchId, // // only fetch if branchId exists
        staleTime: 1000 * 60 * 15, // 15 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });
}
