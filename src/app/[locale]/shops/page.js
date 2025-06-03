"use client";
import React, { useEffect, useState } from 'react'
import './custom-css.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { BASE_URL_IMAGE } from '@/utils/constants';
import { useShops } from '@/hooks/useShops';



const ShopSelect = () => {
    // const [shops, setShops] = useState(null)
    const [selectedShop, setSelectedShop] = useState(null)
    // const [isLoading, setIsLoading] = useState(false)
    const t = useTranslations()

    const { data: shops,isError,isLoading } = useShops()
    const router = useRouter();

    const handleSelectShop = (shop) => {
        // Pass state through navigation
        // router.push(`/categories?shopId=${shop.id}`);
        setSelectedShop(shop)
    };

    const handleSelectBranch = (branchID) => {
        // Pass state through navigation

        router.push(`/categories?shopId=${selectedShop.id}&branchId=${branchID}`);

    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const indexOfLastShop = currentPage * itemsPerPage;
    const indexOfFirstShop = indexOfLastShop - itemsPerPage;

    const currentShops = shops?.slice(indexOfFirstShop, indexOfLastShop);

    const totalPages = shops ? Math.ceil(shops.length / itemsPerPage) : 1;

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

  

    const products = [{ name: "1", description: "1" }, { name: "1", description: "1" }, { name: "1", description: "1" }, { name: "1", description: "1" }, { name: "1", description: "1" }, { name: "1", description: "1" },]
    const colors = { bg_main: "bg-[#1E1E2A]", card_bg: 'bg-[#302E3B]', card_title: 'text-[#797993]' }
    if (isError) {
        return (
            <div>{isError}</div>
        )
    }
    return (
        <>
            <h1 className={`text-center text-white h-[100px] fixed m-0 w-full ${colors.bg_main} z-50 flex items-center justify-center`}>
                {selectedShop ? t("branchs") : t("shops")}
            </h1>
            <div className={`${colors.bg_main} min-h-[calc(100vh-1rem)] flex flex-col px-12 pb-4 justify-around`}>
                {selectedShop ?

                    (
                        <>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[100px]'>
                                {selectedShop?.brunchs?.map(branch => (
                                    <div
                                        key={branch?.id}
                                        className={`card ${colors.card_bg} rounded-lg p-2 flex flex-col justify-between h-[300px]`}
                                        onClick={() => handleSelectBranch(branch.id)}
                                    >
                                        <div className="relative w-full aspect-[1/2] overflow-hidden rounded-md">
                                            <img
                                                src={`${BASE_URL_IMAGE}${selectedShop?.img}`}
                                                alt={branch?.name}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <h2 className={`font-bold text-lg ${colors.card_title} line-clamp-1`}>
                                                {branch?.business_city}
                                            </h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => { setSelectedShop(null) }}>back</button>
                        </>
                    )
                    :
                    (

                        isLoading ?
                            <h1 className={`text-center text-white h-[100px]  m-0 w-full ${colors.bg_main} z-50 flex items-center justify-center`}>
                                loading
                            </h1>
                            : (
                                <div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[100px]'>
                                        {currentShops?.map(shop => (
                                            <div
                                                key={shop?.id}
                                                className={`card ${colors.card_bg} rounded-lg p-2 flex flex-col justify-between h-[300px]`}
                                                onClick={() => handleSelectShop(shop)}
                                            >
                                                <div className="relative w-full aspect-[1/2] overflow-hidden rounded-md">
                                                    <img
                                                        src={`${BASE_URL_IMAGE}${shop?.img}`}
                                                        alt={shop?.name}
                                                        className="absolute top-0 left-0 w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="mt-2">
                                                    <h2 className={`font-bold text-lg ${colors.card_title} line-clamp-1`}>
                                                        {shop?.name}
                                                    </h2>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="flex justify-center items-center mt-6 gap-4 w-full">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className={`px-4 py-2 ${colors.card_bg} text-white border rounded disabled:opacity-50`}
                                        >
                                            {"<"}
                                        </button>
                                        <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className={`px-4 py-2 ${colors.card_bg} text-white border rounded disabled:opacity-50`}
                                        >
                                            {">"}
                                        </button>
                                    </div>
                                </div>
                            )


                    )
                }

            </div>
        </>
    )
}

export default ShopSelect