"use client"
import React from 'react'
import { Box, Typography, } from '@mui/material';
import { Link } from "@/i18n/navigation"
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { BASE_URL_IMAGE } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';
export const Item = ({ item }) => {
    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
            }}>

                <Box display="flex" justifyContent="space-between" alignItems="center" width={'100%'} >
                    <Box sx={{ marginBottom: "6px" }}>
                        <Box sx={{ display: "flex" }}>
                            <Box>
                                <img
                                    src={`${BASE_URL_IMAGE}${item?.img}`}
                                    alt={item?.name}
                                    style={{ width: '80px', height: '80px', borderRadius: "10px", marginRight: '10px' }}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ color: '#797993', fontSize: "17px", fontWeight: "900" }}>
                                    {item?.name}</Typography>

                                <Typography variant="body1" sx={{ color: '#AAAAAA', fontSize: "11px" }}>
                                    {item?.Brief}</Typography>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "900" }}>{item?.price}
                                        <span style={{ color: "#575756", fontSize: "9px", }}> EGP</span>
                                    </Typography>

                                    {/* availability */}
                                    <Typography variant="body2" sx={{
                                        display: "flex", alignItems: "center", color: "#575756",
                                        marginLeft: "15px", fontSize: "9px"
                                    }}>
                                        {/* TODO: WHAT WITH AVAILABLE */}
                                        {item?.availability === "Available" ? (
                                            <>
                                                <CheckIcon sx={{ color: "green", fontWeight: "900", fontSize: "14px", marginLeft: "5px" }} />
                                                {item?.availability}
                                            </>
                                        ) : (
                                            <>
                                                <span className='icon-close1' style={{ fontSize: "8px", marginRight: "5px" }} />
                                                {item?.availability}
                                            </>
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>


                    </Box>

                    <Box>
                        <Box display="flex" alignItems="center" marginBottom={"10px"} >
                            <span className='icon-star' style={{ fontSize: "14px" }} />
                            <Typography variant="body2" sx={{ marginLeft: '4px', color: "#AAAAAA" }}>
                                {item?.rating?.toFixed(1)}{/* TODO: WHAT ABOUT RATING */}
                            </Typography>
                        </Box>

                        <Link key={item?.id} href={`/ProductDetails/${item?.id}?shopId=${shopId}&branchId=${branchId}&catId=${item?.categories_id}`}>
                            <Box
                                sx={{
                                    backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <AddIcon className="icon" sx={{ color: 'white', fontSize: '18px' }} />
                            </Box>
                        </Link>
                    </Box>
                </Box>


            </Box>

        </Box>
    )
}
