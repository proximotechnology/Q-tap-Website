import { Box, Typography, Divider } from '@mui/material';
import React from 'react';

export const Dashboard = () => {
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

                    <Typography variant='body1'
                        sx={{ color: "white", fontSize: "25px", marginBottom: "8px" }}>
                        Dashboard
                    </Typography>
                    <Divider sx={{
                        width: "12%", height: "3px", borderRadius: "20px",
                        margin: "6px 0px", backgroundColor: "#E57C00"
                    }} />

                    <Typography variant='body2'
                        sx={{ lineHeight: "30px", color: "white", fontSize: "13px" }}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                    </Typography>
                </Box>


            </Box>
        </Box>
    )
}
