import React from "react";
import useHistory from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // TODO: Add logout functionality here
    // For example, remove the user's authentication token from local storage

    // Redirect the user to the login page
    history.push("/login");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
