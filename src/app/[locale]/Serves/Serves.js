import React from 'react';
import { Grid, Box, Typography, Divider, Hidden } from "@mui/material";
import { useTranslations } from 'next-intl';

const categories = [
    [
        {
            title: "Restaurant", color: "#FFFFFF", textColor: "#E57C00", size: "small",
            icon: <img src="/assets/restaurant.svg" alt="Restaurant" className='icon-image' />
        },
        {
            title: "Cloud Kitchen", color: "#E57C00", textColor: "#FFFFFF", size: "large",
            icon: <img src="/assets/cloud.svg" alt="cloud" className='icon-image'/>
        },
    ],
    [
        {
            title: "Café", color: "#E57C00", textColor: "#FFFFFF", size: "large",
            icon: <img src="/assets/cafe.svg" alt="cafe"  className='icon-image'/>
        },
        {
            title: "Hotel Resto", color: "#FFFFFF", textColor: "#E57C00", size: "small",
            icon: <img src="/assets/hotel.svg" alt="Hotel"  className='icon-image'/>
        },
    ],
    [
        {
            title: "Fast Food", color: "#FFFFFF", textColor: "#E57C00", size: "small",
            icon: <img src="/assets/fast.svg" alt="fast food" className='icon-image' />
        },
        {
            title: "Pastry Shop", color: "#E57C00", textColor: "#FFFFFF", size: "large",
            icon: <img src="/assets/pastry.svg" alt="Pastry Shop"  className='icon-image'/>
        },
    ],
    [
        {
            title: "Pizza Outlet", color: "#E57C00", textColor: "#FFFFFF", size: "large",
            icon: <img src="/assets/pizza.svg" alt="Pizza Shop"  className='icon-image'/>
        },
        {
            title: "Bakery Shop", color: "#FFFFFF", textColor: "#E57C00", size: "small",
            icon: <img src="/assets/Bakery.svg" alt="Bakery Shop" className='icon-image' />
        },
    ],
    [
        {
            title: "Food Truck", color: "#FFFFFF", textColor: "#E57C00", size: "small",
            icon: <img src="/assets/truck.svg" alt="Truck Shop"  className='icon-image'/>
        },
        {
            title: "Fruits Store", color: "#E57C00", textColor: "#FFFFFF", size: "large",
            icon: <img src="/assets/fruits.svg" alt="Fruits Shop" className='icon-image' />
        },
    ],
];
export const Serves = () => {
    const t = useTranslations()
    return (
        <div id="we-serve"> 

        <Box sx={{
            backgroundImage: "url('/images/setup.jpg')", height: "auto",
            width: "100%", position: "relative", backgroundSize: "cover", padding: { xs: "20px 0px", md: "40px 0px" },
            backgroundPosition: "center",
        }}>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 1,
                }} />
            <Box sx={{ position: "relative", textAlign: "center", zIndex: 10 }}>
                <Box sx={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: "center", marginBottom: "40px",
                }}>
                    <Typography variant="body2" align="center" gutterBottom
                        sx={{ color: "white", fontSize: { xs: "20px", md: "25px" }, zIndex: 12 }}>
                        {t("homePage.whoWeServe")}
                    </Typography>
                    <Divider sx={{
                        width: { xs: "20%", md: "11%" }, borderRadius: "20px", marginTop: "-20px",
                        height: "8px", border: "none", backgroundColor: "#E57C00", zIndex: 11
                    }} />
                </Box>

                <Grid container spacing={2} sx={{ 
                      '@media (min-width: 900px) and (max-width: 1050px)': {
                        width: "95%", margin: "0 auto", justifyContent: "center", marginBottom: "60px"},
                    width: { xs: "80%", md: "80%" },
                margin: "0 auto", justifyContent: "center", marginBottom: "60px" }}  >
                    {categories.map((column, colIndex) => (
                        <Grid item xs={6} sm={4} md={2} key={colIndex} sx={{ textAlign: "center" }}>
                            {column.map((category, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative', 
                                        backgroundColor: category.color,
                                        color: category.textColor,
                                        borderRadius: "20px",
                                        width: { xs: "130px", sm: "130px" },
                                        height: category.size === "large" ? { xs: "160px", sm: "200px" } : { xs: "100px", sm: "110px" },
                                        textAlign: "left",
                                        padding: "15px",
                                        boxShadow: 3,
                                        mb: 3,
                                        overflow:'hidden',
                                        "&:hover": {cursor:"pointer", transform: "scale(1.05)", transition: "0.3s" }
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontSize: "25px" }}>{category.icon}</Typography>
                                    <Typography className='fw-600' variant="body1" sx={{ fontSize: "14px",width:'85%' }}>{t(category.title)} </Typography>

                                    {/* {category.title !== "Cloud Kitchen"||"Pastry Shop"||"Pastry Shop"?<Typography variant="body1" sx={{ fontSize: "14px" }}>{category.title} </Typography>
                                    :  <Typography variant="body1" sx={{ fontSize: "14px" }}>{category.title.split(" ")[0]} <br/> {category.title.split(" ")[1]} </Typography>}

                                     */}
                                     {category.size =="large"? <Typography variant="body1" className='typography-image' sx={{ opacity:.1, position:"absolute", top:"80px" , left:"25px"}}>{category.icon}</Typography> 
                                      : null }
                                          

                                </Box>
                            ))}
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: "center", marginBottom: "80px",
                }}>
                    <Typography variant="body2" align="center" gutterBottom
                        sx={{ color: "white", fontSize: { xs: "20px", md: "25px" }, zIndex: 12 }}>
                        {t("homePage.ourClients")}
                    </Typography>
                    <Divider sx={{
                        width: { xs: "20%", md: "11%" }, borderRadius: "20px", marginTop: "-20px",
                        height: "8px", border: "none", backgroundColor: "#E57C00", zIndex: 11
                    }} />
                </Box>
            </Box>
        </Box>

        </div>

    );

};
