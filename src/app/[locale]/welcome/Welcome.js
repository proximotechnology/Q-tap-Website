import React from 'react'
import {Link} from "@/i18n/navigation"
import HomeIcon from '@mui/icons-material/Home';
import Language from '@/component/Language';
import { Box, IconButton, Divider, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslations } from 'next-intl';


export const Welcome = () => {
  const t = useTranslations()
  return (
    <Box
      >
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          width: "100%",
          height: "100vh",
          backgroundImage: "url('/images/Marketing.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", textAlign: "center", alignItems: "center",
          '::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top right,rgba(230, 127, 0, 0.4),rgba(54, 43, 57, 0.8),rgba(54, 43, 57, 0.8), rgba(33, 33, 63, 0.8))",
            zIndex: 6,
          }
        }}>

        <Box sx={{
          display: "flex", position: "relative", zIndex: 10,
          justifyContent: "space-between", alignItems: "center",
          textAlign: "center", padding: { xs: "10px 20px", sm: "15px 40px", md: "20px 60px" }
        }}>
          <IconButton>
            <Link href="/">
              <HomeIcon sx={{ fontSize: "25px", color: "white" }} />
            </Link>
          </IconButton>

          <Box>
            <Language />
          </Box>
        </Box>

        <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    textAlign: "center",
    width: { xs: "90%", sm: "70%", md: "50%", lg: "26%" }, // Responsive width
    padding: { xs: "0 10px", sm: "0 20px", md: "0 40px" } // Responsive padding
  }}
>
  <img
    src='/assets/qtapwhite.svg'
    alt="qtap"
    style={{ width: "160px", height: "65px", marginBottom: "40px" }}
  />

  <Typography
    variant='h1'
    sx={{
      fontSize: { xs: "12px", sm: "14px", md: "15px" }, 
      color: "white",
      lineHeight: "27px"
    }}
  >
    {t("yourAccountWillActiveSooner")}
  </Typography>

  <Divider
    sx={{
      backgroundColor: "#E57C00",
      width: { xs: "50%", sm: "25%" }, 
      height: "3px",
      margin: "15px auto",
      borderRadius: "20px"
    }}
  />

  <Typography
    variant='body2'
    sx={{
      fontSize: { xs: "12px", sm: "13px" }, // Responsive font size
      marginBottom: "15px",
      color: "white"
    }}
  >
   {t("getInTouch")}
  </Typography>

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
      color: "white",
      fontSize: { xs: "10px", sm: "12px" } // Responsive font size
    }}
  >
    <Link href="mailto:sales@qutap.com" style={{ color: "white", textDecoration: "none" }}>
      <Typography sx={{ fontSize: { xs: "12px", sm: "13px" } }}>sales@qutap.com</Typography>
    </Link>

    <Link href="tel:+201050379894" style={{ color: "white", textDecoration: "none" }}>
      <Typography sx={{ fontSize: { xs: "12px", sm: "13px" } }}> +201050379894</Typography>
    </Link>

    <Link href="tel:+201050379878" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center" }}>
      <Typography sx={{ fontSize: { xs: "12px", sm: "13px" } }}> +201050379878</Typography>
    </Link>
  </Box>

  <Box sx={{ display: "flex", gap: "15px", marginTop: "20px", justifyContent: "center" }}>
    <Link href="https://www.instagram.com" target="_blank">
      <InstagramIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "white" }} />
    </Link>
    <Link href="https://www.facebook.com" target="_blank">
      <FacebookIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "white" }} />
    </Link>
    <Link href="https://twitter.com" target="_blank">
      <TwitterIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "white" }} />
    </Link>
    <Link href="https://whatsApp.com" target="_blank">
      <WhatsAppIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "white" }} />
    </Link>
  </Box>
</Box>

      </Box>
    </Box>
  )
}


