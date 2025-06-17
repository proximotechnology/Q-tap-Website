"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";
import { toast } from "react-toastify";

export const usePusher = () => {
    useEffect(() => {
        const pusher = new Pusher("63b495891d2c3cff9d36", {
            cluster: "eu",
        });

        const channel = pusher.subscribe("notify-channel");
        channel.bind("form-submitted", function (data) {
            console.log('📢 Received from Pusher:', data);

            switch (data?.type) {
                case "notfy":
                    
                    break;
                case "chat":
                    if (String(localStorage.getItem("customer_id")) === String(data?.message?.receiver_id)) {
                        toast.success(`💬 New Message: ${data?.message?.message}`);
                    }
                    break;
                case "add_order":
                    
                    break;
                default:
                    // alert(JSON.stringify(data));
                    console.warn("   :", data);
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);
};