import { Box, Typography, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Customer = () => {
    const t = useTranslations()
    return (
        <Box
            sx={{
                height: "auto",
                padding: { xs: "20px", sm: "40px", md: "60px", lg: "60px 100px" },
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#EAECF2",
            }}
        >
            <Box>
                <Box sx={{ textAlign: { xs: "center", md: "right" } , direction:"rtl"}}>
                    <Typography variant="body1" sx={{ color: "#222240", fontSize: "20px" }}>
                        {t("customerSatisfaction")}
                        <Box style={{width: "50px", height: "3px", backgroundColor: "#E57C00",
                            borderRadius: "20px" ,margin:"3px 0px"}}></Box>
                    </Typography>

                        {/* <Divider
                            sx={{
                                width: "10%",
                                height: "3px",
                                borderRadius: "20px",
                                margin: "10px 0px",
                                backgroundColor: "#E57C00",
                                mx: { xs: "auto", md: "0" }, 
                            }}
                        /> */}
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        lineHeight: "25px",
                        color: "#949493",
                        fontSize: "15px",
                        padding: { xs: "20px", sm: "40px", md: "30px 30px" },
                    }}
                >
                    {t("lorem")}
                </Typography>
            </Box>

            <Box
                sx={{
                    margin: {xs:"80px 0px",lg:"120px 0px",},
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",

                }}
            >
                <Box
                    sx={{
                        border: "2px solid #E57C00",
                        height: "180px",
                        borderRadius: "22px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: "url('/images/girls.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "22px",
                            width: "65%",
                            height: { xs: "250px", md: "300px", lg:"350px" },

                        }}
                    />
                </Box>



            </Box>
        </Box>
    );
};
