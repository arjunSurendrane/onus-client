import React from "react";
import Modal from "../../../Component/User/Modal/Modal";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";
import CreateWorkspaces from "../../../Component/User/Workspace/createWorkspace";

export default function createProject() {
  return (
    <div>
      <Navbar />
      <CreateWorkspaces
        activeStep={2}
        placeholder={"Enter Your First Project Name"}
        button={"Submit"}
      />
    </div>
  );
}
