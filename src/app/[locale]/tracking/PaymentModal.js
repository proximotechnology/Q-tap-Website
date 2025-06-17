
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Divider } from "@mui/material";
import { ordersDetails } from "../categories/data";
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl";

const PaymentModal = ({ isOpen, onClose }) => {
    const t = useTranslations()
    const specificOrder = ordersDetails.find(order => order.id === 3218);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [formData, setFormData] = useState(null);
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
        let payUrl = localStorage.getItem('payment_url')
        try {
            payUrl = JSON.parse(payUrl)
            setPaymentUrl(payUrl)
        } catch (error) {
            
        }
    }, []);

    // ========================================================================
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getTotalPriceFromLocalStorage = () => {
            const storedPrice = localStorage.getItem('totalPrice');
            return storedPrice ? parseFloat(storedPrice) : 0;
        };

        setTotalPrice(getTotalPriceFromLocalStorage());
    }, []);
    // ========================================================================

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 6000,
            }}
        >
            <Box
                sx={{
                    width: "85%",
                    maxWidth: "400px",
                    bgcolor: "#302E3B",
                    boxShadow: 24,
                    borderRadius: "40px",
                    color: "#FFFFFF",
                    fontFamily: "Arial, sans-serif",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* Header */}
                {specificOrder ? (
                    <Box sx={{ textAlign: "center", }}>
                        <Typography
                            variant="body1"
                            sx={{
                                backgroundImage: 'linear-gradient(to right, #302E3B, #797993)',
                                padding: "8px 0px",
                                color: "#AAAAAA",
                                borderRadius: "40px 40px 0px 0px",
                            }}
                        >
                            {t("orderId")} <span style={{ color: "white", }}>#{specificOrder.id}</span>
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="h6" color="error">
                        {t("orderNotFound")}
                    </Typography>
                )}
                <Box sx={{ padding: "20px 30px", }}>

                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            mb: 1,
                            fontSize: "15px",
                        }}
                    >
                        <img src="/assets/balance.svg" alt="pay icon" style={{ width: "20px ", height: "20px", marginRight: "5px" }} />
                        {t("payment")}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center", justifyContent: "center",
                            mb: 1,
                            color: "#AAAAAA",
                            fontSize: "11px",
                        }}
                    >
                        {t("plPayAmount")}<br /> {t("continueYourOrder")}
                    </Typography>

                    <Divider sx={{ backgroundColor: "#797993", my: 2 }} />


                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"} >
                        <Box sx={{ width: "90%" }}>
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

                        <Box sx={{ width: "40%", textAlign: "left", marginLeft: "70px" }}>
                            <Typography variant="h6" sx={{
                                fontSize: '10px', fontWeight: "bold",
                                color: '#575756'
                            }}>
                                {t("totalPrice")}
                            </Typography>

                            <Typography variant="h6" sx={{ fontSize: '19px', fontWeight: "bold", color: 'white' }}>

                                {totalPrice}<span style={{ fontSize: "10px", fontWeight: "400", color: '#575756' }}> EGP</span>
                            </Typography>
                        </Box>

                    </Box>

                    <Divider sx={{ backgroundColor: "#797993", my: 2 }} />
                    {formData ? (
                        <>
                            <Box >
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
                        </>
                    ) : (
                        <Box sx={{
                            color: 'white',
                            width: '100%',
                        }}> <Typography>{t("noDataAvailable")}</Typography></Box>
                    )}

                    {/* <Link href="/Feedback" passHref> */}
                    <Link href={paymentUrl} passHref>
                        <Button
                            component="a"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                marginTop: "20px",
                                backgroundImage: 'linear-gradient(to right, #302E3B, #797993)',
                                borderRadius: "40px",
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                padding: "4px 0px",
                                alignItems: "center",
                                color: "white",
                                textTransform: "capitalize",
                                fontSize: "14px",
                                textDecoration: "none !important",
                                "&:hover": {
                                    backgroundImage: 'linear-gradient(to right, #302E3B, #797993)',
                                },
                            }}>
                            <img
                                src="/assets/balance.svg" alt="pay icon"
                                style={{ width: "20px ", height: "20px", marginRight: "5px" }}
                            />
                            {t("pay")}
                        </Button>
                    </Link>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>

                        <Typography
                            onClick={onClose}

                            sx={{
                                color: "#AAAAAA",
                                textTransform: "none",
                                cursor: "pointer",
                            }}
                        >
                            <span className="icon-close1" style={{ fontSize: "14px", marginRight: "6px" }}></span>
                            {t("cancel")}
                        </Typography>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 3,
                                backgroundColor: "white",
                                height: "25px",
                            }}
                        />
                        <Typography
                            sx={{
                                color: "#AAAAAA",
                                textTransform: "none",
                                cursor: "pointer",
                                alignItems: "center",
                            }}
                        >
                            <span className="icon-edit1" style={{ fontSize: "18px", color: "#038E43", marginRight: "6px" }}></span>
                            {t("edit")}
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Modal>
    );
};

export default PaymentModal;
