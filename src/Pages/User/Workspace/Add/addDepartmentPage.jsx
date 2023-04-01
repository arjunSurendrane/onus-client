import React from "react";
import AddDepartment from "../../../../Component/User/Workspace/Add/addDepartment";
import Home from "../../Home/Home";

export default function AddDepartmentPage() {
  return (
    <div>
      <AddDepartment
        activeStep={0}
        button={"create"}
        nextLink={"/addProject"}
        placeholder={"Enter Department Name"}
      />
    </div>
  );
}
