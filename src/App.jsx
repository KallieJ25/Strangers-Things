import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/Login";
import Posts from "./components/posts";
import Profile from "./components/profile";
import Logout from "./components/logout";
import Home from "./components/home";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  // Changing the background color of the page when the path is set to /register or /login.
  const location = useLocation();
  useEffect(() => {
    const isRegisterPage = location.pathname === "/register";
    const isLoginPage = location.pathname === "/login";
    if (isRegisterPage || isLoginPage) {
      document.body.classList.add("background-register");
    } else {
      document.body.classList.remove("background-register");
    }
  }, [location]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Posts" element={<Posts />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </>
  );
}

export default App;
