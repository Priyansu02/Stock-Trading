import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {

   useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("userId");

        console.log("Home userId:", userId);

        if (userId) {
            localStorage.setItem("dashboardUserId", userId);
            console.log("Saved:", userId);
        }
    }, []);


  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
