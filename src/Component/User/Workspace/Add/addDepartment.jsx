import { Step, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../../../api/index";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { userAuthorization } from "../../../../api/apis";

export default function AddDepartment({
  activeStep,
  placeholder,
  button,
  nextLink,
  close,
  departmentID,
}) {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookies] = useCookies();
  const { id } = useParams();
  const history = useNavigate();
  useEffect(() => {
    return () => {
      setError("");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nextLink == "department") {
      const res = await axios.patch(
        `/workspace/department/${id}`,
        { name: data },
        { headers: { authorization: `Bearer ${cookies.userJwt}` } }
      );
      if (res.data.status == "success") {
        console.log({ ...res.data.workspace });
        return close();
      }
      setError("Something gone wrong");
      setTimeout(() => {
        setError("");
      }, 4000);
    } else {
      const res = await axios.post(
        "/workspace/project",
        {
          workspaceId: id,
          projectName: data,
          departmentID,
        },
        {
          headers: { authorization: `Bearer ${cookies.userJwt}` },
        }
      );
      if (res.data.status == "success") {
        return close();
      }
      setError("Something gone wrong");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };
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
                  <Stepper activeStep={0} alternativeLabel>
                    <h1 className="mx-auto font-bold text-xl text-[#4f4299]">
                      {activeStep}
                    </h1>
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
