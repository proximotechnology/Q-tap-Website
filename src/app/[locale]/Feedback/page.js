"use client";
import React, { useEffect, useState } from "react";
import { Header } from './Header';
import { Box, Typography, IconButton, Grid, Divider, Button } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import { ordersDetails } from "../categories/data";
import {Link} from "@/i18n/navigation"
import { useTranslations } from "next-intl";

const page = () => {
  const [activeStars, setActiveStars] = useState(2);
  const t = useTranslations()

  const handleStarClick = (index) => {
    setActiveStars(index + 1);
  };
  const [activeCircles, setActiveCircles] = useState([]);

  const handleCircleClick = (index) => {
    setActiveCircles((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  // =============================================================================
  const specificOrder = ordersDetails.find(order => order.id === 3218);
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);
  // =============================================================================

  return (
    <Box
      sx={{
        color: 'white',
        backgroundColor: '#1E1E2A',
        height: "100vh",
        width: '100%',
      }}>

      <Header />

      <Box
        sx={{
          padding: "20px",
          color: "white",
          position: "relative", top: "27vh",
        }}
      >
        {specificOrder ? (
          <Typography sx={{ color: "#575756", fontSize: "15px", marginBottom: "3px" }}> {t("orderId")} :
            <span style={{ color: "white", marginLeft: "6px" }}> #{specificOrder.id}</span>
          </Typography>
        ) : (<></>)}

        {formData ? (
          <>
            <Typography sx={{ color: "#575756", fontSize: "15px", marginBottom: "3px" }} >{t("name")}:
              <span style={{ color: "#949493" }}>{formData.selectedName}</span>
            </Typography>

            <Typography sx={{ color: "#575756", fontSize: "15px", marginBottom: "3px" }} >{t("mobileNumber")}:
              <span style={{ color: "#949493" }}> {formData.phone}</span>
            </Typography>
            <Divider sx={{ margin: "10px 0px", backgroundColor: "#44404D" }} />

          </>
        ) : (<> </>)}



        <Box sx={{ marginTop: "15px" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: "100" }}>{t("rate")}</Typography>

          <Grid container>
            {Array.from({ length: 5 }).map((_, index) => (
              <Grid item key={index}>
                <IconButton
                  onClick={() => handleStarClick(index)}
                  sx={{
                    color: index < activeStars ? "#575756" : "#575756",
                  }}
                >
                  {index < activeStars ? <StarIcon sx={{ fontSize: "27px", }} /> : <StarOutlineIcon sx={{ fontSize: "27px", }} />}
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginTop: "15px" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: "100" }}>{t("howMuchYorSatisfiedWithTheProduct")}</Typography>

          <Grid container justifyContent="center" >
            {Array.from({ length: 10 }).map((_, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",

                  }}
                >
                  <IconButton
                    onClick={() => handleCircleClick(index)}
                    sx={{
                      color: activeCircles.includes(index) ? "#575756" : "#575756",
                    }}
                  >
                    {activeCircles.includes(index) ? <CircleIcon sx={{ fontSize: "30px" }} /> :
                      <CircleOutlinedIcon sx={{ fontSize: "30px" }} />}
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      color: activeCircles.includes(index) ? "white" : "#AAAAAA",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

{/* footer */}
      <Box
        sx={{
          position: "fixed", bottom: 0, backgroundColor: "#302E3B",
          height: "50px", width: "90%",
          padding: "20px",
          boxShadow: 3, borderRadius: "30px 30px 0px 0px",
          display: "flex", justifyContent: "space-between", textAlign: "center", alignItems: "center"
        }}>

        <Box sx={{ display: "flex", alignItems: "center",justifyContent:"center",textAlign:"center",width: "100%",}}>

          <Link href={'/Supporting'} >
            <Button
              sx={{
                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                color: "white", textTransform: "capitalize", fontSize: "13px",
                borderRadius: "20px", height: "30px",width:"150px",
                "&:hover": {
                  backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                }
              }}>
              {t("submit")} <span className="icon-check1" style={{ marginLeft: "8px" ,color:"#AAAAAA",fontSize:"18px"}} />
            </Button>
          </Link>
        </Box>
      </Box>

    </Box>
  )
}
export default page; 