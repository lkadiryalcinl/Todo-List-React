import './App.css';
import * as React from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard'
import CreateAccount from './pages/CreateAccount/CreateAccount'
import AccountSettings from './pages/AccountSettings/AccountSettings'
import { Routes as RouteSection, Route } from "react-router-dom";


function Routes() {

  return (
    <RouteSection >
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/createAccount' element={<CreateAccount />} />
      <Route path='/accountSettings' element={<AccountSettings />} />
    </RouteSection>
  );

}

export default Routes;
