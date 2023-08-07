import BarDep from "./component_CRD/BarDep";
import React, { useState, useRef, useEffect } from "react";
import Header_cr from "../Home/component_home/header_cr";
import "./Relationship_display.css";

import Distribution from "../../Global/images/distribution.png";
import Unavailable from "./component_CRD/Unavailable.js";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  dependencySearchAction,
  prerequisiteSearchAction,
} from "../../actions/courseAction";
import OverallChartDep from "./component_CRD/overallChartDep";
import Non_course_dep from "./component_CRD/non_course_dep";

const Relationship_display_dep = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //If not login, got to homepage
  useEffect(() => {
    if (!userInfo) {
      navigate("/", { replace: true });
    }
  }, [navigate, userInfo]);

  //Look for the dependencyData from localStorage
  var Data = JSON.parse(localStorage.getItem("dependencyData"));
  // var DepGrade = Data.dependencyData;
  const [DepGrade, setDepGrade] = useState(Data.dependencyData);
  const [cg, setCg] = useState(Data.overallGradeDistribution);

  //This part is for RelationshipSearch
  const mainCourse = JSON.parse(localStorage.getItem("Course Code"));
  const [requiredGrades, setRequiredGrades] = useState("");
  const [requiredGrades2, setRequiredGrades2] = useState("");
  const withGrade = useRef(false);
  const dependencySearch = useSelector((state) => state.dependencySearch);
  const { dependencyData } = dependencySearch;

  const changeRelatedCourse = () => {
    setRequiredGrades("");
    // if (JSON.parse(localStorage.getItem("requiredGrades"))) {
    //   console.log("it's available");
    //   console.log(JSON.parse(localStorage.getItem("requiredGrades")));
    //   setRequiredGrades(JSON.parse(localStorage.getItem("requiredGrades")));
    //   withGrade.current = true;
    // }
    if (Object.keys(requiredGrades2).length != 0) {
      console.log("LOOK HERE! What is the grades?", requiredGrades2);
      setRequiredGrades(requiredGrades2);
      withGrade.current = true;
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(dependencySearchAction(mainCourse, requiredGrades));
      // setDepGrade(() => dependencyData.dependencyData);
    };

    if (withGrade.current === true) {
      console.log("this is: " + requiredGrades);
      fetchData();
      withGrade.current = false;
      localStorage.removeItem("requiredGrades");
    } else {
      fetchData();
    }
  }, [requiredGrades]);

  useEffect(() => {
    if (dependencyData) {
      setDepGrade(() => dependencyData.dependencyData);
      console.log("The DepGrade is: " + DepGrade);
    }
  }, [dependencyData]);

  useEffect(() => {
    console.log("DepGrade has been set!");
  }, [DepGrade]);

  const backToSearch = () => {
    console.log("back button clicked");
    localStorage.removeItem("requiredGrades");
    localStorage.removeItem("Course Code");
    localStorage.removeItem("prerequisiteData");
    localStorage.removeItem("dependencyData");
    navigate("/couse_relationship_search");
  };

  const clickPre = async () => {
    await dispatch(prerequisiteSearchAction(mainCourse));
    navigate("/course_relationship_display_pre", {
      replace: true,
    });
  };

  let depGraph;
  if (Object.keys(DepGrade).length === 0) {
    depGraph = (
      <div className="dep_container">
        <div className="un_box">
          <Non_course_dep />
        </div>
      </div>
    );
  } else {
    depGraph = (
      <div className="dep_container">
        {DepGrade?.map((DepCourses, index) => {
          if (DepCourses[0] === "NULL" || DepCourses[1][1] === null) {
            return (
              <div key={index} className="un_box">
                <Unavailable key={DepCourses} dataParentToChild={DepCourses} />
              </div>
            );
          }
          return (
            <div
              key={index}
              className="dep_box"
              // value={DepCourses[0]}
              // onClick={() => changeRelatedCourse(DepCourses[0])}
            >
              <BarDep key={DepCourses} dataParentToChild={DepCourses} />
            </div>
          );
        })}
      </div>
    );
  }

  const handleCallback = (grades) => {
    setRequiredGrades2(grades);
  };

  return (
    <div className="bgimage">
      <Header_cr />
      {/* <div className="container_dep"> */}
      <div className="container2">
        <div className="course_container_dep">
          <div
            className="distribution_box_dep"
            onClick={() => changeRelatedCourse()}
          >
            <OverallChartDep
              key={cg}
              dataParentToChild={cg}
              parentCallback={handleCallback}
            />
          </div>
          <br />
          <div className="_button">
            <button className="buttonBack" onClick={backToSearch}>
              Go back
            </button>

            <button className="buttonBack" onClick={clickPre}>
              Search for Prerequisite
            </button>
          </div>
        </div>
        {depGraph}
      </div>
    </div>
  );
};

export default Relationship_display_dep;
