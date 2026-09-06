import React, { useState } from "react";


import axios from "axios";


import "./BuyActionWindow.css";

const SellActionWindow = ({ uid ,closeSellWindow  }) => {

  //const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);


  
  const userId = localStorage.getItem("dashboardUserId");

  console.log("dashboardUserId:", userId);
  console.log("Current URL:", window.location.href);
  console.log("All localStorage:", localStorage);


  
  const handleSellClick = async () => {
    

    try {

        if (!userId) {
          alert("User not logged in.");
          return;
        } 
        const token = localStorage.getItem("token");
        console.log("Sell JWT:", token);
        const response = await axios.post(
            "https://stock-trading-bksj.onrender.com/sellOrder",
            {
                name: uid,
                qty: stockQuantity,
                price: stockPrice,
                mode: "SELL",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Step 3:", response.data);

        if (closeSellWindow) {
            closeSellWindow();
        }

        window.location.reload();

    } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
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
          <button className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </button>
          <button to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
