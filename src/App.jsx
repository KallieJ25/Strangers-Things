import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  // Changing the background color of the page when the path is set to /register or /login.
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  useEffect(() => {
    if (isRegisterPage || isLoginPage) {
      document.body.classList.add("background-register");
    } else {
      document.body.classList.remove("background-register");
    }
  }, [location, isRegisterPage, isLoginPage]);

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
        //if the user is authenticated
        if (result.success === true) {
          //creating the sessionStorage isAuthor with the user id
          sessionStorage.setItem("isAuthor", result.data._id);
          //if the user if is different to null
          if (result.data._id !== null || result.data._id !== "null") {
            //checking the path /register and redirect to /profile page after 1 second
            if (isRegisterPage) {
              const timer = setTimeout(() => {
                navigate("/profile");
              }, 1000);
              timer();
            }
          }
        }
        return result;
      } catch (err) {
        console.error(err);
      }
    };
    if (token) myData();
  }, [token, BASE_URL, navigate, isRegisterPage]);

  const isAuthor = sessionStorage.getItem("isAuthor");
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
