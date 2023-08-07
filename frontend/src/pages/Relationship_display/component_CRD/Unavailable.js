import React from "react";
import { useNavigate } from "react-router-dom";
import "../Relationship_display.css";
import UnavailableImg from "./UnavailableImg.png";

const Unavailable = ({ dataParentToChild }) => {
  return (
    <div className="unavailable">
      <h3 className="course_name">Course name: {dataParentToChild[0]}</h3>
      <img className="un_image" src={UnavailableImg} />
      <h3 className="un_line"> Sorry! The data is unavailable </h3>
    </div>
  );
};

export default Unavailable;
