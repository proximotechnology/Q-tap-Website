"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Header } from './Header';
import Link from 'next/link';
import { getCartItems } from "../ProductDetails/cartUtils";
import { useTranslations } from 'use-intl';

const page = () => {
    const t = useTranslations()
    // ============================================================================
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCartItems = getCartItems();
        setCartItems(storedCartItems);
    }, []);
    // console.log(Array.isArray(cartItems)); // يجب أن تظهر true
    // console.log(cartItems);
    // ============================================================================
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        const storedSizes = JSON.parse(localStorage.getItem('selectedSize')) || {};
        setSelectedSize(storedSizes || "No size selected");
    }, []);


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
        const storedItemCount = JSON.parse(localStorage.getItem('itemCount')) || [];
        setItemCount(storedItemCount);
    }, []);

    // ===============================================================================

    const getItemCount = (itemId) => {
        const item = itemCount.find(item => item.id === itemId);
        return item ? item.count : 0;
    };
    // ===============================================================================

    const [formData, setFormData] = useState(null);
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    const renderIcon = () => {
        if (!formData) return null;

        switch (formData.selectedOption) {
            case 'dinein':
                return <span className='icon-table' style={{ fontSize: '20px', color: "#F78822" }}></span>;

            case 'takeaway':
                return <span className='icon-takeaway' style={{ fontSize: '20px', color: "#F78822" }}></span>;

            case 'delivery':
                return <span className="icon-scooter" style={{ fontSize: '20px', color: "#F78822" }}></span>;

            default:
                return <p>No icon available</p>;
        }
    };
    // ===============================================================================
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getTotalPriceFromLocalStorage = () => {
            const storedPrice = localStorage.getItem('totalPrice');
            return storedPrice ? parseFloat(storedPrice) : 0;
        };

        setTotalPrice(getTotalPriceFromLocalStorage());
    }, []);
    // ===============================================================================

    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "auto",
                width: '100%',
            }}>

            <Header />

            <Box
                sx={{
                    overflowY: 'auto',
                    height: 'auto',
                    position: "relative", top: "22vh",
                    backgroundColor: '#1E1E2A',
                }}
            >
                <Box display="flex" flexDirection="column" sx={{ padding: "30px" }}>
                    <Typography variant="body1" sx={{ fontSize: "12px", display: "flex", letterSpacing: 1 }}>
                        {t("items")}
                    </Typography>
                    {cartItems && cartItems.map((item, index) => (
                        <>
                            <Box
                                key={index}
                                display={"flex"} justifyContent={"space-between"}>
                                <Box sx={{ paddingLeft: "10px", marginTop: "15px" }}>
                                    <Typography
                                        variant="h1"
                                        sx={{ fontSize: '13px', fontWeight: '900', color: '#AAAAAA' }}>
                                        {item.name}
                                    </Typography>

                                    <Typography variant="body2" sx={{ marginTop: '3px', fontSize: '12px', color: "#575756" }}>
                                        {/* <span style={{ color: "#ef7d00" }}>Options | </span> */}
                                        {selectedItemOptions[item.id] && selectedItemOptions[item.id].length > 0
                                            ? selectedItemOptions[item.id].map(option => option.name).join(', ')
                                            : t("noOptionsSelected")} ,

                                        {selectedItemExtra[item.id] && selectedItemExtra[item.id].length > 0
                                            ? selectedItemExtra[item.id].map(extra => extra.name).join(', ')
                                            : t("noExtraSelected")}
                                    </Typography>

                                </Box>
                                <Box>
                                    <Box display={"flex"} textAlign={"center"} justifyContent={"center"} alignItems={"center"}  >
                                        <Button
                                            sx={{
                                                height: "20px",
                                                width: "20px",
                                                minWidth: "20px",
                                                borderRadius: "50%",
                                                backgroundColor: "#44404D",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "#44404D"
                                                },
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "10px", }}>{t(selectedSize[item.id]) || t("noSizeSelecte")} </Typography>
                                        </Button>
                                        <Typography style={{ fontSize: "12px", color: "#575756", marginLeft: "10px" }}>
                                            <span style={{ color: "#AAAAAA" }}>x</span>
                                            {getItemCount(item.id) || 0}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{
                                        marginTop: "5px", fontSize: '13px',
                                        fontWeight: "bold", color: 'white'
                                    }}>
                                        {item.price} <span style={{ fontSize: "8px", fontWeight: "400", color: '#575756' }}>EGP</span>
                                    </Typography>
                                </Box>

                            </Box>
                            <Divider sx={{ margin: "10px 0px", backgroundColor: "#44404D" }} />
                        </>
                    ))}
                    {formData ? (
                        <>
                            <Box>
                                <Box>
                                    <Typography color="white" fontSize="12px"  >{t("dineMethod")}</Typography>
                                    <Typography color="#AAAAAA" fontSize="12px" margin={"5px 10px"} display={"flex"}>
                                        {formData.selectedOption} ,

                                        {renderIcon()}
                                    </Typography>
                                </Box>
                                <Typography color="#AAAAAA" fontSize="12px" >
                                    <span style={{ color: "#797993", marginLeft: "10px" }}>{t("address")} : </span>
                                    {formData.address}</Typography>

                                <Typography color="#AAAAAA" fontSize="12px" >
                                    <span style={{ color: "#797993", marginLeft: "10px" }}>{t("name")} : </span>
                                    {formData.selectedName}</Typography>

                                <Typography color="#AAAAAA" fontSize="12px" >
                                    <span style={{ color: "#797993", marginLeft: "10px" }}>{t("mobileNumber")} : </span>
                                    {formData.phone} </Typography>

                                <Button sx={{
                                    backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                    borderRadius: "5px", display: "flex",
                                    justifyContent: "center", padding: "4px 20px", float: "right",
                                    alignItems: "center", color: "white", textTransform: "capitalize", fontSize: "12px",
                                    "&:hover": {
                                        backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                    }
                                }}>
                                    <span class="icon-map-1" style={{ fontSize: "15px", marginRight: "5px" }}>
                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
                                    {t("location")}
                                </Button>
                            </Box>
                            <Divider sx={{ margin: "10px 0px", backgroundColor: "#44404D" }} />

                            <Box>
                                <Box display={"flex"} textAlign={"center"} alignItems={"center"} justifyContent={"space-between"} >
                                    <Typography color="white" fontSize="12px"  >{t("paymentMethod")}</Typography>
                                    <Typography>
                                        <span style={{ color: "#AAAAAA", fontSize: "11px", borderBottom: "1px solid #AAAAAA" }}>
                                            {t("change")}</span>
                                    </Typography>
                                </Box>
                                <Typography color="#AAAAAA" fontSize="12px" margin={"5px 10px"} display={"flex"} alignItems={"center"}>
                                    <span class="icon-wallet" style={{ fontSize: "20px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                    {t(formData.selectedValue)}
                                </Typography>
                            </Box>

                            <Divider sx={{ margin: "10px 0px", backgroundColor: "#44404D" }} />

                            <Box>
                                <Typography color="white" fontSize="12px" >{t("comments")}</Typography>
                                <Typography color="#AAAAAA" fontSize="12px"
                                    margin={"5px 10px"} display={"flex"} alignItems={"center"}>
                                    - {formData.comment}
                                </Typography>
                            </Box>

                            <Divider sx={{ margin: "10px 0px", backgroundColor: "#44404D" }} />

                            <Box display={"flex"} justifyContent={"space-between"} marginBottom={"80px"}>
                                <Box sx={{ width: "100%" }}>
                                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#575756' }}>
                                        {t("subTotal")}:
                                        <span style={{ color: '#AAAAAA' }}>0:00 EGP</span>
                                    </Typography>

                                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#575756' }}>
                                        {t("tax")}: <span style={{ color: '#AAAAAA' }}>0:00 EGP</span>
                                    </Typography>

                                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#575756' }}>
                                        {t("disCount")}: <span style={{ color: '#AAAAAA' }}>0:00 EGP</span>
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "100%", textAlign: "left", marginLeft: "70px" }}>
                                    <Typography variant="h6" sx={{
                                        fontSize: '10px', fontWeight: "bold",
                                        color: '#575756'
                                    }}>
                                        {t("totalPrice")}
                                    </Typography>

                                    <Typography variant="h6" sx={{ fontSize: '19px', fontWeight: "bold", color: 'white' }}>

                                        {totalPrice} <span style={{ fontSize: "10px", fontWeight: "400", color: '#575756' }}>EGP</span>
                                    </Typography>
                                </Box>

                            </Box>

                        </>
                    ) : (
                        <Box sx={{
                            color: 'white',
                            backgroundColor: '#1E1E2A', height: "100vh",
                            width: '100%',
                        }}> <Typography>{t("noDataAvailable")}</Typography></Box>
                    )}
                </Box>

            </Box>


            {/* footer */}
            <Box
                sx={{
                    position: "fixed", bottom: 0, backgroundColor: "#302E3B",
                    height: "60px", width: "90%",
                    padding: "20px",
                    boxShadow: 3, borderRadius: "30px 30px 0px 0px",
                    display: "flex", justifyContent: "space-between", textAlign: "center", alignItems: "center"
                }}>

                <Box sx={{ display: "flex", alignItems: "center", width: "70%" }}>
                    <Typography variant="body2" sx={{ cursor: "pointer", color: "#AAAAAA", fontSize: "12px", fontWeight: "bold" }}>
                        <span class="icon-close" style={{ fontSize: "12px", marginRight: "5px" }}></span>
                        {t("cancel")}
                    </Typography>

                    <Typography variant="body2" sx={{
                        cursor: "pointer", marginLeft: "25px",
                        color: "#AAAAAA", fontSize: "12px", fontWeight: "bold"
                    }}>
                        <span class="icon-edit"
                            style={{ fontSize: "18px", color: "#009444", marginRight: "5px" }}></span>
                        {t("edit")}
                    </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ backgroundColor: "gray", mx: 1 }} />

                <Box width={"100%"} sx={{ display: "flex", alignItems: "center" }} >

                    <Link href='/orderPlaced' >
                        <Button
                            sx={{
                                width: "100%",
                                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                color: "white", textTransform: "capitalize", fontSize: "12px",
                                borderRadius: "20px", height: "30px", marginRight: "50px",
                                "&:hover": {
                                    backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                }
                            }}>
                            {t("confirm")} <img src="/assets/hands.svg" style={{ marginLeft: "5px" }} />
                        </Button>
                    </Link>
                    <span className="icon-printer1" style={{ fontSize: "22px", marginLeft: "10px", color: "#AAAAAA" }}></span>
                </Box>
            </Box>
        </Box>

    )
}

export default page;