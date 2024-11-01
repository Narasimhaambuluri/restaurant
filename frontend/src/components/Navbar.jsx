import React from "react";
import "./components.css";
import Logo from "../images/logo.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="nav">
        <a href="#" className="nav-item">
          Home
        </a>
        <a href="#" className="nav-item">
          Menu
        </a>
        <a href="#" className="nav-item">
          Bookings
        </a>
        <a href="#" className="nav-item">
          Order
        </a>
        <a href="#" className="nav-item">
          Branches
        </a>
        <a href="#" className="nav-item">
          About
        </a>
        <a href="#" className="nav-item">
          Contact
        </a>
        <a href="#" className="nav-item">
          Profile
        </a>
      </div>
    </div>
  );
}

export default Navbar;
