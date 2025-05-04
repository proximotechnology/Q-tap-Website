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

// /////////////testimonials slider ////////////////////////////////////🛑
// "use client";
// import { Box, Typography, Divider, IconButton, Collapse } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import React, { useContext, useEffect, useState, useRef } from "react";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import { HomeContext } from "../context/homeContext.js";
// import { useTranslations } from "next-intl";

// export const Test = () => {
//   const [expanded, setExpanded] = useState(null);
//   const [faqData, setFaqData] = useState([]);
//   const [testData, setTestData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { getHomeData } = useContext(HomeContext);
//   const t = useTranslations();
//   const autoPlayRef = useRef(null);
//   const sliderRef = useRef(null);

//   const handleToggle = (panel) => {
//     setExpanded(expanded === panel ? null : panel);
//   };

//   // get faq data from api 
//   const getFaqData = async () => {
//     setLoading(true);
//     try {
//       // return data
//       const response = await getHomeData();

//       // set data
//       const parsedData = response?.data?.faq.map((faq) => ({
//         ...faq,
//         question: eval(faq.question),
//         answer: eval(faq.answer),
//       }));

//       setFaqData(parsedData);
//     } catch (error) {
//       setError(t("failedFetchFAQ"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // get testimonials data from api
//   const getTestData = async () => {
//     setLoading(true);
//     try {
//       // return data
//       const response = await getHomeData();

//       setTestData(response?.data?.feedback);
//     } catch (error) {
//       setError(t("failedFetchTestData"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getFaqData();
//     getTestData();
//   }, []);

//   // Slider navigation functions
//   const nextSlide = () => {
//     if (!testData || testData.length === 0) return;
    
//     const itemsPerView = getItemsPerView();
//     const maxIndex = Math.max(0, testData.length - itemsPerView);
//     setCurrentSlide((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     if (!testData || testData.length === 0) return;
    
//     const itemsPerView = getItemsPerView();
//     const maxIndex = Math.max(0, testData.length - itemsPerView);
//     setCurrentSlide((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   // Get number of items to display based on screen width
//   const getItemsPerView = () => {
//     if (typeof window !== "undefined") {
//       if (window.innerWidth < 600) return 1;
//       if (window.innerWidth < 960) return 2;
//       return 3;
//     }
//     return 3; // Default for SSR
//   };

//   // Setup autoplay
//   useEffect(() => {
//     autoPlayRef.current = nextSlide;
//   }, [testData]);

//   useEffect(() => {
//     const play = () => {
//       autoPlayRef.current();
//     };

//     const interval = setInterval(play, 2000);
    
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   // Responsive slider settings
//   const sliderContainerStyles = {
//     position: "relative",
//     width: "90%",
//     margin: "0 auto",
//     overflow: "hidden",
//   };

//   const sliderStyles = {
//     display: "flex",
//     transition: "transform 0.5s ease",
//     transform: `translateX(-${currentSlide * (100 / getItemsPerView())}%)`,
//   };

//   const sliderItemStyles = {
//     flex: `0 0 ${100 / getItemsPerView()}%`,
//     padding: "0 10px",
//     boxSizing: "border-box",
//   };

//   return (
//     <div id="tutorials">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           backgroundColor: "#EAECF2",
//           minHeight: "auto",
//           width: "100%",
//           padding: { xs: "20px 0", sm: "50px 0" },
//         }}
//       >
//         <Box sx={{ textAlign: "center", zIndex: 10 }}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="body2"
//               align="center"
//               gutterBottom
//               sx={{
//                 color: "#222240",
//                 fontSize: "25px",
//                 zIndex: 55,
//                 "@media (max-width: 600px)": {
//                   fontSize: "16px",
//                 },
//               }}
//             >
//               {t("testimonials")}
//             </Typography>
//             <Divider
//               sx={{
//                 width: "11%",
//                 borderRadius: "20px",
//                 marginTop: "-20px",
//                 height: "8px",
//                 backgroundColor: "#E57C00",
//               }}
//             />
//           </Box>
//         </Box>

//         {/* Testimonial Slider */}
//         <Box sx={sliderContainerStyles}>
//           {/* Navigation buttons */}
//           <IconButton 
//             onClick={prevSlide}
//             sx={{
//               position: "absolute",
//               left: { xs: "-5px", sm: "-15px" },
//               top: "50%",
//               transform: "translateY(-50%)",
//               backgroundColor: "rgba(229, 124, 0, 0.7)",
//               color: "white",
//               zIndex: 2,
//               "&:hover": {
//                 backgroundColor: "rgba(229, 124, 0, 1)",
//               },
//               width: { xs: "30px", sm: "40px" },
//               height: { xs: "30px", sm: "40px" },
//             }}
//           >
//             <NavigateBeforeIcon />
//           </IconButton>
          
