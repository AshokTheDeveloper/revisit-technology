import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLoginSuccessful = (data) => {
    Cookies.set("jwtToken", data.jwtToken, { expires: 1 / 24 });
    navigate("/");
  };

  const onLoginFailure = (message) => {
    alert(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    const newUser = {
      email,
      password,
    };
    const apiUrl = "http://localhost:3000/category/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        onLoginSuccessful(data);
      } else {
        onLoginFailure(data.message);
      }
    } catch (error) {
      console.log("Error signup user:", error);
    }
  };

  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" value="Signup">
          Login
        </button>
        <label className="already-have-account-text">
          Don't have account?
          <span>
            <Link to="/signup" className="links">
              Signup
            </Link>
          </span>
        </label>
      </form>
    </div>
  );
};

export default Login;
