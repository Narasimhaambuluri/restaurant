import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("session_key");
    if (!token) {
      navigate("/login");
    }
  });
  return <div>profile</div>;
}

export default Profile;
