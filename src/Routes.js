import './App.css';
import * as React from 'react';
import Login from './pages/Login';
import Home from './pages/Home'
import CreateAccount from './pages/CreateAccount'
import { Routes as RouteSection, Route } from "react-router-dom";


function Routes() {

  return (
    <RouteSection >
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path='/createAccount' element={<CreateAccount/>}/>
    </RouteSection>
  );

}

export default Routes;
