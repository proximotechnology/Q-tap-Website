"use client";
import {
  Box,
  IconButton,
  Typography,
  Divider,
  Grid,
  Paper,
  Collapse,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Language from "@/component/Language";
import { Link } from "@/i18n/navigation"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FeedIcon from "@mui/icons-material/Feed";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import Footer from "@/app/[locale]/Footer/Footer";
import { HomeContext } from "@/app/[locale]/context/homeContext.js";
import { useTranslations } from "next-intl";
import { AllChatSupport } from "./AllChatSupport";

import { useQuery } from "@tanstack/react-query";

export const Support = () => {
  const [expanded, setExpanded] = useState(null);
  const { getHomeData } = useContext(HomeContext);
  const t = useTranslations();

  const handleToggle = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  // جلب البيانات باستخدام useQuery
  const { data: faqData, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
    select: (response) => {
      return (
        response?.data?.faq?.map((faq) => ({
          ...faq,
          question: faq.question ? JSON.parse(faq.question) : [],
          answer: faq.answer ? JSON.parse(faq.answer) : [],
        })) || []
      );
    },
  });
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundImage: "url('/images/Rectangle.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            width: "100%",
            height: { xs: "40vh", md: "45vh" },
            borderRadius: { xs: "0", md: "0px 0px 30px 30px" },
            backgroundImage: "url('/images/support.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
              background:
                "linear-gradient(to top right,rgba(230, 127, 0, 0.51),rgba(54, 43, 57, 0.582), rgba(33, 33, 63, 0.5))",
              zIndex: 6,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              position: "relative",
              zIndex: 10,
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              padding: { xs: "10px 20px", md: "20px 80px" },
            }}
          >
            <IconButton>
              <Link href="/">
                <KeyboardArrowLeftIcon
                  sx={{ fontSize: "25px", color: "white" }}
                />
              </Link>
            </IconButton>
            <Box>
              <Language />
            </Box>
          </Box>

          <Box sx={{ position: "relative", zIndex: 10 }}>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: "20px", md: "30px" }, color: "white" }}
            >
              {t("getSupport")}
            </Typography>

            <Divider
              sx={{
                backgroundColor: "#E57C00",
                width: { xs: "12%", md: "4%" },
                height: "3px",
                margin: "20px 53%",
                borderRadius: "20px",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                width: { xs: "90%", md: "80%" },
                fontSize: { xs: "12px", md: "15px" },
                marginBottom: "30px",
                padding: { xs: "0px 5%", md: "0px 10%" },
                color: "white",
              }}
            >
              {t("yourSatisfactionMatters")}
            </Typography>

            <Paper
              sx={{
                width: { xs: "60%", md: "30%" },
                borderRadius: "20px",
                height: "auto",
                justifyContent: "center",
                textAlign: "center",
                display: "flex",
                padding: "30px 0px",
                margin: "0 auto",
                zIndex: "88",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={7}
                  sx={{ textAlign: "center", alignItems: "center" }}
                >
                  <Box sx={{ cursor: "pointer" }}>
                    <AllChatSupport />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "10px", color: "#AAAAAA" }}
                    >
                      {t("liveChat")}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={3} sx={{ textAlign: "center" }}>
                  <Box sx={{ cursor: "pointer" }}>
                    <WhatsAppIcon
                      sx={{
                        fontSize: "27px",
                        color: "#575756",
                        "&:hover": {
                          color: "#E57C00",
                          transform: "scale(1.1)",
                          transition: "all 0.3s",

                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "10px", color: "#AAAAAA" }}
                    >
                      {t("whatsApp")}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ margin: "20px 60px" }} />
                </Grid>

                <Grid item xs={7} sx={{ textAlign: "center" }}>
                  <Box sx={{ cursor: "pointer" }}>
                    <span
                      className="icon-terms-and-conditions1"
                      style={{ fontSize: "25px", color: "#575756" }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#E57C00";
                        // e.target.style.fontSize = "26px";
                        e.target.style.transition = "all 0.3s";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#575756";
                        // e.target.style.fontSize = "25px";
                      }}
                    ></span>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "10px", color: "#AAAAAA" }}
                    >
                      {t("footer.terms&conditions")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center" }}>
                  <Box sx={{ cursor: "pointer" }}>
                    <span
                      className="icon-viber1"
                      style={{ fontSize: "25px", color: "#575756" }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#E57C00";
                        // e.target.style.fontSize = "26px";
                        e.target.style.transition = "all 0.3s";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#575756";
                        // e.target.style.fontSize = "25px";
                      }}
                    ></span>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "10px", color: "#AAAAAA" }}
                    >
                      {t("callCS")}
                    </Typography>
                  </Box>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    height: { xs: "100px", md: "130px" },
                  }}
                />
              </Grid>
            </Paper>
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box
          sx={{
            width: "90%",
            height: "100%",
            marginBottom: { xs: "30px", md: "50px" },
            marginTop: { xs: "70px", md: "100px" },
          }}
        >
          <Box sx={{ paddingTop: { xs: "50px", md: "50px" } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "20px", md: "22px" },
                color: "#222240",
              }}
            >
              {t("faq")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                width: "100%",
                fontSize: { xs: "10px", md: "12px" },
                margin: "10px 0px ",
                textAlign: "center",
                color: "gray",
              }}
            >
              {t("weHaveAnswerToYourQuestion")}
            </Typography>

            <Paper
              sx={{
                width: { xs: "90%", md: "80%" },
                borderRadius: "20px",
                justifyContent: "center",
                margin: "30px auto 0",
                padding: "20px",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Box sx={{ width: "90%", padding: "20px 0" }}>
                {faqData?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginBottom: "15px",
                      borderRadius: "30px",
                      border: "1px solid #A7A7A2",
                      padding: "2px 20px",
                    }}
                  >
                    {item?.question.map((question) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleToggle(index)}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", color: "gray" }}
                        >
                          {t(question)}
                        </Typography>
                        <IconButton>
                          {expanded === index ? (
                            <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                          ) : (
                            <ChevronRightIcon sx={{ fontSize: "18px" }} />
                          )}
                        </IconButton>
                      </Box>
                    ))}
                    <Collapse
                      in={expanded === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      {item?.answer.map((answer, ind) => (
                        <Box sx={{ padding: "10px 0", textAlign: "start" }}>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            {answer}
                          </Typography>
                        </Box>
                      ))}
                    </Collapse>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
