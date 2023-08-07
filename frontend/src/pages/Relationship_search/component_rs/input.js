import "./input.css";
// import search from "../../../Global/images/search.png";
// import { useNavigate } from "react-router-dom";
// import {
//   dependencySearchAction,
//   prerequisiteSearchAction,
// } from "../../../actions/courseAction";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Loading from "../../../Components/Loading";
// import ErrorMessage from "../../../Components/ErrorMessage";
import SearchBox from "../../../Components/SearchBox";

const Input = () => {
  // Check which button user clicked, default is pre
  // const state = { button: "pre" };
  // const navigate = useNavigate();
  // const [courseCode, setcourseCode] = useState("");
  // const dispatch = useDispatch();

  // const prerequisiteSearch = useSelector((state) => state.prerequisiteSearch);
  // const { loading, error, prerequisiteData } = prerequisiteSearch;

//   const dependencySearch = useSelector((state) => state.dependencySearch);
//   const { dependencyData } = dependencySearch;

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (state.button === "pre") {
//       await dispatch(prerequisiteSearchAction(courseCode));
//       localStorage.setItem("Course Code", courseCode);
//       navigate("/course_relationship_display_pre", { replace: true });
//       localStorage.removeItem("requiredGrades");
//     }
//     if (state.button === "dep") {
//       console.log("Button 2 clicked! URL is /course_relationship_display_dep");
//       await dispatch(dependencySearchAction(courseCode));
//       navigate("/course_relationship_display_dep", { replace: true });
//       localStorage.removeItem("requiredGrades");
//     }
//   };

  return (
    <div className="box_box">
      <SearchBox />
      {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <img src={search} alt="search" className="image" />
        <input
          type="text"
          className="input-box"
          value={courseCode}
          placeholder="Please enter course code/name"
          onChange={(e) => setcourseCode(e.target.value)}
        />
        <SearchBox />
        <br />
        <br />
        <div className="ul_button">
          <button className="button" onClick={() => (state.button = "pre")}>
            Search for prerequisites
          </button>

          <button className="button2" onClick={() => (state.button = "dep")}>
            Search for dependency
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default Input;
