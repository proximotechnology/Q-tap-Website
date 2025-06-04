import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react'
import { categoryProducts } from '../categories/data';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useTranslations } from 'next-intl';
import { BASE_URL_IMAGE } from '@/utils/constants';


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
