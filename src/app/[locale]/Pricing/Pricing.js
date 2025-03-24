"use client";
import { Box, Typography, Divider, Button, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { HomeContext } from '../context/homeContext';
import { useTranslations } from 'next-intl';

const PricingCard = ({ title, priceMonthly, priceYearly, description, features }) => {
    const t = useTranslations()
    return (
    <Box
        sx={{
            borderRadius: '50px 50px 50px 0px',
            padding: '30px',
            // width: { xs: '100%', sm: '80%', md: '30%' },  
            backgroundColor: 'white',
            margin: '20px',
            height: "90%",
            position:"relative"
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'center', position: "relative", top: "-40px" }}>
            <Box
                sx={{
                    backgroundColor: '#ef7d00',
                    textAlign: 'center',
                    padding: '5px 20px',
                    width: "70%",
                    borderRadius: "40px",
                    color: '#fff',
                }}
            >
                <Typography variant="h6">{title}</Typography>
            </Box>
        </Box>

        <Box sx={{ textAlign: 'center', marginTop: "-20px" }}>
            <Typography variant="h4" color="textPrimary">
                <sup style={{ color: "#ef7d00", fontSize: "12px", marginRight: "10px" }}>EGP</sup>{priceMonthly}
                <Typography component="span" variant="body2" color="textSecondary">
                    /{t("month")}
                </Typography>
            </Typography>

            <Typography variant="h6" color="textPrimary" sx={{ marginTop: "10px" }}>
                <sup style={{ color: "#ef7d00", fontSize: "12px", marginRight: "10px" }}>EGP</sup>{priceYearly}
                <Typography component="span" variant="body2" color="textSecondary">
                    /{t("year")}
                </Typography>
            </Typography>
            <Divider sx={{ my: 2, backgroundColor: "#ef7d00", width: "100%" }} />
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '40px', fontSize: "11px" }}>
            {description}
        </Typography>

        <Box>
            {features.map((feature, index) => (
                <Typography key={index} variant="body2" color="textSecondary" display="flex"
                    sx={{ fontSize: "10px", paddingTop: "8px", wordSpacing: "2px" }} >
                    <img src="/assets/check.svg" alt="check" style={{ fontSize: "13px", height: "13px", marginRight: "10px" }} />
                    {feature}
                </Typography>
            ))}
        </Box>

        <Box display="flex" justifyContent="center" mt={6} >
            <Button sx={{backgroundColor:"#222240" , fontSize:"15px" ,padding:"6px 40px", borderRadius:"20px" , color:"white",
                textTransform:"capitalize" , position:"absolute" , bottom:"15px"}}>
            {t("subscribe")} <ArrowForwardIcon sx={{fontSize:"16px" ,marginLeft:"6px"}} />
            </Button>
        </Box>
    </Box>
)};

export const Pricing = () => {
    const [pricingData, setPricingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getHomeData } = useContext(HomeContext);
    const t = useTranslations()
    // fetch data
    const getPricingData = async () => {
      setLoading(true);
      try {
        const response = await getHomeData();
        
        const parsedData = response?.data?.pricing.map((pricing) => ({
          ...pricing,
          // Parse the features from JSON string to array
          features: JSON.parse(pricing.feature),
          // Convert prices to numbers if needed
          monthlyPrice: parseFloat(pricing.monthly_price),
          yearlyPrice: parseFloat(pricing.yearly_price),
        }));

        setPricingData(parsedData);
        // console.log("Parsed pricing Data:", parsedData);
      } catch (error) {
        console.error("Error fetching pricing:", error);
        setError("Failed to fetch pricing data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getPricingData();
    }, []);
    return (
        <div id="pricing"> 
        <Box
        sx={{
            background: 'linear-gradient(to top right, #E67D00, #784A23, #3F2F36,#31293B, #222240)',
            minHeight: "auto",
            width: "100%",
            padding: { xs: "20px 10px", md: "40px 0px" },  
        }}>

            <Box sx={{ position: "relative", textAlign: "center", zIndex: 10 }}>
                <Box sx={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: "center", marginBottom: "40px",
                }}>
                    <Typography variant="body2" align="center" gutterBottom
                        sx={{ color: "white", fontSize: "32px", zIndex: 12 }}>
                        {t("nav.pricing")}
                    </Typography>
                    <Divider sx={{ position:"absolute" , bottom:"10px" , left:{md:"44%" , xs:"35%"} ,
                        width: { xs: "10%", md: "6%" }, borderRadius: "20px", marginTop: "-15px",
                        height: "5px", border: "none", backgroundColor: "#E57C00", zIndex: 11 
                    }} />
                </Box>
            </Box>

            <Grid container justifyContent="center" spacing={2}>
                {pricingData.map((plan) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={plan.id}>
                        <PricingCard
                            title={t(plan.name)}
                            priceMonthly={plan.monthly_price}
                            priceYearly={plan.yearly_price}
                            description={plan.description}
                            features={plan.features}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
        </div>
    )
}
