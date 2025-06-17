
"use client";
import { IconButton, Button, Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function page() {
  const t = useTranslations()
  const router = useRouter()
  const pathName = usePathname()
  const locale = useLocale()

  const handleLangChange = (lang) => {
    router.push(pathName, { locale: lang });
  }
  return (

    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        backgroundImage: "url('/images/mobile.jpg')",
        backgroundSize: "100% 100%",
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>

      <IconButton
        sx={{
          position: 'absolute',
          top: 2,
          left: 2,
          color: 'white',
        }}
        onClick={() => { router.push("/Supporting") }}
      >
        <img src="/assets/helplogoWhite.svg" />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: "100%",
        }}>

        <Button
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: { xs: '80%', sm: '40%', md: '20%', lg: '20%', xl: '20%' },
            marginBottom: 2,
            backgroundImage: 'linear-gradient(to left, #797993, #302E3B)',
            borderRadius: '0px 25px 25px 25px',
            padding: '5px 10px',
            color: 'white',
            fontWeight: 'bold',
            transition: 'background-image 0.3s ease-in-out, color 0.3s ease-in-out',
            '&:hover': {
              backgroundImage: `linear-gradient(to ${locale === "en" ? "left" : "right"}, #E57C00, #E57C00)`,
              '& .icon-box': {
                position: 'relative',
                [locale === "en" ? 'left' : 'right']: '90%',
                backgroundColor: 'white',
              },
              '& .icon': {
                color: '#E57C00',
              },
            },
          }}
        >
          <Box
            className="icon-box"
            sx={{
              backgroundColor: '#797993',
              padding: '5px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: `${locale === "en" ? "left" : "right"} 0.5s ease-in-out`,
              [locale === "en" ? "left" : "right"]: `0`,
            }}
          >
            {locale === "en" ? <ArrowForwardIcon className="icon" sx={{ color: 'white', fontSize: '15px' }} /> : <ArrowBack className="icon" sx={{ color: 'white', fontSize: '15px' }} />}
          </Box>

          <Link href="/shops" passHref style={{ textDecoration: 'none', textAlign: 'center', width: "100%", }}> {/* إزالة الخط تحت النص */}
            <Box
              sx={{
                color: 'white',
                fontWeight: 'bold',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {t("openMenu")}
            </Box>
          </Link>
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            width: { xs: '70%', sm: '30%', md: '20%', lg: '16%', xl: '20%' },
          }} >

          <Button variant="text" sx={{
            color: "white", border: "1px solid #797993", fontSize: "11px", padding: "0px 8px",
            textTransform: "capitalize", borderRadius: "25px", width: "100%",
            '&:hover': {
              border: "1px solid #E57C00",
            }
          }} onClick={() => handleLangChange("en")}>
            English
          </Button>
          <Button variant="text" sx={{
            color: "white", border: "1px solid #797993", fontSize: "11px", padding: "0px 8px",
            textTransform: "capitalize", borderRadius: "25px", width: "100%",
            '&:hover': {
              border: "1px solid #E57C00",
            }
          }} onClick={() => handleLangChange("ar")}>
            العربية
          </Button>
        </Box>

        <Typography sx={{ display: "flex", alignItems: "center", fontSize: "6px", color: "white", marginTop: "20px" }}>
          2024-2025
          <img src='/assets/qtapwhite.svg' style={{ width: "40px", padding: "0px 1px", height: "40px" }} />
          {t("allRightsReserved")}
        </Typography>
      </Box>

    </Box >
  );
}
