import React from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from "@/i18n/navigation"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const t = useTranslations()
    const router = useRouter();
    return (
        <Box
            sx={{
                backgroundColor: '#1E1E2A',
                height: "25vh",
                zIndex: 1322,
                position: "fixed",
                top: 0,
                width: "100%",
                color: "white",
            }}
        >
            {/* الدايره المقلوبه  */}
            <Box
                sx={{
                    position: "relative",
                    top: '-22vh',
                    width: '100%',
                    height: '50vh',
                    borderRadius: '50%',
                    backgroundColor: '#302E3B',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    overflow: 'hidden',
                    zIndex: 1,

                }}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "0",
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                        }}>

                        <IconButton sx={{ color: "white" }} onClick={() => router.back()}>
                            <ArrowBackIosIcon sx={{ fontSize: "22px" }} />
                        </IconButton>

                        <IconButton color="inherit">
                            <span className='icon-menu' style={{ fontSize: "22px" }}></span>
                        </IconButton>
                    </Box>

                    {/* header */}
                    <Box sx={{ display: "flex", flexDirection: "column", height: "12vh", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                        <Typography sx={{ marginBottom: "15px", alignItems: "center" }}>
                            <img
                                src="/assets/helplogo.svg"
                                style={{
                                    backgroundImage: "linear-gradient(to right, #FDB913, #F2672E)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    width: "20px", height: "20px",
                                    marginRight: "6px",
                                    display: "inline-block",
                                }}
                            ></img>
                            <span>{t("support")}</span></Typography>
                        <Typography
                            style={{ color: "#AAAAAA", fontSize: "13px", width: "60%" }}
                        >{t("plLetUsKnowIFuHaveProblem")}</Typography>
                    </Box>

                </Box>


            </Box>
        </Box>
    )
}
