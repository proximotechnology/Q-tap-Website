
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import './Home.css'
import NavBar from './NavBar';
// import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {Link} from "@/i18n/navigation"


const Home = () => {
    const t = useTranslations()
    return (
        <Box className="container">
            <NavBar />

            <Box className="hero">
                <Box className="heroContent">
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
