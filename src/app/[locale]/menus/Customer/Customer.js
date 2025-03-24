import { Box, Typography, Divider } from '@mui/material';
import React from 'react';

export const Customer = () => {
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
                        Customer Satisfaction
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
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                    consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                    consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
                    odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                    nulla facilisi.
                </Typography>
            </Box>

            <Box
                sx={{
                    margin: "90px 0px",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",

                }}
            >
                <Box
                    sx={{
                        border: "2px solid #E57C00",
                        height: "150px",
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
                            height: { xs: "200px", md: "320px" },

                        }}
                    />
                </Box>



            </Box>
        </Box>
    );
};
