import React from "react";
import UserLeaderBoard from "../../../Component/User/LeaderBoard/userLeaderBoard";
import Navbar from "../../../Component/User/Navbar/Navbar";

export default function MembersTable() {
  return (
    <div>
      <Navbar heading={"Graph"} secHeading={"Table"} active={"s"} />
      <div className="md:mx-[18%] absolute">
        <UserLeaderBoard />
      </div>
    </div>
  );
}
