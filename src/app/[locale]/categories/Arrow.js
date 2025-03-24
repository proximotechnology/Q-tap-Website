
import React from 'react'
import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Arrow = () => {
    return (
        <Box

            sx={{
                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                width :"20px" , height:"20px" , 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor:"pointer",
            }}
        >
            <ArrowForwardIcon className="icon" sx={{ color: 'white', fontSize: '12px' }} />
        </Box>
    )
}
