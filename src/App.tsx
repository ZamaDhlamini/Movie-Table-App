import React, { useState } from "react";
// import logo from './logo.svg';
import './App.css';
import Login  from "./Login";
import { Register } from "./Register";
import './fonts/open sans/OpenSans-Italic-VariableFont_wdth,wght.ttf';
import MovieTable from "./MovieTable";


function App() {
 
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName: string) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
      //  <MovieTable />
       currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;

