"use client";

import dynamic from 'next/dynamic';
import { Header } from '@/app/[locale]/payment/Header'
import { OrderDetails } from '@/app/[locale]/orderPlaced/OrderDetails';
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'


const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import done from '/src/animation/done.json';
import {Link} from "@/i18n/navigation"
import { useTranslations } from 'next-intl';

const page = () => {
    const t = useTranslations()
    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "100vh",
                width: '100%',
            }}>

            <Header />
            <OrderDetails />

            <Box display={"flex"} height={"135vh"} justifyContent={"center"}
                alignItems={"center"} textAlign={"center"} >
                <div style={{ width: "250px", height: "250px" }}>
                    <Lottie animationData={done} loop={true}
                        style={{
                            filter: "brightness(0.6)",
                        }}
                    />
                    <Link href='/tracking' sx={{ textDecoration: "none" }}>
                        <Typography
                            variant="body2"
                            sx={{ cursor: "pointer", fontSize: "15px", fontWeight: "bold", color: "#AAAAAA", 
                                textDecoration: "none" }}
                        >
                            {t("orderPlaced")}
                        </Typography>
                    </Link>
                </div>
            </Box>


        </Box>
    )
}
export default page
