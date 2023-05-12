// import React, { useState } from "react";
// import logo from './logo.svg';
// import './App.css';
// import Login  from "./components/Login";
// import { Register } from "./components/Register";
// import './fonts/open sans/OpenSans-Italic-VariableFont_wdth,wght.ttf';
// import MovieTable from "./MovieTable";



// function App() {
 
//   const [currentForm, setCurrentForm] = useState('login');

//   const toggleForm = (formName: string) => {
//     setCurrentForm(formName);
//   }

//   return (
//     <div className="App">
//       {
//       //  <MovieTable />
//        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
//       }
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import Auth from './components/Auth';
// import MovieTable from './MovieTable';

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (username: string, password: string) => {
//     // perform login logic here
//     setIsLoggedIn(true);
//   };

//   const handleRegister = (username: string, password: string) => {
//     // perform registration logic here
//     setIsLoggedIn(true);
//   };

//   return (
//     <div>
//       <h1>Welcome to My App</h1>
//       <Auth onLogin={handleLogin} onRegister={handleRegister} isLoggedIn={isLoggedIn} />
//       {/* <MovieTable /> */}
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';
// import './App.css';
import './index.css';
import './loginstyle.css'; 
import Auth from './components/Auth';
import MovieTable from './MovieTable';
import { useNavigate } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // perform login logic here
    setIsLoggedIn(true);
    navigate('/movies');
  };

  const handleRegister = (username: string, password: string) => {
    // perform registration logic here
    setIsLoggedIn(true);
    navigate('/movies');
  };

  return (
    <div>
      {/* <Header /> */}
      <h1 style={{fontFamily: "monospace"}}>Movie APP</h1>
      <Auth onLogin={handleLogin} onRegister={handleRegister} isLoggedIn={isLoggedIn} />
      {isLoggedIn && <MovieTable />}
    </div>
  );
};

export default App;



