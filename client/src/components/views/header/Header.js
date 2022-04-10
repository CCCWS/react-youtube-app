import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import {
  CheckOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  FormOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const state = useSelector((auth_user) => auth_user.user.userData);

  const logOut = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        navigate("/");
        setUserAuth(false);
        setUserName("");
        localStorage.removeItem("userId");
        // alert("로그아웃");
      } else {
        alert("fail");
      }
    });
  };
  useEffect(() => {
    if (state !== undefined || state === true || state === false) {
      // console.log(state.name);
      setUserName(state.name);
      setUserAuth(state.isAuth);
    }
  }, [state]);

  const mainPage = (e) => {
    setLocation(e.key);
    navigate("/");
  };
  const logInPage = (e) => {
    setLocation(e.key);
    navigate("/LoginPage");
  };

  const registerPage = (e) => {
    setLocation(e.key);
    navigate("/registerpage");
  };

  const uploadPage = (e) => {
    setLocation(e.key);
    navigate("/UploadPage");
  };

  const subscribePage = (e) => {
    setLocation(e.key);
    navigate("/SubscribePage");
  };

  const hstyle = {
    backgroundColor: "rgb(240, 176, 176)",
    color: "black",
    display: "flex",
  };
  return (
    <div className="header">
      {userAuth ? (
        <div>
          <Menu
            className="header"
            mode="horizontal"
            selectedKeys={location}
            style={hstyle}
          >
            <Menu.Item
              onClick={mainPage}
              key="mainPage"
              icon={<HomeOutlined />}
            >
              홈
            </Menu.Item>

            <Menu.Item
              onClick={subscribePage}
              key="subscribePage"
              icon={<CheckOutlined />}
            >
              구독
            </Menu.Item>

            <Menu.Item
              onClick={uploadPage}
              key="uploadPage"
              icon={<VideoCameraAddOutlined />}
            >
              업로드
            </Menu.Item>

            <Menu.Item onClick={logOut} key="logOut" icon={<LogoutOutlined />}>
              로그아웃
            </Menu.Item>
          </Menu>
        </div>
      ) : (
        <>
          <Menu
            className="header"
            mode="horizontal"
            selectedKeys={location}
            style={hstyle}
          >
            <Menu.Item
              onClick={mainPage}
              key="mainPage"
              icon={<HomeOutlined />}
            >
              홈
            </Menu.Item>
            <Menu.Item onClick={logInPage} key="logIn" icon={<LoginOutlined />}>
              로그인
            </Menu.Item>
            <Menu.Item
              onClick={registerPage}
              key="logOut"
              icon={<FormOutlined />}
            >
              회원가입
            </Menu.Item>
          </Menu>
        </>
      )}
    </div>
  );
}

export default Header;
