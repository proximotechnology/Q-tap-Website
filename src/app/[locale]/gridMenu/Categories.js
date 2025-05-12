import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react'
import { categoryProducts } from '../categories/data';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useTranslations } from 'next-intl';
import { BASE_URL_IMAGE } from '@/utils';

const menuItems = [
    {
        text: "Popular", icon: <span class="icon-fire" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
        , bgcolor: "#302E3B", color: "white", categoryId: "Popular",
    },

    {
        text: "Pizza", icon: <span class="icon-pizza" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
        , bgcolor: "#302E3B", color: "#AAAAAA", categoryId: "1",
    },

    {
        text: "Pasta", icon: <span class="icon-pasta" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span><span class="path26"></span><span class="path27"></span><span class="path28"></span><span class="path29"></span><span class="path30"></span><span class="path31"></span><span class="path32"></span><span class="path33"></span><span class="path34"></span><span class="path35"></span><span class="path36"></span><span class="path37"></span><span class="path38"></span><span class="path39"></span><span class="path40"></span><span class="path41"></span><span class="path42"></span><span class="path43"></span><span class="path44"></span><span class="path45"></span><span class="path46"></span><span class="path47"></span><span class="path48"></span><span class="path49"></span><span class="path50"></span><span class="path51"></span><span class="path52"></span><span class="path53"></span><span class="path54"></span><span class="path55"></span><span class="path56"></span><span class="path57"></span><span class="path58"></span><span class="path59"></span><span class="path60"></span><span class="path61"></span><span class="path62"></span><span class="path63"></span><span class="path64"></span><span class="path65"></span><span class="path66"></span><span class="path67"></span><span class="path68"></span><span class="path69"></span><span class="path70"></span><span class="path71"></span><span class="path72"></span><span class="path73"></span><span class="path74"></span><span class="path75"></span><span class="path76"></span><span class="path77"></span><span class="path78"></span><span class="path79"></span><span class="path80"></span><span class="path81"></span><span class="path82"></span><span class="path83"></span><span class="path84"></span><span class="path85"></span><span class="path86"></span><span class="path87"></span><span class="path88"></span><span class="path89"></span><span class="path90"></span><span class="path91"></span><span class="path92"></span><span class="path93"></span><span class="path94"></span><span class="path95"></span><span class="path96"></span><span class="path97"></span><span class="path98"></span><span class="path99"></span><span class="path100"></span><span class="path101"></span><span class="path102"></span><span class="path103"></span><span class="path104"></span><span class="path105"></span><span class="path106"></span><span class="path107"></span><span class="path108"></span><span class="path109"></span><span class="path110"></span><span class="path111"></span><span class="path112"></span><span class="path113"></span><span class="path114"></span><span class="path115"></span><span class="path116"></span><span class="path117"></span><span class="path118"></span><span class="path119"></span><span class="path120"></span><span class="path121"></span><span class="path122"></span><span class="path123"></span><span class="path124"></span><span class="path125"></span><span class="path126"></span><span class="path127"></span><span class="path128"></span><span class="path129"></span><span class="path130"></span><span class="path131"></span><span class="path132"></span><span class="path133"></span><span class="path134"></span><span class="path135"></span><span class="path136"></span><span class="path137"></span><span class="path138"></span><span class="path139"></span><span class="path140"></span><span class="path141"></span><span class="path142"></span><span class="path143"></span><span class="path144"></span><span class="path145"></span><span class="path146"></span><span class="path147"></span><span class="path148"></span><span class="path149"></span><span class="path150"></span><span class="path151"></span><span class="path152"></span><span class="path153"></span><span class="path154"></span><span class="path155"></span><span class="path156"></span><span class="path157"></span><span class="path158"></span><span class="path159"></span><span class="path160"></span><span class="path161"></span><span class="path162"></span><span class="path163"></span><span class="path164"></span><span class="path165"></span><span class="path166"></span><span class="path167"></span><span class="path168"></span><span class="path169"></span><span class="path170"></span><span class="path171"></span></span>
        , bgcolor: "#302E3B", color: "#AAAAAA", categoryId: "2",
    },

    {
        text: "Burger", icon: <span class="icon-burger" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span></span>
        , bgcolor: "#302E3B", color: "#AAAAAA", categoryId: "3",
    },

    {
        text: "Desserts", icon: <span class="icon-ice-cream" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span><span class="path26"></span><span class="path27"></span><span class="path28"></span><span class="path29"></span><span class="path30"></span><span class="path31"></span></span>
        , bgcolor: "#302E3B", color: "#AAAAAA", categoryId: "4",
    },

    {
        text: "Drinks", icon: <span class="icon-drink" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span></span>
        , bgcolor: "#302E3B", color: "#AAAAAA", categoryId: "5",
    },
    {
        text: "Drinks", icon: <span class="icon-drink" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span></span>
        , bgcolor: "#302E3B", color: "#AAAAAA", categoryId: "6",
    },
    {
        text: "Drinks", icon: <span class="icon-drink" style={{ fontSize: "22px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span></span>
        , bgcolor: "#302E3B", color: "#AAAAAA", categoryId: "7",
    },
]

export const Categories = ({ currentBranch, setSelectedCategory, selectedCategory }) => {

    const t = useTranslations()
    const handleClick = (item) => {
       setSelectedCategory(item)
    };

  
    return (
        <Box sx={{ width: "100%" }}>
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
                        <ListItem
                            key={index}
                            onClick={() => handleClick(item)}
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
                                <img src={`${BASE_URL_IMAGE}${item.image}`} style={{maxWidth:'50px',aspectRatio:'1/1'}}/>
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
                    );
                })}
            </Box>

        </Box>
    )
}
