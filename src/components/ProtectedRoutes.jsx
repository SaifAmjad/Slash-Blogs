import React, { useEffect, useState } from "react";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("authToken"));

  const naviate=useNavigate();

  useEffect(() => {
    if (!token) {
      naviate('/signin')
    }
  }, [token]);

  return <>{token && children}</>;
};

export default ProtectedRoutes;
