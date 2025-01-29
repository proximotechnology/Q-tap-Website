"use client";
import React, { useState } from 'react';
import { Box, Menu, MenuItem, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

export const Language = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("open")

    };

    const handleClose = (language) => {
        if (language) {
            setSelectedLanguage(language);
        }
        setAnchorEl(null);
        console.log("close")
    };


    const getLanguageIcon = () => {
        if (selectedLanguage === 'ar') {
            return <img src="/Assets/arabic.svg" alt="Arabic" style={{ width: "20px", height: "20px", marginRight: '1px' }} />;
        } else if (selectedLanguage === 'en') {
            return <img src="/Assets/english.svg" alt="English" style={{ width: "20px", height: "20px", marginRight: '1px' }} />;
        }
        return <LanguageOutlinedIcon sx={{ fontSize: "20px", color: "#E57C00", marginRight: '1px' }} />;
    };

    return (
        <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }} >
            <Box onClick={handleClick} sx={{display:"flex" , alignItems:"center"}}>
                {getLanguageIcon()}
                <KeyboardArrowDownIcon sx={{ fontSize: "15px", color: "white" }} />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null)}
                sx={{ padding: "2px" }}

            >
                <MenuItem onClick={() => handleClose('en')} >
                    <img src="/Assets/english.svg" alt="English" style={{ width: "23px", height: "23px", marginRight: '8px' }} />
                    <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleClose('ar')}>
                    <img src="/Assets/arabic.svg" alt="Arabic" style={{ width: "23px", height: "23px", marginRight: '8px' }} />
                    <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Language;
