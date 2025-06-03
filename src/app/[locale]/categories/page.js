"use client";
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Typography, IconButton, TextField, Card, CardMedia, Grid, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { Arrow } from './Arrow';
import './categories.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "@/i18n/navigation"
import { menuItems, specialOffers } from './data';
import { Footer } from './Footer';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useShop } from './context';
import { BASE_URL, BASE_URL_IMAGE,} from '../../../utils/constants'
import MyOffersSlider from './MyOffersSlider';
import { useSpecialOffers } from '@/hooks/useSpecialOffers';
import { useShops } from '@/hooks/useShops';

const page = () => {
    const t = useTranslations();
    // const [shops, setShops] = useState(null)
    const [currentShop, setCurrentShop] = useState(null)
    const [currentBranch, setCurrentBranch] = useState(null)
    // const [offers, setOffers] = useState([])

    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const tableId = searchParams.get('tableId')

    const router = useRouter();

    if (!shopId || !branchId) {
        router.push(`/shops/`);
    }



    const prefetchTarget = (id) => {
        let catIdUrl = `/categories/${id}?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : '')
        router.prefetch(catIdUrl); // Next.js caches this
    };

    const handlCatClick = (id) => {
        if (shopId && branchId) {
            let catIdUrl = `/categories/${id}?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : '')
            router.push(catIdUrl);
        } else {
            console.log("Shop or Branch not selected yet");// debug log
        }

    }

    const { data: offers, isLoading: isLoadingOffers } = useSpecialOffers(branchId);
    const { data: shops, isLoading, isError,error, refetch } = useShops();


    useEffect(() => {
        if (!shops) return;

        const selectedShop = shops?.find(shop => shop.id === Number(shopId));
        const selectedBranch = selectedShop?.brunchs?.find(branch => branch.id === Number(branchId));

        localStorage.setItem("selectedShopID", selectedShop.id)
        localStorage.setItem("selectedBranchID", selectedBranch.id)

        setCurrentShop(selectedShop)
        setCurrentBranch(selectedBranch)

    }, [shops])

    if (isLoading) return <div>Loading ...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <Box sx={{ backgroundColor: '#1E1E2A', minHeight: '100vh', color: 'white' }}>

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
                        placeholder={t("whatAreYouLookingFor")}
                        InputProps={{
                            disableUnderline: true,
                            style: { color: 'white', width: '100%', fontSize: "11px" }
                        }}
                        sx={{ color: 'white', flexGrow: 1 }}
                    />
                    <span className='icon-settings-sliders' style={{ fontSize: "20px", color: "#797993" }}></span>
                </Box>
            </Box>

            <Box sx={{ padding: '30px 25px' }}>
                <Box mt={2} sx={{ paddingTop: '100px' }}>
                    <Typography variant="body1" sx={{ marginBottom: "10px", }}>
                        <span style={{
                            fontSize: "11px",
                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            padding: "5px 16px", borderRadius: "0px 20px 20px 20px",
                        }}>{t("specialOffers")}</span>
                    </Typography>

                    {offers && offers.length > 0 ? (<MyOffersSlider items={offers} openOffer={(offer) => {
                        handleSpecialOfferClick(router, branchId, shopId, offer.item, offer.id, currentBranch, tableId)
                    }} />) : (<Box> <Typography variant="body1" sx={{ marginBottom: "10px", }}>
                        <span style={{
                            fontSize: "11px",
                            padding: "5px 16px"
                        }}>{t("noSpecialOffers")}</span>
                    </Typography></Box>)}
                    {/* <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "-50px" }}> */}
                    {/* {offers?.map((offer) => (
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
                                    {console.log(`${BASE_URL_IMAGE}${offer.img}`)}
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
                                                <Typography sx={{ textDecoration: 'line-through', fontSize: "12px" }}>{offer.priceAfter}</Typography>
                                                <Typography sx={{ fontSize: "15px" }}>{offer.priceBefore} <span style={{ color: "#575756", fontSize: "9px" }}>EGP</span></Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "27px", height: "27px", backgroundColor: "#797993", color: "white",
                                                    borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: 'pointer',
                                                }}>
                                                <Button onClick={() => {
                                                    console.log(">>>>> offer", offer)//debug log 
                                                    handleSpecialOfferClick(router, branchId, shopId, offer.item, offer.id, currentBranch)
                                                }}>
                                                    <AddIcon sx={{ fontSize: "17px" }} />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Card>

                            </Grid>
                        ))} */}
                    {/* </Grid> */}

                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="body1" sx={{ fontSize: "16px", marginRight: "30px" }}>{t("categories")}</Typography>

                        <Typography variant="body1" sx={{
                            marginBottom: "10px", display: "flex", fontSize: "10px",
                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            padding: "6px 20px", borderRadius: "20px", cursor: "pointer",
                        }}>
                            <span className="icon-fire" style={{ fontSize: "17px", marginRight: "6px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></span>
                            {t("popular")}
                        </Typography>
                        <Box sx={{ marginLeft: "-10px", marginTop: "4px" }}><Arrow /> </Box>
                    </Box>

                    <div className="menu-container" style={{ marginTop: "5px", marginBottom: "70px" }}>
                        {currentBranch?.cat_meal?.map((item, index) => (

                            <div key={item.id} className="menu-item" style={{ backgroundImage: `url(${BASE_URL_IMAGE}${item.cover})` }}>
                                <Button
                                    sx={{ width: '100%', height: '100%' }}
                                    onClick={() => { handlCatClick(item.id) }}
                                    onMouseEnter={() => { prefetchTarget(item.id) }}>
                                    <div className="overlay">
                                        <Typography className="menu-title" >{item.name}</Typography>
                                    </div>

                                    <Button
                                        sx={{
                                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                            width: "30px", height: "30px",
                                            padding: '0px', margin: '0px',
                                            minWidth: '0px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: "pointer",
                                            position: 'absolute', bottom: "0", right: "0",
                                        }}
                                    >
                                        <ArrowForwardIcon className="icon" sx={{ color: 'white', fontSize: '15px' }} />
                                    </Button>
                                </Button>
                            </div>

                        ))}
                    </div>
                </Box>

                <Footer />
            </Box>
        </Box >
    );
};

export default page;



export const handleSpecialOfferClick = (router, branchId, shopId, mealId, specialOfferId, currentBranch, tableId) => {
    const categoryWithMeal = currentBranch.cat_meal
        .find(category => {
            return category.meals.some(meal => meal.id === Number(mealId))
        }
        );
    console.log(categoryWithMeal) // debug log
    if (shopId && branchId && categoryWithMeal) {
        router.push(`/ProductDetails/${mealId}?shopId=${shopId}&branchId=${branchId}&catId=${categoryWithMeal.id}&special=${specialOfferId}` + (tableId ? `&tableId=${tableId}` : ''));
        // router.push(`/ProductDetails/${mealId}?shopId=${shopId}&branchId=${branchId}&catId=${categoryWithMeal.id}&special=${specialOfferId}`);
    } else {
        console.log("Shop or Branch not selected yet");// debug log
    }

}