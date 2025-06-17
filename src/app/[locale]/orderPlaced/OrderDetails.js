"use client";
import { ordersDetails } from '@/app/[locale]/categories/data';
import { formateDate } from '@/utils/utils';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'


export const OrderDetails = () => {
    const t = useTranslations()
    const [order, setOrder] = useState(null);

    // =============================================================

    const renderIcon = () => {
        if (!order) return null;

        switch (order?.type) {
            case 'dinein':
                return <span className='icon-table' style={{ fontSize: '16px', color: "#F78822" }}></span>;

            case 'takeaway':
                return <span className='icon-takeaway' style={{ fontSize: '16px', color: "#F78822" }}></span>;

            case 'delivery':
                return <span className="icon-scooter" style={{ fontSize: '16px', color: "#F78822" }}></span>;

            default:
                return <p>No icon available</p>;
        }
    };
    // =============================================================


    useEffect(() => {
        let myOrder = localStorage.getItem('order')
        if (myOrder) {
            try{

                myOrder = JSON.parse(myOrder)
                setOrder(myOrder)
            } catch(err){
            }
        }

    }, []);

    // =============================================================

    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    position: 'relative',
                    marginTop: '25vh',
                    zIndex: "5000",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1E1E2A",
                    paddingTop: "40px",
                }}
            >
                {true ? (
                    <Box
                        sx={{
                            backgroundColor: "#302E3B",
                            borderRadius: "40px",
                            width: "85%",
                            color: "#FFFFFF",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                            fontFamily: "Arial, sans-serif",
                            justifyContent: "center",
                            textAlign: "center",
                            alignItems: "center",
                            marginTop: "-40px",
                            zIndex: "5000",
                        }}
                    >
                        {/* Header */}
                        <Box>
                            <Typography
                                variant="body1"
                                sx={{
                                    backgroundImage: 'linear-gradient(to right, #1E1E2A, #797993)',
                                    padding: "5px 0px",
                                    color: "#AAAAAA",
                                    borderRadius: "40px 40px 0px 0px",
                                }}
                            >
                                {t("orderId")} <span style={{ color: "white" }}>#{order?.id}</span>
                            </Typography>
                        </Box>

                        <Box sx={{ padding: "10px 20px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="body2" sx={{ marginBottom: "5px", fontSize: "11px", color: "#AAAAAA" }}>
                                    {formateDate(order?.created_at)}  {/* TODO: formate time */}
                                </Typography>

                                <Typography variant="body2" sx={{ color: "#ED1C24", fontSize: "11px", display: "flex", alignItems: "center" }} >
                                    <img src="/assets/balance.svg" alt="pay icon" style={{ width: "16px ", height: "16px", marginRight: "15px" }} />
                                    {/*t(order?.payment_status)  TODO: Where is the status */}
                                </Typography>
                            </Box>

                            <Divider sx={{ backgroundColor: "#48485B" }} />
                            {order ? (
                                <>
                                    <Grid
                                        container
                                        spacing={10}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Grid item xs={6}>
                                            {/* Dine Method */}
                                            <Box sx={{ margin: "8px 0px" }}>
                                                <Typography variant="body1" sx={{ fontSize: "12px", color: "white" }}>
                                                    {t("dineMethod")}
                                                </Typography>

                                                <Typography sx={{ fontSize: "12px", color: "#AAAAAA" }}>
                                                    {renderIcon()} , {t(order?.type)}
                                                </Typography>
                                            </Box>

                                            {/* Payment Method */}
                                            <Box>
                                                <Typography variant="body1" sx={{ fontSize: "12px", color: "white" }}>
                                                    {t("paymentMethod")}
                                                </Typography>
                                                <Typography sx={{ fontSize: "12px", color: "#AAAAAA" }}>
                                                    <span class="icon-wallet" style={{ fontSize: "16px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                                    {t(order?.payment_way)}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Box sx={{ marginTop: "40px" }}>
                                                <Typography varint="body1" sx={{ fontSize: "11px", color: "#AAAAAA" }} >
                                                    {t("totalPrice")}
                                                </Typography>
                                                <Typography variant="h4" sx={{ fontSize: "17px", fontWeight: "bold", color: "white" }}>
                                                    {order?.total_price} <span style={{ fontSize: "10px", color: "#AAAAAA" }}>EGP</span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (<> </>)}
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="h6" color="error">
                        order? not found
                    </Typography>
                )}
            </Box>
        </Box>


    )
}
