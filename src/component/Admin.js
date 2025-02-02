"use client";

import React, { useState, useEffect } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Admin = () => {
    const router = useRouter();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const openUserPopover = Boolean(anchorElUser);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        // This will only run on the client side
        setIsLoggedIn(localStorage.getItem('userToken'));
    }, []);

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        router.push('/marketing');
        handleUserClose();
    };

    return (
        <>
            <Box
                aria-describedby={openUserPopover ? 'simple-popover' : undefined}
                onClick={handleUserClick}
                sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
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
                            <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
                            <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
                        </Box>
                    </Box>
                    <Divider />

                    <List>
                        <Box
                            onClick={() => router.push('/')}
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
                            <Link href="https://qtap-dashboard.vercel.app" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                                <Typography sx={{ color: "white", fontSize: "10px", textTransform: "capitalize" }}>
                                    Dashboard
                                </Typography>
                            </Link>
                        </Box>

                        <ListItem sx={{ cursor: "pointer" }} oonClick={handleUserClose}>
                            <ListItemIcon>
                                <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile"
                                primaryTypographyProps={{
                                    sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                }} />
                        </ListItem>

                        <Link href="#pricing" style={{ textDecoration: 'none' }}>
                            <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                <ListItemIcon>
                                    <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
                            </ListItemIcon>
                            <ListItemText primary="My Subscription"
                                primaryTypographyProps={{
                                    sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                }} />
                        </ListItem>
                        </Link>

                        <Link href="#faq" style={{ textDecoration: 'none' }}>
                            <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                <ListItemIcon>
                                    <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                                </ListItemIcon>
                                <ListItemText primary="FAQ"
                                    primaryTypographyProps={{
                                        sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                    }} />
                            </ListItem>
                        </Link>

                        <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                            <ListItemIcon>
                                <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={isLoggedIn ? "Log Out" : "Log In"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isLoggedIn) {
                                        handleLogoutClick();
                                    } else {
                                        router.push('/marketing');
                                    }
                                }}
                                primaryTypographyProps={{
                                    sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Popover>
        </>
    )
}
