"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Typography, IconButton, TextField, Card, CardMedia, Grid, Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
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
import { BASE_URL, BASE_URL_IMAGE, } from '../../../utils/constants'
import MyOffersSlider from './MyOffersSlider';
import { useSpecialOffers } from '@/hooks/useSpecialOffers';
import { useShops } from '@/hooks/useShops';
import { Item } from './Item';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { searchMeals } from '@/utils/utils';
import { useSelectShopAndBranchData } from '@/hooks/useSelectShopAndBranchData';
import { useQueryParamsRedirect } from '@/hooks/useShopSearchParam';


const page = () => {
    const t = useTranslations();
    const [isViewCategories, setIsViewCategories] = useState(true)
    const [inputQuery, setInputQuery] = useState("")
    const [queryResult, setQueryResult] = useState([])
    const router = useRouter();

    const { shopId, branchId, tableId, error: paramError } = useQueryParamsRedirect()

    const { data: offers, isLoading: isLoadingOffers } = useSpecialOffers(branchId);
    const { data: shops, isLoading, isError, error, refetch } = useShops();

    const { shopImg, currentBranch, error: SelectedBranchError } = useSelectShopAndBranchData(shops, shopId, branchId)

    useEffect(() => {
        const result = searchMeals(currentBranch, inputQuery)
        setQueryResult(result)
    }, [inputQuery])

    const prefetchTarget = (id) => {
        let catIdUrl = `/categories/${id}?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : '')
        router.prefetch(catIdUrl); // Next.js caches this
    };

    const handleChangeView = () => {
        setIsViewCategories(prev => !prev)
    }


    const handleChangeInSearchField = (e) => {
        setInputQuery(e.target.value)
    }

    if (isLoading) return <div>Loading ...</div>;

    if (isError) return <div>Error: {error.message}</div>;

    if (paramError) return <div>Error: {paramError}</div>
    if (SelectedBranchError) return <div>Error: {SelectedBranchError}</div>;

    return (
        <Box sx={{ backgroundColor: '#1E1E2A', minHeight: '100vh', color: 'white', position: "relative", padding: "0px 25px" }}>

            <Box
                sx={{
                    position: 'fixed', width: '100%', zIndex: 1000,
                    backgroundColor: '#1E1E2A',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '0 25px',
                    boxSizing: 'border-box',
                }}>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {shopImg ? <img src={`${BASE_URL_IMAGE}${shopImg}`} alt='log' style={{ maxHeight: "40px" }} />
                        : <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: "900", color: "#797993" }}>{t("logo")}</Typography>}
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
                        onChange={e => handleChangeInSearchField(e)}
                        InputProps={{
                            disableUnderline: true,
                            style: { color: 'white', width: '100%', fontSize: "11px" }
                        }}
                        sx={{ color: 'white', flexGrow: 1 }}
                    />
                    <span className='icon-settings-sliders' style={{ fontSize: "20px", color: "#797993" }}></span>
                </Box>
            </Box>

            <Box sx={{ paddingBottom: "40px" }}>
                <Box mt={2} sx={{ paddingTop: '100px' }}>
                    <Typography variant="body1" sx={{ marginBottom: "10px", }}>
                        <span style={{
                            fontSize: "14px",
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
                    </Typography>
                    </Box>)}

                </Box>

                {isViewCategories ? (<CategoryView t={t}
                    currentBranch={currentBranch}
                    prefetchTarget={prefetchTarget}
                    branchId={branchId}
                    shopId={shopId}
                    tableId={tableId}
                    router={router}
                />) : (
                    <GridView t={t}
                        currentBranch={currentBranch}
                        prefetchTarget={prefetchTarget}
                        branchId={branchId}
                        shopId={shopId}
                        tableId={tableId}
                        router={router}
                        queryResult={queryResult}
                    />
                )}

                <Footer handleChangeView={handleChangeView} />
            </Box>
        </Box>
    );
};

export default page;



export const handleSpecialOfferClick = (router, branchId, shopId, mealId, specialOfferId, currentBranch, tableId) => {
    const categoryWithMeal = currentBranch.cat_meal
        .find(category => {
            return category.meals.some(meal => meal.id === Number(mealId))
        }
        );
    if (shopId && branchId && categoryWithMeal) {
        router.push(`/ProductDetails/${mealId}?shopId=${shopId}&branchId=${branchId}&catId=${categoryWithMeal.id}&special=${specialOfferId}` + (tableId ? `&tableId=${tableId}` : ''));
        // router.push(`/ProductDetails/${mealId}?shopId=${shopId}&branchId=${branchId}&catId=${categoryWithMeal.id}&special=${specialOfferId}`);
    } else {
    }

}

const CategoryView = ({ t, currentBranch, prefetchTarget, shopId, branchId, tableId, router }) => {
    const handlCatClick = (id) => {
        if (shopId && branchId) {
            let catIdUrl = `/categories/${id}?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : '')
            router.push(catIdUrl);
        } else {
        }

    }

    return (
        <Box mt={3}>
            <Box sx={{ display: "flex" }}>
                <Typography variant="body1" sx={{ fontSize: "20px", marginRight: "30px" }}>
                    {t("categories")}
                </Typography>

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
        </Box>)
}

