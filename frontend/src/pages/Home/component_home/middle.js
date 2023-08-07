import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./discription.css";
import Thums from "./thums.png";
import Home_cr from "./home_cr.png";

const Middle = () => {
  return (
    <div className="middle">
      <div className="center_box">
        <div className="middle_box">
          <img className="h_image" src={Home_cr} />
          <Link
            to="/couse_relationship_search/"
            style={{ textDecoration: "none" }}
          >
            <div className="sub_2box">Course Relationship</div>
          </Link>
          <div className="sub_content">
            Course Relationship aims to help course coordinators validate
            whether the university's framework helps students perform better.
            Users can identify the relationship with other courses within one
            search and analyse how the performance in the prerequisites will
            affect the dependency courses.{" "}
          </div>
          <Link
            to="/couse_relationship_search/"
            style={{ textDecoration: "none" }}
          >
            <div className="try">try it now ></div>
          </Link>
        </div>

        <div className="middle_box">
          <img className="h_image" src={Thums} />
          <Link to="/course_advisor_search/" style={{ textDecoration: "none" }}>
            <div className="sub_2box">Course Advisor</div>
          </Link>
          <div className="sub_content">
            Course Advisor is a function to help students choose electives based
            on their ability. Course Advisor will show different electives the
            students may choose from for their next elective after completing
            the courses they inputted. Our product will provide different
            learning paths which contain multiple hierarchies within one page.{" "}
          </div>
          <Link to="/course_advisor_search/" style={{ textDecoration: "none" }}>
            <div className="try">try it now ></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Middle;
