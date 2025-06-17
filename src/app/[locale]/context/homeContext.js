"use client";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { createContext } from "react";

export let HomeContext = createContext();
const HomeContextProvider = (props) => {

  const getHomeData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}home`);
      return response;
    } catch (err) {
      throw err
    }
  };

  return (
    <HomeContext.Provider value={{ getHomeData }}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
