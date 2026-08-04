import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));

const params = new URLSearchParams(window.location.search);

const token = params.get("token");
const userId = params.get("userId");

if (token) {
    localStorage.setItem("token", token);
}

if (userId) {
    localStorage.setItem("dashboardUserId", userId);
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
