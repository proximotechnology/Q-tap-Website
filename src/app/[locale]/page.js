"use client"
import React, { useEffect } from 'react';
import { HomePage } from "./HomePage/HomePage";
import { getUserDataFromCookies } from '@/api/getUserDataFromCookies';

const Page = () => {
    useEffect(()=>{
        getUserDataFromCookies()
    },[])
    return (
        <div style={{ overflowX:"hidden !important"}}>
            <HomePage /> 
        </div>
    );
};

export default Page;
