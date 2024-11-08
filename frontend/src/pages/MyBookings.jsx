import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("session_key");
    if (!token) {
      navigate("/login");
    }
  });
  return <div>My Bookings</div>;
}

export default MyBookings;
