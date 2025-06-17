"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, IconButton, TextField, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import '../categories/categories.css';
import { categoryProducts, specialOffers } from '../categories/data';
import { Footer } from '../categories/Footer';
import { Categories } from './Categories';
import { Content } from './Content';
import { useTranslations } from 'next-intl';
import { BASE_URL_IMAGE } from '@/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleSpecialOfferClick } from '../categories/page';
import MyOffersSlider from '../categories/MyOffersSlider';
import { Item } from './Item';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useSpecialOffers } from '@/hooks/useSpecialOffers';
import { useShops } from '@/hooks/useShops';
import { searchMeals } from '@/utils/utils';

const page = () => {
    const t = useTranslations()

    const [currentBranch, setCurrentBranch] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const categoryRefs = useRef({});

    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const router = useRouter();

    const { data: offers, isLoading: isLoadingOffers } = useSpecialOffers(branchId);
    const { data: shops, isLoading, refetch } = useShops();

    useEffect(() => {
        if (!shopId || !branchId) {
            setSelectedShop(shops)
            router.push(`/shops/`);
        }
    }, [])

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
    const [userQuery, setUserQuery] = useState("")
    const [queryResult, setQueryResult] = useState([])

    
    useEffect(() => {
        const result = searchMeals(currentBranch, userQuery)
        setQueryResult(result)
    }, [userQuery])
    
    useEffect(() => {

        const selectedShop = shops?.find(shop => shop.id === Number(shopId));
        const selectedBranch = selectedShop?.brunchs?.find(branch => branch.id === Number(branchId));

        if (Array.isArray(selectedBranch?.cat_meal) && selectedBranch?.cat_meal.length > 0) {
            setSelectedCategory(selectedBranch?.cat_meal[0])
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
                        onChange={(e) => { setUserQuery(e.currentTarget.value) }}
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
                    {offers && offers.length > 0 ? (
                        <MyOffersSlider items={offers} openOffer={(offer) => {
                            handleSpecialOfferClick(router, branchId, shopId, offer.item, offer.id, currentBranch)
                        }} />
                    ) : (
                        <Box>
                            <Typography variant="body1" sx={{ marginBottom: "10px", }}>
                                <span style={{ fontSize: "11px", padding: "5px 16px" }}>{t("noSpecialOffers")}</span>
                            </Typography>
                        </Box>)}

                </Box>

                {/* Categories */}
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
                                                        <Item item={item?.meal}  />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}</Box>
                        </Box>
                    </Box>

                </Box>

                <Footer />
            </Box>
        </Box >
    );
};

const CatList = ({ currentBranch, selectedCategory, setSelectedCategory, scrollToCategory }) => {
    return (
        <Box sx={{
            padding: "10px 0px",
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
                        onClick={() => {
                            setSelectedCategory(item)
                            scrollToCategory(item.id)
                        }}>
                        <ListItem

                            sx={{
                                flexDirection: 'column',
                                background: backgroundColor,
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
const MealsList = ({ currentBranch, selectedCategory, categoryRefs }) => {
    return (<div>
        {currentBranch?.cat_meal.map(cat => {
            return (
                <div key={cat.id} ref={(el) => (categoryRefs.current[cat.id] = el)}>
                    <p> {cat?.name}</p>
                    {cat?.meals?.map(meal => {
                        return (
                            <div key={meal.id}>
                                <Item item={meal}/>
                            </div>
                        )
                    })}
                </div>)
        })}

    </div>)
}
export default page; 