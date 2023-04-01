import React from "react";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";
import UpgradePage from "../../../Component/User/Subscribe/UpgradePage";

export default function Subscribe() {
  return (
    <div>
      <Navbar heading={"Subscribe"} active={"h"} />
      <div className="md:mx-[18%] absolute items-center">
        <UpgradePage />
      </div>
    </div>
  );
}
