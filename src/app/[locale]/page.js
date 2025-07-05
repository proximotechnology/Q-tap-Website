"use client"
import React, { useEffect } from 'react';
import { HomePage } from "./HomePage/HomePage";
import { getUserDataFromCookies } from '@/api/getUserDataFromCookies';
import useUserStore from '@/store/userStore';

const Page = () => {
    const { setUser, } = useUserStore();

    const getUserData = async () => {
        try {
            const user = await getUserDataFromCookies()
            setUser(user)
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('get user from cookies error', error);
            }
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div style={{ overflowX: "hidden !important" }}>
            <HomePage />
        </div>
    );
};

export default Page;
