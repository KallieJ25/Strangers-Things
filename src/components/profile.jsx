import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ authenticated }) {
  const navigate = useNavigate();
  // If not authenticated, redirect to the login page
  useEffect(() => {
    if (authenticated !== true) {
      navigate("/login");
    }
  });

  return (
    <>
      <h1>Profile</h1>
    </>
  );
}

export default Profile;
