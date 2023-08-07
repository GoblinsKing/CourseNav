import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="Menu-bar">
      <div className="Web-menu">
        <p> Course Reconmendation </p>
        <p> Career Path Navigation </p>
        <p> Course Relationship </p>
        <p> Degree Path </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          className="botton"
          onClick={() => {
            localStorage.removeItem("userInfo");
            navigate("/", { replace: true });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
