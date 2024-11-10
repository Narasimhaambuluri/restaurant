import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Parallax } from "react-parallax";
import myBack from "../images/about.jpg";
import Navbar from "./../components/Navbar";
import axios from "axios";
import Footer from "./../components/Footer";

function MyBookings() {
  const navigate = useNavigate();
  const [allMyBookings, setAllMyBookings] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("session_key");
    if (!token) {
      navigate("/login");
    }
  });
  useEffect(() => {
    const fetchMyBookings = async () => {
      const token = localStorage.getItem("session_key");
      const result = await axios.post(
        "http://localhost:5000/profile/mybookings",
        {
          token,
        }
      );
      setAllMyBookings(result.data);
    };
    fetchMyBookings();
  }, []);
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
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>
            My Bookings
          </h1>
          <div className="my-bookings-main">
            {allMyBookings ? (
              allMyBookings.map((booking) => {
                return (
                  <div className="booking" key={booking._id}>
                    <div
                      className="booking-location"
                      style={{ fontSize: "20px", fontWeight: "700" }}
                    >
                      Location: {booking.location_name}
                    </div>
                    <div className="booking-type">
                      Table Type: {booking.table_type}
                    </div>
                    <div className="booking-price">
                      Members : {booking.members} Members
                    </div>
                    <div className="booking-slot">
                      Slot Booked : {booking.slot_booked}{" "}
                    </div>
                    <div className="booking-date">
                      Date: {booking.booked_date}
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Bookings</h1>
            )}
          </div>
        </div>
        <Footer />
      </Parallax>
    </div>
  );
}

export default MyBookings;
