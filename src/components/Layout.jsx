import React, { useEffect, useState } from "react";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
import { Outlet, useNavigate } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen">{<Outlet />}</main>
      <Footer />
    </>
  );
};

export default Layout;
