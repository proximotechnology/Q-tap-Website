import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Divider,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import "./Features.css";
import { HomeContext } from "../context/homeContext.js";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL,BASE_URL_IMAGE } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const FeaturesNew = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { getHomeData } = useContext(HomeContext);
    const t = useTranslations();
    const [direction, setDirection] = useState('ltr');

    useEffect(() => {
        // Sync with HTML direction attribute
        const htmlDir = document.documentElement.getAttribute('dir');
        if (direction !== htmlDir)
            setDirection(htmlDir || 'ltr');
    }, [direction]);

    // جلب البيانات باستخدام useQuery مع معالجة البيانات
    const { data: featData, isLoading, error } = useQuery({
        queryKey: ["homeData"],
        queryFn: getHomeData,
        select: (response) => {
            const parsedData = response?.data?.features?.map((feat) => ({
                ...feat,
                titles: JSON.parse(eval(feat.titles)),
                img: JSON.parse(feat.img)[0],
                descriptions: JSON.parse(eval(feat.descriptions)),
                features: JSON.parse(eval(feat.features)),
            })) || [];

            // التأكد من وجود 6 عناصر على الأقل
            let finalData = parsedData;
            if (parsedData.length < 6) {
                finalData = [];
                for (let i = 0; i < 6; i++) {
                    finalData.push(parsedData[i % parsedData.length]);
                }
            }
            return finalData;
        },
    });

    const handleCardSiblingSizeSwipper = (index, length) => {
        if (index !== activeIndex && Math.abs(index - activeIndex) === 1) {
            return true
        } else if (index !== activeIndex && activeIndex === 0 && length - 1 === index) {
            return true
        }
        return false
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



    return (
        <Box 
            sx={{
                backgroundImage: "url('/images/Rectangle.png')",
                height: {
                    xs: '100vh',     // Mobile
                    sm: '85vh',      // Small tablets
                    md: '80vh',      // Tablets / medium screens
                    lg: '75vh',      // Large desktops
                    xl: '70vh'       // Very large screens
                },
                width: "100%",
                position: "relative",
                backgroundSize: "cover",
                // padding: "50px 0px 100px 0px",
                backgroundPosition: "center",
                // minHeight: '650px'
                display: "flex",
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "50px",
                    height: 'full'
                }}
            >
                <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    sx={{
                        color: "#2A253F",
                        fontSize: "25px",
                        zIndex: "8",
                        marginTop: "20px",
                    }}
                >
                    {t("homePage.ourFeatures")}
                </Typography>
                <Divider
                    className="divider-media"
                    sx={{
                        width: "11%",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        height: "8px",
                        border: "none",
                        backgroundColor: "#E57C00",
                    }}
                />
            </Box>

            {/* <Swiper
                slidesPerView={3.5}          // show 3 full + half slide
                spaceBetween={20}
                centeredSlides={true}
                style={{ paddingLeft: '12vw', paddingRight: '12vw' }}  // padding to show half slides on edges
            >
                {featData?.map((feature, index) => (
                    <SwiperSlide
                        key={index}
                        style={{ height: "400px" }}  // fixed height, width handled by Swiper
                    >
                        <CardComponent feature={feature} index={index} />
                    </SwiperSlide>
                ))}
            </Swiper> */}

            <div style={{ flexGrow: 1, marginBottom: '1rem' }} >
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]} // include Navigation
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false, // Keep autoplay even after user interaction
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1.2, spaceBetween: 10, },
                        480: { slidesPerView: 1.5, spaceBetween: 10, },
                        768: { slidesPerView: 2.5, spaceBetween: 15, },
                        1024: { slidesPerView: 3.5, spaceBetween: 20, },
                        1280: { slidesPerView: 4, spaceBetween: 20, },
                    }}
                    loop={featData?.length > 4}
                    slidesPerView={4}
                    spaceBetween={20}
                    centeredSlides={true}
                    initialSlide={0}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                    }}
                    onSwiper={(swiper) => {
                        setTimeout(() => {
                            setActiveIndex(swiper.realIndex);
                        }, 0);
                    }}
                    style={{
                        overflow: 'visible',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        maxHeight: '100%',
                    }}
                >
                    {featData?.map((feature, index) => {
                        const isActive = index === activeIndex;
                        const isSibling = handleCardSiblingSizeSwipper(index, featData?.length)
                        console.log("featData",featData)
                        return feature &&(

                            <SwiperSlide
                                key={index}
                                style={{
                                    transition: "all 0.5s ease",
                                    // transform: isActive ? "scale(1.1)" : isSibling ? "scale(1.05)" : "scale(1)",
                                }}
                            >
                                <div
                                    style={{
                                        height: "50vh",
                                        width: "100%",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: "center",
                                    }} >
                                    <div style={{
                                        height: isActive
                                            ? (isMobile ? "40vh" : "50vh")
                                            : isSibling
                                                ? (isMobile ? "35vh" : "45vh")
                                                : (isMobile ? "30vh" : "40vh"),
                                        width: "100%",
                                        margin: "auto 1rem auto 0px"
                                    }}>

                                        <CardComponent feature={feature} index={index} />
                                    </div>
                                </div>

                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </Box>

    );
};

const CardComponent = ({ feature, index }) => {
    return (
        <Box key={index} sx={{ overflow: "visible", width: '100%', height: "100%", }}>
            <Card
                sx={{
                    height: "100%",
                    width: '100%',
                    // width,
                    // height,
                    transition: "all 0.3s ease",
                    // transform: width === "95%" ? "scale(1.1)" : "scale(1)",
                    boxShadow: 1,
                    // margin: "20px auto",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 3,
                    },
                }}
            >
                {/* {index} */}
                <CardMedia
                    component="img"
                    height="50%"
                    image={`${BASE_URL_IMAGE}${feature?.img}`}
                    alt={feature?.titles}
                />
                <CardContent>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: "22px", color: "#E57C00" }}
                    >
                        {feature?.titles[0]} {index}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: "10px", color: "#575756" }}
                    >
                        {feature?.descriptions[0]}
                    </Typography>
                    {/* <Box sx={{ marginTop: height === "420px" || height === "450px" ? "25px" : "10px" }}> */}
                    <Box sx={{}}>
                        {[...feature?.features].map((feat, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mt: 0.5,
                                }}
                            >
                                <img
                                    src="/assets/check.svg"
                                    alt="check"
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        marginRight: "10px",
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "10px", color: "#575756" }}
                                >
                                    {feat}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
export default FeaturesNew;