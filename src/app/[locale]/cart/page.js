"use client";
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { getCartItems } from "../ProductDetails/cartUtils";
import { useRouter } from 'next/navigation';
import { useTranslations ,useLocale } from 'next-intl';

const page = () => {
    const t = useTranslations();
    const locale = useLocale()
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCartItems = getCartItems();
        setCartItems(storedCartItems);
    }, []);

    // const handleRemove = (itemId) => {
    //     const updatedCartItems = removeItemFromCart(itemId);
    //     setCartItems(updatedCartItems);
    // };

    // console.log(cartItems);
    // console.log(cartItems.map(item => item.image));

    // ===============================================================================
    
    // ===============================================================================

    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        const storedSizes = JSON.parse(localStorage.getItem('selectedSize')) || {};
        setSelectedSize(storedSizes || t("noSizeSelecte"));
    }, []);
    // ===============================================================================

    // ===============================================================================

    const [selectedItemOptions, setSelectedItemOptions] = useState({});
    const [selectedItemExtra, setSelectedItemExtra] = useState({});
    useEffect(() => {
        const storedOptions = JSON.parse(localStorage.getItem('selectedItemOptions')) || {};
        const storedExtra = JSON.parse(localStorage.getItem('selectedItemExtra')) || {};

        setSelectedItemOptions(storedOptions);
        setSelectedItemExtra(storedExtra);
    }, []);

    // ===============================================================================
    const [itemCount, setItemCount] = useState([]);
    useEffect(() => {
        try {
            const storedItemCount = JSON.parse(localStorage.getItem('itemCount')) || [];
            setItemCount(storedItemCount);
        } catch {
            setItemCount([]);
        }
    }, []);

    const getItemCount = (itemId) => {
        const item = itemCount.find(item => item.id === itemId);
        return item ? item.count : 1;
    };

    const handleAddItem = (itemId) => {
        setItemCount((prevItems) => {
            const existingItem = prevItems.find(item => item.id === itemId);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === itemId ? { ...item, count: item.count + 1 } : item
                );
            } else {
                return [...prevItems, { id: itemId, count: 1 }];
            }
        });
    };

    const handleMinusItem = (itemId) => {
        setItemCount((prevItems) => {
            const existingItem = prevItems.find(item => item.id === itemId);
            if (existingItem && existingItem.count > 1) {
                return prevItems.map(item =>
                    item.id === itemId ? { ...item, count: item.count - 1 } : item
                );
            } else {
                return prevItems.filter(item => item.id !== itemId);
            }
        });
    };
    // ===============================================================================
    const calculateTotalPrice = (cartItems, getItemCount) => {
        const total = cartItems.reduce((total, item) => {
            const itemCount = getItemCount(item.id) || 0;
            return total + item.price * itemCount;
        }, 0);
    
        if (typeof window !== 'undefined') {
            localStorage.setItem('totalPrice', total);
        }
    
        return total;
    };
    // للحساب ال total price , وتخزينه في local storage . 
    // ===============================================================================
    const router = useRouter();
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
                        onClick={() => router.back()}
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
                        {cartItems.length} {t("items")}
                    </Typography>

                </Box>

                {cartItems.length === 0 ? (
                    <Typography>{t("yourCartIsEmpty")}</Typography>
                ) : (
                    cartItems.map((item) => (
                        <>
                            <Box
                                key={item.id}
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
                                        src={item.image}
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
                                            {selectedSize[item.id] || t("noSizeSelecte")}
                                        </Typography>
                                        <Typography variant="body2" sx={{
                                            marginTop: '2px', fontSize: '12px',
                                            color: "#AAAAAA"
                                        }}>
                                            {selectedItemOptions[item.id] && selectedItemOptions[item.id].length > 0
                                                ? selectedItemOptions[item.id].map(option => option.name).join(' , ')
                                                : t("noOptionsSelected")} ,
                                            {selectedItemExtra[item.id] && selectedItemExtra[item.id].length > 0
                                                ? selectedItemExtra[item.id].map(extra => extra.name).join(' , ')
                                                : t("noOptionsSelected")}

                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                        <AddCircleOutlinedIcon
                                            onClick={() => handleAddItem(item.id)}
                                            sx={{ fontSize: "30px", color: "#44404D", cursor: "pointer" }} />

                                        <Typography sx={{
                                            fontSize: "12px", fontWeight: 900,
                                            padding: "0px 12px", color: "#44404D"
                                        }}>
                                            {getItemCount(item.id) || 0} </Typography>

                                        <RemoveCircleOutlinedIcon
                                            onClick={() => handleMinusItem(item.id)}
                                            sx={{ fontSize: "30px", color: "#44404D", cursor: "pointer" }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{
                                            marginTop: "5px",
                                            fontSize: '15px', fontWeight: "bold", color: 'white'
                                        }}>
                                            {item.price} <span style={{ fontSize: "9px", fontWeight: "400", color: '#575756' }}>EGP</span>
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
                    width: "90%", padding: "20px", alignItems: "center",
                    boxShadow: 3, borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between",
                }}>
                <Box>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold", color: 'gray' }}>
                        {t("totalPrice")}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: "bold", color: 'white' }}>
                        {calculateTotalPrice(cartItems, getItemCount)}
                        <span style={{ fontSize: "10px", color: '#575756' }}> EGP</span>
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ backgroundColor: "gray", mx: 1 }} />
                <Box sx={{ width: "46%" }}>
                    <Button
                        onClick={() => {
                            window.location.href = `/${locale}/clientDetails`;
                        }}
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