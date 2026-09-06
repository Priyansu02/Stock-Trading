import React, { useState, useContext } from "react";

//const { closeBuyWindow, triggerRefresh } = useContext(GeneralContext);
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {

  const { closeBuyWindow, triggerRefresh } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);


  //const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const userId = localStorage.getItem("dashboardUserId");

  console.log("dashboardUserId:", userId);
  console.log("Current URL:", window.location.href);
  console.log("All localStorage:", localStorage);


  // console.log("Current Origin:", window.location.origin);
  // console.log("Logged User:", loggedInUser);

  const handleBuyClick = async () => {
    //console.log("Step 1: Buy button clicked");

   // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    //console.log("LocalStorage User:", loggedInUser);
    //console.log("Sending userId:", loggedInUser._id);

    try {

        if (!userId) {
          alert("User not logged in.");
          return;
        } 

        const token = localStorage.getItem("token");

        const response = await axios.post(
            "https://stock-trading-bksj.onrender.com/newOrder",
            {
                name: uid,
                qty: stockQuantity,
                price: stockPrice,
                mode: "BUY",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        console.log("Step 3:", response.data);
        triggerRefresh();
        closeBuyWindow();

    } catch (err) {
       
        alert(err.response?.data?.message || "Something went wrong");

    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
