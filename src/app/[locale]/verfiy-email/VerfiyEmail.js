"use client";
import { Link } from "@/i18n/navigation"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Language from '@/component/Language';
import { IconButton, Box, Typography, Button, Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material';
import React, { useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AllChatForm } from '../Chat/AllChatForm.js';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils.js";

export const VerfiyEmail = () => {

    const [otp, setOtp] = useState('');
    const router = useRouter()
    //
    const t = useTranslations()
    const locale = useLocale()

    // call api to register
    const handleVerfiyEmail = async () => {

        // inputs validate 
        if (!otp) {
            toast.error("enter otp field")
            return;
        }
        // resive data from user 
        const data = {
            otp,
            user_type: "qtap_affiliate"
        };

        // send data to api 
        try {
            const options = {
                method: 'POST',
                url: `${BASE_URL}verfiy_email`,
                headers: { 'Content-Type': 'application/json' },
                data

            }
            const response = await axios.request(options)
                .then(res => res)
                .catch(error => console.log(error))
            console.log(response);

            if (response?.data?.status == true) {
                toast.success("success sign up");

                router.push(`/${locale}/marketing`)
            } else {
                toast.error("otp is invalid");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "faild to send otp");
        }
    };


    return (
        <Box
            sx={{
                width: "100%", height: "100vh",
                display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center"
            }}>
            <Box
                sx={{
                    position: "relative",
                    zIndex: 5,
                    width: "100%",
                    height: "100vh",
                    backgroundImage: "url('/images/Marketing.jpg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    '::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to top right,rgba(230, 127, 0, 0.541),rgba(54, 43, 57, 0.582),rgba(54, 43, 57, 0.582), rgba(33, 33, 63, 0.5))",
                        zIndex: 6,
                    }
                }}>

                <Box sx={{
                    display: "flex", position: "relative", zIndex: 10,
                    justifyContent: "space-between", alignItems: "center",
                    textAlign: "center", padding: { xs: "10px 20px", sm: "15px 40px", md: "20px 60px" }
                }}>
                    <IconButton>
                        <Link href="/marketing">
                            <KeyboardArrowLeftIcon sx={{ fontSize: "40px", color: "white" }} />
                        </Link>
                    </IconButton>

                    <Box>
                        <AllChatForm />
                        <Language />
                    </Box>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        width: { xs: "90%", sm: "50%", md: "30%", lg: "25%" },
                        height: "auto",
                        zIndex: 88,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "22px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            color: "white",
                            backgroundColor: "#222240",
                            padding: "13px 0px",
                            borderRadius: "20px 20px 0px 0px",
                            borderBottom: "3px solid #E57C00",
                            width: "100%",
                        }}
                    >
                        <Typography variant="body2" sx={{ fontSize: "14px", color: "white" }}>
                            {t("registerAsAffiliate")}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            textAlign: "center",
                            width: "85%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: { xs: "15px", sm: "25px" },
                        }}
                    >
                        <FormControl variant="outlined" fullWidth >
                            <OutlinedInput
                                id="otp"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </InputAdornment>
                                }
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder={t("Enter Otp")}
                                sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "12px", padding: "22px 15px" }}
                            />
                        </FormControl>

                        <Button
                            onClick={handleVerfiyEmail}
                            variant="contained"
                            fullWidth
                            sx={{
                                marginTop: 2,
                                borderRadius: '50px',
                                backgroundColor: "#E57C00",
                                color: '#ffffff',
                                height: '35px',
                                textTransform: "capitalize",
                                '&:hover': {
                                    backgroundColor: '#E57C00',
                                }
                            }}>

                            VERIFY
                        </Button>
                    </Box>
                </Box>

                <Typography sx={{ fontSize: "10px", color: "#fff", fontWeight: "500", padding: "20px", position: "absolute", bottom: "0px", left: "42%" }}>@ 2024 All Rights Reserved by Q-Tap</Typography>

            </Box>
        </Box>
    )
}
