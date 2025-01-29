import { Box, Grid } from '@mui/material'
import React from 'react'
import { Item } from './Item'


export const Content = ({ items }) => {

    return (

        <Box sx={{ marginBottom: "50px", }}>
            <Grid container spacing={1} sx={{ flexWrap: 'wrap' }}>
                {Array.isArray(items) && items.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Item item={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}