import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Posts from "./components/posts";
import Profile from "./components/profile";
import Logout from "./components/logout";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Message from "./components/message";
import "./App.css";
import CreatePostForm from "./components/CreateFormPost";

function App() {
  const COHORT_NAME = "2209-FTB-ET-WEB-FT";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const navigate = useNavigate();
  // Changing the background color of the page when the path is set to /register or /login.
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setuserName] = useState("");
  if (token) {
    localStorage.setItem("token", token);
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      let TokenItem = localStorage.getItem("token");
      setToken(TokenItem);
    }
  }, [setToken, token]);

  //changing the background when the URL PATH is /register and /login
  useEffect(() => {
    if (isRegisterPage || isLoginPage) {
      document.body.classList.add("background-register");
    } else {
      document.body.classList.remove("background-register");
    }
  }, [location, isRegisterPage, isLoginPage]);

  // Remove the line that sets authenticated state

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

        if (result.success) {
          setAuthenticated(true);
          setUserId(result.data._id);
          setuserName(result.data.username);
        } else {
          if (isRegisterPage || isLoginPage) {
            navigate("/login");
          }
          setAuthenticated(false);
        }

        return result;
      } catch (err) {
        console.error(err);
      }
    };
    token ? myData() : "";
  }, [token, BASE_URL, navigate, isRegisterPage, isLoginPage]);

  return (
    <>
      <Navbar authenticated={authenticated} />
      <Routes>
        <Route
          path="/"
          element={<Home authenticated={authenticated} userName={userName} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/logout"
          element={
            <Logout setAuthenticated={setAuthenticated} setToken={setToken} />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route
          path="/Posts"
          element={
            <Posts
              authenticated={authenticated}
              token={token}
              userId={userId}
            />
          }
        ></Route>
        <Route
          path="/Profile"
          element={<Profile authenticated={authenticated} />}
        ></Route>
        <Route path="/message/:id" element={<Message token={token} />}></Route>
      </Routes>
      <CreatePostForm/> 
   </>
   
  );

}

export default App;
