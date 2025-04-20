// app/PusherProvider.js
"use client";

import { usePusher } from "@/component/usePusher";


export default function PusherProvider({ children }) {
    usePusher(); // تفعيل Pusher
    return <>{children}</>;
}