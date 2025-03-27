import { Box, Typography, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Dashboard = () => {
    const t = useTranslations()
    return (
        <Box
            sx={{
                height: "auto",
                padding: { xs: "30px", md: "80px 100px" },
                position: "relative",
                overflow: "hidden",
            }}>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    backgroundImage: "url('/images/digitial.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgb(34, 34, 64,0.9)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    zIndex: 5
                }}>

                <Box sx={{
                    width: { xs: "100%", md: "50%" },
                    height: "auto",
                    marginBottom: { xs: "20px", md: "0" },
                    textAlign: "center", alignItems: "center",

                }}>
                    <Box sx={{ width: "100%" }}>
                        <img src="/images/Group 47.png" alt="ipad"
                            style={{ width: "25%", position: "relative", left: "10%" }} />
                        <img src="/images/Group 42.png" alt="laptop" style={{ width: "60%" }} />
                    </Box>

                </Box>


                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        padding: { xs: "20px 0", md: "0" }
                    }}>

                    <Box sx={{ direction: 'rtl', padding:"0 30px 30px 0" }}>
                        <Typography variant='body1'
                            sx={{ color: "white", fontSize: "25px", marginBottom: "8px" , marginRight:'20px'}}>
                            {t("dashboard")}
                        </Typography>
                        <Divider sx={{
                            width: "10%", height: "3px", borderRadius: "20px",
                            margin: "6px 0px", backgroundColor: "#E57C00"
                        }} />
                    </Box>


                    <Typography variant='body2'
                        sx={{ lineHeight: "30px", color: "white", fontSize: "13px" }}>
                        {t("lorem")}
                    </Typography>
                </Box>


            </Box>
        </Box>
    )
}
