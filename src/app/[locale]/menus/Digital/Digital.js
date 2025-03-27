import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import './Digital.css'
import { useTranslations } from 'next-intl';
export const Digital = () => {
    const t = useTranslations()
    return (
        <Box sx={{
            padding: { xs: "20px", md: "50px 100px 70px 100px" },
            position: "relative",
            overflow: "hidden",
        }}>
            <Box
                sx={{

                    height: "100vh",
                    width: "100%",
                    backgroundImage: "url('/images/digitial.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(234, 236, 242, 0.6)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                }}
            />
            <Box sx={{ position: "relative", zIndex: 3 }}>
                <Typography variant='body1' sx={{ color: "#222240", fontSize: { xs: "24px", md: "28px" }, wordSpacing: "4px" }}>
                    {t("menuPage.whyDigitalMenu")}
                </Typography>
                <Divider sx={{ width: "5%", height: "3px", borderRadius: "20px", margin: "10px 0px", backgroundColor: "#E57C00" }} />

                <Box sx={{ padding: "10px 30px" }}>

                    {[
                        t("menuPage.why1"),
                        t("menuPage.why2"),
                        t("menuPage.why3"),
                        t("menuPage.why4"),
                        t("menuPage.why5"),
                        t("menuPage.why6"),
                        t("menuPage.why7"),
                        t("menuPage.why8"),

                    ].map((item, index) => (
                        <Typography key={index} variant='body2' sx={{ lineHeight: "40px", color: "#949493", alignItems: "center", fontSize: "15px" }}>
                            <img src="/assets/check.svg" alt="check" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            {item}
                        </Typography>
                    ))}
                </Box>

                <Box sx={{ width: "100%", height: { xs: "150px", md: "200px" }, padding: "10px 30px" , margin:"10px 0 30px 0"}}>
                    <img
                        src="/images/digitMenu.jpg"
                        alt="digitMenu"
                        style={{ width: "100%", height: "100%", borderRadius: "40px", objectFit: "cover", }}
                    />
                    <img
                        src="/images/phone.jpg"
                        alt="phone"
                        className="responsive-image"
                        style={{
                            borderRadius: "30px",
                            zIndex: 1,
                            position: "relative",
                            top: "-220%",
                            left: "70%",
                        }}
                    />
                </Box>

            </Box>
        </Box>
    );
};
