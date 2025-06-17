"use client";
import {Link} from "@/i18n/navigation"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Language from '@/component/Language';
import { IconButton, Box, Typography, Button, Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material';
import React, { useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AllChatForm } from '../Chat/AllChatForm.js';
import { useLocale, useTranslations } from 'next-intl';
import { BASE_URL } from "@/utils/constants.js";


export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //// 
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [apiSuccess, setApiSuccess] = useState('');
    const router =  useRouter()
    //
    const t = useTranslations()
    const locale = useLocale()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    // call api to register
    const handleSignUp = async () => {
        
        setApiError('');
        setApiSuccess('');
    
        // inputs validate 
        if (!fullName || !phone || !email || !password || !confirmPassword) {
          setApiError('All fields are required!');
          return;
        }
    
        if (password !== confirmPassword) {
          setApiError(t("allFieldRequired"));
          return;
        }
        if (!day || !month || !year) {
          setApiError(t("birthDateMustValid"));
          return;
        }
        if (!country) {
          setApiError(t("countryFieldRequired"));
          return;
        }

         // resive data from user 
        const user_type = "qtap_affiliates"
        const data = {
          name: fullName,
          mobile: phone,
          email,
          password,
          confirmPassword,
          birth_date: `${year}-${month}-${day}`,
          country,
          user_type 
        };

        // send data to api 
        try {
          setIsLoading(true);
          const options = {
            method: 'POST',
            url:`${BASE_URL}register`,
            headers: { 'Content-Type': 'application/json' },
            data

          }
          const response = await axios.request(options)
          .then(res => res )
          .catch(error => 
          
          
          setIsLoading(false);
            
          if (response?.data?.status == "success") {
            setApiSuccess(t("registrationSucc"));

            router.push(`/${locale}/verfiy-email`)
          } else {
            setApiError(response?.data?.message || t("checkEmailPhoneDublicate"));
          }
        } catch (error) {
          setIsLoading(false);
          setApiError(error.response?.data?.message || t("failedRegisterTryAgain"));
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
                                id="outlined-fullname"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </InputAdornment>
                                }
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={t("fullName")}
                                sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "12px" ,padding:"22px 15px" }}
                            />
                        </FormControl>

                        <FormControl variant="outlined" fullWidth >
                            <OutlinedInput
                                id="outlined-phone"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Typography sx={{ fontSize: "12px", color: "black" }} >{t("verify")}</Typography>
                                    </InputAdornment>
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </InputAdornment>
                                }
                                placeholder={t("mobileNumber")}
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "12px" ,padding:"22px 15px"}}
                            />
                        </FormControl>

                        <FormControl required variant="outlined" fullWidth >
                            <OutlinedInput
                                id="outlined-email"
                                type="email"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </InputAdornment>
                                }
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("email")}
                                sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "12px" ,padding:"22px 15px"}}
                            />
                        </FormControl>

                        <Grid container alignItems="center" sx={{ marginTop: "10px", }}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Grid container alignItems="center" sx={{ color: "grey", margin: "5px 2px" }} >
                                    <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "20px" }} />
                                    <Typography variant="body1" sx={{ fontSize: "12px" }}>{t("dateOfBirth")}</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Select
                                        id="outlined-country"
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: '50px', height: '33px', fontSize: "12px", color: "gray", marginRight: "5px",padding:"5px" }}
                                    >
                                        <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }} >
                                            {t("month")}
                                        </MenuItem>
                                        <MenuItem value="01" sx={{ fontSize: "10px", color: "gray" }}>01</MenuItem>
                                        <MenuItem value="02" sx={{ fontSize: "10px", color: "gray" }}>02</MenuItem>
                                        <MenuItem value="03" sx={{ fontSize: "10px", color: "gray" }}>03</MenuItem>
                                        <MenuItem value="04" sx={{ fontSize: "10px", color: "gray" }}>04</MenuItem>
                                        <MenuItem value="05" sx={{ fontSize: "10px", color: "gray" }}>05</MenuItem>
                                        <MenuItem value="06" sx={{ fontSize: "10px", color: "gray" }}>06</MenuItem>
                                        <MenuItem value="07" sx={{ fontSize: "10px", color: "gray" }}>07</MenuItem>
                                        <MenuItem value="08" sx={{ fontSize: "10px", color: "gray" }}>08</MenuItem>
                                        <MenuItem value="09" sx={{ fontSize: "10px", color: "gray" }}>09</MenuItem>
                                        <MenuItem value="10" sx={{ fontSize: "10px", color: "gray" }}>10</MenuItem>
                                        <MenuItem value="11" sx={{ fontSize: "10px", color: "gray" }}>11</MenuItem>
                                        <MenuItem value="12" sx={{ fontSize: "10px", color: "gray" }}>12</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Select
                                        id="outlined-country"
                                        value={day}
                                        onChange={(e) => setDay(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: '50px', height: '33px', fontSize: "12px", color: "gray", marginRight: "5px",padding:"5px" }}
                                    >
                                        <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                            {t("day")}
                                        </MenuItem>
                                        {[...Array(31).keys()].map((i) => (
                                            <MenuItem key={i + 1} value={i + 1} sx={{ fontSize: "10px", color: "gray" }} >
                                                {String(i + 1).padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Select
                                        id="outlined-country"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: '50px', height: '33px', fontSize: "12px", color: "gray",padding:"5px" }}
                                    >
                                        <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                            {t("year")}
                                        </MenuItem>
                                        {Array.from({ length: 2025 - 2000 + 1 }, (_, i) => (
                                            <MenuItem key={i + 2000} value={i + 2000} sx={{ fontSize: "10px", color: "gray" }}>
                                                {i + 2000}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <FormControl variant="outlined" fullWidth  >
                            <Select
                                id="outlined-country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                displayEmpty
                                sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "12px", color: "gray",padding:"22px 15px" }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <span className="icon-map" style={{ fontSize: "20px" }}></span>
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="" disabled >
                                    {t("country")}
                                </MenuItem>
                                <MenuItem value="US" sx={{ fontSize: "11px", color: "gray" }} >United States</MenuItem>
                                <MenuItem value="CA" sx={{ fontSize: "11px", color: "gray" }} >Canada</MenuItem>
                                <MenuItem value="UK" sx={{ fontSize: "11px", color: "gray" }} >United Kingdom</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" fullWidth  >
                            <OutlinedInput
                                id="outlined-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <span className="icon-padlock" style={{ fontSize: "20px" }}></span>
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
                                placeholder={t("password")}
                                sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "12px",padding:"22px 15px" }}
                            />
                        </FormControl>

                        <FormControl variant="outlined" fullWidth >
                            <OutlinedInput
                                id="outlined-confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <span className="icon-padlock" style={{ fontSize: "20px" }}></span>

                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "20px" }} />
                                                :
                                                <span className="icon-show" style={{ fontSize: "20px" }}></span>
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder={t("confirmPass")}
                                sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "12px",padding:"22px 15px" }}
                            />
                        </FormControl>

                        <FormControlLabel sx={{ display: "flex", justifyContent: "center", width: "90%", marginTop: "10px" }}
                            control={<Checkbox
                                sx={{
                                    color: "#c2bbbb",
                                    transform: "scale(0.7)"
                                }}
                            />}
                            label={<Typography sx={{ fontSize: "12px", color: "gray" }}> {t("iAgreeToTerms")}</Typography>}
                        />
                        
                               
                                {apiError && <Typography sx={{ color: 'red', fontSize: '13px' }}>{apiError}</Typography>}
                                {apiSuccess && <Typography sx={{ color: 'green', fontSize: '13px' }}>{apiSuccess}</Typography>}


                        <Button
                             onClick={handleSignUp}
                             disabled={isLoading}
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

                                {isLoading ? t("loading") : t("signUp")}
                        </Button>
                    </Box>
                </Box>

            <Typography sx={{ fontSize: "10px", color:"#fff" ,fontWeight:"500" ,padding:"20px" , position:"absolute" ,bottom:"0px" ,left:"42%"}}>@ 2024 All Rights Reserved by Q-Tap</Typography>

            </Box>
        </Box>
    )
}
