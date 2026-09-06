import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile =()=>{
    const [user, setUser]= useState(null);
    const [wallet, setWallet] = useState(null);
    const [holdings, setHoldings] = useState([]);
    const [orders, setOrders] = useState([]);


    useEffect(()=>{
        const userId=localStorage.getItem("dashboardUserId");
        const token = localStorage.getItem("token");


        if(!userId || !token) return;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("https://stock-trading-bksj.onrender.com/user", config)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(
                    "User error:",
                    err.response?.data || err.message
                );
            });

        // Wallet
        axios
            .get("https://stock-trading-bksj.onrender.com/wallet", config)
            .then((res) => {
                setWallet(res.data);
            })
            .catch((err) => {
                console.log(
                    "Wallet error:",
                    err.response?.data || err.message
                );
            });

        // Holdings
        axios
           .get("https://stock-trading-bksj.onrender.com/allHoldings", config)
            .then((res) => {
                setHoldings(res.data);
            })
            .catch((err) => {
                console.log(
                    "Holdings error:",
                    err.response?.data || err.message
                );
            });

        // Orders
        axios
            .get("https://stock-trading-bksj.onrender.com/allOrders", config)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(
                    "Orders error:",
                    err.response?.data || err.message
                );
            });

    }, []);

    if (!user) {
        return <h3>Loading...</h3>;
    }

    return (
      
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
            }}
        >
            <div
            style={{
                width: "500px",
                background: "#fff",
                borderRadius: "12px",
                padding: "30px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                    👤 My Profile
                </h2>

                <hr />

                <div style={{ marginTop: "20px" }}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User ID:</strong> {user._id}</p>
                </div>

                   <hr />

                    <p>
                    <strong>Wallet Balance:</strong>
                    ₹{wallet ? wallet.balance.toLocaleString() : "Loading..."}
                    </p>

                    <p>
                    <strong>Total Holdings:</strong>
                    {holdings.length}
                    </p>

                    <p>
                    <strong>Total Orders:</strong>
                    {orders.length}
                    </p>
            </div>
        </div>

    );
};

export default Profile;
       