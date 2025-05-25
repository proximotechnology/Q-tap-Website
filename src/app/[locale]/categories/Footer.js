"use client";
import { Box, IconButton, Typography } from '@mui/material'
import { Link } from "@/i18n/navigation"
import React, { useEffect, useState } from 'react'
import { getCartItems } from "../ProductDetails/cartUtils";
import { useSearchParams } from 'next/navigation';

export const Footer = () => {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCartItems = getCartItems();
        setCartItems(storedCartItems);
    }, []);

    const count = cartItems.length;
    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const tableId = searchParams.get('tableId')
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center"
            sx={{
                position: 'fixed', bottom: 20, width: '85%', backgroundColor: '#302e3bd0', padding: '4px',
                borderRadius: '30px', color: "#575756",
            }}>
            <Link href='/mobileList'>
                <IconButton color="inherit">
                    <span className='icon-home-1' style={{ color: "white", fontSize: "18px" }} ></span>
                </IconButton>
            </Link>

            <Link href={`/cart?shopId=${shopId}&branchId=${branchId}`+(tableId?`&tableId=${tableId}`:'')}>
                <IconButton color="inherit">
                    <span className='icon-shopping-cart' style={{ color: "gray", fontSize: "22px" }}></span>
                    <Box sx={{ fontSize: "11px", color: "gray", marginTop: "-20px" }}>{count}</Box>
                </IconButton>
            </Link>
            <Box sx={{ cursor: "pointer" }}>
                <span className='icon-desk-bell' style={{ color: "white", fontSize: "30px" }}></span>
                <Typography style={{ color: "white", fontSize: "7px" }}>Waiter call</Typography>
            </Box>

            <IconButton color="inherit">
                <span className='icon-show' ></span>
            </IconButton>

            <Link href={ `/gridMenu?shopId=${shopId}&branchId=${branchId}`}>
                <IconButton color="inherit">
                    <span className='icon-rss' style={{ color: "gray", }} ></span>
                    <span style={{ padding: "4px", borderRadius: "50%", backgroundColor: "#F19909", marginTop: "-20px" }}></span>
                </IconButton>
            </Link>
        </Box>
    )
}
