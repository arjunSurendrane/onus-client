import React from "react";
import Navbar from "../../../../Component/User/Navbar/Navbar";
import WorkspaceSettings from "../../../../Component/User/Workspace/Settings/workspaceSettings";

export default function WorkspaceSettingsPage() {
  return (
    <div>
      <Navbar />
      <div className="md:mx-[18%] absolute items-center">
        <WorkspaceSettings />
      </div>
    </div>
  );
}
