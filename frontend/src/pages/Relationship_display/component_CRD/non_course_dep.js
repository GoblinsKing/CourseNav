import React from "react";
import { useNavigate } from "react-router-dom";
import "../Relationship_display.css";
import No_course from "./no_course.png";

const Non_course_dep = ({ dataParentToChild }) => {
  return (
    <div className="unavailable">
      <h3 className="course_name">No dependency for this course</h3>
      <img className="un_image" src={No_course} />
    </div>
  );
};

export default Non_course_dep;
