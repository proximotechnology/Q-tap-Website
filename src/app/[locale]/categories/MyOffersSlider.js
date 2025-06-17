import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import { BASE_URL_IMAGE } from '@/utils/constants';
import { useTranslations } from 'use-intl';
import AddIcon from '@mui/icons-material/Add';

// Optional: detect RTL from document
const isRTL = document.dir === 'rtl';


const MyOffersSlider = ({ items, openOffer }) => {
    const t = useTranslations()
    return (
        <div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={45}
                // navigation={true}
                // pagination={{ clickable: true }}
                dir={isRTL ? 'rtl' : 'ltr'}
                breakpoints={{
                    1024: { slidesPerView: 3 }, // large screens
                    768: { slidesPerView: 2 },  // medium screens
                    0: { slidesPerView: 2 },    // small screens
                }}
                // style={{ padding: '20px 40px' }} // Optional side padding
                style={{ overflow: "visible" }} // Optional side padding
                pagination={{
                    el: '.my-swiper-pagination',  // Explicitly target pagination container
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.my-swiper-button-next',  // Explicitly target next arrow
                    prevEl: '.my-swiper-button-prev',  // Explicitly target prev arrow
                }}
            >
                {items?.map((offer) => (
                    <SwiperSlide key={offer.id} className='problemhere' >
                        <Box sx={{ position: "relative" }}>
                            <Box sx={{
                                backgroundColor: "#48485B", color: "white", width: "40px", height: "40px",
                                borderRadius: "50%", display: "flex", flexDirection: "row", justifyContent: "center",
                                textAlign: "center", alignItems: "center", position: "absolute", top: "-20px", left: "80%",
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
                                            <Typography sx={{ textDecoration: 'line-through', fontSize: "12px" }}>{offer.priceBefore}</Typography>
                                            <Typography sx={{ fontSize: "15px" }}>{offer.priceAfter} <span style={{ color: "#575756", fontSize: "9px" }}>EGP</span></Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: "27px", height: "27px", backgroundColor: "#797993", color: "white",
                                                borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: 'pointer',
                                            }}>
                                            <Button onClick={() => openOffer(offer)}>
                                                <AddIcon sx={{ fontSize: "17px" }} />
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>

                            </Card>
                        </Box>
                    </SwiperSlide>
                ))}

            </Swiper>

            <div className="my-flex" style={{marginTop:'10px'}}>
                <div className="my-swiper-button-prev swiper-button-prev">  </div>
                <div className="my-swiper-pagination" >  </div>
                <div className="my-swiper-button-next swiper-button-next"> </div>
            </div>

        </div>
    );
};

export default MyOffersSlider;
