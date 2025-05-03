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
                zIndex: 100,
                alignItems: "center",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                animation: "bounce 2s infinite ease-in-out",
                "&:hover": {
                    backgroundColor: "#E57C00",
                    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                },
                transition: "background-color 0.3s, box-shadow 0.3s",
                "@keyframes bounce": {
                    "0%, 100%": {
                        transform: "translateY(0)"
                    },
                    "50%": {
                        transform: "translateY(-10px)"
                    }
                }
            }}
        >
            <img src="/assets/help.svg" alt="chat" style={{ width: "25px", height: "25px" }} />
        </Box>
    )
}
