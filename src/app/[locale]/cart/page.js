"use client";
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'react-toastify';
import { BASE_URL_IMAGE } from '@/utils/constants';
import { useCartStore } from '@/store/cartStore';
import { Trash2 } from 'lucide-react';


const page = () => {
    const t = useTranslations();
    const locale = useLocale()
    const router = useRouter();
    const [hasMounted, setHasMounted] = useState(false);


    const meals = useCartStore((state) => state.meals);

    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);

    const subTotal = () => useCartStore.getState().cartItemsSubTotal();
    const isCartEmpty = () => useCartStore.getState().isCartEmpty()

    const searchParams = useSearchParams();
    let shopId = searchParams.get('shopId')
    let branchId = searchParams.get('branchId')
    let tableId = searchParams.get('tableId')

    if (!shopId || !branchId) {
        shopId = localStorage.getItem("selectedShopID")
        branchId = localStorage.getItem("selectedBranchID")
    }


    const handleAddItem = (item) => { increaseQuantity(item) }
    const handleMinusItem = (item) => { decreaseQuantity(item) }



    const handleConfirmButtonClick = () => {
        if (isCartEmpty()) {
            toast.error("your card is empyt")
            return;
        }

        const confirmUrl = `/${locale}/clientDetails` + (tableId ? `?shopId=${shopId}&branchId=${branchId}&tableId=${tableId}` : `?shopId=${shopId}&branchId=${branchId}`)

        router.push(confirmUrl);
    }


    useEffect(() => setHasMounted(true), []);

    if (!hasMounted) return null;

    return (
        //  <button onClick={() => handleRemove(item.id)}>Remove</button>
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "100vh",
                width: '100%',
            }}>

            {/* header */}
            <Box
                sx={{
                    width: '93%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 12px 0px 12px',
                }}
            >
                <IconButton
                    onClick={() => router.push(
                        `/categories?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : '')
                    )}
                    sx={{ color: "white" }}>
                    <ArrowBackIosIcon sx={{ fontSize: "22px" }} />
                </IconButton>

                <IconButton color="inherit">
                    <span className='icon-menu' style={{ fontSize: "22px" }}></span>
                </IconButton>
            </Box>

            <Box sx={{ padding: 2 }}>
                <Box sx={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", textAlign: "center"
                }}>

                    <Typography variant="body1" sx={{ fontSize: "16px", display: "flex", letterSpacing: 1, color: "white" }}>
                        <ShoppingCartOutlinedIcon sx={{ color: "#797993", marginRight: "7px", fontSize: "24px" }} /> {t("yourCart")}
                    </Typography>
                    <Divider sx={{ width: "25%", height: "0.1px", backgroundColor: "#797993", margin: "5px 0px" }} />

                    <Typography variant="body2"
                        sx={{ fontSize: "14px", color: "gray", letterSpacing: 1 }}>
                        {meals.length} {t("items")}
                    </Typography>

                </Box>

                {!isCartEmpty ? (
                    <Typography>{t("yourCartIsEmpty")}</Typography>
                ) : (
                    meals?.map((item, index) => (
                        <>
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginY: 2,
                                    borderBottom: '0.5px solid #797993',
                                    paddingBottom: "5px",
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={BASE_URL_IMAGE + item.img}
                                        alt={item.name}
                                        style={{ width: '60px', height: '60px', borderRadius: "10px", marginRight: '10px' }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="h1"
                                            sx={{ fontSize: '13px', color: "white", fontWeight: '900', }}>
                                            {item.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '12px', color: "#797993", marginTop: '3px' }}>
                                            <span style={{ color: "#797993" }}>{t("size")} | </span>
                                            {item.selectedSize || t("noSizeSelecte")}
                                        </Typography>
                                        <Typography variant="body2" sx={{
                                            marginTop: '2px', fontSize: '12px',
                                            color: "#AAAAAA"
                                        }}>
                                            {item.selectedOptions && item.selectedOptions.length > 0
                                                ? item.selectedOptions.map(item => item.name).join(' , ')
                                                : t("noOptionsSelected")} ,
                                            {item.selectedExtra && item.selectedExtra.length > 0
                                                ? item.selectedExtra.map(item => item.name).join(' , ')
                                                : t("noOptionsSelected")}

                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                        <AddCircleOutlinedIcon
                                            onClick={() => handleAddItem(item)}
                                            sx={{ fontSize: "30px", color: "#44404D", cursor: "pointer" }} />

                                        <Typography sx={{
                                            fontSize: "12px", fontWeight: 900,
                                            padding: "0px 12px", color: "#44404D"
                                        }}>
                                            {item.quantity} </Typography>

                                        {item.quantity === 1 ? <Trash2 onClick={() => handleMinusItem(item)} size={12} className="text-red-500 cursor-pointer" style={{width:"15px", height:"15px",padding:'5px' ,cursor:"pointer", background:'red',borderRadius:"50%"}} />
                                            : <RemoveCircleOutlinedIcon
                                                onClick={() => handleMinusItem(item)}
                                                sx={{ fontSize: "30px", color: "#44404D", cursor: "pointer" }}
                                            />}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{
                                            marginTop: "5px",
                                            fontSize: '15px', fontWeight: "bold", color: 'white'
                                        }}>
                                            {item.itemBasePrice * item.quantity} <span style={{ fontSize: "9px", fontWeight: "400", color: '#575756' }}>EGP</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    ))
                )}
            </Box >


            {/* Footer */}
            <Box
                sx={{
                    position: "fixed", bottom: 0, backgroundColor: "#302E3B", height: "60px",
                    width: "calc(100vw - 40px)", padding: "20px", alignItems: "center",
                    boxShadow: 3, borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between",
                }}>
                <Box>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold", color: 'gray' }}>
                        {t("totalPrice")}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: "bold", color: 'white' }}>
                        {subTotal() ?? 0}
                        <span style={{ fontSize: "10px", color: '#575756' }}> EGP</span>
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ backgroundColor: "gray", mx: 1 }} />
                <Box sx={{ width: "46%" }}>
                    <Button
                        onClick={handleConfirmButtonClick}
                        sx={{
                            backgroundImage: 'linear-gradient(to right, #302E3B, #797993)',
                            color: "white",
                            textTransform: "capitalize",
                            fontSize: "12px",
                            float: "right",
                            borderRadius: "20px",
                            height: "32px",
                            width: '100%',

                            "&:hover": {
                                backgroundImage: 'linear-gradient(to right, #302E3B, #797993)',

                            }
                        }}
                    >
                        {t("confirm")} <span style={{ fontSize: "17px", marginLeft: "10px" }}>+</span>
                    </Button>
                </Box>
            </Box>
        </Box >
    )
}
export default page; 