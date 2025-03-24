import { Box, Typography, Divider } from "@mui/material";
import React from "react";

export const Signs = () => {
  return (
    <Box
      sx={{
        height: "auto",
        padding: { xs: "40px 20px", sm: "40px", md: "60px", lg: "80px 100px" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundImage: "url('/images/Rectangle.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgb(234, 236, 242 ,0.5)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Box
        sx={{
          position: "relative",
          justifyContent: "space-around",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          zIndex: 5,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ color: "#222240", fontSize: "22px" }}
            >
              NFC Signs
            </Typography>
            <Divider
              sx={{
                width: "10%",
                height: "3px",
                borderRadius: "20px",
                margin: "10px 0px",
                backgroundColor: "#E57C00",
                mx: { xs: "auto", md: "0" },
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              lineHeight: "25px",
              color: "#949493",
              fontSize: "13px",
              padding: { xs: "10px", sm: "20px", md: "30px" },
            }}
          >
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundImage: "url('/images/qr-code-counter.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "22px 22px 22px 0px",
            width: { xs: "80%", sm: "60%", md: "24%" },
            height: "360px",
            marginTop: { xs: "20px", md: 0 },
          }}
        >
          <Box
            sx={{
              border: "2px solid #E57C00",
              borderRadius: "22px 22px 22px 0px",
              width: "100%",
              height: "360px",
              margin: "4%",
            }}
          />
        </Box>
      </Box>
      <img src="/assets/qtap.svg" alt="cloud" className="nfc-icon" />
    </Box>
  );
};
