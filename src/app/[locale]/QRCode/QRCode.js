"use client";
import React from 'react';
import { QRCode } from 'react-qr-code';
import { Box, Typography, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

const QRCodeComponent = () => {
    const qrCodeText = 'https://www.menus.qutap.co/register/user';
    const t = useTranslations();
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(qrCodeText).then(() => {
            alert(t("homePage.QRcodeCopied"));
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <Box 
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            textAlign: 'center', backgroundColor: '#EAECF2',
            height: "auto", width: "100%", padding: "50px 0px",
        }}>

            <Typography variant="body1" sx={{ color: "#222240", fontSize: "22px" }}>{t("homePage.tryNow")}</Typography>
            <Typography variant="body2" sx={{ color: "gray", padding: "0px 20px", fontSize: "15px" }}>
                {t("homePage.scanQRcode")}</Typography>


            <QRCode
                value={qrCodeText}
                size={220}  
                style={{ margin: '30px auto', border: '3px solid #E57C00', padding: "15px", borderRadius: '20px' }}
            />
            <br />

            <Button onClick={handleCopyToClipboard}
                style={{
                    padding: '6px 50px',
                    // width: { xs: "80%", md: "20%" ,lg:"20%"},
                    backgroundColor: '#E57C00', color: 'white', textTransform: "none",
                    border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: "15px", alignItems: "center"
                }}>
                <img src="/assets/hand.svg" alt="hand" style={{ width: "20px", height: "20px", marginRight: "6px" }} />{t("homePage.tryNow")}
            </Button>
        </Box>
    );
};

export default QRCodeComponent;
