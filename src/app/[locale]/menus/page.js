
import React from 'react'
import HomeMenu from './HomeMenu/HomeMenu';
import { Video } from './Video/Video';
import { Digital } from './Digital/Digital';
import { Dashboard } from './Dashboard/Dashboard';
import { Signs } from './Signs/Signs';
import Footer from '../Footer/Footer';
import { Customer } from './Customer/Customer';
import { VideoSlider } from '../VideoSlider/VideoSlider';


const page = () => {
  return (
    <div>
        <HomeMenu /> 
        {/* <Video />  */}
        <VideoSlider />
        <Digital /> 
        <Dashboard /> 
        <Signs /> 
        <Customer /> 
        <Footer /> 
    </div>
  )
}
export default page;