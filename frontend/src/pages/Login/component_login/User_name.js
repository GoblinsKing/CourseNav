import React, { Children } from "react";
import "./input.css";
//import { FaUser } from 'react-icons/fa';
/*import { IconContext } from './iconContext';*/
import user from "./image/user.png";
import pass from "./image/password.png";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/userActions";
import Loading from "../../../Components/Loading";
import ErrorMessage from "../../../Components/ErrorMessage";

const User_name = () => {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
      console.log(userInfo.name);
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Hello 2");

    dispatch(login(studentID, password));
  };

  return (
    <>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <img src={user} alt="user" className="user" />
        <input
          type="text"
          className="boxes"
          value={studentID}
          placeholder="Please enter your student id"
          onChange={(e) => setStudentID(e.target.value)}
        />
        <br />
        <img src={pass} alt="password" className="user" />
        <input
          type="password"
          className="boxes"
          value={password}
          placeholder="Please enter your student password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button1">sign in</button>
      </form>
    </>
  );
};

export default User_name;
