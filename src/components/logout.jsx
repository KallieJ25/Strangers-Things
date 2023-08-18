import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setAuthenticated, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setToken("");
    location.reload();
    navigate("/");
  }, [navigate, setAuthenticated, setToken]);
  return <></>; // This component doesn't render anything
}

export default Logout;
