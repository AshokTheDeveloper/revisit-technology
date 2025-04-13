import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Signup.css";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitSuccessful = () => {
    navigate("/login");
  };

  const onSubmitFailure = (message) => {
    alert(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !username || !email || !password) {
      return;
    }

    const newUser = {
      fullname,
      username,
      email,
      password,
    };
    const apiUrl = "http://localhost:3000/category/signup";
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
        onSubmitSuccessful(data.message);
      } else {
        onSubmitFailure(data.message);
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
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Signup
        </button>
        <label className="already-have-account-text">
          Already have an account
          <span>
            <Link to="/login" className="links">
              Login
            </Link>
          </span>
        </label>
      </form>
    </div>
  );
};

export default Signup;
