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
  const COHORT_NAME = "2209-FTB-ET-WEB-FT";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const [token, setToken] = useState("");
  const [isAuthor, setAuthor] = useState("");
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

  useEffect(() => {
    const myData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        console.log("ID: ", result);
        sessionStorage.setItem("isAuthor", result.data._id);
        let Auth = sessionStorage.getItem("isAuthor");
        setAuthor(Auth);
        return result;
      } catch (err) {
        console.error(err);
      }
    };
    if (token) myData();
    // console.log("TOKEN: ", token);
  }, [token, BASE_URL]);
  return (
    <>
      <Navbar isAuthor={isAuthor} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Posts" element={<Posts />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
