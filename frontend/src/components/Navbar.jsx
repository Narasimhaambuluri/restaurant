import React from "react";
import "./components.css";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
        <div className="brand">Metro Bites</div>
      </div>
      <div className="nav">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/menu" className="nav-item">
          Menu
        </Link>
        <Link to="/bookings" className="nav-item">
          Bookings
        </Link>
        <Link to="/order" className="nav-item">
          Order
        </Link>
        <Link to="/branches" className="nav-item">
          Branches
        </Link>
        <Link to="/about" className="nav-item">
          About
        </Link>
        <Link to="/contact" className="nav-item">
          Contact
        </Link>
        <Link to="/profile" className="nav-item">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
