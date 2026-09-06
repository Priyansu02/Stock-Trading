import React, { useState } from "react";
import { Link } from "react-router-dom";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/transactions"
            >
              <p className={menuClass}>Transactions</p>
            </Link>
          </li>
        </ul>

        <hr />

        <div className="profile">
          <Link
            to="/profile"
            className="profile-link"
          >
            <div className="profile-avatar">
              {loggedInUser?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-details"></div>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("dashboardUserId");
              localStorage.removeItem("loggedInUser");

              window.location.href = "http://localhost:3000/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;