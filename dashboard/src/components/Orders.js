import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:3002/allOrders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setOrders(response.data);

            } catch (err) {
                console.log(
                    "Orders error:",
                    err.response?.data || err.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <h3>Loading orders...</h3>;
    }

    return (
        <div>
            <h3 className="title">
                Orders ({orders.length})
            </h3>

            {orders.length === 0 ? (
                <div className="orders">
                    <div className="no-orders">
                        <p>You haven't placed any orders yet.</p>
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
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.name}</td>
                                    <td>{order.qty}</td>
                                    <td>
                                        ₹{Number(order.price).toFixed(2)}
                                    </td>
                                    <td
                                        className={
                                            order.mode === "BUY"
                                                ? "profit"
                                                : "loss"
                                        }
                                    >
                                        {order.mode}
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

export default Orders;