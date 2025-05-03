import React from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import "./HomeMenu.css";
import NavBar from "@/app/[locale]/Home/NavBar";
import { useTranslations } from "next-intl";

const HomeMenu = () => {
  const t = useTranslations()
  return (
    <Box className="containerMenu">
      <NavBar />

      <Box className="heroMenu ">
        <Box sx={{ zIndex: "22" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "35px", sm: "40px", md: "50px" },
              color: "white",
            }}
          >
            {t("smartMenu")}
          </Typography>

          <Divider
            sx={{
              backgroundColor: "#E57C00",
              width: "80px",
              height: "4px",
              margin: "25px 57%",
              borderRadius: "20px",
            }}
          />

          <Typography
            className="des"
            variant="body1"
            sx={{
              width: "60%",
              fontSize: "15px",
              lineHeight: "30px",
              marginBottom: "30px",
              margin: "0px auto",
            }}
          >
            
            {t("lorem")}
          </Typography>

          <Button className="joinButton" sx={{ marginTop: "60px" }}>
            <img
              src="/assets/plus.svg"
              alt="plus"
              style={{ width: "18px", height: "18px", marginRight: "6px" }}
            />
            {t("joinNow")}
          </Button>
        </Box>
        <img src="/assets/cloud.svg" alt="cloud" className="menu-icon" />
      </Box>
    </Box>
  );
};

export default HomeMenu;
