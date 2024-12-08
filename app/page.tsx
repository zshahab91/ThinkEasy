"use client";
import MainPage from "@/components/mainPage";
import { useEffect, useState } from "react";
const Home = () => {
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true)
  }, [])
  return (isClient ? <MainPage/> 
   : '');
};
export default Home;