"use client";
import { Box, IconButton, Typography } from '@mui/material'
import { Link } from "@/i18n/navigation"
import React, { useEffect, useState } from 'react'
import { getCartItems } from "../ProductDetails/cartUtils";
import { useSearchParams } from 'next/navigation';
import { divIcon } from 'leaflet';
import { useCartStore } from '@/store/cartStore';

export const Footer = ({ handleChangeView }) => {

    const count = useCartStore(state => state.meals).length

    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const tableId = searchParams.get('tableId')
    return (
        <div style={{ position: 'fixed', bottom: 20, left: 0, right: 0, width: "100vw" }}>
            <Box display="flex" justifyContent="space-around" alignItems="center" className="problemhere my-margin-center-x "
                sx={{
                    width: '85%', backgroundColor: '#302e3bd0', padding: '4px',
                    borderRadius: '30px', color: "#575756",
                    backdropFilter: 'blur(8px)',         // actual blur effect
                    WebkitBackdropFilter: 'blur(8px)',   // for Safari support
                }}>
                <Link href='/mobileList'>
                    <IconButton color="inherit">
                        <span className='icon-home-1' style={{ color: "white", fontSize: "18px" }} ></span>
                    </IconButton>
                </Link>

                <Link href={`/cart?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : '')}>
                    <IconButton color="inherit">
                        <span className='icon-shopping-cart' style={{ color: "gray", fontSize: "22px" }}></span>
                        <Box sx={{ fontSize: "11px", color: "gray", marginTop: "-20px" }}>{count}</Box>
                    </IconButton>
                </Link>
                <Box sx={{}}>
                    <span className='icon-desk-bell gradient-icon-waiterCall' style={{ fontSize: "30px" }}></span>
                    <Typography style={{ color: "grey", fontSize: "7px" }}>Waiter call</Typography>
                </Box>

                <IconButton color="inherit" onClick={handleChangeView}>
                    <span className='icon-show' ></span>
                </IconButton>

                {/* <Link href={ `/gridMenu?shopId=${shopId}&branchId=${branchId}`}> */}
                <Link href={`/Feeds`}>
                    <IconButton color="inherit">
                        <span className='icon-rss' style={{ color: "gray", }} ></span>
                        <span style={{ padding: "4px", borderRadius: "50%", backgroundColor: "#F19909", marginTop: "-20px" }}></span>
                    </IconButton>
                </Link>
            </Box>
        </div>
    )
}
