import React, { useState } from "react";
import Logo from "../images/logo.png";
import { Parallax } from "react-parallax";
import Auth from "../images/auth.png";
import "../pages/pages.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [authDetails, setAuthDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate("");
  const [errorDetails, setErrorDetails] = useState("");
  const login = async (e) => {
    e.preventDefault();
    if (!authDetails.email || !authDetails.password) {
      setErrorDetails("Please Enter All fileds");
      return;
    }
    const response = await axios.post(
      "http://localhost:5000/user/login",
      authDetails
    );
    if (response.data === "No user") {
      setErrorDetails("No user found with this email");
      return;
    }
    if (response.data === "wrong password") {
      setErrorDetails("Invalid password or email");
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
            <h1>Login</h1>
            <div className="register-fields">
              <div className="reg-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setErrorDetails("");
                    setAuthDetails({ ...authDetails, email: e.target.value });
                  }}
                />
              </div>
              <div className="reg-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setErrorDetails("");
                    setAuthDetails({
                      ...authDetails,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <button onClick={login}>Login</button>
              <div className="transfer">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
              <div className="error">{errorDetails}</div>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default Login;
