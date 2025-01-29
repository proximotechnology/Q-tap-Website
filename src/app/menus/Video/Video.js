import { Box } from '@mui/material'
import React from 'react'

export const Video = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '0',
                paddingBottom: '56.25%', 
                overflow: 'hidden',
                maxWidth: '100%', 
                height: 'auto'
            }}
        >
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/eQ5PIFK63p4`}
                title={`Introductory video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            ></iframe>
        </Box>
    )
}
