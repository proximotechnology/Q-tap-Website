import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import "./Features.css";
import { HomeContext } from "../context/homeContext.js";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL_IMAGE } from "@/utils/constants";

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { getHomeData } = useContext(HomeContext);
  const t = useTranslations();
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    // Sync with HTML direction attribute
    const htmlDir = document.documentElement.getAttribute('dir');
    if (direction !== htmlDir)
      setDirection(htmlDir || 'ltr');
  }, [direction]);

  const handleBeforeChange = (current, next) => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      setActiveIndex(next + 1);
    } else {
      setActiveIndex(next);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    rtl: direction === "rtl",
    initialSlide: 0, // Start from the first slide
    afterChange: (current) => {}, // Verify active index
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const sliderRef = useRef(null);

  // Adjusting the active slide after component mounts
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Ensure the first slide is active initially
    }
  }, [direction]);
  const getCardSize = (index) => {
    const screenWidth = window.innerWidth;
    const distanceFromActive = Math.min(
      Math.abs(index - activeIndex),
      featData.length - Math.abs(index - activeIndex)
    );

    // Medium screens (600px to 1024px)
    if (screenWidth > 600 && screenWidth <= 1024) {
      if (index === activeIndex) {
        // Center card (larger)
        return { width: "95%", height: "450px" };
      } else {
        // Side cards (smaller)
        return { width: "80%", height: "380px" };
      }
    }
    // Large screens (1024px and above)
    else if (screenWidth > 1024) {
      if (distanceFromActive === 1 && index === activeIndex - 1) {
        return { width: "90%", height: "420px" };
      } else if (distanceFromActive === 0 || distanceFromActive === 2) {
        return { width: "88%", height: "380px" };
      } else {
        return { width: "77%", height: "340px" };
      }
    }
    // Small screens (600px and below)
    else {
      return { width: "90%", height: "380px" };
    }
  };

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
  return (
    <Box
      sx={{
        backgroundImage: "url('/images/Rectangle.png')",
        height: "92vh",
        width: "100%",
        position: "relative",
        backgroundSize: "cover",
        padding: "50px 0px 100px 0px",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
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

      <Slider ref={sliderRef}  key={direction} {...settings}>
        {featData?.map((feature, index) => {
          const { width, height } = getCardSize(index);
          return (
            <Box key={index} sx={{ overflow: "visible" }}>
              <Card
                sx={{
                  width,
                  height,
                  transition: "all 0.3s ease",
                  transform: width === "95%" ? "scale(1.1)" : "scale(1)",
                  boxShadow: 1,
                  margin: "20px auto",
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
                    {feature?.titles[0]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "10px", color: "#575756" }}
                  >
                    {feature?.descriptions[0]}
                  </Typography>
                  <Box sx={{ marginTop: height === "420px" || height === "450px" ? "25px" : "10px" }}>
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
          );
        })}
      </Slider>
    </Box>
  );
};

export default Features;