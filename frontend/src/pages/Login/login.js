import "./login.css";
import User_name from "./component_login/User_name";
//import Password from "./component_login/Password";
//import Sign_in from "./component_login/Sign_in";
//import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="background">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Enter your student ID to access your account</p>
        <User_name />

        <div className="backhome">
          Don’t have an account?{" "}
          <Link to="/" className="link_back">
            Go back to Home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
