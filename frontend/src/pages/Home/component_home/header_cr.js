import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./header.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userActions";

const Header_cr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("userInfo"));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const [textColor, setTextColor] = useState("#2699fb");
  const [isBlue, setIsBlue] = useState(false);

  const handleChnageTextColor = (e) => {
    setIsBlue(!isBlue);
    setTextColor(isBlue ? "#2699fb" : "#3864d1");
    console.log(isBlue);
  };

  function DropDownMenu() {
    return (
      <div className="dropdown1">
        <Link to="/" className="link" onClick={logoutHandler}>
          Logout
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="ul">
        <Link to="/">
          <li className="li_sub">CourseNav</li>
        </Link>
        {/* <Link
          to="/couse_relationship_search/"
          value={isBlue}
          onClick={handleChnageTextColor}
        > */}
        <Link to="/couse_relationship_search/">
          {/* <li className="li" style={{ color: textColor }}> */}
          <li className="li">Course Relationship</li>
        </Link>
        <Link to="/course_advisor_search/">
          <li className="li_sub">Course Advisor</li>
        </Link>
        {/*When backend return the name of the user we will change that here*/}
        {user ? (
          <DropDown icon={user && user.name}>
            <DropDownMenu />
          </DropDown>
        ) : (
          <li className="li_login">
            <Link to="/login" className="link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

function DropDown(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="li_login">
      <Link to="" className="link" onClick={() => setOpen(!open)}>
        {props.icon}
      </Link>

      {open && props.children}
    </li>
  );
}

export default Header_cr;
