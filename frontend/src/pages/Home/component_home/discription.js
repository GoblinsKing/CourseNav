import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./discription.css";

const Discription = () => {
  const navigate = useNavigate();
  const text = `CourseNav targets on course coordinators and students 
  in computer science and relative degrees at the University of Adelaide. 
  
  We helps users understand the student's learning pathway. We provide 
  visualised information and study patterns to the users by analysing past student data.`;
  return (
    <div className="display_box">
      <div className="heading1">CourseNav</div>
      <div className="subheader">Understanding student's learning pathway</div>
      <div className="para">
        {text.split("\n\n").map((paragraph) => (
          <p>
            {paragraph
              .split("\n")
              .reduce((total, line) => [total, <br />, line])}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Discription;
