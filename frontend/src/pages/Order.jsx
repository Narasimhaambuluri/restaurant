import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Parallax } from "react-parallax";
import orderBack from "../images/order-back.jpg";
import Navbar from "./../components/Navbar";
import "./pages.css";

function Order() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("session_key");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Parallax
        bgImage={orderBack}
        strength={300}
        blur={{ min: -15, max: 15 }}
        bgImageStyle={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="order-wrapper">
          <Navbar />
          <div className="order">
            <h1>Order Your Favourite Food</h1>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default Order;
