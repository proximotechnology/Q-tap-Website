"use client";
import { categoryProducts, ingrediants, menuItems, options } from '@/app/[locale]/categories/data';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import {Link} from "@/i18n/navigation"

const sizes = ["S", "M", "L"];


import { addItemToCart } from "../cartUtils";
import { useLocale, useTranslations } from 'next-intl';
const page = ({ params }) => {
    const locale = useLocale();
    const t = useTranslations()
    const { id } = params;
    // console.log({ id })

    if (!id) {
        return <p>{t("noProductSelected")}</p>;
    }
    // البحث عن المنتج بناءً على ID
    let selectedProduct = null;
    let selectedCategory = null;

    Object.keys(categoryProducts).forEach((key) => {
        const product = categoryProducts[key].find((p) => p.id === parseInt(id));
        if (product) {

            selectedCategory = menuItems[--key];
            selectedProduct = product;
            // console.log(key);
            // console.log(product);

        }
    })

    if (!selectedProduct) {
        return <p>{t("productNotFound")}</p>;
    }
    // console.log(selectedCategory);
    // console.log(selectedProduct);
    // ========================================================================
    const handleAddToCart = (product) => {
        addItemToCart(product);
        window.location.href = `/${locale}/cart`;
    };

    // ========================================================================
    const [itemCount, setItemCount] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('itemCount')) || [];
        } catch {
            return [];
        }
    });

    const saveToLocalStorage = (items) => {
        localStorage.setItem('itemCount', JSON.stringify(items));
    };

    const handleAddItem = (itemId) => {
        setItemCount((prevItems) => {
            const updatedItems = prevItems.map(item => 
                item.id === itemId ? { ...item, count: item.count + 1 } : item
            );

            if (!updatedItems.some(item => item.id === itemId)) {
                updatedItems.push({ id: itemId, count: 1 });
            }

            saveToLocalStorage(updatedItems);
            return updatedItems;
        });
    };

    const handleMinusItem = (itemId) => {
        setItemCount((prevItems) => {
            const updatedItems = prevItems
                .map(item => 
                    item.id === itemId ? { ...item, count: item.count - 1 } : item
                )
                .filter(item => item.count > 0);

            saveToLocalStorage(updatedItems);
            return updatedItems;
        });
    };

    const getItemCount = (itemId) => {
        return itemCount.find(item => item.id === itemId)?.count || 0;
    };

    // ========================================================================
    const [selectedSize, setSelectedSize] = useState({});

    useEffect(() => {
        const storedSize = localStorage.getItem('selectedSize');
        if (storedSize) {
            setSelectedSize(JSON.parse(storedSize));
        }
    }, []); // يتم تنفيذها مرة واحدة عند التحميل

    const handleSizeClick = (productId, size) => {
        const updatedSizes = { ...selectedSize, [productId]: size };
        localStorage.setItem('selectedSize', JSON.stringify(updatedSizes));
        setSelectedSize(updatedSizes);
    };


    // ========================================================================
    const [selectedItemOptions, setSelectedItemOptions] = useState({});

    const handleOptionClick = (itemId, option) => {
        setSelectedItemOptions((prev) => {
            const currentOptions = prev[itemId] || [];
            const updatedOptions = currentOptions.includes(option)
                ? currentOptions.filter((selected) => selected !== option)
                : [...currentOptions, option];
            return { ...prev, [itemId]: updatedOptions };
        });
    };

    useEffect(() => {
        localStorage.setItem('selectedItemOptions', JSON.stringify(selectedItemOptions));
    }, [selectedItemOptions]);

    // ========================================================================
    const [selectedItemExtra, setSelectedItemExtra] = useState({});

    const handleExtraClick = (itemId, extra) => {
        setSelectedItemExtra((prev) => {
            const currentExtra = prev[itemId] || [];
            const updatedExtra = currentExtra.includes(extra)
                ? currentExtra.filter((selected) => selected !== extra)
                : [...currentExtra, extra];
            return { ...prev, [itemId]: updatedExtra };
        });
    };

    useEffect(() => {
        localStorage.setItem('selectedItemExtra', JSON.stringify(selectedItemExtra));
    }, [selectedItemExtra]);


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
            <Box sx={{ backgroundColor: "#1E1E2A", position: "fixed", top: 0, width: "100%", zIndex: 2201 }}>
                <Box >  {/* name ,description ,Details ,image  */}
                    <Box
                        sx={{
                            width: '100%',
                            height: '200px',
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)), 
    url(${selectedCategory.image})`,
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
                            <Link href={`/categories/${selectedCategory.id}`}>
                                <IconButton sx={{ color: "white" }}>
                                    <ArrowBackIosIcon sx={{ fontSize: "22px" }} />
                                </IconButton>
                            </Link>

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
                                {t(selectedCategory.title)}
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
                            onClick={() => handleAddItem(selectedCategory.id)}
                            sx={{ fontSize: "22px", color: "#48485B", cursor: "pointer" }}
                        />
                        <Typography sx={{ fontSize: "13px", fontWeight: "900", padding: "4px 0px", color: "white" }}>
                            {getItemCount(selectedCategory.id)}
                        </Typography>
                        <RemoveCircleOutlinedIcon
                            onClick={() => handleMinusItem(selectedCategory.id)}
                            sx={{ fontSize: "22px", color: "#48485B", cursor: "pointer" }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{ zIndex: "5000", padding: "15px 20px", }} >
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: "21px", fontWeight: '900', color: 'white' }}>{selectedProduct.name}</Typography>
                        <Typography variant="body2" sx={{ fontSize: "11px", color: "#AAAAAA" }}>{selectedProduct.brief}</Typography>
                    </Box>
                    <Box width={"100%"} height={"60px"}>

                        <Divider sx={{ width: "100%", height: "0.1px", backgroundColor: "#797993" }} />
                        <Box sx={{
                            display: "flex", alignItems: "center", textAlign: "center",
                            padding: "8px 0px", justifyContent: "space-around"
                        }}>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <span class="icon-star" style={{ color: "#ef7d00", fontSize: "14px" }}></span>
                                <Typography variant="body2" color="white" sx={{ fontSize: '13px', marginLeft: "3px" }}  >
                                    {selectedProduct.rating.toFixed(1)}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <span class="icon-calories-1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                                <Typography variant="body2" color="white" sx={{ fontSize: '13px', marginLeft: "3px" }} >
                                    {selectedProduct.calories}
                                    <span style={{ fontSize: '12px', marginLeft: "3px", color: "#AAAAAA" }}>{t("kcal")}</span></Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <span class="icon-chronometer" ><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                <Typography variant="body2" color="white"
                                    sx={{ fontSize: '13px', marginLeft: "3px" }} >
                                    {selectedProduct.prepTime}
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
                    <Typography variant="h6" sx={{ fontSize: '12px', fontWeight: "bold", color: 'white' }}>
                        {t("size")}
                    </Typography>

                    {sizes.map((size) => {
                        return (
                            <Button
                                key={size}
                                onClick={() => handleSizeClick(selectedProduct.id, size)}
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                    fontSize: "10px",
                                    borderRadius: "50%",
                                    minWidth: "20px",
                                    backgroundColor: selectedSize[selectedProduct.id] === size ? "#797993" : "#302E3B",
                                    color: selectedSize[selectedProduct.id] === size ? "white" : "gray",
                                    "&:hover": {
                                        backgroundColor: selectedSize[selectedProduct.id] === size ? "#797993" : "#302E3B",
                                    },
                                }}
                            >
                                {t(size)}
                            </Button>
                        );
                    })}
                </Box>   {/* size */}

                <Box sx={{ marginTop: "15px" }}>
                    <Typography variant="h6" sx={{ fontSize: "12px", color: 'white' }}>
                        {t("options")} <span style={{ fontSize: "9px", fontWeight: '300', color: 'white' }}>{t("required)")}</span>
                    </Typography>

                    <Box display="flex" flexWrap="wrap" gap={1}>
                        {options.map((option, index) => (
                            <Button
                                key={index}
                                onClick={() => handleOptionClick(selectedProduct.id, option)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "47%",
                                    height: "25px",
                                    backgroundColor: selectedItemOptions[selectedProduct.id]?.includes(option) ? "#48485B" : "#1E1E2A",
                                    color: selectedItemOptions[selectedProduct.id]?.includes(option) ? "white" : "#AAAAAA",
                                    border: selectedItemOptions[selectedProduct.id]?.includes(option) ? "none" : "1px solid #48485B",
                                    borderRadius: "20px",
                                    padding: "3px 10px",
                                    "&:hover": {
                                        backgroundColor: selectedItemOptions[selectedProduct.id]?.includes(option) ? "#48485B" : "#1E1E2A",
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
                        {options.map((extra, index) => (
                            <Button
                                key={index}
                                onClick={() => handleExtraClick(selectedProduct.id, extra)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "47%",
                                    height: "25px",
                                    backgroundColor: selectedItemExtra[selectedProduct.id]?.includes(extra) ? "#48485B" : "#1E1E2A",
                                    color: selectedItemExtra[selectedProduct.id]?.includes(extra) ? "white" : "#AAAAAA",
                                    border: selectedItemExtra[selectedProduct.id]?.includes(extra) ? "none" : "1px solid #48485B",
                                    borderRadius: "20px",
                                    padding: "3px 10px",
                                    "&:hover": {
                                        backgroundColor: selectedItemExtra[selectedProduct.id]?.includes(extra) ? "#48485B" : "#1E1E2A",
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
                        {ingrediants.map((option, index) => (
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
                        ))}
                    </Box>

                </Box> {/* Ingrediants */}

                <Box sx={{ marginTop: "15px", marginBottom: "120px" }} >
                    <Typography variant="h6" sx={{ fontSize: "13px", color: 'white' }}>
                        {t("description")}
                    </Typography>

                    <Typography variant="body2" sx={{ fontSize: "11px", color: '#AAAAAA', width: "100%" }}>
                        {t("lorem")}</Typography>
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
                        {selectedProduct.price}
                        <span style={{ fontSize: "10px", color: '#575756' }}> EGP</span>
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ backgroundColor: "gray", mx: 1 }} />

                <Box sx={{ width: "46%" }}>
                    <Button
                        onClick={() => handleAddToCart(selectedProduct)}
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

        </Box >

    )
}

export default page; 