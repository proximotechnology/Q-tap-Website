import { Box } from '@mui/material'
import React from 'react'
import ModeCommentIcon from "@mui/icons-material/ModeComment";

export const SupportChatButton = ({ toggleForm }) => {
    return (
        <Box
            onClick={toggleForm}
        >
            <ModeCommentIcon
                sx={{
                    fontSize: "25px", color: "#575756",
                    "&:hover": {
                        color: "#E57C00",
                        transform: "scale(1.1)",
                        transition: "all 0.3s",

                    },

                }}
            />
        </Box>
    )
}
