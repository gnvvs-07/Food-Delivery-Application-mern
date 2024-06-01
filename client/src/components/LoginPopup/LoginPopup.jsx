import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (currentState === "Sign Up" && !data.name) {
      toast.error("Please enter your name");
      return false;
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!data.password || data.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const onLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    let newUrl = url;
    const endpoint = currentState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(newUrl + endpoint, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success("Successfully logged in");
      } else {
        toast.error("Error occurred while logging in. Please try again.");
      }
    } catch (error) {
      toast.error("Error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
              onChange={onChange}
              value={data.name}
            />
          )}
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="youremail@company.com"
            onChange={onChange}
            value={data.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="*********"
            onChange={onChange}
            value={data.password}
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />
          <p>By continuing you have accept to our privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}
