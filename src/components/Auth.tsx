import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface AuthProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
  isLoggedIn: boolean;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onRegister, isLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true);

  const handleSwitchAuthMode = () => {
    setShowLogin(!showLogin);
  };

  if (isLoggedIn) {
    return <p></p>;
  }

  return (
    <>
      {showLogin ? (
        <>
          {/* <h2>Login</h2> */}
          <Login onLogin={onLogin} />
          <p>
           <button onClick={handleSwitchAuthMode}>Register</button>
          </p>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <Register onRegister={onRegister} />
          <p>
            Already have an account? <button onClick={handleSwitchAuthMode}>Login</button>
          </p>
        </>
      )}
    </>
  );
};

export default Auth;
