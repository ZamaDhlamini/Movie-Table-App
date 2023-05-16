// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import MovieTable from './MovieTable';
// import { BrowserRouter } from 'react-router-dom';



// //@ts-ignore
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './navBarStyle.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MovieProvider } from './providers/movies';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
    <MovieProvider>
      <App />
      </MovieProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);