const GridView = ({ t, currentBranch, prefetchTarget, shopId, branchId, tableId, router, queryResult }) => {

    const [selectedCategory, setSelectedCategory] = useState(null)
    const categoryRefs = useRef({});

    const scrollToCategory = (category) => {
        // const ref = categoryRefs.current[category];
        // if (ref) {
        //     ref.scrollIntoView({ behavior: 'smooth' });
        // }
        const ref = categoryRefs.current[category];
        const offset = 160; // change to your header height

        if (ref) {
            const top = ref.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };


    useEffect(() => {
        if (Array.isArray(currentBranch?.cat_meal) && currentBranch?.cat_meal.length > 0) {
            setSelectedCategory(currentBranch?.cat_meal[0])
        }
    }, [])


    return (

        <Box mt={3} mb={"70px"}>
            <Box >
                <Box sx={{ display: 'flex', flexDirection: "column" }}>
                    <Box sx={{ width: "100%" }}>

                        <CatList currentBranch={currentBranch} scrollToCategory={scrollToCategory}
                            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </Box>

                    <Box sx={{ overflow: "auto" }}>
                        {queryResult.length === 0 ?
                            (<MealsList currentBranch={currentBranch} selectedCategory={selectedCategory} categoryRefs={categoryRefs} />
                            ) : (
                                <div>
                                    {
                                        queryResult?.map(item => (
                                            <div key={item?.meal?.id}>
                                                <Item item={item?.meal} />
                                            </div>
                                        ))
                                    }
                                </div>
                            )}</Box>
                </Box>
            </Box>

        </Box>

    );
};





const MealsList = ({ currentBranch, selectedCategory, categoryRefs }) => {
    return (<div>
        {currentBranch?.cat_meal.map(cat => {
            return (
                <div key={cat.id} ref={(el) => (categoryRefs.current[cat.id] = el)}>
                    <p> {cat?.name}</p>
                    {cat?.meals?.map(meal => {
                        return (
                            <div key={meal.id}>
                                <Item item={meal} />
                            </div>
                        )
                    })}
                </div>)
        })}

    </div>)
}

const CatList = ({ currentBranch, selectedCategory, setSelectedCategory, scrollToCategory }) => {
    return (
        <Box sx={{
            padding: "0px 0px",
            display: "flex",
            flexDirection: 'row',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            }
        }} gap={1}>
            {currentBranch?.cat_meal?.map((item, index) => {

                const isActive = selectedCategory?.id === item.id;
                const backgroundColor = isActive
                    ? 'linear-gradient(to Bottom, #797993, #48485B)'
                    : item?.bgcolor;
                const backgroundIcon = isActive ? "white" : "";
                const textColor = isActive && item.name !== "Popular" ? "white" : "#797993";
                const textColor2 = isActive && item.name !== "Popular" ? "white" : item?.color;

                return (
                    <Button key={index}
                        style={{ margin: '0px', padding: '0px' }}
                        onClick={() => {
                            setSelectedCategory(item)
                            scrollToCategory(item.id)
                        }}>
                        <ListItem

                            sx={{
                                flexDirection: 'column',
                                background: backgroundColor,
                                ml: 0, mr: 0,
                                mb: 2, padding: "5px 13px ",
                                width: "100%",
                                borderRadius: "20px", cursor: "pointer",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                        >

                            <ListItemIcon sx={{
                                minWidth: 0,
                                display: 'flex',
                                backgroundColor: backgroundIcon,
                                padding: "5px",
                                borderRadius: "50%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <img src={`${BASE_URL_IMAGE}${item.image}`} style={{ maxWidth: '50px', aspectRatio: '1/1' }} />
                            </ListItemIcon>

                            <ListItemText
                                primary={item?.name}
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: '10px',
                                        textAlign: 'center',
                                        color: textColor2,
                                    }
                                }} />

                            <KeyboardArrowRightOutlinedIcon sx={{
                                color: textColor, fontSize: "11px",
                                borderRadius: "50%", border: `1px solid ${textColor}`
                            }} />

                        </ListItem>
                    </Button>
                );
            })}
        </Box>
    )
}