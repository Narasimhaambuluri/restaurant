import React, { useState } from "react";
import Logo from "../images/logo.png";
import { Parallax } from "react-parallax";
import Auth from "../images/auth.png";
import axios from "axios";
import "../pages/pages.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [authDetails, setAuthDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate("");
  const [errorDetails, setErrorDetails] = useState("");
  const register = async (e) => {
    e.preventDefault();
    if (!authDetails.name || !authDetails.email || !authDetails.password) {
      setErrorDetails("Please Enter All fileds");
      return;
    }
    const response = await axios.post(
      "http://localhost:5000/user/register",
      authDetails
    );
    if (response.data === "existed") {
      setErrorDetails("This Email is already registered.");
      return;
    }
    localStorage.setItem("session_key", response.data.token);
    navigate("/");
  };
  return (
    <div className="register-wrapper">
      <Parallax
        bgImage={Auth}
        strength={300}
        blur={{ min: -15, max: 15 }}
        bgImageStyle={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="register">
          <div className="auth-nav">
            <div className="logo">
              <img src={Logo} alt="" />
              <div className="brand">Metro Bites</div>
            </div>
          </div>
          <div className="register-main">
            <h1>Registration</h1>
            <div className="register-fields">
              <div className="reg-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => {
                    setErrorDetails("");
                    setAuthDetails({ ...authDetails, name: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="reg-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setErrorDetails("");
                    setAuthDetails({ ...authDetails, email: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="reg-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setAuthDetails({ ...authDetails, password: e.target.value })
                  }
                  required
                />
              </div>
              <button onClick={register}>Register</button>
              <div className="transfer">
                Don't have an account? <Link to="/login">Login</Link>
              </div>
              <div className="error">{errorDetails}</div>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default Register;
