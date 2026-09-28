/*
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import MyForm from './MyForm.jsx'
import Box from './Box.jsx'

import {BrowserRouter, Route, Routes, NavLink} from "react-router";

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <header>
  <NavLink to="/myform">my form</NavLink>
  <NavLink to="/box">box</NavLink>
 </header>

    <Routes>
      <Route path="/myform" element={<MyForm />} />
      <Route path="/box" element={<Box />} />
    </Routes>
  </BrowserRouter>,
);
*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
