import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
function Login({ setToken }) {
  const checkIcon = (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1.1em"
      width="1.1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12" y2="16"></line>
    </svg>
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const COHORT_NAME = "2209-FTB-ET-WEB-FT";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { username, password },
        }),
      });

      const data = await response.json();

      if (data.success === false) {
        setMessage(data.error.message);
        setMessageType("danger-color-text danger-div");
      } else {
        setMessage(data.data.message);
        setMessageType("success-alert-text sucess-div");
        setToken(data.data.token);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <div className="alertStyleBox">
        {message && (
          <div className={messageType}>
            <span>{message}</span>
          </div>
        )}
      </div>
      <div>
        <div className="container">
          <div className="card">
            <div className="title">
              <h1 className="bold-text">Login</h1>
            </div>
            <form
              onSubmit={handleSubmit(() => {
                handleLogin();
              })}
            >
              <div>
                <input
                  type="text"
                  {...register("username", {
                    required: "This is required.",
                    minLength: {
                      value: 4,
                      message: "Min Lengt is 4",
                    },
                  })}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.username && (
                <p className="danger-color-text">
                  {checkIcon}&nbsp;{errors.username?.message}
                </p>
              )}
              <div>
                <div className="passwordSection">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "This is required.",
                      minLength: {
                        value: 4,
                        message: "Min Lengt is 4",
                      },
                    })}
                    id="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="buttonPassword"
                    type="button"
                    id="passwordbtn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1.3em"
                        width="1.3em"
                        className="d-block"
                        id="show_eye_pin"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1.3em"
                        width="1.3em"
                        id="hide_eye_pin"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="danger-color-text">
                    {checkIcon}&nbsp;
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <button type="submit" className="loginButton">
                Login
              </button>
              <p className="centerText">
                Don&apos;t have an account? &nbsp;
                <Link to="/register" className="linkStyle">
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
