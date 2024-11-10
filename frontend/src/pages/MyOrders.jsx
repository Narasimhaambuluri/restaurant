import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Parallax } from "react-parallax";
import myBack from "../images/about.jpg";
import Navbar from "./../components/Navbar";
import axios from "axios";
import Footer from "./../components/Footer";

function MyOrders() {
  const navigate = useNavigate();
  const [allMyOrders, setAllMyOrders] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("session_key");
    if (!token) {
      navigate("/login");
    }
  });
  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem("session_key");
      const result = await axios.post(
        "http://localhost:5000/profile/myorders",
        {
          token,
        }
      );
      setAllMyOrders(result.data);
    };
    fetchMyOrders();
  }, []);
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className="my-bookings-wrapper">
      <Parallax
        bgImage={myBack}
        strength={300}
        blur={{ min: -15, max: 15 }}
        bgImageStyle={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="my-bookings">
          <Navbar />
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>My Orders</h1>
          <div className="my-bookings-main">
            {allMyOrders ? (
              allMyOrders.map((booking) => {
                return (
                  <div className="booking" key={booking._id}>
                    <div
                      className="booking-item"
                      style={{ fontSize: "20px", fontWeight: "700" }}
                    >
                      Ordered Item: {booking.item_name}
                    </div>
                    <div className="booking-quantity">
                      Quantity: {booking.quantity} Items
                    </div>
                    <div className="booking-price">
                      Total Price : ₹{booking.total_price}
                    </div>
                    <div className="booking-address">
                      Address : {booking.address}
                    </div>
                    <div className="booking-date">
                      Date: {formatDate(booking.order_date)}
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Orders</h1>
            )}
          </div>
        </div>
        <Footer />
      </Parallax>
    </div>
  );
}

export default MyOrders;
