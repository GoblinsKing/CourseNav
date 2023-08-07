import axios from "../axios";
import {
    ADVISOR_SEARCH_REQUEST,
    ADVISOR_SEARCH_SUCCESS,
    ADVISOR_SEARCH_FAIL
  } from "../constants/advisorConstants"

  export const advisorSearchAction =
  (courseInfoList) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADVISOR_SEARCH_REQUEST });

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
        "/adviser",
        {
          courseInfoList,
        },
        config
      );

      dispatch({ type: ADVISOR_SEARCH_SUCCESS, payload: data });
      localStorage.setItem("advisorData", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ADVISOR_SEARCH_FAIL,
        payload: message,
      });
    }
  };