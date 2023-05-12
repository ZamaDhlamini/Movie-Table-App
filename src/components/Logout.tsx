import React from "react";
import { useNavigate } from "react-router-dom";


const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add logout functionality here
    // For example, remove the user's authentication token from local storage

    // Redirect the user to the login page
    navigate("../Login");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
