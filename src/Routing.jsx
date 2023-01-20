import React from 'react';
import NavbarApp from "./components/Navbar/Navbar";
import CardPageApp from "./components/CardPage/CardPage";
import Profile from './components/Profile/Profile';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Routing = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CardPageApp />,
    },
    {
      path: "/profile/:p",
      element: <Profile />
    }
  ]);
  
  return (
    <>
      <NavbarApp />
      <RouterProvider router={router} />
    </>
  )
}

export default Routing