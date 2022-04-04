import axios from "axios";
import React, { useEffect } from "react";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "../../../hoc/auth";

function MainPage() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("/api/test").then((res) => alert(res.data));
  // }, []);
  const logOut = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        navigate("/LoginPage");
      } else {
        alert("fail");
      }
    });
  };

  const state = useSelector((auth_user) => auth_user.user.userData);
  // const test = state.userData.isAuth;

  // useEffect(() => {
  // }, [state]);
  setTimeout(() => console.log(state.isAuth), 1000);

  return (
    <>
      <div className="main">
        <h1>main page</h1>
        <button className="" onClick={logOut}>
          logout
        </button>
      </div>
    </>
  );
}

export default MainPage;
