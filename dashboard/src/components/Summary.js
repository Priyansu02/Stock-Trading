import React, { useEffect, useState } from "react";
import axios from "axios";

import { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const [wallet, setWallet] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [user, setUser] = useState(null);
  const [holdingsCount, setHoldingsCount] = useState(0);


  const { refreshHoldings } = useContext(GeneralContext);

  useEffect(() => {

    const userId = localStorage.getItem("dashboardUserId");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

 // Wallet - JWT protected
  axios
    .get("http://localhost:3002/wallet", config)
    .then((res) => {
      setWallet(res.data);
    })
    .catch((err) => {
      console.log(
        "Wallet error:",
        err.response?.data || err.message
      );
    });

  // Dashboard
  axios
    .get("http://localhost:3002/dashboard", config)
    .then((res) => {
      setDashboard(res.data);
    })
    .catch((err) => {
      console.log(
        "Dashboard error:",
        err.response?.data || err.message
      );
    });

  // User
  axios
    .get("http://localhost:3002/user", config)
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log(
        "User error:",
        err.response?.data || err.message
      );
    });

  // Holdings
  axios
    .get("http://localhost:3002/allHoldings", config)
    .then((res) => {
      setHoldingsCount(res.data.length);
    })
    .catch((err) => {
      console.log(
        "Holdings error:",
        err.response?.data || err.message
      );
    });

}, [refreshHoldings]);
  return (
    <>
      <div className="username">
        <h6>Hi, {user ? user.name : "Loading..."}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>  ₹{wallet ? wallet.balance.toLocaleString() : 0}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
           
            <p>
              Opening balance <span> ₹1,00,000</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdingsCount})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={dashboard?.profitLoss >= 0 ? "profit" : "loss"}>
              ₹{dashboard ? dashboard.profitLoss.toFixed(2) : 0}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span> ₹{dashboard ? dashboard.currentValue.toFixed(2) : 0}</span>{" "}
            </p>
            <p>
              Investment <span>₹{dashboard ? dashboard.investment.toFixed(2) : 0}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