//           <IconButton 
//             onClick={nextSlide}
//             sx={{
//               position: "absolute",
//               right: { xs: "-5px", sm: "-15px" },
//               top: "50%",
//               transform: "translateY(-50%)",
//               backgroundColor: "rgba(229, 124, 0, 0.7)",
//               color: "white",
//               zIndex: 2,
//               "&:hover": {
//                 backgroundColor: "rgba(229, 124, 0, 1)",
//               },
//               width: { xs: "30px", sm: "40px" },
//               height: { xs: "30px", sm: "40px" },
//             }}
//           >
//             <NavigateNextIcon />
//           </IconButton>
          
//           {/* Slider track */}
//           <Box 
//             ref={sliderRef} 
//             sx={{
//               ...sliderStyles,
//               marginBottom: { xs: "20px", sm: "100px" },
//             }}
//           >
//             {testData?.map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   ...sliderItemStyles,
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: "180px", sm: "200px" },
//                     height: "180px",
//                     "@media (max-width: 600px)": {
//                       width: "90%",
//                       height: "100%",
//                     },
//                     "&:hover": { transform: "scale(1.05)", transition: "0.5s" }
//                   }}
//                 >
//                   <Box sx={{ position: "relative", top: "60px", textAlign: "center" }}>
//                     <img
//                       src={item.client.img && item.client.img.trim() !== "" ? `https://api.qutap.co/${item.client.img}` : "/assets/chef.svg"}
//                       alt="Chef"
//                       style={{
//                         width: "75px",
//                         height: "75px",
//                         borderRadius: "50px",
//                         border: "5px solid #E57C00",
//                       }}
//                     />
//                   </Box>
//                   <Box
//                     sx={{
//                       backgroundColor: "#F1F1F2",
//                       width: "100%",
//                       height: "170px",
//                       borderRadius: "20px",
//                       boxShadow: "1",
//                       padding: "20px",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       justifyContent: "end",
//                       textAlign: "center",
//                       marginTop: "15px",
//                       "@media (max-width: 600px)": {
//                         width: "100%",
//                         height: "auto",
//                       },
//                     }}
//                   >
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: "#2A253F",
//                         fontSize: "15px",
//                         marginTop: "20px",
//                         "@media (max-width: 600px)": {
//                           fontSize: "12px",
//                           marginTop: "18px",
//                         },
//                       }}
//                     >
//                       {item.client.name}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "gray",
//                         fontSize: "8px",
//                         marginTop: "5px",
//                         "@media (max-width: 600px)": {
//                           fontSize: "7px",
//                         },
//                       }}
//                     >
//                       {item.comment}
//                     </Typography>
//                     <Box sx={{ marginTop: "13px" }}>
//                       {[...Array(item.star)].map((_, i) => (
//                         <StarIcon
//                           key={i}
//                           sx={{ color: "#E57C00", fontSize: "18px" }}
//                         />
//                       ))}
//                       <StarBorderIcon sx={{ color: "#E57C00", fontSize: "18px" }} />
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         {/* Slider dots/indicators */}
//         <Box 
//           sx={{ 
//             display: "flex", 
//             justifyContent: "center", 
//             gap: "8px",
//             marginBottom: "30px"
//           }}
//         >
//           {testData?.length > 0 && Array.from({
//             length: Math.ceil(testData.length / getItemsPerView())
//           }).map((_, index) => (
//             <Box
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               sx={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 backgroundColor: currentSlide === index ? "#E57C00" : "#ccc",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s",
//               }}
//             />
//           ))}
//         </Box>

//         <Divider
//           sx={{ backgroundColor: "#EC9B3B", width: "80%", margin: "40px auto" }}
//         />

//         {/* FAQ Section */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <Typography
//             variant="body2"
//             align="center"
//             gutterBottom
//             sx={{
//               color: "#222240",
//               fontSize: "20px",
//               "@media (max-width: 600px)": {
//                 fontSize: "16px",
//               },
//             }}
//           >
//             {t("faq")}
//           </Typography>

//           <Box
//             id="faq"
//             sx={{
//               width: "80%",
//               margin: "20px 0",
//               "@media (max-width: 600px)": {
//                 width: "95%",
//               },
//             }}
//           >
//             {faqData?.map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   marginBottom: "15px",
//                   borderRadius: "30px",
//                   border: "1px solid #A7A7A2",
//                   padding: "3px 20px",
//                 }}
//               >
//                 {item?.question.map((question) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => handleToggle(index)}
//                   >
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontSize: "12px",
//                         color: "gray",
//                         width: "100%",
//                       }}
//                     >
//                       {question}
//                     </Typography>

//                     <IconButton>
//                       {expanded === index ? (
//                         <ExpandMoreIcon sx={{ fontSize: "18px" }} />
//                       ) : (
//                         <ChevronRightIcon sx={{ fontSize: "18px" }} />
//                       )}
//                     </IconButton>
//                   </Box>
//                 ))}
//                 <Collapse in={expanded === index} timeout="auto" unmountOnExit>
//                   {item?.answer.map((answer, index) => (
//                     <Box key={index} sx={{ padding: "10px 0" }}>
//                       <Typography sx={{ fontSize: "12px", color: "gray" }}>
//                         {answer}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Collapse>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// };