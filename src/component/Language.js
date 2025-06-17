"use client";
import React, { startTransition, useState } from 'react';
import { Box, Menu, MenuItem, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';

export const Language = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const open = Boolean(anchorEl);

    const router = useRouter()
    const pathName = usePathname()
    // const param = useParams()
    // const locale = useLocale()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        

    };

    const handleClose = (language) => {
        if (language) {
            setSelectedLanguage(language);
            router.push(pathName, { locale: language });
        }
        setAnchorEl(null);
        
    };


    const getLanguageIcon = () => {
        if (selectedLanguage === 'ar') {
            return <img src="/assets/arabic.svg" alt="Arabic" style={{ width: "20px", height: "20px", marginRight: '1px' }} />;
        } else if (selectedLanguage === 'en') {
            return <img src="/assets/english.svg" alt="English" style={{ width: "20px", height: "20px", marginRight: '1px' }} />;
        }
        return <LanguageOutlinedIcon sx={{ fontSize: "20px", color: "#E57C00", marginRight: '1px' }} />;
    };

    return (
        <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }} >
            <Box onClick={handleClick} sx={{ display: "flex", alignItems: "center" }}>
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
                    <img src="/assets/english.svg" alt="English" style={{ width: "23px", height: "23px", marginRight: '8px' }} />
                    <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleClose('ar')}>
                    <img src="/assets/arabic.svg" alt="Arabic" style={{ width: "23px", height: "23px", marginRight: '8px' }} />
                    <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Language;
