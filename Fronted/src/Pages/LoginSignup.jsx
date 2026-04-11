import React, { useState } from "react";
import "../CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const login = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Store ONLY the JWT token in localStorage, not the sensitive info
      localStorage.setItem("auth_token", data.token);
      
      // Show welcome message
      alert(`Welcome back, ${data.name}!`);
      
      // Redirect to home page
      navigate("/");
      
      // Trigger a page refresh to update navbar
      window.location.reload();
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("Cannot connect to the server. Please make sure the backend server error is running on port 5000.");
      } else {
        setError(error.message || "Failed to login. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      // Show success message with username
      alert(`Welcome ${data.name}! Your account has been created successfully.`);
      
      // Storing token as we automatically login
      localStorage.setItem("auth_token", data.token);

      // Redirect to home page
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("Cannot connect to the server. Please make sure the backend server is running on port 5000.");
      } else {
        setError(error.message || "Failed to sign up. Please try again.");
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Continue"}
        </button>
        <p className="loginsignup-login">
          {state === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={() => {
              setState(state === "Login" ? "Sign Up" : "Login");
              setError(""); // Clear error when switching modes
            }}
          >
            {state === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p className="loginsignup-agree-text">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
