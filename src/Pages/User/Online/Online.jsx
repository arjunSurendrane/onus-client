import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Chart from "../../../Component/User/Online/Chart";
import UserCard from "../../../Component/User/Online/userCard";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";
import { SocketContext } from "../../../App";

export default function Online() {
  const socket = useContext(SocketContext);
  const [cookies, setCookie] = useCookies();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { id } = useParams();
  const history = useNavigate();
  useEffect(() => {
    socket.emit("onlineUsers", { id });
    socket.on("onlineUsersList", (data) => {
      console.log(data.onlineMembers);
      setOnlineUsers(data.onlineMembers);
    });
    return () => {
      socket.off("onlineUsersList");
    };
  }, []);
  return (
    <div>
      <Navbar heading={"Online"} active={"h"} />
      <div className="md:mx-[18%] absolute items-center">
        {/* <Chart users={onlineUsers} /> */}
        <UserCard users={onlineUsers} />
      </div>
    </div>
  );
}
