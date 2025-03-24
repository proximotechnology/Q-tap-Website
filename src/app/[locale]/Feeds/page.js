import { Box } from '@mui/material'
import React from 'react'
import { Header } from './Header';
import { Footer } from '../categories/Footer';


const page = () => {

    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "100vh",
                width: '100%',

            }}>

            <Header />
            <Box sx={{ padding: '0px 25px' }}>
                <Footer />
            </Box>

        </Box >
    )
}
export default page;
