import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/views/MainPage/MainPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "../src/hoc/auth";
import UploadPage from "./components/views/UploadPage/UploadPage";
import Header from "./components/views/header/Header";
import DetailPage from "./components/views/VideoDetailPage/DetailPage";
import GlobalStyle from "./GlobalStyle.js";

function App() {
  const AuthMainPage = Auth(MainPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false); //이거 사용하면 auth,js에서 navgate사용시 router밖이라고 에러발생
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          element={Auth(MainPage, null)}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/LoginPage`}
          element={Auth(LoginPage, false)}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/RegisterPage`}
          element={Auth(RegisterPage, false)}
        />

        <Route
          path={`${process.env.PUBLIC_URL}/UploadPage`}
          element={Auth(UploadPage, true)}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/DetailPage/:videoId`}
          element={Auth(DetailPage, null)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
