"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, IconButton } from '@mui/material';


export const Header = () => {
    
    // =========================================================================
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);
    // =========================================================================

    const renderIcon = () => {
        if (!formData) return null;

        switch (formData.selectedOption) {
            case 'dinein':
                return <span className='icon-table' style={{ fontSize: '70px', color: "#aaaaaa2c" }}></span>;

            case 'takeaway':
                return <span className='icon-takeaway' style={{ fontSize: '70px', color: "#aaaaaa2c" }}></span>;

            case 'delivery':
                return <span className="icon-scooter" style={{ fontSize: '70px', color: "#aaaaaa2c" }}></span>;

            default:
                return <p>No icon available</p>;
        }
    };

    return (

        <Box
            sx={{
                backgroundColor: '#1E1E2A',
                height: "25vh",
                zIndex: 1322,
                position: "fixed",  
                top: 0, 
                width: "100%", 
                color:"white",
            }}
        >
            {/* الدايره المقلوبه  */}
            <Box
                sx={{
                    position: "relative",
                    top: '-26vh',
                    width: '100%',
                    height: '50vh',
                    borderRadius: '50%',
                    backgroundColor: '#302E3B',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    overflow: 'hidden',
                    zIndex: 1,

                }}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "0",
                        width: '100%',
                    }}
                >
                    {/* header */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                        }}>

                        <Link href='/clientDetails'>
                            <IconButton sx={{ color: "white" }}>
                                <ArrowBackIosIcon sx={{ fontSize: "22px" }} />
                            </IconButton>
                        </Link>

                        <IconButton color="inherit">
                            <span className='icon-menu' style={{ fontSize: "22px" }}></span>
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        {renderIcon()}
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}
