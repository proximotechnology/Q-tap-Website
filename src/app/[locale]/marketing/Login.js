"use client";
import React, { useState } from 'react';
import {Link} from "@/i18n/navigation"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Language from '@/component/Language';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import {
    Button, Box, InputAdornment, FormControl, OutlinedInput, IconButton,
    FormControlLabel, Checkbox, Typography, Divider,
    CircularProgress
} from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useRouter } from 'next/navigation';
import { AllChatForm } from '../Chat/AllChatForm.js';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { BASE_URL } from '@/utils/constants.js';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [apiSuccess, setApiSuccess] = useState('');
    const router = useRouter()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const t = useTranslations()
    const locale = useLocale()
    // call api to login
    const handleLogin = async () => {
        // API states
        setApiError('');
        setApiSuccess('');

        // inputs validate 
        if (!email || !password) {
            setApiError(t("allFieldRequired"));
            return;
        }

        // resive data from user 
        const data = {
            email,
            password,
            user_type: "qtap_affiliates"
        };

        // send data to api 
        try {
            setIsLoading(true);
            const options = {
                method: 'POST',
                url: `${BASE_URL}login`,
                headers: { 'Content-Type': 'application/json' },
                data

            }
            const response = await axios.request(options)
                .then(res => res)
                // .catch(error => {})


            setIsLoading(false);

            if (response?.data?.user) {
                setApiSuccess(t("loginSucc"));
                localStorage.setItem("userToken", response?.data?.token);
                localStorage.setItem("userName", response?.data?.user?.name);
                localStorage.setItem("userEmail", response?.data?.user?.email);
                


                router.push(`/${locale}`)
            } else {
                setApiError(response?.data?.message || t("checkEmailPasswordAgain"));
            }
        } catch (error) {
            setIsLoading(false);
            setApiError(error.response?.data?.message || t("failedLoginTryAgain"));
        }
    };

    return (
        <Box
            sx={{
                width: "100%", height: "100vh",
                backgroundImage: "url('/images/Rectangle.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center"
            }}>
            <Box
                sx={{
                    position: "relative",
                    zIndex: 5,
                    width: "100%",
                    height: { xs: "46vh", sm: "40vh", md: "45vh" },
                    borderRadius: "0px 0px 30px 30px",
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
                        borderRadius: "inherit",
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
                        <Link href="/">
                            <KeyboardArrowLeftIcon sx={{ fontSize: "40px", color: "white" }} />
                        </Link>
                    </IconButton>

                    <Box sx={{ display: 'flex' }}>

                        <AllChatForm />
                        <Language />
                    </Box>
                </Box>

                <Box sx={{
                    position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
                    textAlign: "center", alignItems: "center"
                }}>
                    <Typography variant='h1' sx={{ fontSize: { xs: "20px", md: "30px" }, color: "white" }}>
                        {t("affiliateMarketing")}
                    </Typography>

                    <Divider sx={{
                        backgroundColor: "#E57C00", width: "5%", height: "3px",
                        margin: "12px auto", borderRadius: "20px"
                    }} />

                    <Typography
                        variant='body2'
                        sx={{
                            width: { xs: "80%", md: "55%" },
                            fontSize: { xs: "9px", md: "11px" },
                            marginBottom: "20px",
                            lineHeight: "20px",
                            padding: "0px 10%", color: "white"
                        }}
                    >
                        {t("lorem")}
                    </Typography>
                    <Link href="/Signup">
                        <Button className='joinButton' sx={{
                            fontSize: "15px", backgroundColor: "#E57C00", textTransform: "capitalize", borderRadius: "20px",
                            color: "white", padding: "4px 35px"
                        }}>
                            <PersonAddOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
                            {t("register")}
                        </Button>
                    </Link>
                </Box>
            </Box>

            <Box sx={{ width: { xs: "60%", md: "22%" }, margin: "50px 0px" }}>
                <FormControl variant="outlined" fullWidth margin="normal">
                    <OutlinedInput
                        placeholder={t("email")}
                        onChange={(e) => setEmail(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <MailOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        required
                        sx={{
                            borderRadius: '50px', height: "35px", fontSize: "12px", color: "gray", padding: "22px 15px"
                        }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth margin="normal">
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOpenOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "20px" }} />
                                        :
                                        <span className="icon-show" style={{ fontSize: "20px" }}></span>
                                    }

                                </IconButton>
                            </InputAdornment>
                        }
                        required
                        placeholder={t("confirmPass")}
                        sx={{
                            borderRadius: '50px', height: "35px", fontSize: "12px", color: "gray", padding: "22px 15px"
                        }}
                    />
                </FormControl>


                <Link href="/reset-password" style={{ textDecoration: 'none !important', textAlign: "left" }}>
                    <Typography variant="body2"
                        sx={{ color: "#222240", fontSize: "11px", cursor: "pointer", margin: "5px 0px" }}>
                        <span style={{ fontWeight: "300" }}>{t("resetPass")}</span>
                    </Typography>
                </Link>
                {apiError && <Typography sx={{ color: 'red', fontSize: '12px' }}>{apiError}</Typography>}
                {apiSuccess && <Typography sx={{ color: 'green', fontSize: '12px' }}>{apiSuccess}</Typography>}
                <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    variant="contained"
                    fullWidth
                    sx={{
                        fontSize: "15px",
                        backgroundColor: "#222240",
                        borderRadius: "50px",
                        textTransform: "capitalize",
                        padding: "5px 0",
                        mt: 2,
                        '&:hover': {    
                             transform: "scale(1.02) !important",
                            transition: "transform 0.3s ease !important" }
                    }}
                >
                    {isLoading ? <CircularProgress size={20} /> : t("login")}
                </Button>

                <FormControlLabel
                    sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                    control={<Checkbox sx={{ color: "#c2bbbb", transform: "scale(0.7)" }} />}
                    label={<Typography sx={{ fontSize: "10px", color: "gray" }}>{t("stayLogIn")}</Typography>}
                />
            </Box>

            <Typography sx={{ fontSize: "10px", color: "#fff", fontWeight: "500", padding: "20px", position: "absolute", bottom: "0px", textAlign: "center", width: "100%" }}>{t("footer.copyRight")}</Typography>

        </Box>
    );
}
