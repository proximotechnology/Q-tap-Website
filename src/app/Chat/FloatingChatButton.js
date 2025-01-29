import { Box } from '@mui/material'
import React from 'react'

export const FloatingChatButton = ({ toggleForm }) => {
    return (
        <Box
            onClick={toggleForm}
            sx={{
                position: 'fixed',
                bottom: 25,
                right: 40,
                width: "45px",
                height: "45px",
                backgroundColor: "#2A253F",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                zIndex:100,
                alignItems: "center",
            }}>
            <img src="/assets/help.svg" alt="chat" style={{ width: "25px", height: "25px" }} />
        </Box>
    )
}
