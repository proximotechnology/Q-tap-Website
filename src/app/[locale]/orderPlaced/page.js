"use client";

import dynamic from 'next/dynamic';
import { Header } from '@/app/[locale]/payment/Header'
import { OrderDetails } from '@/app/[locale]/orderPlaced/OrderDetails';
import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'


const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import done from '/src/animation/done.json';
import { Link } from "@/i18n/navigation"
import { useTranslations } from 'next-intl';

const page = () => {
    const t = useTranslations()

    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        if (!headerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setHeaderHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(headerRef.current);

        // Cleanup on unmount
        return () => resizeObserver.disconnect();
    }, []);
    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "100vh",
                width: '100%',
            }}>

            <Box  ref={headerRef}
                sx={{
                    position: "fixed",
                    overflow: 'hidden',
                    backgroundColor: '#1E1E2A',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000,
                    overflowY: 'hidden'
                }}>


                <Header showBackButton={false}  />
                <OrderDetails />
            </Box>
            <Box sx={{ height: `${headerHeight}px` }} />
            <Box display={"flex"} height={"auto"} justifyContent={"center"}
                alignItems={"center"} textAlign={"center"}  >
                <div style={{ width: "250px", height: "250px" }}>
                    <Lottie animationData={done} loop={true}
                        style={{
                            filter: "brightness(0.6)",
                        }}
                    />
                    <Link href='/tracking' sx={{ textDecoration: "none" }}>
                        <Typography
                            variant="body2"
                            sx={{
                                cursor: "pointer", fontSize: "15px", fontWeight: "bold", color: "#AAAAAA",
                                textDecoration: "none"
                            }}
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
