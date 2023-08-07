import React from "react";
import { useNavigate } from "react-router-dom";
import "../ca_display.css";
import Distri from "./distri.png";

const Distribution_default = ({ dataParentToChild }) => {
  return (
    <div className="default">
      <h3 className="course_name_ca">Click on the node to</h3>
      <h3 className="course_name_ca1">investigate the distribution</h3>
      <img className="photo" src={Distri} />
    </div>
  );
};

export default Distribution_default;
