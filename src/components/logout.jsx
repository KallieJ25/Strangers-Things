import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setAuthenticated }) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    location.reload(navigate("/login"));
  });

  return <></>;
}

export default Logout;
