"use client";
import { Box, Typography, Divider, Button, Grid, Skeleton, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { HomeContext } from "../context/homeContext";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_URL } from "@/utils/constants";

const PricingCard = ({ title, priceMonthly, priceYearly, description, features }) => {
  const t = useTranslations();

  const handleNavigateToDashboard = () => {
    window.location.href = DASHBOARD_URL;
  }

  return (
    <Box
      sx={{
        borderRadius: "50px 50px 50px 0px",
        backgroundColor: "white",
        margin: "20px",
        height: "90%",
        "&:hover": { cursor: "pointer", transform: "scale(1.05)", transition: "0.3s" },
      }}
    >
      <Box sx={{
        display: "flex", justifyContent: "center",
        margin: "0 auto",
        width: "70%",
        transform: "translateY(-50%)",
      }}>
        <Box
          sx={{
            backgroundColor: "#ef7d00",
            textAlign: "center",
            padding: "5px 20px",
            width: "100%",
            borderRadius: "40px",
            color: "#fff",
          }}
        >
          <Typography variant="h6">{title}</Typography>
        </Box>
      </Box>
      <div style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: '90%' }}>
        <Box sx={{ textAlign: "center", marginTop: "-20px" }}>
          <Typography variant="h4" color="textPrimary" fontWeight="900" >
            <sup style={{ color: "#ef7d00", fontSize: "12px", marginRight: "10px", fontWeight: "bold" }}>EGP</sup>
            {priceMonthly}
            <Typography component="span" variant="body2" color="textSecondary">
              /{t("month")}
            </Typography>
          </Typography>

          <Typography variant="h6" color="textPrimary" sx={{ marginTop: "10px" }} fontWeight={900}>
            <sup style={{ color: "#ef7d00", fontSize: "12px", marginRight: "10px", fontWeight: "bold" }}>EGP</sup>
            {priceYearly}
            <Typography component="span" variant="body2" color="textSecondary">
              /{t("year")}
            </Typography>
          </Typography>
          <Divider sx={{ my: 2, backgroundColor: "#ef7d00", width: "100%" }} />
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "40px", fontSize: "11px" }}>
          {description}
        </Typography>

        <Box>
          {features.map((feature, index) => (
            <Typography
              key={index}
              variant="body2"
              color="textSecondary"
              display="flex"
              sx={{ fontSize: "10px", paddingTop: "8px", wordSpacing: "2px" }}
            >
              <img
                src="/assets/check.svg"
                alt="check"
                style={{ fontSize: "13px", height: "13px", marginRight: "10px" }}
              />
              {feature}
            </Typography>
          ))}
        </Box>

        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            sx={{
              backgroundColor: "#222240",
              fontSize: "15px",
              padding: "6px 40px",
              borderRadius: "20px",
              color: "white",
              "&:hover": { backgroundColor: "#222240e5" },
              textTransform: "capitalize",
              // position: "absolute",
              bottom: "15px",
              fontWeight: "600"
            }}
            onClick={() => { handleNavigateToDashboard() }}
          >
            {t("subscribe")} <ArrowForwardIcon sx={{ fontSize: "16px", marginLeft: "6px", strokeWidth: 2 }} />
          </Button>
        </Box>
      </div>

    </Box>
  );
};

