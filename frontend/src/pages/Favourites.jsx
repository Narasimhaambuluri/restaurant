import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Favourites() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("session_key");
    if (!token) {
      navigate("/login");
    }
  });
  return <div>Favourites</div>;
}

export default Favourites;
