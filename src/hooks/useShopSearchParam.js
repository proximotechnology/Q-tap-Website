import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useQueryParamsRedirect(requiredParams = ['shopId', 'branchId'], redirectTo = '/shops') {
    const [error, setError] = useState(null)
    const searchParams = useSearchParams();

    const shopId = searchParams.get('shopId');
    const branchId = searchParams.get('branchId');
    const tableId = searchParams.get('tableId');

    useEffect(() => {
        if (!error) setError(null)

        const missing = requiredParams.some(param => !searchParams.get(param));
        if (missing) {
            setError("search param missing")
        }
    }, [searchParams, requiredParams, redirectTo]);

    return { shopId, branchId, tableId ,error };
}
