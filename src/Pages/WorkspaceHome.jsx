import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Footer from "../Component/User/Footer/Footer";
import MiniDrawer from "../Component/MuiSidebar";
import Navbar from "../Component/User/Navbar/Navbar";
import Sidebar from "../Component/User/Sidebar/Sidebar";

export default function WorkSpace() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (!cookies.userJwt) {
      history("/");
    }
  });
  return (
    <div>
      <Sidebar />
      <Navbar heading={"Workspace"} active={"h"} />
      {/* <Footer /> */}
    </div>
  );
}
