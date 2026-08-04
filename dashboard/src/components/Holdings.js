import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";
// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { refreshHoldings } = useContext(GeneralContext);
  useEffect(() => {

    const token= localStorage.getItem("token");

    axios.get("http://localhost:3002/allHoldings",{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    })

    .then((res) =>{
        setAllHoldings(res.data);
    })

    .catch((err)=>{
      console.log("Holdings error:",err);
    });

  }, [refreshHoldings]);

  
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {

    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

    const totalInvestment = allHoldings.reduce(
      (sum, stock) => sum + stock.avg * stock.qty,
      0
    );

    const currentValue = allHoldings.reduce(
      (sum, stock) => sum + stock.price * stock.qty,
      0
    );

    const profitLoss = currentValue - totalInvestment;

    const profitPercentage =
      totalInvestment > 0
        ? ((profitLoss / totalInvestment) * 100).toFixed(2)
        : 0;

 

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
         <h5>₹{totalInvestment.toFixed(2)}</h5>
            <p>Total Investment</p>
        </div>
        <div className="col">
         <h5>₹{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>₹{profitLoss.toFixed(2)} ({profitPercentage}%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
