"use client";

import React, { useState, useEffect } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';
import { Link } from "@/i18n/navigation"
import { useLocale } from 'next-intl';
import useUserStore from '@/store/userStore';
import { logout } from '@/api/logout';

export const Admin = () => {
    const router = useRouter();
    const locale = useLocale()

    const [anchorElUser, setAnchorElUser] = useState(null);
    const openUserPopover = Boolean(anchorElUser);

    // const [isLoggedIn, setIsLoggedIn] = useState(null);
    const { user, setUser, clearUser } = useUserStore();
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        if (!!user) {
            setUserData({
                name: user?.name,
                email: user?.email
            });
        }
    }, [user])

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     const storedName = localStorage.getItem('userName');
    //     const storedEmail = localStorage.getItem('userEmail');

    //     // فقط نفذ العملية إذا كانت القيم غير موجودة
    //     if (!storedToken || !storedName || !storedEmail) {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const token = urlParams.get('token');
    //         const name = urlParams.get('name');
    //         const email = urlParams.get('email');

    //         if (token) {
    //             localStorage.setItem('token', token);
    //             
    //         }

    //         if (name) {
    //             localStorage.setItem('userName', name);
    //             
    //         }

    //         if (email) {
    //             localStorage.setItem('userEmail', email);
    //             
    //         }
    //     } else {
    //         
    //     }
    // }, []);

    // const currentToken = localStorage.getItem('token');
    // useEffect(() => {
    //     // This code runs only on the client side
    //     setUserData({
    //         name: localStorage.getItem("userName") || '',
    //         email: localStorage.getItem("userEmail") || ''
    //     });
    // }, []);
    // useEffect(() => {
    //     // This will only run on the client side
    //     setIsLoggedIn(localStorage.getItem("token"));
    // }, []);

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };

    // const handleLogoutClick = () => {
    //     // Remove from localStorage
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('userName');
    //     localStorage.removeItem('userEmail');
    //     setIsLoggedIn(null);
    //     handleUserClose();

    // };
    const [loading,setLoading] = useState()
    const handleLogoutClick = async () => {
        if (loading) return;
        setLoading(true);
        await logout();
        setLoading(false);
    };

    return (
       !loading ? ( <div>
            <Box className='noRightPadding'
                aria-describedby={openUserPopover ? 'simple-popover' : undefined}
                onClick={handleUserClick}
                sx={{
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "3px",
                    marginRight: { xs: "20px", md: "0px" }, // Apply marginRight for smaller screens
                    paddingRight: '0px !important'

                }} >
                <IconButton color="inherit" sx={{
                    backgroundColor: '#ef7d00', borderRadius: '30%', padding: '8px',
                    '&:hover': {
                        backgroundColor: '#ef7d00',
                    }
                }}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
                </IconButton>
                <KeyboardArrowDownIcon sx={{ fontSize: "15px", color: "white", paddingRight: '0px !important' }} />
            </Box>
            {/* جزء ال drop menu */}
            {/* TODO: padding-right : 15px when selected come form no where fix this */}
            <Popover
                id={openUserPopover ? 'simple-popover' : undefined}
                open={openUserPopover}
                anchorEl={anchorElUser}
                onClose={handleUserClose}
                disablePortal={false}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right', // Aligns to the right of the anchor element
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right', // Makes the popover open from its right side
                }}
                slotProps={{
                    paper: {
                        style: {
                            paddingRight: 0, // override inline
                            padding: 0,
                        },
                    },
                }}

            >
                <Box sx={{ width: 200, padding: '10px' }}>
                    {!!user ? <>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
                            <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
                                <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontSize: "14px" }}>{localStorage.getItem("userName") && localStorage.getItem("userName") !== "null" ? localStorage.getItem("userName") : ''}</Typography>
                                <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">{localStorage.getItem("userEmail") && localStorage.getItem("userEmail") !== "null" ? localStorage.getItem("userEmail") : ''}</Typography>

                            </Box>
                        </Box>
                        <Divider /></>
                        : ""}



                    <List>
                        {/* login/signin and logout section  */}
                        {!!user ? <>
                            <Box
                                onClick={() => router.push(`/${locale}`)}
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor: "#222240",
                                    color: "white",
                                    marginBottom: "10px",
                                    borderRadius: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    width: "80%",
                                    padding: "5px 0px",
                                    margin: "0 auto",
                                }}>

                                <span class="icon-home-icon-silhouette" style={{ color: "#ef7d00", marginRight: "5px", fontSize: "15px" }} ></span>
                                <Typography
                                    sx={{ color: "white", fontSize: "10px", textTransform: "capitalize", cursor: "pointer" }}
                                    onClick={() => {
                                        window.location.href = "https://dashboard.qutap.co"
                                    }}
                                >
                                    Dashboard
                                </Typography>
                            </Box>
                            <Typography
                                onClick={() => {
                                    window.location.href = `https://dashboard.qutap.co/test-web-login?token=${localStorage.getItem("token")}`;
                                    // window.location.href = `https://dashboard.qutap.co/setting-client?redirectBack=${encodeURIComponent(`https://qutap.co/en?token=${localStorage.getItem("token")}`)}`;
                                }}
                            >
                                <ListItem sx={{ cursor: "pointer" }} >
                                    <ListItemIcon sx={{ marginLeft: locale == 'ar' ? "-30px" : '0px' }}>

                                        <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit Profile"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: locale == 'en' ? "-30px" : '', textAlign: locale == "ar" ? "start" : '' }
                                        }} />
                                </ListItem>
                            </Typography>

                            <Link href="#pricing" style={{ textDecoration: 'none' }}>
                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon sx={{ marginLeft: locale == 'ar' ? "-30px" : '0px' }}>

                                        <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
                                    </ListItemIcon>
                                    <ListItemText primary="My Subscription"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: locale == 'en' ? "-30px" : '', textAlign: locale == "ar" ? "start" : '' }
                                        }} />
                                </ListItem>
                            </Link>

                            <Link href="#faq" style={{ textDecoration: 'none' }}>
                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon sx={{ marginLeft: locale == 'ar' ? "-30px" : '0px' }}>

                                        <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="FAQ"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: locale == 'en' ? "-30px" : '', textAlign: locale == "ar" ? "start" : '' }
                                        }} />
                                </ListItem>
                            </Link>
                        </> : ""}
                        {!!user ? (
                            <ListItem sx={{ cursor: "pointer" }} onClick={handleLogoutClick}>
                                <ListItemIcon sx={{ marginLeft: locale === "ar" ? "-30px" : "0px" }}>
                                    <img
                                        src="/assets/logout.svg"
                                        alt="icon"
                                        style={{ width: "16px", height: "16px" }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Log Out"
                                    primaryTypographyProps={{
                                        sx: {
                                            color: "#5D5D5C",
                                            fontSize: "12px",
                                            marginLeft: locale === "en" ? "-30px" : "",
                                            textAlign: locale === "ar" ? "start" : "",
                                        },
                                    }}
                                />
                            </ListItem>
                        ) : (
                            <div>
                                <Typography
                                    onClick={() => {
                                        window.location.href = "https://dashboard.qutap.co?redirectBack=https://qutap.co/en"
                                    }}
                                    style={{ textDecoration: "none" }}>
                                    <ListItem sx={{ cursor: "pointer" }} >
                                        <ListItemIcon sx={{ marginLeft: locale === "ar" ? "-30px" : "0px" }}>
                                            <img
                                                src="/assets/logout.svg"
                                                alt="icon"
                                                style={{ width: "16px", height: "16px" }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Log In"
                                            primaryTypographyProps={{
                                                sx: {
                                                    color: "#5D5D5C",
                                                    fontSize: "12px",
                                                    marginLeft: locale === "en" ? "-30px" : "",
                                                    textAlign: locale === "ar" ? "start" : "",
                                                },
                                            }}
                                        />
                                    </ListItem>
                                </Typography>
                                <Typography
                                    onClick={() => {
                                        window.location.href = "https://dashboard.qutap.co?redirectBack=https://qutap.co/en"
                                    }}
                                    style={{ textDecoration: "none" }}>
                                    <ListItem sx={{ cursor: "pointer" }} >
                                        <ListItemIcon sx={{ marginLeft: locale === "ar" ? "-30px" : "0px" }}>
                                            <img
                                                src="/assets/logout.svg"
                                                alt="icon"
                                                style={{ width: "16px", height: "16px" }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Sign In"
                                            primaryTypographyProps={{
                                                sx: {
                                                    color: "#5D5D5C",
                                                    fontSize: "12px",
                                                    marginLeft: locale === "en" ? "-30px" : "",
                                                    textAlign: locale === "ar" ? "start" : "",
                                                },
                                            }}
                                        />
                                    </ListItem>
                                </Typography>
                            </div>
                        )}
                    </List>
                </Box>
            </Popover >
        </div>):"Loading"
    )
}
