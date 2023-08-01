import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";


const Layout = ({ loggedIn }) => {
  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Outlet />
      <footer></footer>
    </div>
  );
};

export default Layout;
