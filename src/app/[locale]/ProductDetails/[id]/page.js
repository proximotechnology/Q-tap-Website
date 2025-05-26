"use client";
import { categoryProducts, ingrediants, menuItems, options } from '@/app/[locale]/categories/data';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { Link } from "@/i18n/navigation"
import { addItemToCart } from "../cartUtils";
import { useLocale, useTranslations } from 'next-intl';
import { BASE_URL_IMAGE, fetchData, fetchShopsData, isAllItemComeFromSameBranch } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSpecialOffers } from '../../categories/page';

const sizes = ["S", "M", "L"];

const page = ({ params }) => {
    const locale = useLocale();
    const t = useTranslations()

    const { id } = params;//mealid
    // const [shopData, setShopData] = useState(null)
    const [mealData, setMealData] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    /*  */
    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const catId = searchParams.get('catId')
    const specialID = searchParams.get('special') || null
    const router = useRouter()


    const { data: offersData, isLoadingOffers, isErrorOffers, errorOffers } = useQuery({
        queryKey: ['restaurant-offers-data', branchId], // Include branchId in query key
        queryFn: () => getSpecialOffers(branchId),
        staleTime: 1000 * 60 * 15, // 15 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });


    if (!id) {
        return <p>{t("noProductSelected")}</p>;
    }
    if (!shopId || !branchId || !catId) return <p>{t("noProductSelected")}</p>

    const { data: shopData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['shops'],
        queryFn: fetchShopsData,
        staleTime: 1000 * 60 * 15, // 15 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!shopData) return;
        const shop = shopData?.find(shop => shop.id === Number(shopId));
        const selectedBranch = shop?.brunchs?.find(branch => branch.id === Number(branchId));
        const selectedCat = selectedBranch?.cat_meal?.find(cat => cat.id === Number(catId));
        const selectedMeal = selectedCat?.meals?.find(meal => meal.id === Number(id));
        setMealData(selectedMeal)
    }, [shopData])



    // ========================================================================
    // ======================= handle select meal options =====================
    // ========================================================================
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedExtra, setSelectedExtra] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [count, setCount] = useState(0)
    const [price, setPrice] = useState(0) // to send for calculation sub total without discount and tax
    const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0)
    const [totalprice, setTotalPrice] = useState(0)// to show 

    useEffect(() => {
        
            handlePrice()
    }, [count, mealData, selectedSize, selectedExtra, selectedOptions])

    const handlePrice = () => {
        /* calculate meal price  */
        let currentPrice = 0; // 

        if (selectedExtra) {
            selectedExtra?.map(item => {
                currentPrice += Number(item?.price)
            })
        }

        if (selectedOptions) {
            selectedOptions?.map(item => {
                currentPrice += Number(item?.price)
            })
        }

        if (selectedSize) {
            if (selectedSize === "S") currentPrice += Number(mealData?.price_small)
            if (selectedSize === "M") currentPrice += Number(mealData?.price_medium)
            if (selectedSize === "L") currentPrice += Number(mealData?.price_large)

        } else if (specialID) {
            const d = offersData?.find(item => Number(item.id) === Number(specialID))
            currentPrice += Number(d?.priceAfter) || 0

            if (Number.isNaN(Number(d?.priceAfter)))
                toast.error("somethingWentWrong")
        }
        else {
            currentPrice += Number(mealData?.price)
        }
        let sub = currentPrice;
        /* add discount and tax */
        if (mealData?.discount && !specialID) {
            sub -= Number(mealData?.discount) * currentPrice / 100
        }

        if (mealData?.Tax) {
            sub += Number(mealData?.Tax) * currentPrice / 100
        }
        setPriceBeforeDiscount(((currentPrice + Number(mealData?.Tax) * currentPrice / 100) * count).toFixed(2))
        setPrice((sub).toFixed(2))
        /* one piece price * quantity */
        setTotalPrice((sub * count).toFixed(2))
    }
    // ========================================================================
    const increaseCount = () => {
        setCount(count + 1)
    }

    const decreaseCount = () => {
        if (count > 0)
            setCount(count - 1)
    }

    const handleSize = (size) => {
        setSelectedSize(size)
    }

    const handleSelectVariants = (currentOptions) => {
        if (selectedOptions?.some(option => option.id === currentOptions.id)) {
            const newOptions = selectedOptions.filter(option => option.id !== currentOptions.id)
            setSelectedOptions(newOptions)
        } else {

            setSelectedOptions(prev => [...prev, currentOptions])
        }
    }

    const handleSelectExtra = (currentExtra) => {
        if (selectedExtra?.some(extra => extra.id === currentExtra.id)) {
            const newExtra = selectedExtra.filter(Extra => Extra.id !== currentExtra.id)
            setSelectedExtra(newExtra)
        } else {
            setSelectedExtra(prev => [...prev, currentExtra])
        }
    }
    // ========================================================================
    const addToCart = () => {
        if ((!selectedSize && !specialID) || count === 0) {
            toast.error(t("SizeCountRequired"))
            return;
        }

        let currentCart = localStorage.getItem("cartItems")

        if (currentCart) {
            currentCart = JSON.parse(currentCart)
        } else {
            currentCart = []
        }
        const isValidCart = isAllItemComeFromSameBranch(currentCart, mealData.brunch_id);
        if (!isValidCart) {
            toast.error(t("cartNotValid"))
            toast.error(t("cartShouldnotbeEmptyAndFromSameBranch"))
            return;
        }
        let sizePrice =
            selectedSize === 'L' ?
                mealData.price_large :
                selectedSize === 'M' ?
                    mealData.price_medium :
                    mealData.price_small;


        if (currentCart.length === 0) {
            let sizePrice =
                selectedSize === 'L' ?
                    mealData.price_large :
                    selectedSize === 'M' ?
                        mealData.price_medium :
                        mealData.price_small;
            currentCart.push({
                ...mealData,
                selectedSize,
                SelectedQuantity: count,
                selectedExtra,
                selectedOptions,
                special: specialID ? offersData.find(item => item.id === Number(specialID)) : null,

                price,
                shopId,
                branchId,
                catId,
                sizePrice,
            })


        } else {
            if (currentCart.some(item => item.selectedSize === selectedSize
                && isTheSameVariantsAndExtras(item, { selectedExtra, selectedOptions })
                && Number(specialID) === item?.special?.id
            )) {
                currentCart.map(item => {
                    if (item.selectedSize === selectedSize
                        && isTheSameVariantsAndExtras(item, { selectedExtra, selectedOptions })
                        && Number(specialID) === item?.special?.id) {
                        item.SelectedQuantity += count;
                    }
                })

            } else {
                currentCart.push({
                    ...mealData,
                    selectedSize,
                    SelectedQuantity: count,
                    selectedExtra,
                    selectedOptions,
                    special: specialID ? offersData.find(item => item.id === Number(specialID)) : null,

                    price,
                    shopId,
                    branchId,
                    catId,
                    sizePrice,
                })

            }
        }
        localStorage.setItem("cartItems", JSON.stringify(currentCart))
        setSelectedExtra([])
        setCount(0)
        setPrice(0)
        setSelectedOptions([])
        setSelectedSize(null)
    }

    const isTheSameVariantsAndExtras = (obj1, obj2) => {
        const sortByIdDesc = (arr) => [...arr].sort((a, b) => b.id - a.id);

        const obj1Extra = JSON.stringify(sortByIdDesc(obj1?.selectedExtra ?? []));
        const obj2Extra = JSON.stringify(sortByIdDesc(obj2?.selectedExtra ?? []));

        const obj1Options = JSON.stringify(sortByIdDesc(obj1?.selectedOptions ?? []));
        const obj2Options = JSON.stringify(sortByIdDesc(obj2?.selectedOptions ?? []));

        return obj1Extra === obj2Extra && obj1Options === obj2Options;
    };

    // ========================================================================


    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "100vh",
                width: '100%',
                position: 'fixed', right: 0, top: 0,
                overflowY: "auto",
            }}>
            {/* الجزي الثابت  */}
            {isLoading ? <>loading</> :
                <>
                    <Box sx={{ backgroundColor: "#1E1E2A", position: "fixed", top: 0, width: "100%", zIndex: 2201 }}>
                        <Box >  {/* name ,description ,Details ,image  */}
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '200px',
                                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)), 
    url(${BASE_URL_IMAGE}${mealData?.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '0px 0px 20px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '95%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '12px 12px 0px 12px',
                                    }}
                                >
                                    {/* <Link href={`/categories/${catId}?branchId=${branchId}&shopId=${shopId}`}> */}
                                    <IconButton sx={{ color: "white" }} onClick={router.back}>
                                        <ArrowBackIosIcon sx={{ fontSize: "22px" }} />
                                    </IconButton>
                                    {/* </Link> */}

                                    <IconButton color="inherit">
                                        <span className='icon-menu' style={{ fontSize: "22px" }}></span>
                                    </IconButton>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        height: '100%',
                                    }}
                                >
                                    <Typography variant="h6"
                                        sx={{
                                            textAlign: 'center',
                                            fontSize: '23px',
                                            color: 'white',
                                            textShadow: '2px 0px #E57C00'
                                        }}>
                                        {mealData?.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ position: 'relative', top: '-40px', marginRight: "50px", float: "right" }}>
                            <Box sx={{
                                background: "#302E3B", width: "45px", color: "white", borderRadius: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                justifyContent: "center", textAlign: "center", alignItems: "center", padding: "8px 6px",
                            }}>
                                <AddCircleOutlinedIcon
                                    onClick={() => { increaseCount() }}
                                    sx={{ fontSize: "22px", color: "#48485B", cursor: "pointer" }}
                                />
                                <Typography sx={{ fontSize: "13px", fontWeight: "900", padding: "4px 0px", color: "white" }}>
                                    {count}
                                </Typography>
                                <RemoveCircleOutlinedIcon
                                    onClick={() => { decreaseCount() }}
                                    sx={{ fontSize: "22px", color: "#48485B", cursor: "pointer" }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{ zIndex: "5000", padding: "15px 20px", }} >
                            <Box>
                                <Typography variant="h6" sx={{ fontSize: "21px", fontWeight: '900', color: 'white' }}>{mealData?.name}</Typography>
                                <Typography variant="body2" sx={{ fontSize: "11px", color: "#AAAAAA" }}>{mealData?.brief}</Typography>
                            </Box>
                            <Box width={"100%"} height={"60px"}>

                                <Divider sx={{ width: "100%", height: "0.1px", backgroundColor: "#797993" }} />
                                <Box sx={{
                                    display: "flex", alignItems: "center", textAlign: "center",
                                    padding: "8px 0px", justifyContent: "space-around"
                                }}>

                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <span className="icon-star" style={{ color: "#ef7d00", fontSize: "14px" }}></span>
                                        <Typography variant="body2" color="white" sx={{ fontSize: '13px', marginLeft: "3px" }}  >
                                            {/*// TODO: handle rating */}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center">
                                        <span className="icon-calories-1"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></span>
                                        <Typography variant="body2" color="white" sx={{ fontSize: '13px', marginLeft: "3px" }} >
                                            {mealData?.Calories}
                                            <span style={{ fontSize: '12px', marginLeft: "3px", color: "#AAAAAA" }}>{t("kcal")}</span></Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center">
                                        <span className="icon-chronometer" ><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span></span>
                                        <Typography variant="body2" color="white"
                                            sx={{ fontSize: '13px', marginLeft: "3px" }} >
                                            {/* TODO: prepare time  */}
                                            <span style={{ fontSize: '12px', marginLeft: "3px", color: "#AAAAAA" }}>{t("min")}</span></Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ width: "100%", height: "0.1px", backgroundColor: "#797993" }} />
                            </Box>
                        </Box>
                    </Box>

                    {/* الجزء المتحرك  */}
                    <Box sx={{ position: "relative", top: "330px", padding: "12px 20px" }} >

                        <Box display="flex" alignItems="center" gap={3} >
                            {!specialID && <Typography variant="h6" sx={{ fontSize: '12px', fontWeight: "bold", color: 'white' }}>
                                {t("size")}
                            </Typography>}
                            {!specialID && sizes.map((size) => {
                                return (
                                    <>
                                        <Typography>
                                            {
                                                (size === "S") ? mealData?.price_small : <></>
                                            }
                                            {
                                                (size === "M") ? mealData?.price_medium : <></>
                                            }
                                            {
                                                (size === "L") ? mealData?.price_large : <></>
                                            }
                                            EGP
                                        </Typography>
                                        <Button
                                            key={size}
                                            onClick={() => { handleSize(size) }}
                                            sx={{
                                                width: "30px",
                                                height: "30px",
                                                fontSize: "10px",
                                                borderRadius: "50%",
                                                minWidth: "20px",
                                                backgroundColor: selectedSize === size ? "#797993" : "#302E3B",
                                                color: selectedSize === size ? "white" : "gray",
                                                "&:hover": {
                                                    backgroundColor: selectedSize === size ? "#797993" : "#302E3B",
                                                },
                                            }}
                                        >
                                            {t(size)}
                                        </Button>
                                    </>
                                );
                            })}
                        </Box>   {/* size */}
                        {!specialID && mealData?.discount ? <Typography>discount {mealData?.discount} %</Typography> : <></>}
                        {!specialID && mealData?.Tax ? <Typography>Tax {mealData?.Tax} %</Typography> : <></>}
                        <Box sx={{ marginTop: "15px" }}>
                            <Typography variant="h6" sx={{ fontSize: "12px", color: 'white' }}>
                                {t("options")} <span style={{ fontSize: "9px", fontWeight: '300', color: 'white' }}>{t("required)")}</span>
                            </Typography>

                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {mealData?.variants?.map((option, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => { handleSelectVariants(option) }}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "47%",
                                            height: "25px",
                                            backgroundColor: selectedOptions?.some(item => item.id === option.id) ? "#48485B" : "#1E1E2A",
                                            color: selectedOptions?.some(item => item.id === option.id) ? "white" : "#AAAAAA",
                                            border: selectedOptions?.some(item => item.id === option.id) ? "none" : "1px solid #48485B",
                                            borderRadius: "20px",
                                            padding: "3px 10px",
                                            "&:hover": {
                                                backgroundColor: selectedOptions?.some(item => item.id === option.id) ? "#48485B" : "#1E1E2A",
                                            },
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontSize: "11px", textTransform: "capitalize" }}>
                                            {option.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ marginLeft: "auto", fontSize: "9px", textTransform: "capitalize", fontWeight: "bold" }}>
                                            {option.price === 0 ? <span style={{ fontWeight: 400 }}>{t("free")}</span>
                                                : `+${option.price} EGP`}
                                        </Typography>
                                    </Button>
                                ))}
                            </Box>
                        </Box> {/* Options */}

                        <Box sx={{ marginTop: "15px" }} >
                            <Typography variant="h6" sx={{ fontSize: "12px", color: 'white' }}>
                                {t("extra")}
                            </Typography>

                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {mealData?.extras?.map((extra, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => { handleSelectExtra(extra) }}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "47%",
                                            height: "25px",
                                            backgroundColor: selectedExtra?.some(item => item.id === extra.id) ? "#48485B" : "#1E1E2A",
                                            color: selectedExtra?.some(item => item.id === extra.id) ? "white" : "#AAAAAA",
                                            border: selectedExtra?.some(item => item.id === extra.id) ? "none" : "1px solid #48485B",
                                            borderRadius: "20px",
                                            padding: "3px 10px",
                                            "&:hover": {
                                                backgroundColor: selectedExtra?.some(item => item.id === extra.id) ? "#48485B" : "#1E1E2A",
                                            },
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontSize: "11px", textTransform: "capitalize" }}>
                                            {extra.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ marginLeft: "auto", fontSize: "9px", textTransform: "capitalize", fontWeight: "bold" }}>

                                            {extra.price === 0 ? <span style={{ fontWeight: 400 }}>{t("free")}</span>
                                                : `+${extra.price} EGP`}
                                        </Typography>
                                    </Button>
                                ))}
                            </Box>
                        </Box>  {/* Extra */}

                        <Box sx={{ marginTop: "15px" }} >
                            <Typography variant="h6" sx={{ fontSize: "12px", color: 'white' }}>
                                {t("ingrediants")}
                            </Typography>

                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {/* {ingrediants.map((option, index) => (
                            <Button key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "23%",
                                    height: "25px",
                                    backgroundColor: "#302E3B",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "20px",
                                    padding: "3px 10px",
                                    "&:hover": {
                                        backgroundColor: "#302E3B",
                                    },
                                }}
                            >
                                <Typography variant="body2" sx={{ fontSize: "8px", textTransform: "capitalize" }}>
                                    {option.name}
                                </Typography>
                            </Button>
                        ))} */}
                                {mealData?.Ingredients}
                            </Box>

                        </Box> {/* Ingrediants */}

                        <Box sx={{ marginTop: "15px", marginBottom: "120px" }} >
                            <Typography variant="h6" sx={{ fontSize: "13px", color: 'white' }}>
                                {t("description")}
                            </Typography>

                            <Typography variant="body2" sx={{ fontSize: "11px", color: '#AAAAAA', width: "100%" }}>
                                {mealData?.Description}</Typography>
                        </Box>{/* Description */}

                    </Box>


                    {/* Footer */}
                    <Box
                        sx={{
                            position: "fixed", bottom: 0, backgroundColor: "#302E3B", height: "40px",
                            width: "90%", padding: "20px", alignItems: "center",
                            boxShadow: 3, borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between",
                        }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold", color: 'gray' }}>
                                {t("price")}
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: "bold", color: 'white' }}>
                                {selectedSize && count !==0 && !specialID && <span style={{ textDecoration: 'line-through' }}>{priceBeforeDiscount}</span>}{" "}
                                {selectedSize && count ? totalprice : 0}
                                <span style={{ fontSize: "10px", color: '#575756' }}> EGP</span>
                            </Typography>
                        </Box>

                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: "gray", mx: 1 }} />

                        <Box sx={{ width: "46%" }}>
                            <Button
                                onClick={() => { addToCart() }}
                                sx={{
                                    backgroundImage: 'linear-gradient(to right, #302E3B, #797993)',
                                    color: "white",
                                    textTransform: "capitalize",
                                    fontSize: "12px",
                                    float: "right",
                                    borderRadius: "20px",
                                    height: "32px",
                                    width: '100%',

                                    "&:hover": {
                                        backgroundColor: "#ef7d10",
                                    }
                                }}
                            >
                                {t("addToCart")} <span style={{ fontSize: "17px", marginLeft: "10px" }}>+</span>
                            </Button>
                        </Box>
                    </Box>
                </>}


        </Box >

    )
}

export default page; 