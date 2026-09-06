import React, { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "https://stock-trading-bksj.onrender.com/allTransactions",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTransactions(response.data);

            } catch (err) {
                console.log(
                    "Transactions error:",
                    err.response?.data || err.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return <h3>Loading transactions...</h3>;
    }

    return (
        <div>
            <h3 className="title">
                Transactions ({transactions.length})
            </h3>

            {transactions.length === 0 ? (
                <div className="orders">
                    <div className="no-orders">
                        <p>No transactions yet.</p>
                    </div>
                </div>
            ) : (
                <div className="order-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Instrument</th>
                                <th>Qty.</th>
                                <th>Price</th>
                                <th>Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td>{transaction.name}</td>

                                    <td>
                                        {transaction.qty}
                                    </td>

                                    <td>
                                        ₹
                                        {Number(
                                            transaction.price
                                        ).toFixed(2)}
                                    </td>

                                    <td
                                        className={
                                            transaction.mode === "BUY"
                                                ? "profit"
                                                : "loss"
                                        }
                                    >
                                        {transaction.mode}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Transactions;