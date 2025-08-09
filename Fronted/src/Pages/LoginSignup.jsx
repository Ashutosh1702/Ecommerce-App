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
      
      // Fetch users from JSON server
      const response = await fetch("http://localhost:3001/users");
      
      if (!response.ok) {
        throw new Error("Cannot connect to the server");
      }
      
      const users = await response.json();
      
      // Find user with matching email and password
      const user = users.find(u => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }));
      
      // Show welcome message
      alert(`Welcome back, ${user.username}!`);
      
      // Redirect to home page
      navigate("/");
      
      // Trigger a page refresh to update navbar
      window.location.reload();
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("Cannot connect to the server. Please make sure the backend server is running on port 3001.");
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

      // First check if user already exists
      const checkResponse = await fetch("http://localhost:3001/users");
      if (!checkResponse.ok) {
        throw new Error("Cannot connect to the server");
      }
      
      const existingUsers = await checkResponse.json();
      const userExists = existingUsers.find(u => u.email === formData.email);
      
      if (userExists) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();

      // Show success message with username
      alert(`Welcome ${data.username}! Your account has been created successfully.`);
      
      // Switch to login state after successful signup
      setState("Login");
      setFormData({ username: "", email: "", password: "" }); // Clear all fields
      setError("");
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("Cannot connect to the server. Please make sure the backend server is running on port 3001.");
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
