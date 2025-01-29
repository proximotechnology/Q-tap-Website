
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import './Home.css'
import NavBar from './NavBar';
import Link from 'next/link';


const Home = () => {
    return (
        <Box className="container">
            <NavBar />

            <Box className="hero">
                <Box className="heroContent">
                    <Typography variant='h1'
                        sx={{ fontSize: "50px", color: "#E57C00", marginBottom: "30px" }}>Tap, Order, Pay and Eat</Typography>
                    <Typography variant='body1' sx={{ fontSize: "15px", marginBottom: "40px" }}>
                        Create a Smart menu suitable for any type of business. Engage more with your customers.</Typography>
                    <Link href="mobileList">
                        <Button className="joinButton" sx={{ marginTop: "60px", alignItems: "center" }}>
                            <img src="/assets/plus.svg" alt='plus'
                                style={{ width: "18px", height: "18px", marginRight: "5px" }} />
                            Join Now</Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
