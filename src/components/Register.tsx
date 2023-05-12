// import React, { useState } from "react";
// import Login from "./Login";



// type RegisterProps = {
//   onFormSwitch: (form: string) => void;
// };


// export const Register: React.FC<RegisterProps> = (props) => {
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//   const [userName, setUserName] = useState('');
//   const [surName, setSurName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [name, setName] = useState('');
//   const [showLogin, setShowLogin] = useState(false);
  
//   const toggleLogin = () =>{
//     setShowLogin(!showLogin);
//   }
  
//   interface ApiResponse{
//     success: boolean;
//   }

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log(email);
//         const requestOptions ={
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 emailAddress: email,
//                 password: pass,
//                 userName: userName,
//                 phoneNumber: phoneNumber,
//                 name: name,
//                 surName: surName
//             })
//         };
//         fetch('https://localhost:44311/api/services/app/Person/Create', requestOptions)
//         .then(Response => Response.json())
//         .then((data: ApiResponse) => {
//             if (data.success) {
//               console.log(data);
//               localStorage.setItem("objLogin", JSON.stringify(data));
//             } else {
//               alert("Failed to Login!!! Please check your email or password");
//             }
//           })
//     }

//     return (
//         <div className="auth-form-container">
//             <h2>Register</h2>
//         <form className="register-form" onSubmit={handleSubmit}>
//             <label htmlFor="name">Name</label>
//               <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Name" />
//             <label htmlFor="Surname">Surname</label>
//               <input value={surName} name="Surname" onChange={(e) => setSurName(e.target.value)} id="Surname" placeholder="SurName" />
//             <label htmlFor="Username">Username</label>
//               <input value={userName} name="Username" onChange={(e) => setUserName(e.target.value)} id="Username" placeholder="Username" />
//             <label htmlFor="Phone Number">Phone Number</label>
//               <input value={phoneNumber} name="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} id="Username" placeholder="Username" />
//             <label htmlFor="email">email</label>
//               <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
//             <label htmlFor="password">password</label>
//               <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//             <button type="submit" onClick={toggleLogin}>Log In</button>
//         </form>
//         <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
//         {/* {showLogin ? <Login onFormSwitch={props.onFormSwitch} /> : null} */}
//     </div>
//     )
// }

import React, { useState } from 'react';

interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onRegister(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
