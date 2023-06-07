import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Logout;
