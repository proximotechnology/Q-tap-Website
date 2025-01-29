import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/globals.css';
import '/public/assets/icons/style.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#E57C00',
        },
        secondary: {
            main: '#222240',
        },
    },
});

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
