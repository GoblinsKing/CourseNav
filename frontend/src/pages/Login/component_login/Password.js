import React from "react";
import "./input.css";
import pass from "./image/password.png";

class Password extends React.Component {
  render() {
    return (
      <form>
        <img src={pass} alt="password" className="user" />
        <input
          type="password"
          className="input-box"
          placeholder="Please enter your student password"
        />
      </form>
    );
  }
}

export default Password;
