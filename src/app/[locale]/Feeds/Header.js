"use client"
import React from 'react'
import { Box, Divider, IconButton, Typography } from '@mui/material';
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

            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <Typography sx={{ color: "white", fontSize: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <span className='icon-rss' style={{ fontSize: "25px", color: "#797993", marginRight: "6px" }}></span>
                    <span>{t("feeds")}</span>
                </Typography>
            </Box>

            <Divider
                sx={{
                    backgroundImage: "linear-gradient(to right, #797993, #302E3B)",
                    height: "1px", width: "15%", margin: "5px auto",
                }}
            />
            <Box sx={{ padding: "30px 20px" }}>
                <Box sx={{ width: "90%", height: "auto", padding: "15px 20px", backgroundColor: "#44404D", borderRadius: "30px 30px 30px 0px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ color: "white", fontSize: "12px", }}> Price Alert</Typography>
                        <Typography sx={{ color: "#AAAAAA", fontSize: "9px", }}>10 min ago</Typography>
                    </Box>

                    <Typography sx={{ color: "#949493", fontSize: "11px", marginTop: "5px" }}>
                        “The new circumstances under which we are placed, call for new words,
                        new phrases, and the transfer of old words to new objects.”
                    </Typography>
                </Box>

                <Box sx={{ marginTop: "10px", width: "90%", height: "auto", padding: "15px 20px", backgroundColor: "#44404D", borderRadius: "30px 30px 30px 0px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ color: "white", fontSize: "12px", }}>Menu Updates</Typography>
                        <Typography sx={{ color: "#AAAAAA", fontSize: "9px", }}>1 day ago</Typography>
                    </Box>

                    <Typography sx={{ color: "#949493", fontSize: "11px", marginTop: "5px" }}>
                        “The new circumstances under which we are placed, call for new words,
                        new phrases, and the transfer of old words to new objects.”
                    </Typography>
                </Box>


            </Box>
        </Box>
    )
}
