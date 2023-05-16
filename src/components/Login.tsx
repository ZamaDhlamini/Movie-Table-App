// import React, { useState, FC } from "react";
// import MovieTable from "../MovieTable";


// type LoginProps = {
//     onFormSwitch: (form: string) => void;
//     };
    
//     const Login: React.FC<LoginProps> = ({ onFormSwitch }) => {
//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');
//     const [userName, setUserName] = useState('');
//     const [showTable, setShowTable] = useState(false);

//     const toggleTable = () => {
//         setShowTable(!showTable);
//     }


//     function handleClick(){
//         console.log('you are being clicked');
//     }

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setShowTable(true);
//         console.log(email);
//     }
    
//     return (
//         <div className="auth-form-container">
//             <h2 className="title" onSubmit={toggleTable}>Login</h2>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="UserName">UserName</label>
//                 <input value={userName} onChange={(e) => setUserName(e.target.value)}type="UserName" placeholder="" id="UserName" name="userName" />
//                 <label htmlFor="email">email</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
//                 <label htmlFor="password">password</label>
//                 <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//                 <button type="submit" onClick={toggleTable}>Log In</button>
//             </form>
//             <button className="link-btn" onClick={() => onFormSwitch('register')}>Don't have an account? Register here.</button>
//             {showTable ? <MovieTable /> : null}
//         </div>
//     );
//     };
    
//     export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieTable from '../MovieTable';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://localhost:44311/api/TokenAuth/Authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userNameOrEmailAddress: username,
          password,
        }),
      });
  
      if (response.ok) {
        // Login successful
        onLogin(username, password);
        navigate('/MovieTable');
      } else {
        // Login failed
        setLoginError(true);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Login error:', error);
      setLoginError(true);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h3 id="logo">Log In</h3>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      {loginError && <div className="error">Invalid username or password</div>}
      <div className="loginButton">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;


    
    
    
    
    