import React from "react";
import { Route, Routes } from "react-router";
import AuthLayout from "./app/components/AuthLayout";
import Layout from "./app/components/Layout";
import Login from "./features/Login";
import SignUp from "./features/Signup";
import Homepage from "./features/Homepage";
import Dashboard from "./features/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignUp} />
      </Route>
      <Route Component={Layout}>
        <Route path="/home" Component={Homepage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/dashboard/:stream_id" Component={Dashboard} />
        <Route path="/reports/:business_domain_id" Component={Dashboard} />
      </Route>
    </Routes>
  );
};

export default App;
