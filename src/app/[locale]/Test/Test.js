"use client";
import { Box, Typography, Divider, IconButton, Collapse } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { HomeContext } from "../context/homeContext.js";
import { useTranslations } from "next-intl";

export const Test = () => {
  const [expanded, setExpanded] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getHomeData } = useContext(HomeContext);
  const t = useTranslations()

  const handleToggle = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  // get faq data from api 
  const getFaqData = async () => {
    setLoading(true);
    try {
      // return data
      const response = await getHomeData();

      // set data
      const parsedData = response?.data?.faq.map((faq) => ({
        ...faq,
        question: eval(faq.question),
        answer: eval(faq.answer),
      }));

      setFaqData(parsedData);
      // console.log("Parsed FAQ Data:", parsedData);

      setError(t("failedFetchFAQ"));
    } finally {
      setLoading(false);
    }
  };


  // get testimonials data from api
  const getTestData = async () => {
    setLoading(true);
    try {
      // return data
      const response = await getHomeData();

      setTestData(response?.data?.feedback);
      // console.log("Parsed test Data:", response?.data?.feedback);

      setError(t("failedFetchTestData"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqData();
    getTestData()
  }, []);

  return (
    <div id="tutorials">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#EAECF2",
          minHeight: "auto",
          width: "100%",
          padding: { xs: "20px 0", sm: "50px 0" },
        }}
      >
        <Box sx={{ textAlign: "center", zIndex: 10 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              sx={{
                color: "#222240",
                fontSize: "25px",
                zIndex: 55,
                "@media (max-width: 600px)": {
                  fontSize: "16px",
                },
              }}
            >
              {t("testimonials")}
            </Typography>
            <Divider
              sx={{
                width: "11%",
                borderRadius: "20px",
                marginTop: "-20px",
                height: "8px",
                backgroundColor: "#E57C00",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
            gap: { xs: 0, sm: 6 },
            marginBottom: { xs: "10px", sm: "100px" },
          }}
        >
          {testData?.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "200px",
                height: "180px",
                "@media (max-width: 600px)": {
                  width: "60%",
                  height: "100%",
                },
                "&:hover": { cursor: "pointer", transform: "scale(1.05)", transition: "0.5s" }

              }}
            >
              <Box sx={{ position: "relative", top: "60px" }}>
                <img

                  src={item.client.img && item.client.img.trim() !== "" ? `https://api.qutap.co/${item.client.img}` : "/assets/chef.svg"}
                  alt="Chef"
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50px",
                    border: "5px solid #E57C00",
                  }}
                />
              </Box>
              <Box
                sx={{
                  backgroundColor: "#F1F1F2",
                  width: "100%",
                  height: "170px",
                  borderRadius: "20px",
                  boxShadow: "1",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "end",
                  textAlign: "center",
                  marginTop: "15px",
                  "@media (max-width: 600px)": {
                    width: "100%",
                    height: "auto",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#2A253F",
                    fontSize: "15px",
                    marginTop: "20px",
                    "@media (max-width: 600px)": {
                      fontSize: "12px",
                      marginTop: "18px",
                    },
                  }}
                >
                  {item.client.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    fontSize: "8px",
                    marginTop: "5px",
                    "@media (max-width: 600px)": {
                      fontSize: "7px",
                    },
                  }}
                >
                  {item.comment}
                </Typography>
                 <Box sx={{ marginTop: "13px" }}>
                {[...Array(item.star)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{ color: "#E57C00", fontSize: "18px" }}
                  />
                ))}
                {item.star < 5 && (
                  <StarBorderIcon sx={{ color: "#E57C00", fontSize: "18px" }} />
                )}
              </Box>

              </Box>
            </Box>
          ))}
        </Box>

        <Divider
          sx={{ backgroundColor: "#EC9B3B", width: "80%", margin: "40px auto" }}
        />

        {/* FAQ Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            sx={{
              color: "#222240",
              fontSize: "20px",
              "@media (max-width: 600px)": {
                fontSize: "16px",
              },
            }}
          >
            {t("faq")}
          </Typography>

          <Box
            id="faq"
            sx={{
              width: "80%",
              margin: "20px 0",
              "@media (max-width: 600px)": {
                width: "95%",
              },
            }}
          >
            {faqData?.map((item, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: "15px",
                  borderRadius: "30px",
                  border: "1px solid #A7A7A2",
                  padding: "3px 20px",
                }}
              >
                {item?.question.map((question) => (
                  <Box
                    key={index}
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
                      sx={{
                        fontSize: "12px",
                        color: "gray",
                        width: "100%",
                      }}
                    >
                      {question}
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
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  {item?.answer.map((answer, index) => (
                    <Box key={index} sx={{ padding: "10px 0" }}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        {answer}
                      </Typography>
                    </Box>
                  ))}
                </Collapse>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
