import {
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCESS,
} from "../constants/userConstants";
import axios from "axios";

export const login = (studentID, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/login",
      {
        aID: studentID,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("Course Code");
  localStorage.removeItem("prerequisiteData");
  localStorage.removeItem("requiredGrades");
  localStorage.removeItem("dependencyData");
  localStorage.removeItem("advisorData");
  dispatch({ type: USER_LOGOUT });
};
