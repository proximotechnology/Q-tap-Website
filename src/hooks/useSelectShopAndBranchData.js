import { useEffect, useState } from 'react';

export function useSelectShopAndBranchData(shops, shopId, branchId) {
  const [shopImg, setShopImg] = useState(null);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [error, setError] = useState(null); // 👈 Add error state

  useEffect(() => {
    if (!shops) {
      setError("no Shops");
      return;
    }

    const selectedShop = shops.find(shop => shop.id === Number(shopId));

    if (!selectedShop) {
      setError("Shop not found");
      return;
    }

    const selectedBranch = selectedShop?.brunchs?.find(branch => branch.id === Number(branchId));

    if (!selectedBranch) {
      setError("Branch not found");
      return;
    }

    // Clear error if all good
    setError(null);

    localStorage.setItem("selectedShopID", selectedShop.id.toString());
    localStorage.setItem("selectedBranchID", selectedBranch.id.toString());

    setShopImg(selectedShop.img);
    setCurrentBranch(selectedBranch);
  }, [shops, shopId, branchId]);

  return { shopImg, currentBranch, error };
}
