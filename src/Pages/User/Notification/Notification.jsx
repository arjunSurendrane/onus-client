import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Notifications from "../../../Component/User/Notification/notifications";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";

export default function Notification() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (!cookies.userJwt) {
      history("/");
    }
  });
  return (
    <div>
      <Navbar heading={"Notification"} active={"h"} />
      <div className="md:mx-[18%] absolute items-center overflow-y-scroll max-h-[87vh]">
        <Notifications />
      </div>
    </div>
  );
}
