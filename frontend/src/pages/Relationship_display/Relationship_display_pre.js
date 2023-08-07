import React, { useState, useRef, useEffect } from "react";
import BarPre from "./component_CRD/BarPre";
import Header_cr from "../Home/component_home/header_cr";
import "./Relationship_display.css";
import OverallChart from "./component_CRD/overallChart";
import { useNavigate } from "react-router";
import Unavailable from "./component_CRD/Unavailable.js";
import { useDispatch, useSelector } from "react-redux";
import Non_course_pre from "./component_CRD/non_course_pre.js";

import {
  dependencySearchAction,
  relationshipSearchAction,
} from "../../actions/courseAction";
import { useIsMount } from "./useIsMount";

function Relationship_display_pre() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //This is for relationshipSearch
  const mainCourse = JSON.parse(localStorage.getItem("Course Code"));
  const [relatedCourse, setRelatedCourse] = useState("");
  const [requiredGrades, setRequiredGrades] = useState("");
  const [requiredGrades2, setRequiredGrades2] = useState("");
  const relationshipSearch = useSelector((state) => state.relationshipSearch);
  const { relationshipData } = relationshipSearch;
  var Data = JSON.parse(localStorage.getItem("prerequisiteData"));
  var PreGrade = Data.prerequisiteData;
  const isMounter = useRef(false);
  const withGrade = useRef(false);
  const [cg, setCg] = useState(Data.overallGradeDistribution);

  const [style, setStyle] = useState("pre_box");
  const [ind, setInd] = useState("");
  //Check if the Bar is clicked
  const [isClicked, setisClicked] = useState(false);
  const [isClikedWithGrade, setIsClikedWithGrade] = useState(false);

  //Test new thing
  // const isMount = useIsMount();
  // useEffect(() => {
  //   if (isMount) {
  //     console.log("First Render");
  //   } else {
  //     console.log("Subsequent Render");
  //     setRequiredGrades2([]);
  //   }
  // }, [ind]);

  const changeRelatedCourse = (newCourse, index) => {
    setisClicked(true);
    // setRelatedCourse(newCourse);
    isMounter.current = true;
    // setRequiredGrades("");
    setStyle("pre_box1");
    localStorage.setItem("Index", index);
    setInd(index);
    if (Object.keys(requiredGrades2).length != 0) {
      console.log("LOOK HERE! What is the grades?", requiredGrades2);
      dispatch(
        relationshipSearchAction(mainCourse, newCourse, requiredGrades2)
      );
      setIsClikedWithGrade(true);
    } else {
      dispatch(relationshipSearchAction(mainCourse, newCourse));
      setIsClikedWithGrade(false);
    }

    // if (JSON.parse(localStorage.getItem("requiredGrades"))) {
    //   console.log("it's available");
    //   console.log(JSON.parse(localStorage.getItem("requiredGrades")));
    //   setRequiredGrades(JSON.parse(localStorage.getItem("requiredGrades")));
    //   withGrade.current = true;
    //   setIsClikedWithGrade(true);
    // }
    // localStorage.removeItem("requiredGrades");
  };

  // useEffect(() => {
  //   if (isMounter.current === false) {
  //   } else {
  //     if (withGrade.current === true) {
  //       console.log(relatedCourse);
  //       dispatch(
  //         relationshipSearchAction(mainCourse, relatedCourse, requiredGrades2)
  //       );
  //       isMounter.current = false;
  //       withGrade.current = false;
  //       localStorage.removeItem("requiredGrades");
  //     } else {
  //       setIsClikedWithGrade(false);
  //       console.log(relatedCourse);
  //       dispatch(relationshipSearchAction(mainCourse, relatedCourse));
  //       isMounter.current = false;
  //     }
  //   }
  // }, [relatedCourse, requiredGrades2]);

  //Next Edit here
  // useEffect(() => {
  //   setRequiredGrades2([]);
  // }, [ind]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/", { replace: true });
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (relationshipData) {
      setCg(() => relationshipData.retust);
      console.log(cg);
    }
  }, [relationshipData]);

  useEffect(() => {
    console.log(cg);
    console.log("This is the require grade: ", requiredGrades2);
  }, [cg, requiredGrades2]);

  const state = { button: "pre" };

  const backToSearch = () => {
    console.log(PreGrade);
    console.log("back button clicked");
    localStorage.removeItem("requiredGrades");
    localStorage.removeItem("Course Code");
    localStorage.removeItem("prerequisiteData");
    localStorage.removeItem("dependencyData");
    localStorage.removeItem("Index");
    localStorage.removeItem("Prereq");
    navigate("/couse_relationship_search");
    setisClicked(false);
    setIsClikedWithGrade(false);
  };

  const backToOriginal = () => {
    console.log("Overall Distribution button clicked");
    localStorage.removeItem("requiredGrades");
    setCg(() => Data.overallGradeDistribution);
    setRequiredGrades("");
    setisClicked(false);
    setIsClikedWithGrade(false);
    window.location.reload(false);
  };

  const clickDep = async () => {
    await dispatch(dependencySearchAction(mainCourse));
    navigate("/course_relationship_display_dep", {
      replace: true,
    });
  };

  const handleCallback = (grades) => {
    setRequiredGrades2(grades);
  };

  //Here!!!
  let preGraph;
  if (Object.keys(PreGrade).length === 0) {
    preGraph = (
      <div className="pre_container">
        <div className="un_box">
          <Non_course_pre />
        </div>
      </div>
    );
  } else {
    preGraph = (
      <div className="pre_container">
        {PreGrade?.map((PreCourses, index) => {
          if (PreCourses[0] === "NULL" || PreCourses[1] === null) {
            return (
              <div key={index} className="un_box">
                <Unavailable dataParentToChild={PreCourses} />
              </div>
            );
          }

          return (
            <div
              className={index === ind ? "pre_box1" : "pre_box"}
              // className="pre_box"
              key={index}
              value={PreCourses[0]}
              onClick={() => changeRelatedCourse(PreCourses[0], index)}
            >
              <BarPre
                dataParentToChild={PreCourses}
                parentCallback={handleCallback}
                BarIndex={index}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bgimage">
      <Header_cr />
      <div className="container">
        {preGraph}

        <div className="course_container">
          <div className="distribution_box">
            <OverallChart
              key={cg}
              dataParentToChild={cg}
              isChange={isClicked}
              withGrade={[isClikedWithGrade, requiredGrades2]}
            />
          </div>
          <br />
          <div className="_button">
            <button className="buttonBack" onClick={backToSearch}>
              Go back
            </button>
            <button className="buttonBack" onClick={backToOriginal}>
              Overall Distribution
            </button>
            <button className="buttonBack" onClick={clickDep}>
              Search for Dependency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relationship_display_pre;
