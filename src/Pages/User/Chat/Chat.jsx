import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ChatScreen from "../../../Component/User/Chat/Chat";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";

export default function Chat() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (!cookies.userJwt) {
      history("/");
    }
  });
  return (
    <div>
      <Navbar heading={"Chat"} active={"h"} />
      <div className="md:mx-[18%] absolute items-center">
        <ChatScreen />
      </div>
    </div>
  );
}
