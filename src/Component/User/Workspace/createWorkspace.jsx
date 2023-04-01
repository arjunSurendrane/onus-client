import { Step, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../../api/index";
import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDepartment, userAuthorization } from "../../../api/apis";
import {
  createWorkspace,
  registerWorkspace,
  workspaceDate,
  fetchWorkspaceStatus,
  updateDepartment,
  updateProject,
} from "../../../features/users/WorkspaceSlice";
import Modal from "../Modal/Modal";

const steps = ["Create Workspace", "Create Department", "Create Project"];
export default function CreateWorkspaces({
  activeStep,
  placeholder,
  button,
  nextLink,
}) {
  const featchDataStatus = useSelector(fetchWorkspaceStatus);
  const [cookie, setCookie] = useCookies();
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const workspace = useSelector(workspaceDate);
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep == 2) {
      dispatch(updateProject(data));
      console.log({ workspace });
      const res = await axios.post(
        "/workspace",
        { ...workspace, projectName: data },
        {
          headers: { authorization: `Bearer ${cookie.userJwt}` },
        }
      );
      if (res.data.status == "success") {
        //localStorage.setItem("Workspace", JSON.stringify({ ...res.data.data }));
        await userAuthorization(cookie.userJwt);
        const id = res.data?.data?._id;
        history(`/${id}/home`);
      } else {
        setError("something went wrong!!!");
      }
    } else if (activeStep == 1) {
      dispatch(updateDepartment(data));
      history(nextLink);
    } else {
      dispatch(createWorkspace(data));
      history(nextLink);
    }
  };
  console.log(workspace);
  const handleChange = (e) => {
    setData(e.target.value);
  };
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="my-10">
              <div>
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
            </div>

            <div className="relative p-6 flex-auto mb-5">
              <form action="" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    {placeholder}
                  </label>
                  <input
                    id="email-address"
                    name="text"
                    type="text"
                    onChange={handleChange}
                    required
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder={placeholder}
                  />
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#7b68ee] py-2 px-4 text-sm font-medium text-white hover:bg-[#372e6e]  focus:outline-none focus:ring-2 focus:ring-[#7b68ee] focus:ring-offset-2"
                  >
                    {button}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
