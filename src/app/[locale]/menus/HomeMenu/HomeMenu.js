import React from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import "./HomeMenu.css";
import NavBar from "@/app/[locale]/Home/NavBar";

const HomeMenu = () => {
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
            Smart Menu
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
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor
          </Typography>

          <Button className="joinButtonMenu" sx={{ marginTop: "60px" }}>
            <img
              src="/assets/plus.svg"
              alt="plus"
              style={{ width: "18px", height: "18px", marginRight: "6px" }}
            />
            Join Now
          </Button>
        </Box>
        <img src="/assets/cloud.svg" alt="cloud" className="menu-icon" />
      </Box>
    </Box>
  );
};

export default HomeMenu;
