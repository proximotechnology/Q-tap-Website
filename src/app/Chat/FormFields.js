"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider,IconButton } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const FormFields = ({ onStartChat }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    return (
        <Box
            sx={{
                padding: '20px',
                width: 280,
                position: 'fixed', 
                bottom: 80,        
                right: 20,       
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                backgroundColor: 'white', 
                zIndex: 1000, 
                textAlign: "center", justifyContent: "center" 
            }}>
            <Typography sx={{ color: "#575756", fontSize: "12px" ,marginBottom:"10px"}}>Please Enter this data to start chatting</Typography>
            <Divider sx={{ backgroundColor: "#E57C00",marginBottom:"20px " }} />

            <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>Name</Typography>
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
                    }}/>

                <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>Email</Typography>
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

                <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>Phone</Typography>
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
                    }}/>

                <Typography variant='body1' sx={{ fontSize: "11px", marginBottom: "3px", color: "#575756" }}>Address</Typography>
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
                    }}/>

            <Button
                onClick={onStartChat}
                sx={{
                    backgroundColor: "#E57C00", textTransform: "capitalize", color: "white",
                    borderRadius: "20px", fontSize: "12px", padding: "5px 40px"
                }}>
                Start Chat
            </Button>

        </Box>
    );
};

export default FormFields;
