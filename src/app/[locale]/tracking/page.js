"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Header } from '@/app/[locale]/payment/Header'
import { OrderDetails } from '@/app/[locale]/orderPlaced/OrderDetails';
import {
  Box, Typography, Divider, Avatar, Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PaymentModal from './PaymentModal';
import { useTranslations } from 'next-intl';
import Pusher from 'pusher-js';
import { formateDate } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const page = () => {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false);
  // feedback dialog
  const [open, setOpen] = useState(false); // You can change when it opens

  const [order, setOrder] = useState(null);
  const [pusherOrder, setPusherOrder] = useState(null);
  const [pusherPhase, setPusherPhase] = useState(null)
  // ui dynamic header
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    if (!headerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeaderHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(headerRef.current);

    // Cleanup on unmount
    return () => resizeObserver.disconnect();
  }, []);
/*
PHASE_TEMP represents the different stages an order goes through.

  Each phase (Accepted, Prepared, Delivered/Served, Closed) has:
  - status: a boolean indicating if the phase is complete (true = completed)
  - time: a timestamp of when the phase was completed (empty if not completed)

  These phases are used to control UI icons. 
  Icons are marked active or inactive based on the status of each phase:
  if PHASE_TEMP[phaseLabel].status === true → the icon is active
  icons in steps array
 */ const PHASE_TEMP = {
    Accepted: { status: false, time: "" },
    Prepared: { status: false, time: "" },
    Delivered: { status: false, time: "" },
    Closed: { status: false, time: "" }
  }
  const handleOpen = () => setIsModalOpen(true);

  const handleClose = () => {
    setIsModalOpen(false);
  }

  // This useEffect listens for updates from Pusher useEffect regarding the order status.
  // When a new update is received, it updates the order's phase status
  // using the logic defined in the PHASE_TEMP object.
  // this logic controll icons show in ui 
  useEffect(() => {
    if (!pusherOrder || !pusherPhase || !order) {
      return;
    }
    
    setOrder(prev => {
      let phase = prev.phase
      if (phase) {
        let AcceptProccess;
        
        if (pusherPhase === "Accepted") {
          AcceptProccess = pusherOrder?.orders_processing?.find(o => o.status === "accepted");
          phase[pusherPhase].prepareTime = AcceptProccess?.time
          
        }
        if (pusherPhase === "Prepared") {
          AcceptProccess = pusherOrder?.orders_processing?.find(o => o.status === "prepared");
          
        }
        if (pusherPhase === "Delivered") {
          AcceptProccess = pusherOrder?.orders_processing?.find(o => o.status === "delivered");
          
        }
        if (pusherPhase === "Closed") {
          AcceptProccess = pusherOrder?.orders_processing?.find(o => o.status === "done");
          
          setOpen(true)
        }
        phase[pusherPhase].status = true;
        phase[pusherPhase].time = AcceptProccess?.created_at
      }
      
      localStorage.setItem('order', JSON.stringify({ ...pusherOrder, phase }))
      return { ...pusherOrder, phase }
    }
    )

    setPusherOrder(null)
    setPusherPhase(null)
  }, [pusherOrder, pusherPhase])

  useEffect(() => {
    let myOrder = localStorage.getItem('order')
    if (myOrder) {
      try {
        myOrder = JSON.parse(myOrder)
        if (!myOrder.phase)
          myOrder.phase = { ...PHASE_TEMP }
        setOrder(myOrder)
        
        
      } catch (error) {
        // 
        toast.error("cannot read order")
      }
    }

    const pusher = new Pusher('63b495891d2c3cff9d36', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('notify-channel');
    channel.bind('form-submitted', (data) => {
      
      // accepted_order
      if (data.type === "accepted_order") {
        
        if (myOrder?.id === data?.message?.[0]?.id) {
          
          setPusherOrder(data?.message?.[0])
          setPusherPhase('Accepted')
        }
      }
      // prepared_order
      if (data.type === "prepared_order") {
        
        if (myOrder?.id === data?.message?.[0]?.id) { // data formate from pusher change from data?.message?.[0]?.id to  data?.message?.id
          
          setPusherOrder(data?.message?.[0])
          setPusherPhase('Prepared')
        }
      }
      if (data.type === 'delivered_order') {
        
        if (myOrder?.id === data?.message?.[0]?.id) { // data formate from pusher change from data?.message?.[0]?.id to  data?.message?.id
          
          setPusherOrder(data?.message?.[0])
          setPusherPhase('Served')
        }
      }
      if (data.type === 'done_order') {
        
        if (myOrder?.id === data?.message?.[0]?.id) { // data formate from pusher change from data?.message?.[0]?.id to  data?.message?.id
          
          setPusherOrder(data?.message?.[0])
          setPusherPhase('Closed')
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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
      }}>
      <Box  ref={headerRef}
        sx={{
          position: "fixed",
          overflow: 'hidden',
          backgroundColor: '#1E1E2A',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          overflowY: 'hidden'
        }}>


        <Header backUrl={"/"} />
        <OrderDetails />
      </Box>
      <Box sx={{ height: `${headerHeight}px` }} />
      <Box
        sx={{
          position: "relative",
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
          index === 0 ? step.active = true : order?.phase[step.label]?.status == true ? step.active = true : step.active = false;
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
                        {order?.phase[step.label]?.time ? formateDate(order?.phase[step.label]?.time) : <></>}
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
                            {order?.phase[step.label]?.prepareTime ? order?.phase[step.label]?.prepareTime : <></>} <span style={{ color: "#797993", fontWeight: "100" }}>{t("min")}</span></Typography>
                        </Box>
                      )}
                    </Box>

                  </Box>
                  {/* الخطوة "Accepted" */}
                  {index === 1 && order?.payment_way === "wallet" && (
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
                        <Button onClick={handleOpen} disabled={!step.active} sx={{ padding: '0px', margin: '0px' }}>
                          <Typography
                            sx={{ fontSize: "11px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <img src="/assets/balance.svg" alt="pay icon" style={{ width: "20px ", height: "20px", marginRight: "5px" }} />
                            {t("payment")}</Typography>


                        </Button>
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
                  <FeedbackDialog open={open} setOpen={setOpen} />
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


const FeedbackDialog = ({open,setOpen}) => {
  const router = useRouter()

  const handleClose = () => {
    setOpen(false);
  };

  const handleGiveFeedback = () => {
    setOpen(false);
    router.push('/Feedback')
  };

  return (
    <Dialog open={open} onClose={handleClose} className='my-base-bg-color-Class'>
      <DialogTitle className='my-base-bg-color-Class'>We value your feedback!</DialogTitle>
      <DialogContent className='my-base-bg-color-Class'>
        <Typography>
          Would you like to give us feedback to help improve your experience?
        </Typography>
      </DialogContent>
      <DialogActions className='my-base-bg-color-Class'>
        <Button onClick={handleClose} color="inherit">
          No, thanks
        </Button>
        <Button onClick={handleGiveFeedback}  variant="contained"   className="my-base-button-style">
          Yes, give feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
};