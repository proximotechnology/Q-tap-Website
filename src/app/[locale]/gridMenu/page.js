"use client";
import React, { useState } from 'react'
import { Box, Typography, IconButton, TextField, Card, CardMedia, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import '../categories/categories.css';
import {  categoryProducts, specialOffers } from '../categories/data';
import { Footer } from '../categories/Footer';
import { Categories } from './Categories';
import { Content } from './Content';
import { useTranslations } from 'next-intl';

const page = () => {
    const [filteredItems, setFilteredItems] = useState(categoryProducts || []);
    const t = useTranslations()

    return (
        <Box sx={{ backgroundColor: '#1E1E2A', minHeight: '100vh', color: 'white' }}>
            {/* header */}
            <Box sx={{
                position: 'fixed', top: 0, width: '90%', zIndex: 1000, padding: "20px",
                backgroundColor: '#1E1E2A',
            }}>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: "900", color: "#797993" }}>{t("logo")}</Typography>
                    <IconButton color="inherit">
                        <span className="icon-menu" sx={{ fontSize: "20px", color: "white" }}></span>
                    </IconButton>
                </Box>

                <Typography variant="body2" display="flex" textAlign="center" alignItems={"center"} justifyContent={"center"}
                    sx={{ fontSize: "12px", color: "#AAAAAA" }}>
                    <LocationOnIcon fontSize="small" sx={{ fontSize: "16px", color: "#797993" }} />
                    {t("cityHere")}
                </Typography>

                <Box mt={1} display="flex" alignItems="center"
                    sx={{ backgroundColor: '#302E3B', borderRadius: '50px', padding: '5px 13px' }}>
                    <span className='icon-search' style={{ marginRight: "6px", color: "#797993" }} ></span>
                    <TextField
                        variant="standard"
                        placeholder={t("whatAreYouLookingFor")}                        InputProps={{
                            disableUnderline: true,
                            style: { color: 'white', width: '100%', fontSize: "11px" }
                        }}
                        sx={{ color: 'white', flexGrow: 1 }}
                    />
                    <span className='icon-settings-sliders' style={{ fontSize: "20px", color: "#797993" }}></span>
                </Box>
            </Box>

            {/* offers, categories */}
            <Box sx={{ padding: '30px 25px' }}>

                {/* offers */}
                <Box mt={2} sx={{ paddingTop: '100px' }}>
                    <Typography variant="body1" sx={{ marginBottom: "10px", }}>
                        <span style={{
                            fontSize: "11px",
                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            padding: "5px 16px", borderRadius: "0px 20px 20px 20px",
                        }}>{t("specialOffers")}</span>
                    </Typography>

                    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "-50px" }}>
                        {specialOffers.map((offer) => (
                            <Grid item key={offer.id} xs={6} sm={6} md={4} lg={3} >
                                <Box sx={{
                                    backgroundColor: "#48485B", color: "white", width: "40px", height: "40px",
                                    borderRadius: "50%", display: "flex", flexDirection: "row", justifyContent: "center",
                                    textAlign: "center", alignItems: "center", position: "relative", top: "30px", left: "80%",
                                }}>
                                    <Typography sx={{ fontSize: "12px" }}>{offer.discount}</Typography>
                                    <span style={{ fontSize: "12px", color: "#AAAAAA", marginLeft: "1px", fontWeight: "bold" }}>%</span>
                                </Box>
                                <Card
                                    sx={{
                                        backgroundColor: '#302E3B',
                                        color: 'white',
                                        borderRadius: '20px',
                                        height: 'auto',
                                    }} >

                                    <CardMedia
                                        component="img"
                                        height="90"
                                        image={offer.imageUrl}
                                        alt={offer.name}
                                        sx={{
                                            borderRadius: '0px 0px 20px 20px',
                                            backgroundSize: "contain",
                                            backgroundPosition: "center",
                                        }} />

                                    <Box sx={{ padding: "5px 12px" }}>
                                        <Typography sx={{ color: "#797993", fontWeight: "900", fontSize: "14px" }}>{offer.name}</Typography>
                                        <Typography sx={{ fontSize: "8px", color: "#AAAAAA" }}>{t("brief")}</Typography>

                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{ textDecoration: 'line-through', fontSize: "12px" }}>{offer.oldPrice}</Typography>
                                                <Typography sx={{ fontSize: "15px" }}>{offer.newPrice} <span style={{ color: "#575756", fontSize: "9px" }}>EGP</span></Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "27px", height: "27px", backgroundColor: "#797993", color: "white",
                                                    borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: 'pointer',
                                                }}>
                                                <AddIcon sx={{ fontSize: "17px" }} />
                                            </Box>
                                        </Box>
                                    </Box>

                                </Card>

                            </Grid>
                        ))}
                    </Grid>

                </Box>

                {/* Categories */}
                <Box mt={3}>
                    <Box >
                        <Box sx={{ display: 'flex', flexDirection: "column" }}>
                            <Categories  setFilteredItems={setFilteredItems}/>

                            <Box sx={{ flex: 1 }}>
                                <Content  items={filteredItems}/>
                            </Box>
                        </Box>
                    </Box>

                </Box>

                <Footer />
            </Box>
        </Box >
    );
};

export default page; 