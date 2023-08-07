import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userActions";

const Navi = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div>
      <button className="botton" onClick={logoutHandler}>
        Logout!!!
      </button>
    </div>
  );
};

export default Navi;
