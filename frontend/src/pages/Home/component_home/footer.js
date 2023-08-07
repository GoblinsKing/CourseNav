import "./header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./header.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userActions";
import Uofa from "./uofa.png";

const Footer = () => {
  return (
    <div>
      <div className="footer_contain">
        <div className="f_col">
          <li className="course_nav">CourseNav</li>
          <div className="team05">Master of Computing & Innovation Project</div>
          <div className="team05">Team 05 </div>
        </div>
        <div className="f_col">
          <Link to="/couse_relationship_search/">
            {/* <li className="li" style={{ color: textColor }}> */}
            <li className="f_li">Course Relationship</li>
          </Link>
          <Link to="/course_advisor_search/">
            <li className="f_li">Course Advisor</li>
          </Link>
          <Link to="/login" className="link">
            <li className="f_li"> Login</li>
          </Link>
        </div>
        <div className="f_col_img">
          <img className="f_image" src={Uofa} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
