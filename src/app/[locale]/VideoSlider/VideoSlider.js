"use client";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./VideoSlider.css";
import { HomeContext } from "../context/homeContext.js";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Box, Skeleton, Typography } from "@mui/material";

export const VideoSlider = () => {
  const { getHomeData } = useContext(HomeContext);
  const t = useTranslations();

  // دالة لتحويل عناوين YouTube إلى تنسيق الـ embed
  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : "";
  };

  // جلب البيانات باستخدام useQuery
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
    select: (response) => {
      return (
        response?.data?.videos?.map((video) => ({
          ...video,
          video: getYoutubeEmbedUrl(JSON.parse(video.video)),
        })) || []
      );
    },
  });

  // التعامل مع حالات التحميل
  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ maxWidth: "1280px", maxHeight: "720px" }}
        />
      </Box>
    );
  }

  // التعامل مع حالات الخطأ
  if (error) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
        }}
      >
        <Typography color="error" align="center">
          {t("homePage.failedFetchVideos")}
        </Typography>
      </Box>
    );
  }

  return (
    <Swiper
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[Navigation]}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {videos?.map((vid, index) => {
        const srcUrl = vid.video.includes('?')
          ? `${vid.video}&autoplay=1&mute=1&enablejsapi=1&controls=0&rel=0`
          : `${vid.video}?autoplay=1&mute=1&enablejsapi=1&controls=0&rel=0`;
        return (
          <SwiperSlide key={index}>
            <iframe
              width="100%"
              height="100%"
              src={srcUrl}
              title={`Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></iframe>
          </SwiperSlide>
        )
      }
      )}
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </Swiper>
  );
};

export default VideoSlider;