export const Pricing = () => {
  const { getHomeData } = useContext(HomeContext);
  const t = useTranslations();

  // جلب البيانات باستخدام useQuery
  const { data: pricingData, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
    select: (response) => {
      return (
        response?.data?.pricing?.map((pricing) => ({
          ...pricing,
          features: pricing.feature ? JSON.parse(pricing.feature) : [],
          monthlyPrice: parseFloat(pricing.monthly_price) || 0,
          yearlyPrice: parseFloat(pricing.yearly_price) || 0,
        })) || []
      );
    },
  });
  // التعامل مع حالات التحميل
  if (isLoading) {
    return (
      <div id="pricing">
        <Box
          sx={{
            background: "linear-gradient(to top right, #E67D00, #784A23, #3F2F36, #31293B, #222240)",
            minHeight: "auto",
            width: "100%",
            padding: { xs: "20px 10px", md: "40px 0px" },
          }}
        >
          <Box sx={{ position: "relative", textAlign: "center", zIndex: 10 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <Typography
                variant="body2"
                align="center"
                gutterBottom
                sx={{ color: "white", fontSize: "32px", zIndex: 12 }}
              >
                {t("nav.pricing")}
              </Typography>
              <Divider
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: { md: "44%", xs: "35%" },
                  width: { xs: "10%", md: "6%" },
                  borderRadius: "20px",
                  marginTop: "-15px",
                  height: "5px",
                  border: "none",
                  backgroundColor: "#E57C00",
                  zIndex: 11,
                }}
              />
            </Box>
          </Box>

          <Grid container justifyContent="center" spacing={2}>
            {[...Array(3)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{
                    borderRadius: "50px 50px 50px 0px",
                    padding: "30px",
                    backgroundColor: "white",
                    margin: "20px",
                    height: "90%",
                    position: "relative",
                  }}
                >
                  <Skeleton variant="rectangular" height={40} width="70%" sx={{ borderRadius: "40px", mx: "auto", mt: "-40px" }} />
                  <Box sx={{ textAlign: "center", marginTop: "-20px" }}>
                    <Skeleton variant="text" width="50%" sx={{ mx: "auto" }} />
                    <Skeleton variant="text" width="40%" sx={{ mx: "auto", mt: 1 }} />
                    <Divider sx={{ my: 2, backgroundColor: "#ef7d00", width: "100%" }} />
                  </Box>
                  <Skeleton variant="text" width="80%" sx={{ mb: 4 }} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
                  <Skeleton variant="rectangular" height={40} width="50%" sx={{ mx: "auto", mt: 6, borderRadius: "20px" }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  }

  // التعامل مع حالات الخطأ
  if (error) {
    return (
      <div id="pricing">
        <Box
          sx={{
            background: "linear-gradient(to top right, #E67D00, #784A23, #3F2F36, #31293B, #222240)",
            minHeight: "auto",
            width: "100%",
            padding: { xs: "20px 10px", md: "40px 0px" },
          }}
        >
          <Box sx={{ position: "relative", textAlign: "center", zIndex: 10 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <Typography
                variant="body2"
                align="center"
                gutterBottom
                sx={{ color: "white", fontSize: "32px", zIndex: 12 }}
              >
                {t("nav.pricing")}
              </Typography>
              <Divider
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: { md: "44%", xs: "35%" },
                  width: { xs: "10%", md: "6%" },
                  borderRadius: "20px",
                  marginTop: "-15px",
                  height: "5px",
                  border: "none",
                  backgroundColor: "#E57C00",
                  zIndex: 11,
                }}
              />
            </Box>
          </Box>
          <Typography color="error" align="center">
            {t("homePage.failedFetchPricing")}
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div id="pricing">
      <Box
        sx={{
          background: "linear-gradient(to top right, #E67D00, #784A23, #3F2F36, #31293B, #222240)",
          minHeight: "auto",
          width: "100%",
          padding: { xs: "20px 10px", md: "40px 0px" },
        }}
      >
        <Box sx={{ position: "relative", textAlign: "center", zIndex: 10 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              sx={{ color: "white", fontSize: "32px", zIndex: 12 }}
            >
              {t("nav.pricing")}
            </Typography>
            <Divider
              sx={{
                position: "absolute",
                bottom: "10px",
                left: { md: "46%", xs: "43%" },
                width: { md: "8%", xs: "14%" },
                borderRadius: "20px",
                marginTop: "-15px",
                height: "5px",
                border: "none",
                backgroundColor: "#E57C00",
                zIndex: 11,
              }}
            />
          </Box>
        </Box>

        <Grid container justifyContent="center" spacing={2}>
          {pricingData?.map((plan) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={plan.id}>
              <PricingCard
                title={plan.name}
                priceMonthly={plan.monthlyPrice}
                priceYearly={plan.yearlyPrice}
                description={plan.description}
                features={plan.features}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Pricing;