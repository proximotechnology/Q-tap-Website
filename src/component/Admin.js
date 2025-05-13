"use client";

import React, { useState, useEffect } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';
import { Link } from "@/i18n/navigation"
import { useLocale } from 'next-intl';

export const Admin = () => {
    const router = useRouter();
    const locale = useLocale()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const openUserPopover = Boolean(anchorElUser);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });
    const params = new URLSearchParams(window.location.search);
    localStorage.setItem("clientName", params.get("clientName"))
    localStorage.setItem("clientEmail", params.get("clientEmail"))
    localStorage.setItem("clientToken", params.get("clientToken"))

    console.log(
        localStorage.getItem("clientName"),
        localStorage.getItem("clientEmail"),
        localStorage.getItem("clientToken")
    )
    useEffect(() => {
        // This code runs only on the client side
        setUserData({
            name: localStorage.getItem("userName") || '',
            email: localStorage.getItem("userEmail") || ''
        });
    }, []);
    useEffect(() => {
        // This will only run on the client side
        setIsLoggedIn(localStorage.getItem("clientToken"));
    }, [params]);

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        // Remove from localStorage
        localStorage.removeItem('clientToken');
        localStorage.removeItem('clientName');
        localStorage.removeItem('clientEmail');
        setIsLoggedIn(null);
        handleUserClose();

        // Remove query parameters from the URL (without reloading)
        const url = new URL(window.location.href);
        url.searchParams.delete("clientName");
        url.searchParams.delete("clientEmail");
        url.searchParams.delete("clientToken");

        window.history.replaceState({}, document.title, url.pathname + url.search);
    };

    return (
        <>
            <Box
                aria-describedby={openUserPopover ? 'simple-popover' : undefined}
                onClick={handleUserClick}
                sx={{
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "3px",
                    marginRight: { xs: "20px", md: "0px" } // Apply marginRight for smaller screens

                }}>
                <IconButton color="inherit" sx={{
                    backgroundColor: '#ef7d00', borderRadius: '30%', padding: '8px',
                    '&:hover': {
                        backgroundColor: '#ef7d00',
                    }
                }}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
                </IconButton>
                <KeyboardArrowDownIcon sx={{ fontSize: "15px", color: "white" }} />
            </Box>
            <Popover
                id={openUserPopover ? 'simple-popover' : undefined}
                open={openUserPopover}
                anchorEl={anchorElUser}
                onClose={handleUserClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ width: 200, padding: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
                        <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
                            <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ fontSize: "14px" }}>{localStorage.getItem("clientName") && localStorage.getItem("clientName") !== "null" ? localStorage.getItem("clientName") : ''}</Typography>
                            <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">{localStorage.getItem("clientEmail") && localStorage.getItem("clientEmail") !== "null" ? localStorage.getItem("clientEmail") : ''}</Typography>
                        </Box>
                    </Box>
                    <Divider />

                    <List>
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
                            <Link href="http://localhost:3001/" style={{ textDecoration: 'none' }}  rel="noopener noreferrer">
                                <Typography sx={{ color: "white", fontSize: "10px", textTransform: "capitalize" }}>
                                    Dashboard
                                </Typography>
                            </Link>
                        </Box>
                        <a href="http://localhost:3001/setting-client" style={{ textDecoration: "none" }}>
                            <ListItem sx={{ cursor: "pointer" }} >
                                <ListItemIcon sx={{ marginLeft: locale == 'ar' ? "-30px" : '0px' }}>

                                    <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                                </ListItemIcon>
                                <ListItemText primary="Edit Profile"
                                    primaryTypographyProps={{
                                        sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: locale == 'en' ? "-30px" : '', textAlign: locale == "ar" ? "start" : '' }
                                    }} />
                            </ListItem>
                        </a>
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
                        {isLoggedIn && isLoggedIn !== "null" ? (
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
                            <Link Link href="http://localhost:3001/" passHref style={{textDecoration:"none"}}>
                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
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
                            </Link>
                        )}
                    </List>
                </Box>
            </Popover >
        </>
    )
}
