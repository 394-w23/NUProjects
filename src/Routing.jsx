import React from "react";
import NavbarApp from "./components/Navbar/Navbar";
import CardPageApp from "./components/CardPage/CardPage";
import Profile from "./components/Profile/Profile";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Routing = () => {
  return (
    <>
      <NavbarApp />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CardPageApp />} />
          <Route path="profile/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
