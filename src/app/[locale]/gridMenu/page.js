"use client";
import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, TextField, Card, CardMedia, Grid, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import '../categories/categories.css';
import { categoryProducts, specialOffers } from '../categories/data';
import { Footer } from '../categories/Footer';
import { Categories } from './Categories';
import { Content } from './Content';
import { useTranslations } from 'next-intl';
import { BASE_URL_IMAGE, fetchData } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSpecialOffers, handleSpecialOfferClick } from '../categories/page';

const page = () => {
    const t = useTranslations()

    const [shops, setShops] = useState(null)
    const [currentBranch, setCurrentBranch] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [offers, setOffers] = useState([])


    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const router = useRouter();


    if (!shopId || !branchId) {
        setSelectedShop(shops)
        router.push(`/shops/`);
    }

    const getData = async (endPoint) => {

        const data = await fetchData(endPoint, setIsLoading);

        setShops(data.data.data)
    }

    useEffect(() => {
        getData('menu_all_restaurants')
        getSpecialOffers(setOffers, branchId)
    }, [])

    useEffect(() => {

        const selectedShop = shops?.find(shop => shop.id === Number(shopId));
        const selectedBranch = selectedShop?.brunchs?.find(branch => branch.id === Number(branchId));
        console.log("selectedBranch", selectedBranch)

        console.log('check setSelectedCategory', Array.isArray(selectedBranch?.cat_meal) && selectedBranch?.cat_meal?.length > 0)
        if (Array.isArray(selectedBranch?.cat_meal) && selectedBranch?.cat_meal.length > 0) {
            setSelectedCategory(selectedBranch?.cat_meal[0])
            console.log('setSelectedCategory')
        }

        setCurrentBranch(selectedBranch)

    }, [shops])


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
                        placeholder={t("whatAreYouLookingFor")} InputProps={{
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

                {/* offers TODO: specific offers handle  */}
                <Box mt={2} sx={{ paddingTop: '100px' }}>
                    <Typography variant="body1" sx={{ marginBottom: "10px", }}>
                        <span style={{
                            fontSize: "11px",
                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            padding: "5px 16px", borderRadius: "0px 20px 20px 20px",
                        }}>{t("specialOffers")}</span>
                    </Typography>

                    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "-50px" }}>
                        {offers.map((offer) => (
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
                                    {console.log(`${BASE_URL_IMAGE}${offer.img}`) /*debug log*/ }
                                    <CardMedia
                                        component="img"
                                        height="90"
                                        image={offer.img ? `${BASE_URL_IMAGE}${offer.img}` : ""}
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
                                                <Typography sx={{ textDecoration: 'line-through', fontSize: "12px" }}>{offer.before_discount}</Typography>
                                                <Typography sx={{ fontSize: "15px" }}>{offer.after_discount} <span style={{ color: "#575756", fontSize: "9px" }}>EGP</span></Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "27px", height: "27px", backgroundColor: "#797993", color: "white",
                                                    borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: 'pointer',
                                                }}>
                                                <Button onClick={() => handleSpecialOfferClick(router, branchId, shopId, offer.item, offer.id, currentBranch)}>
                                                    <AddIcon sx={{ fontSize: "17px" }} />
                                                </Button>
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
                            <Categories currentBranch={currentBranch} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />

                            <Box sx={{ flex: 1 }}>
                                <Content selectedCategory={selectedCategory} />
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