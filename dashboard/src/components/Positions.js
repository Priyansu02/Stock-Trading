import React from "react";
import  { useState, useEffect } from "react";
import axios from "axios";



const Positions = () => {

  
  return (


   <>
  <h3 className="title">Positions</h3>

  <div
    style={{
      textAlign: "center",
      padding: "60px 20px",
    }}
  >
    <h4>No Open Positions</h4>

    <p
      style={{
        color: "#777",
        marginTop: "10px",
      }}
    >
      Intraday and futures positions are not supported in this
      Paper Trading platform.
    </p>
  </div>
</>
  );
};

export default Positions;
