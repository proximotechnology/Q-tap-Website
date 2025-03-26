import React from 'react';
import { Box, Grid, Typography, TextField, Button, Link, Divider, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslations } from 'next-intl';

const Footer = () => {
    const t = useTranslations()
    return (
        <Box>
            <Box sx={{
                backgroundImage: "url('/images/footer.jpg')", width: "100%", height: { xs: '20vh', md: '18vh' },
                position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                justifyContent: "center", textAlign: "center", alignItems: "center", display: "flex"
            }}> 
                <Typography variant="body2" sx={{ fontSize: { xs: '16px', md: '18px' }, color: "white" }}>
                    {t("smartEasySafe")}
                </Typography>
            </Box>

            <Box sx={{ backgroundColor: '#222240', padding: { xs: '20px 20px', md: '40px 100px' }, color: 'white' }}>
                <Grid container spacing={4} justifyContent="space-around">
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ margin: '10px 0px 16px 0px', textAlign: { xs: 'center', sm: 'left' } }}>
                            <img src="/assets/qtapwhite.svg" alt="qtap" style={{ width: "100px", height: "40px" }} />
                        </Box>

                        <Typography variant='body2' sx={{ fontSize: "12px", width: { xs: '100%', sm: "200px" }, lineHeight: 2 }}>
                            {t("footer.text1")}
                            {t("footer.text2")}
                        </Typography>
                        <Typography variant='body2' sx={{ fontSize: "12px", width: { xs: '100%', sm: "200px" }, lineHeight: 2 }}>
                        {t("footer.text3")}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{
                            display: 'flex', margin: "20px 0px", backgroundColor: 'white',
                            borderRadius: '20px',  padding: "5px", 
                            width: { xs: '90%', sm: "280px" } , height:"auto",
                        }}>

                            <Button
                                sx={{
                                    backgroundColor: '#E57C00', fontSize: "11px", textTransform: "capitalize",
                                    color: 'white', padding: "2px 15px", height: "23px", borderRadius: '20px',
                                    boxShadow: "none", alignItems: "center", whiteSpace: "nowrap"
                                }}>
                                {t("subscribe")}
                            </Button>

                            <TextField
                                type='email'
                                placeholder="Mail@example.com"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '20px', fontSize: "11px",color:"gray"
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    
                                }}
                            />
                        </Box>

                        <Box >
                            <Link href="#" color="inherit" underline="hover"
                                sx={{ display: 'block', fontSize: "12px", fontFamily: "sans-serif", marginBottom: "10px" }}>
                                {t("footer.helpfulLinks")}
                            </Link>

                            <Link href="#" color="inherit" underline="hover"
                                sx={{ display: 'block', marginBottom: "10px", fontSize: "12px", fontFamily: "sans-serif" }}>
                                {t("footer.termsConditions")}
                            </Link>
                            <Link href="#" color="inherit" underline="hover"
                                sx={{ display: 'block', marginBottom: "10px", fontSize: "12px", fontFamily: "sans-serif" }}>
                                {t("footer.howItWork")}
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'end' }, marginTop: { xs: "20px", sm: "70px" } }}>
                        <Typography variant="body2" sx={{ fontSize: "12px" }}>{t("footer.contact")}</Typography>

                        <Typography sx={{ margin: '5px 0', fontSize: "12px" }}>sales@qtap.com</Typography>
                        <Typography sx={{ margin: '5px 0', fontSize: "12px" }}>+201050379784</Typography>
                        <Typography sx={{ margin: '5px 0', fontSize: "12px" }}>+201050379784</Typography>
                    </Grid>
                </Grid>


                <Box sx={{ display: "flex", justifyContent: { xs: 'center', sm: 'right' }, gap: "6px" , marginTop:"25px" }}>
                    <IconButton sx={{ color: "#FFFFFF", "&:hover": { color: "#E57C00" } }}>
                        <InstagramIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ color: "#FFFFFF", "&:hover": { color: "#E57C00" } }}>
                        <FacebookIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ color: "#FFFFFF", "&:hover": { color: "#E57C00" } }}>
                        <TwitterIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ color: "#FFFFFF", "&:hover": { color: "#E57C00" } }}>
                        <WhatsAppIcon fontSize="small" />
                    </IconButton>
                </Box>


                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
                        <Typography variant="body2" sx={{ fontSize: "10px", marginTop: 2, mr: 3 }}>
                        {t("footer.privacyPolicy")}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "10px", marginTop: 2, mr: 3 }}>
                        {t("footer.terms&conditions")}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "10px", marginTop: 2, mr: 3 }}>
                        {t("footer.cookiePolicy")}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "10px", marginTop: 2, mr: 3 }}>
                        {t("footer.refund&cancellation")}
                        </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ fontSize: "10px", marginTop: 2, textAlign: { xs: "center", sm: "right" } }}>
                        {t("footer.copyRight")}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
