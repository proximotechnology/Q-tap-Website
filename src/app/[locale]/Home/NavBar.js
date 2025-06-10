"use client";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Language from '@/component/Language';
import { Admin } from '@/component/Admin';
import { Link } from "@/i18n/navigation";
import { useRouter } from 'next/router';
import { useLocale, useTranslations } from 'next-intl';

const drawerWidth = "100%";
const navItems = [
    { name: 'Home', icon: 'icon-home-icon-silhouette1', path: '/' },
    { name: 'We Serve', icon: 'icon-store-1', id: 'we-serve' },
    { name: 'Products', icon: 'icon-option', path: '/menus' },
    { name: 'Affiliate', icon: 'icon-megaphone', path: '/marketing' },
    { name: 'Tutorials', icon: 'icon-video-lesson1', id: 'tutorials' },
    { name: 'Support', icon: 'icon-support', path: '/support' },
];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const router = isClient ? useRouter() : null;
    const t = useTranslations();
    const locale = useLocale()

    useEffect(() => {
        setIsClient(typeof window !== 'undefined');
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleNavigation = (path) => {
        if (router) {
            router.push(path);
            handleDrawerToggle(); // Close drawer on navigation
        }
    };

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                width: "100%",
                padding: "20px",
                textAlign: 'center',
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 15
            }}
        >
            <img src="/assets/qtapwhite.svg" alt="logo" style={{ width: "120px" }} />
            <List>
                {navItems.map((item) => (
                    <Link
                        href={item.path ? item.path : `#${item.id}`}
                        key={item.name}
                        style={{ textDecoration: 'none' }}
                    >
                        <ListItemButton
                            sx={{
                                textAlign: 'center', padding: "13px",
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: locale == "en" ? 0 : "82%",
                                    height: '2px',
                                    width: '0%',
                                    backgroundColor: '#E57C00',
                                    transition: 'width 0.3s ease-in-out',
                                },
                                '&:hover::after': {
                                    width: locale == "en" ? '110px' : '90px',
                                },
                            }}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <span className={item.icon} style={{ color: "#E57C00", fontSize: "16px", marginLeft: "10px" }}></span>
                            <span style={{ marginLeft: '12px', color: "white" }}>
                                <Typography sx={{ fontSize: "13px", cursor: "pointer" }}>
                                    {t("nav." + item.name)}
                                </Typography>
                            </span>
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {/* Header (menu icon + settings) for screens < 950px */}
            <Box
                sx={{

                    display: { xs: 'block', sm: 'block', md: 'none' },
                    width: "100% !important",
                    marginLeft: "20px",
                    padding: "12px 10px",
                    '@media (min-width: 950px)': {
                        display: "none",
                    }
                }}
            >
                <Box
                    sx={{
                        zIndex: 20,
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Box>

                    <Box>
                        <Tooltip>
                            <Box sx={{ display: "flex" }} gap={"20px"}>
                                <Language />
                                <Typography
                                    onClick={() => {
                                        const section = document.getElementById("pricing");
                                        if (section) {
                                            section.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            height: '2px',
                                            width: '0%',
                                            backgroundColor: '#E57C00',
                                            transition: 'width 0.3s ease-in-out',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                        },
                                    }}
                                >
                                    <img
                                        src='/assets/pricing.svg'
                                        style={{ width: "18px", marginLeft: locale == "ar" ? "6px" : "0px", marginRight: locale == "en" ? "5px" : "0px", height: "18px" }}
                                    />
                                    {t("nav.pricing")}
                                </Typography>
                                <Admin />
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

            {/* Main AppBar for screens >= 950px */}
            <Box
                sx={{
                    width: "100% !important",
                    display: 'flex',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    padding: "12px 10px",
                }}
            >
                <CssBaseline />
                <AppBar 
                    component="nav"
                    sx={{
                        position: "relative !important",
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        padding:'0px !important'
                    }}
                >
                    <Toolbar>
                        <Box 
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', sm: 'none', md: 'flex' },
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                '@media (min-width: 950px)': {
                                    display: "flex",
                                }
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <img src="/assets/qtapwhite.svg" alt="logo" style={{ width: "100px" }} />
                                <Box sx={{ marginLeft: "30px", display: "flex" }} gap={"10px"}>
                                    {navItems.map((item) => {
                                        if (!item.path && !item.id) {
                                            return null;
                                        }
                                        return (
                                            <Link
                                                href={item.path ? item.path : `#${item.id}`}
                                                key={item.name}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Button
                                                    sx={{
                                                        position: 'relative',
                                                        color: '#fff',
                                                        fontSize: "11px",
                                                        textTransform: "capitalize",
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        '&::after': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            left: 0,
                                                            height: '2px',
                                                            width: '0%',
                                                            backgroundColor: '#E57C00',
                                                            transition: 'width 0.3s ease-in-out',
                                                        },
                                                        '&:hover::after': {
                                                            width: '100%',
                                                        },
                                                    }}
                                                >
                                                    <span className={item.icon} style={{ color: "#E57C00", fontSize: "16px" }}></span>
                                                    <span style={{ marginLeft: '5px', fontSize: "11px", marginRight: locale == "ar" ? "8px" : "0px" }}>
                                                        {t("nav." + item.name)}
                                                    </span>
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </Box>
                            </Box>

                            <Box>
                                <Tooltip>
                                    <Box  sx={{
                                        display: "flex",
                                        gap: "20px",
                                        '@media (min-width: 900px) and (max-width: 949px)': {
                                            gap: "10px", // Reduce spacing
                                            marginLeft: "-25px !important", // Ensure margin is applied
                                        },
                                    }}>
                                        <Language />
                                        <Typography
                                            onClick={() => {
                                                const section = document.getElementById("pricing");
                                                if (section) {
                                                    section.scrollIntoView({ behavior: "smooth" });
                                                }
                                            }}
                                            sx={{
                                                cursor: "pointer",
                                                fontSize: "12px",
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                position: 'relative',
                                                '&::after': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    height: '2px',
                                                    width: '0%',
                                                    backgroundColor: '#E57C00',
                                                    transition: 'width 0.3s ease-in-out',
                                                },
                                                '&:hover::after': {
                                                    width: '100%',
                                                },
                                            }}
                                        >
                                            <img
                                                src='/assets/pricing.svg'
                                                style={{ width: "18px", marginLeft: locale == "ar" ? "6px" : "0px", marginRight: locale == "en" ? "5px" : "0px", height: "18px" }}
                                            />
                                            {t("nav.pricing")}
                                        </Typography>
                                        <Admin />
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>

                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'block', md: 'none' },
                            '@media (min-width: 950px)': {
                                display: 'none',
                            },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;