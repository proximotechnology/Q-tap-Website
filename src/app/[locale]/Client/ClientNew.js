"use client";
import { Box, Paper, Typography, Grid, Divider, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, FreeMode } from "swiper/modules";
import "./Client.css";
import { HomeContext } from "../context/homeContext.js";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, BASE_URL_IMAGE } from "@/utils/constants";

export const ClientNew = () => {
  const { getHomeData } = useContext(HomeContext);
  const t = useTranslations();

  // جلب البيانات باستخدام useQuery مع معالجة البيانات
  const { data: clientData, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
    select: (response) => {
      // معالجة البيانات لتحويلها إلى الشكل المطلوب
      return (
        response?.data?.clients?.map((client) => ({
          ...client,
          img: client.img ? JSON.parse(client.img)[0] : "",
          title: "image title",
        })) || []
      );
    },
  });
  return (
    <Box
      sx={{
        backgroundImage: "url('/images/client.jpg')",
        height: { xs: "70vh", md: "50vh" },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} display="flex" justifyContent="center">
          <Paper
            elevation={1}
            sx={{
              height: { xs: "140px", md: "160px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "100px",
              overflow: "hidden",
              width: "70%",
              // width: { xs: '90%', md: '70%' },
              zIndex: "20",
              marginTop: { xs: "-200px", md: "-180px", lg: "-200px" },
            }}
          >
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              loop={true}
              freeMode={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={8000} // transition speed (not a delay, but how fast it moves)
              modules={[Autoplay, FreeMode]}
              // pagination={{ clickable: true }}
              allowTouchMove={false} // optional: disable manual dragging to avoid jumpy behavior
              breakpoints={{
                0: { slidesPerView: 1, },
                600: { slidesPerView: 3, },
                900: { slidesPerView: 3, },
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                paddingBottom: "25px",
                marginTop: "25px",
              }}
            >
              {clientData?.map((client) => (
                <SwiperSlide key={client?.id}>
                  <Box sx={{
                    display: "flex", justifyContent: "center",
                    width: "90px", height: "90px", alignItems: "center", margin: "0 auto",
                    borderRadius: "50%",
                    // border: 'solid 1px black',
                    padding: "5px",
                    "&:hover": { cursor: "pointer", transform: "scale(1.05)", transition: "0.3s" }
                  }}>
                    <img
                      src={`${BASE_URL_IMAGE}${client?.img}`}
                      alt={client?.title}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
            }}
          >
            {/* Businesses powered */}
            <Box sx={{ mx: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "40px", md: "55px" } }}
              // ref={businessesRef}
              >
                7K
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "12px", md: "10px" } }}
              >
                {t("homePage.businessesPowered")}
              </Typography>
            </Box>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#E57C00",
                height: "60px",
                width: "1.5px",
                marginTop: { xs: 0, md: "10px" },
                borderRadius: "20px",
                mx: { xs: 0, md: 5 },
                display: { xs: "none", md: "block" },
              }}
            />

            {/* Orders processed */}
            <Box sx={{ mx: { xs: 0, md: 2 } }}>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "40px", md: "55px" } }}
              // ref={ordersRef}
              >
                5M
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "12px", md: "10px" } }}
              >
                {t("homePage.ordersProccessed")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
