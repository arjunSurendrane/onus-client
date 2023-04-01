import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";
import Navbar from "../../../Component/User/Navbar/Navbar";
import ProfileView from "../../../Component/User/Users/Profile";

export default function Profile() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (!cookies.userJwt) {
      history("/");
    }
  });
  return (
    <div>
      <Navbar heading={"Profile"} active={"h"} />
      <div className="md:mx-[18%] absolute items-center">
        <ProfileView user={{ name: "Arjun" }} />
      </div>
    </div>
  );
}
