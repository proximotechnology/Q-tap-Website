"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Divider, Menu, MenuItem } from '@mui/material';
import { Header } from './Header';
import { Link } from "@/i18n/navigation"
import { getCartItems } from "../ProductDetails/cartUtils";
import { useTranslations } from 'use-intl';
import axios from 'axios';
import { calculateOrderPriceDetailed } from '@/utils/utils';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import MapView from '../clientDetails/map';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { BASE_URL } from '@/utils/constants';
import { useCartStore } from '@/store/cartStore';

const page = () => {
    const t = useTranslations()
    const router = useRouter();
    const pageRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => pageRef.current,
        contentRef: pageRef,
        documentTitle: 'MyPage',
        removeAfterPrint: true,
    });

    const handleDownloadPDF = (fileName) => {
        const element = pageRef.current;
        const opt = {
            margin: 0.5,
            filename: `${fileName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    const cartItems = useCartStore(state => state.meals);

    const subTotal = useCartStore.getState().cartItemsSubTotal()
    const tax = useCartStore.getState().cartItemsTax()
    const discount = useCartStore.getState().cartItemDiscountWithDiscountCode()
    const totalPrice = useCartStore.getState().cartItemTotalWithDiscountCode()

    // =====================================
    const [position, setPosition] = useState(null); // null || array with 2 number [ number , number]

    const [isMapOpen, setIsMapOpen] = useState(false);
    const handleLocationClick = () => {
        setIsMapOpen(!isMapOpen)
    }
    // ============================================================================
    const [selectedMethod, setSelectedMethod] = useState("cash");
    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const tableId = searchParams.get('tableId')
    // ============================================================================
    const makeOrder = async () => {
        try {
            setIsLoading(true) // disable the button untill the request finish
            /*  the request data contain 2 part 
                1 - fixed part meal , name , phone ,comments ,type , payment_way , branch_id , tax , total_price
                2 - dynamic part change depend on the type of order (dine in , takeaway , delivery)
            */
            let formdata = localStorage.getItem("formData")
            if (!formdata) {
                toast.error(t("somethingWentWrong"))
                return;
            }
            formdata = JSON.parse(formdata)
            let payWay = selectedMethod === 'cash' ? 'cash' : "wallet";
            let data = {
                name: formdata.selectedName,
                phone: formdata.phone,
                comments: formdata.comment ? formdata.comment : "-",
                type: 'takeaway',
                payment_way: payWay,
                brunch_id: branchId,// TODO:  order payment errror TypeError: Cannot read properties of undefined (reading 'branchId')
                "tax": tax, //may be nullable
                "total_price": totalPrice,
                meals: []
            }
            //// add meals data to the request 
            const sizeConvert = { 'L': 'l', 'M': 'm', 'S': 's' }
            cartItems.map((item) => {
                const itemData = {
                    meal_id: item.id,
                    quantity: item.quantity,
                    variants: (item.selectedOptions ?? []).map(item => item.id),
                    extras: (item.selectedExtras ?? []).map(item => item.id),
                    size: item.selectedSize ? sizeConvert[item.selectedSize] : 's',
                    discount_code: formdata?.code?.code,
                }

                data.meals = [...data.meals, itemData]
            })
            // dynamic part 
            if (formdata.servingWay === 'delivery') {
                data = {
                    ...data,
                    city: formdata.selectedCity,
                    address: formdata.address,
                    type: 'delivery',
                    latitude: position?.[0],
                    longitude: position?.[1]

                }
            }
            if (formdata.servingWay === 'dine_in') {
                data = {
                    ...data,
                    table_id: tableId,
                    type: 'dinein',
                }
            }
            console.log(JSON.stringify(data))
            const response = await axios.post(
                `${BASE_URL}add_orders`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
            );
            console.log("add_orders",response)
            if (response.data.status === "error") {
                throw new Error("make order api error")
            }
            localStorage.setItem('cartItems', '')
            localStorage.setItem('order', JSON.stringify(response.data.order))
            if (payWay === "wallet" && response.data.payment_url)
                localStorage.setItem('payment_url', JSON.stringify(response.data.payment_url))
            if (response) {
                handleDownloadPDF("order-summary" + response.data?.order?.id)
                router.push("/orderPlaced")
            }
        } catch (error) {
            // if (error?.response?.data?.errors?.table_id)
            console.log("add_orders",error)
            toast.error(t("somethingWentWrong"))
        }
        finally {
            setIsLoading(false)
        }
    };






    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);
    useEffect(() => {
        if (formData && formData.servingWay === 'delivery') {
            let pos = [
                formData?.userPosition?.[0],
                formData?.userPosition?.[1]
            ]
            
            setPosition(pos)
        }
        setSelectedMethod(formData?.paymentWay)

    }, [formData]);
    // ============================================================================
    const renderIcon = () => {
        if (!formData) return null;
        
        switch (formData.servingWay) {
            case 'dine_in':
                return <span className='icon-table' style={{ fontSize: '20px', color: "#F78822" }}></span>;

            case "take_away":
                return <span className='icon-takeaway' style={{ fontSize: '20px', color: "#F78822" }}></span>;

            case 'delivery':
                return <span className="icon-scooter" style={{ fontSize: '20px', color: "#F78822" }}></span>;

            default:
                return <p>No icon available</p>;
        }
    };
    // ===============================================================================

    const handleCancelPay = () => {
        // Preserve existing URL search params when navigating
        const params = window.location.search;
        router.push("/categories" + params);
        localStorage.removeItem("formData");
        sessionStorage.removeItem("editFormData");

    }

    const handleEditPay = () => {
        const params = window.location.search;
        const formData = localStorage.getItem("formData");
        // Pass formData via sessionStorage for the next page
        if (formData) {
            sessionStorage.setItem("editFormData", formData);
        }
        router.push('/clientDetails' + params);
    }
    // ===============================================================================

    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "auto",
                minHeight: '100vh',
                width: '100%',
            }}
            ref={pageRef}
        >
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
                                        {item.selectedOptions && item.selectedOptions.length > 0 ? item.selectedOptions.map(option => option.name).join(', ')
                                            : t("noOptionsSelected")} ,

                                        {item.selectedExtra && item.selectedExtra.length > 0 ? item.selectedExtra.map(extra => extra.name).join(', ')
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
                                            <Typography sx={{ fontSize: "10px", }}>{item.selectedSize || t("noSizeSelecte")} </Typography>
                                        </Button>
                                        <Typography style={{ fontSize: "12px", color: "#575756", marginLeft: "10px" }}>
                                            <span style={{ color: "#AAAAAA" }}>x</span>
                                            {item.quantity || 0}
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
                                        {formData.servingWay} ,

                                        {renderIcon()}
                                    </Typography>
                                </Box>
                                {
                                    formData?.servingWay !== "dine_in" && <Typography color="#AAAAAA" fontSize="12px" >
                                        <span style={{ color: "#797993", marginLeft: "10px" }}>{t("address")} : </span>
                                        {formData.address}
                                    </Typography>
                                }

                                <Typography color="#AAAAAA" fontSize="12px" >
                                    <span style={{ color: "#797993", marginLeft: "10px" }}>{t("name")} : </span>
                                    {formData.selectedName}</Typography>

                                <Typography color="#AAAAAA" fontSize="12px" >
                                    <span style={{ color: "#797993", marginLeft: "10px" }}>{t("mobileNumber")} : </span>
                                    {formData.phone} </Typography>

                                {formData.servingWay === 'delivery' ? <Button sx={{
                                    backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                    borderRadius: "5px", display: "flex",
                                    justifyContent: "center", padding: "4px 20px", float: "right",
                                    alignItems: "center", color: "white", textTransform: "capitalize", fontSize: "12px",
                                    "&:hover": {
                                        backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                    }
                                }} onClick={handleLocationClick}>
                                    <span class="icon-map-1" style={{ fontSize: "15px", marginRight: "5px" }}>
                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
                                    {t("location")}
                                </Button> : <></>}
                                {isMapOpen && <MapView currentPos={position ? [Number(position[0]), Number(position[1])] : null} setUserPosition={setPosition} />}
                            </Box>
                            <Divider sx={{ margin: "10px 0px", backgroundColor: "#44404D" }} />

                            <Box>
                                <Box display={"flex"} textAlign={"center"} alignItems={"center"} justifyContent={"space-between"} >
                                    <Typography color="white" fontSize="12px"  >{t("paymentMethod")}</Typography>
                                    {/* <Typography>
                                        <span style={{ color: "#AAAAAA", fontSize: "11px", borderBottom: "1px solid #AAAAAA" }}>
                                            {t("change")}</span>
                                    </Typography> */}
                                    <PaymentMethodSelector setSelectedMethod={setSelectedMethod} />
                                </Box>
                                <Typography color="#AAAAAA" fontSize="12px" margin={"5px 10px"} display={"flex"} alignItems={"center"}>
                                    <span class="icon-wallet" style={{ fontSize: "20px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                    {t(selectedMethod)}
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
                                        <span style={{ color: '#AAAAAA' }}>{subTotal} EGP</span>
                                    </Typography>

                                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#575756' }}>
                                        {t("tax")}: <span style={{ color: '#AAAAAA' }}>{tax} EGP</span>
                                    </Typography>

                                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#575756' }}>
                                        {t("disCount")}: <span style={{ color: '#AAAAAA' }}>{discount} EGP</span>
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
                    height: "60px", width: "calc(100vw - 40px)",
                    padding: "20px",
                    boxShadow: 3, borderRadius: "30px 30px 0px 0px",
                    display: "flex", justifyContent: "space-between", textAlign: "center", alignItems: "center"
                }}>

                <Box sx={{ display: "flex", alignItems: "center", width: "70%" }}>
                    <Typography
                        onClick={handleCancelPay}
                        variant="body2" sx={{ cursor: "pointer", color: "#AAAAAA", fontSize: "12px", fontWeight: "bold" }}>
                        <span class="icon-close" style={{ fontSize: "12px", marginRight: "5px" }}></span>
                        {t("cancel")}
                    </Typography>

                    <Typography
                        onClick={handleEditPay}
                        variant="body2" sx={{
                            cursor: "pointer", marginLeft: "25px",
                            color: "#AAAAAA", fontSize: "12px", fontWeight: "bold"
                        }}>
                        <span class="icon-edit"
                            style={{ fontSize: "18px", color: "#009444", marginRight: "5px" }}></span>
                        {t("edit")}
                    </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ backgroundColor: "gray", mx: 1 }} />

                <Box width={"100%"} sx={{ display: "flex", alignItems: "center" ,gap:'5px'}} >

                    {/* <Link href='/orderPlaced' > */}
                    <Button
                        sx={{
                            width: "100%",
                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            color: "white", textTransform: "capitalize", fontSize: "14px",
                            borderRadius: "20px", height: "30px",
                            "&:hover": {
                                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            }
                        }}
                        onClick={makeOrder}
                        disabled={isLoading}>
                        {t("confirm")} <img src="/assets/hands.svg" style={{ marginLeft: "5px" }} />
                    </Button>
                    {/* </Link> */}
                    <Button style={{ padding: "0px", minWidth: '25px' }}
                        onClick={() => {
                            if (pageRef.current) {
                                handlePrint();
                                // handleDownloadPDF()
                                
                            } else {
                                console.warn("Printable content not mounted");
                            }
                        }} >
                        <span className="icon-printer1" style={{ fontSize: "22px",  color: "#AAAAAA" }}></span>
                    </Button>
                </Box>
            </Box>
        </Box>

    )
}

export default page;



const PaymentMethodSelector = ({ setSelectedMethod }) => {
    const t = useTranslations()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (method) => {
        if (method) {
            setSelectedMethod(method);
        }
        setAnchorEl(null);
    };

    const paymentMethods = ["cash", "wallet"];
    // const paymentMethods = ["cash", "wallet", "card"];

    return (
        <>
            <Typography>
                <span
                    onClick={handleClick}
                    style={{
                        color: "#AAAAAA",
                        fontSize: "11px",
                        borderBottom: "1px solid #AAAAAA",
                        cursor: "pointer",
                    }}
                >
                    {t("change")}
                </span>
            </Typography>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
                keepMounted
            >
                {paymentMethods.map((method) => (
                    <MenuItem key={method} onClick={() => handleClose(method)}>
                        {t(method)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};