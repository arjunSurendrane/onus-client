import React from "react";
import Dashboard from "../../../Component/User/Dashboard/dashboard";
import Navbar from "../../../Component/User/Navbar/Navbar";

export default function DashboardPage() {
  return (
    <div>
      <Navbar heading={"Graph"} secHeading={"Table"} active={"h"} />
      <div className="md:mx-[18%] absolute">
        <Dashboard />
      </div>
    </div>
  );
}
