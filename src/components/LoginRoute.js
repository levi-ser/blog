import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../pages/LoginForm";

const LoginRoute = ({ setLoggedIn, loggedIn }) => {
    if (loggedIn) {
      return <Navigate to="/" replace />;
    } else {
      return <LoginForm setLoggedIn={setLoggedIn} />;
      
    }
  };

  export default LoginRoute;