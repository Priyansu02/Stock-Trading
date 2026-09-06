import React, { useEffect, useState } from "react";
import axios from "axios";


const Funds = () => {

  const [wallet,setWallet]= useState(null);

  const userId = localStorage.getItem("dashboardUserId");

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("token");

    axios.get("https://stock-trading-bksj.onrender.com/wallet", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        setWallet(res.data);
    })
    .catch((err) => {
        console.log(err);
    });

    }, [userId]);

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green"
            onClick={()=> alert("Add Funds feature coming soon!")}>
          Add Funds
        </button>

        <button className="btn btn-blue" 
          onClick={()=> alert("Withdraw feature coming soon!")}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                ₹{wallet ? wallet.balance.toLocaleString("en-IN", {
                     minimumFractionDigits: 2,
                    }) : "Loading..."}
              </p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">0.00</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                ₹{wallet ? wallet.balance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                }): "Loading..."}
              </p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹1,00,000.00</p>
            </div>
            
            <div className="data">
              <p>Payin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="commodity">
          <h4>Commodity Trading</h4>
          <p>
            Commodity trading is not available in this Paper Trading platform.
          </p>

          <button
            className="btn btn-blue"
            onClick={() =>
              alert("Commodity trading will be available in a future update.")
            }
          >
            Coming Soon
          </button>
        </div>
      </div>
    </>
  );
};

export default Funds;
