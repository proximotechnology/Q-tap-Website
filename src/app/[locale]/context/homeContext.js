"use client"
import axios from "axios";
import { createContext } from "react";

export let HomeContext = createContext();
const HomeContextProvider = (props) => {
  
  const getHomeData = async () => {
    const response = await axios.get(
      // "https://highleveltecknology.com/Qtap/api/home"
      "https://api.qutap.co/api/home"
    );
    return response;
  };

  return (
    <HomeContext.Provider value={{ getHomeData }}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
