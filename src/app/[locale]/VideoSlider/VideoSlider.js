"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './VideoSlider.css';
import { HomeContext } from "../context/homeContext.js";


const videoIds = [
    "eQ5PIFK63p4",
    "IwqO11MdeY4",
    "ZVhgcKr3lMU",
];

export const VideoSlider = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getHomeData } = useContext(HomeContext);



    const getVideoData = async () => {
        setLoading(true);
        try {
            const response = await getHomeData();
            
            // Transform the video URLs to embed format
            const transformedVideos = response?.data?.videos.map(video => ({
                ...video,
                video: getYoutubeEmbedUrl(JSON.parse(video.video))
            }));
            
            setVideos(transformedVideos);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError("Failed to fetch feature data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Add this helper function to transform YouTube URLs
    const getYoutubeEmbedUrl = (url) => {
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/);
        return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : '';
    };

    useEffect(() => {
        getVideoData();
    }, []);

    return (
        <Swiper
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation]}
            style={{
                width: '100vw',
                height: '100vh',
            }}
        >
            {videos.map((vid, index) => (
                <SwiperSlide key={index}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={vid.video}
                        title={`Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    ></iframe>
                </SwiperSlide>
            ))}
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
        </Swiper>
    )
}
