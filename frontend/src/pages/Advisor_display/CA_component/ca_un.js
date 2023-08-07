import React from "react";
import { useNavigate } from "react-router-dom";
import "../ca_display.css";
import UnavailableImg from "./UnavailableImg.png";

const Ca_un = ({ dataParentToChild }) => {
  return (
    <div className="ca_un_box">
      <h3 className="ca_un_line"> Sorry! The data is unavailable </h3>
      <img className="ca_un_image" src={UnavailableImg} />
    </div>
  );
};

export default Ca_un;
