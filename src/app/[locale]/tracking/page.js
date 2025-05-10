"use client";
import React, { useEffect, useState } from 'react'
import { Header } from '@/app/[locale]/payment/Header'
import { OrderDetails } from '@/app/[locale]/orderPlaced/OrderDetails';
import { Box, Typography, Divider, Avatar, } from '@mui/material';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PaymentModal from './PaymentModal';
import { useTranslations } from 'next-intl';
import Pusher from 'pusher-js';


const page = () => {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(null);


  const handleOpen = () => setIsModalOpen(true);

  const handleClose = () => {
    setIsModalOpen(false);
  }
  useEffect(() => {
   
  }, []);

  useEffect(() => {
     let myOrder = localStorage.getItem('order')
    if (myOrder) {
      myOrder = JSON.parse(myOrder)
      setOrder(myOrder)
      console.log('track my order', myOrder)
    }

    const pusher = new Pusher('63b495891d2c3cff9d36', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('notify-channel');
    channel.bind('form-submitted',  (data) => {
      console.log('📢 track Received from Pusher:', data);
      // accepted_order
      if (data.type === "accepted_order") {
        if (myOrder?.id  === data?.message?.[0]?.id) {
          let updatedOrder = data?.message?.[0]
          updatedOrder.phase = "Accepted"
          setOrder(updatedOrder)
          localStorage.setItem('order',JSON.stringify(updatedOrder))
        }
      }
      // prepared_order
      if (data.type === "prepared_order") {
        if (myOrder?.id === data?.message?.[0]?.id) {
          let updatedOrder = data?.message?.[0]
          updatedOrder.phase = "Prepared"
          setOrder(updatedOrder)
          localStorage.setItem('order',JSON.stringify(updatedOrder))
        }
      }
    })
  }, [])

  const steps = [
    {
      id: 1, label: "Order Placed", time: "0:00 PM 00 Mon.Year",
      icon: <span className="icon-online-shop1"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>,
      active: true
    },

    {
      id: 2, label: "Accepted", time: "0:00 PM 00 Mon.Year",
      icon: <CheckCircleOutlineIcon />,
      active: false
    },

    {
      id: 3, label: "Prepared", time: "0:00 PM 00 Mon.Year",
      icon: <span className="icon-chef1"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>,
      active: false
    },

    {
      id: 4, label: "Served", time: "0:00 PM 00 Mon.Year",
      icon: <span className="icon-food-delivery1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>,
      active: false
    },

    {
      id: 5, label: "Closed", time: "0:00 PM 00 Mon.Year",
      icon: <span className="icon-double-check1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>,
      active: false
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#1E1E2A',
        maxWidth: '100%', height: "auto",
      }}>

      <Header />
      <OrderDetails />

      <Box
        sx={{
          position: "relative", top: "45vh",
          color: "#FFFFFF",
          padding: "20px",
          backgroundColor: '#1E1E2A',

        }}
      >
        <Typography
          variant="h6" sx={{ color: "#FFFFFF", fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }} >
          {t("tracking")}
        </Typography>

        {steps.map((step, index) => {
         index === 0 ? step.active=true : step.active = order?.phase === step.label;
          return (
            <React.Fragment key={index}>
              <Box key={step.id} sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    backgroundImage: step.active ? 'linear-gradient(to left, #44404D, #797993)' : 'none',
                    backgroundColor: step.active ? "none" : "#302E3B",
                    color: step.active ? "#FFFFFF" : "#575756",
                    marginRight: "16px", fontSize: "25px", padding: "5px",
                  }}
                >
                  {step.icon}
                </Avatar>

                <Box sx={{ width: "100%", }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: step.active ? "800" : "normal",
                          color: step.active ? "#FFFFFF" : "#302E3B",
                          fontSize: "14px",
                        }}
                      >
                        {t(step.label)}
                      </Typography>

                      <Typography variant="caption"
                        sx={{ color: step.active ? " #AAAAAA" : "#302E3B", fontSize: "12px", }}>
                        {step.time}
                      </Typography>
                    </Box>

                    <Box>
                      {index === 1 && (
                        <Box
                          sx={{
                            textAlign: "right",
                            color: step.active ? "#AAAAAA" : " #302E3B"
                          }}
                        >
                          <Typography sx={{ fontSize: "11px", }}>{t("prepTime")}</Typography>

                          <Typography sx={{ fontSize: "14px", color: "white", fontWeight: "900" }}>
                            <span className='icon-chronometer' style={{ fontSize: "16px", marginRight: "5px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span></span>
                            30 <span style={{ color: "#797993", fontWeight: "100" }}>{t("min")}</span></Typography>
                        </Box>
                      )}
                    </Box>

                  </Box>
                  {/* الخطوة "Accepted" */}
                  {index === 1 && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <Divider
                        sx={{
                          height: "1px",
                          width: "30px",
                          backgroundColor: step.active ? "white" : "#302E3B",
                          // margin: "5px 0", 
                        }}
                      />
                      <Box
                        onClick={handleOpen}
                        sx={{
                          backgroundImage: step.active ? 'linear-gradient(to right, #302E3B, #48485B)' : 'none',
                          backgroundColor: step.active ? "none" : "#302E3B",
                          color: step.active ? "#FFFFFF" : "#575756",
                          borderRadius: "20px",
                          padding: "5px 35px",
                          cursor: "pointer",
                          display: "flex",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "11px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                          <img src="/assets/balance.svg" alt="pay icon" style={{ width: "20px ", height: "20px", marginRight: "5px" }} />
                          {t("payment")}</Typography>

                        <PaymentModal isOpen={isModalOpen} onClose={handleClose} />
                      </Box>

                    </Box>
                  )}

                  {/* الخطوة "Prepared" */}

                  {index === 2 && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <Divider
                        sx={{
                          height: "1px",
                          width: "30px",
                          backgroundColor: step.active ? "white" : "#302E3B",
                        }}
                      />
                      <Box
                        sx={{
                          backgroundImage: step.active ? 'linear-gradient(to right, #302E3B, #48485B)' : 'none',
                          backgroundColor: step.active ? "none" : "#302E3B",
                          color: step.active ? "#FFFFFF" : "#575756",
                          borderRadius: "20px",
                          padding: "5px 30px",
                          cursor: "pointer",
                        }}
                      >
                        <Typography sx={{ fontSize: "11px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                          <span className='icon-scooter1' style={{
                            marginRight: "5px", fontSize: "17px",
                            color: step.active ? "white" : "#575756",
                          }}></span>

                          {t("onTheWay")}</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Vertical Line */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    width: "2px",
                    height: "35px",
                    backgroundColor: step.active ? "white" : "#302E3B",
                    margin: "6px 20px",
                  }}
                />
              )}
            </React.Fragment>
          )
        })}
      </Box>
    </Box>
  )
}

export default page; 