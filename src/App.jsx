import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Posts from "./components/posts";
import Profile from "./components/profile";
import Logout from "./components/logout";
import Home from "./components/home";
import Navbar from "./components/navbar";
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
  //storage the token in a localStorage
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }

  let TokenItem = localStorage.getItem("token");
  const [authenticated, setAuthenticated] = useState(false);

  //changing the background when the URL PATH is /register and /login
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
            Authorization: `Bearer ${TokenItem}`,
          },
        });
        const result = await response.json();
        //set TokenItem true if different than (null,empty and false)
        setAuthenticated(
          TokenItem !== null || TokenItem !== "" || TokenItem !== false
        );

        //check for authenticated be true
        if (authenticated) {
          //if the URL path is /register
          if (isRegisterPage || isLoginPage) {
            const timer = setTimeout(() => {
              navigate("/profile");
            }, 1000);
            return () => {
              clearTimeout(timer);
            };
          }
        } else {
          navigate("/login");
        }
        return result;
      } catch (err) {
        console.error(err);
      }
    };
    TokenItem ? myData() : "";
  }, [
    TokenItem,
    BASE_URL,
    navigate,
    isRegisterPage,
    isLoginPage,
    authenticated,
  ]);
  return (
    <>
      <Navbar authenticated={authenticated} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
        <Route
          path="/logout"
          element={<Logout setAuthenticated={setAuthenticated} />}
        />
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route
          path="/Posts"
          element={<Posts authenticated={authenticated} />}
        ></Route>
        <Route
          path="/Profile"
          element={<Profile authenticated={authenticated} />}
        ></Route>
      </Routes>
   
    <CreatePostForm/> </>
  );

}

export default App;
