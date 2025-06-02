
"use client";
import React, { useState } from 'react';
import Features from '../Features/Features';
import { Serves } from '../Serves/Serves';
import { Client } from '../Client/Client';
import { VideoSlider } from '../VideoSlider/VideoSlider';
import QRCodeComponent from '../QRCode/QRCode';
import { Pricing } from '../Pricing/Pricing';
import { Test } from '../Test/Test';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import { AllChatForm } from '../Chat/AllChatForm.js';
import FeaturesNew from '../Features/FeaturesNew';
import { ClientNew } from '../Client/ClientNew';


export const HomePage = () => {

    return (
        <div style={{ overflowX:"hidden !important"}}>
            <Home />
            {/* <Features /> */}
            <FeaturesNew />
            <Serves />
            {/* <Client /> */}
            <ClientNew />
            <VideoSlider />
            <QRCodeComponent />
            <Pricing />
            <Test />
            <AllChatForm />
            <Footer />
        </div>
    )
}
