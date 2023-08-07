import React from "react";
import { useNavigate } from "react-router-dom";
import "./discriptionCr.css";

const DiscriptionCa = () => {
  const navigate = useNavigate();
  const text = `

  Please provide all of the names/codes of the courses and grades you achieved to the system. 
  
  Course Advisor will show different electives that you may choose from, for your next elective. 
  `;
  return (
    <div className="dis">
      <div className="h2">Course Advisor</div>

      <div className="p">
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

export default DiscriptionCa;
