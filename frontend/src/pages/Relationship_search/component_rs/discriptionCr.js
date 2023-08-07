import React from "react";
import { useNavigate } from "react-router-dom";
import "./discriptionCr.css";

const DiscriptionCr = () => {
  const navigate = useNavigate();
  const text = `

  Please provide the website with the course code or name and choose if they want to investigate the prerequisites or dependencies of this course. 

  It will show you the visualize the overall distribution of courses you offer and the performance of prerequisites/dependency. You can quickly identify how these prerequisites/dependency courses individually affect course performance.
  `
  return (     
    <div className = "dis">
        <div className = "h2">
            Course Relationship 
        </div>

        <div className = "p">
          {text.split('\n\n').map(paragraph =>
            <p>
                {paragraph.split('\n').reduce((total, line) => [total, <br />, line])}
            </p>
          )}
        </div>
    </div>
  );
};

export default DiscriptionCr;