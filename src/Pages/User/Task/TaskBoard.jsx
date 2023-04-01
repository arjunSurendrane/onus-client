import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MenuButton from "../../../Component/User/TaskList/menuButton";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";
import Board from "../../../Component/User/TaskList/boardView";

export default function TaskBoard() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (!cookies.userJwt) {
      history("/");
    }
  });
  return (
    <div>
      <Navbar
        heading={"List"}
        secHeading={"board"}
        thirdHeading={"calender"}
        active={"s"}
      />
      <div className="md:mx-[18%] absolute items-center">
        <Board />
      </div>
      <div className="">
        <MenuButton />
      </div>
    </div>
  );
}
