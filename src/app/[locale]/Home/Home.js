
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import './Home.css'
import NavBar from './NavBar';
// import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/navigation"


const Home = () => {
    const t = useTranslations()
    return (
        <Box className="container" sx={{
            width: {
                xs: '100vw !important',
                sm: '100vw !important',
                md: '100vw !important',
                lg: '100vw !important',
                xl: '100vw !important',
            },
        }}>
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                }}
            >
                <source src="/heroVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <NavBar />

            <Box className="hero">

                <Box className="heroContent" style={{ position: "absolute" }}>
                    {/* <video autoplay muted loop playsinline class="background-video">
                        <source src="https://www.youtube.com/watch?v=RGaW82k4dK4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> */}

                    <Typography variant='h1'
                        sx={{ fontSize: "50px", color: "#E57C00", marginBottom: "30px" }}>{t("homePage.title")}</Typography>
                    <Typography variant='body1' sx={{ fontSize: "15px", marginBottom: "40px" }}>
                        {t("homePage.about")}</Typography>
                    <Link href="/mobileList">
                        <Button className="joinButton" sx={{ marginTop: "60px", alignItems: "center" }}>
                            <img src="/assets/plus.svg" alt='plus'
                                style={{ width: "18px", height: "18px", marginRight: "5px" }} />
                            {t("homePage.joinNow")}</Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
