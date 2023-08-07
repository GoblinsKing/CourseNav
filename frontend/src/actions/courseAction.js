import axios from "../axios";
import {
  DEPENDENCY_SEARCH_FAIL,
  DEPENDENCY_SEARCH_REQUEST,
  DEPENDENCY_SEARCH_SUCCESS,
  PREREQUISITE_SEARCH_FAIL,
  PREREQUISITE_SEARCH_REQUEST,
  PREREQUISITE_SEARCH_SUCCESS,
  RELATIONSHIP_SEARCH_FAIL,
  RELATIONSHIP_SEARCH_REQUEST,
  RELATIONSHIP_SEARCH_SUCCESS,
} from "../constants/courseConstants";

export const prerequisiteSearchAction =
  (courseCode) => async (dispatch, getState) => {
    try {
      dispatch({ type: PREREQUISITE_SEARCH_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          token: `${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/course/grade",
        {
          courseCode,
        },
        config
      );

      dispatch({ type: PREREQUISITE_SEARCH_SUCCESS, payload: data });
      localStorage.setItem("prerequisiteData", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PREREQUISITE_SEARCH_FAIL,
        payload: message,
      });
    }
  };

export const relationshipSearchAction =
  (mainCourse, relatedCourse, requiredGrades) => async (dispatch, getState) => {
    try {
      dispatch({ type: RELATIONSHIP_SEARCH_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          token: `${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/course/courseRelationship",
        {
          mainCourse,
          relatedCourse,
          requiredGrades,
        },
        config
      );

      dispatch({ type: RELATIONSHIP_SEARCH_SUCCESS, payload: data });
      // localStorage.setItem("relationshipData", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: RELATIONSHIP_SEARCH_FAIL,
        payload: message,
      });
    }
  };

export const dependencySearchAction =
  (courseCode, requiredGrades) => async (dispatch, getState) => {
    try {
      dispatch({ type: DEPENDENCY_SEARCH_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          token: `${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/course/dependencyGrade",
        {
          courseCode,
          requiredGrades,
        },
        config
      );

      dispatch({ type: DEPENDENCY_SEARCH_SUCCESS, payload: data });
      localStorage.setItem("dependencyData", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DEPENDENCY_SEARCH_FAIL,
        payload: message,
      });
    }
  };