import React from "react";
import AddDepartment from "../../../../Component/User/Workspace/Add/addDepartment";
import Home from "../../Home/Home";

export default function AddProjectPage() {
  return (
    <div>
      <AddDepartment
        activeStep={1}
        button={"create"}
        placeholder={"Enter Project Name"}
      />
    </div>
  );
}
