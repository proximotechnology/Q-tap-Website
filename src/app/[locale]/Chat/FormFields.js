"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, IconButton } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTranslations } from 'next-intl';
import { BASE_URL } from '@/utils/constants';

const FormFields = ({ onStartChat }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const t  = useTranslations()

    // enter user data
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate required fields
        if (!name || !email || !phone || !address) {
            alert(t("plFillAllField"));
            return;
        }

        // take data from form
        const userData = {
            name,
            email,
            phone,
            address
        };

        try {
            // send data to backend
            const response = await fetch(`${BASE_URL}customer_info`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.message === "Phone number already exists" || data.message === "Data stored successfully") {

                const userDataFromResponse = data.data;
                localStorage.setItem("customer_id", userDataFromResponse.id);

                onStartChat(userDataFromResponse);
            } else {
                throw new Error(data.message || 'Failed to submit data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t("errSubmitInfo"));
        }
    };



    return (
        <Box component="form" onSubmit={handleSubmit}
            sx={{
                padding: '20px',
                width: 280,
                position: 'fixed',
                bottom: 80,
                right: 20,
                borderRadius: 2,
                // boxShadow: '10px 10px 10px rgba(0,0,0,0.5)',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                backgroundColor: 'white',
                zIndex: 1000,
                textAlign: "center", justifyContent: "center"
            }}>
            <Typography sx={{ color: "#575756", fontSize: "12px", marginBottom: "10px" }}>{t("plEnterDataToStartChat")}</Typography>
            <Divider sx={{ backgroundColor: "#E57C00", marginBottom: "20px " }} />

            <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>{t("name")}</Typography>
            <TextField
                fullWidth
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        backgroundColor: '#F1F1F1',
                        height: '35px',
                        border: "none !important",
                        marginBottom: "10px", fontSize: "10px",
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px'
                    },
                    notchedOutline: { border: 'none' },
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                    ),
                }} />

            <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>{t("email")}</Typography>
            <TextField
                fullWidth
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        backgroundColor: '#F1F1F1',
                        height: '35px',
                        border: "none !important",
                        marginBottom: "10px", fontSize: "10px",
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px'
                    }
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <EmailOutlinedIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                    ),
                }} />

            <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>{t("phone")}</Typography>
            <TextField
                fullWidth
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        backgroundColor: '#F1F1F1',
                        height: '35px',
                        border: "none !important",
                        marginBottom: "10px", fontSize: "10px",
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px'
                    }
                }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <LocalPhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                    ),
                }} />

            <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>{t("address")}</Typography>
            <TextField
                fullWidth
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        backgroundColor: '#F1F1F1',
                        height: '35px',
                        border: "none !important",
                        marginBottom: "20px", fontSize: "10px",
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiInputBase-input': {
                        padding: '5px',
                        border: "none !important",

                    }
                }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <LocationOnOutlinedIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                    ),
                }} />

            <Button
                type="submit"
                sx={{
                    backgroundColor: "#E57C00",
                    textTransform: "capitalize",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "12px",
                    padding: "5px 40px",
                    '&:hover': {
                        backgroundColor: "#cc6e00"
                    }
                }}>
                {t("startChat")}
            </Button>

        </Box>
    );
};

export default FormFields;
