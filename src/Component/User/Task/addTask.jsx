import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addTask } from "../../../api/apis";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

export default function AddTask() {
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id, projectId } = useParams();
  const schema = yup.object().shape({
    taskName: yup.string().required("Must enter task name"),
    createdAt: yup.date().default(() => new Date()),
    dueDate: yup
      .date()
      .typeError("Enter the date")
      .min(yup.ref("createdAt"), "Due date can't be before created")
      .required("Must enter due date"),
    Description: yup.string().min(4).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await addTask({
      cookie: cookies.userJwt,
      data: { ...data, projectId, workspaceId: id },
    });
    console.log({ task: res });
    if (res.data.status == "success") {
      setLoading(false);
      navigate(`/${id}/department/list/${projectId}`);
    }
  };
  return (
    <div>
      <Toaster />
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center  justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h1 className="font-bold text-lg">Create Task</h1>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => navigate(`/${id}/department/list/${projectId}`)}
              >
                x
              </button>
            </div>
            <div className="relative p-6 flex-auto mb-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    id="email-address"
                    name="taskName"
                    type="text"
                    autoComplete="email"
                    className={`relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors?.taskName?.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                    placeholder="Task Name "
                    {...register("taskName")}
                  />

                  <label
                    htmlFor="taskName"
                    className={` text-sm mt-3 font-medium ${
                      errors.taskName?.message && "text-red-500"
                    }`}
                  >
                    {errors.taskName?.message
                      ? `${errors.taskName?.message}`
                      : "Task Name"}
                  </label>

                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className={`relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors?.dueDate?.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                    placeholder="Due Date "
                    {...register("dueDate")}
                  />

                  <label
                    htmlFor="dueDate"
                    className={` text-sm mt-3 font-medium ${
                      errors.dueDate?.message && "text-red-500"
                    }`}
                  >
                    {errors.dueDate?.message
                      ? `${errors.dueDate?.message}`
                      : "Due Date"}
                  </label>

                  <textarea
                    id="Description"
                    name="Description"
                    type="text"
                    className={`relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors?.Description?.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                    placeholder="Add Description"
                    {...register("Description")}
                  />
                  <label
                    htmlFor="Description"
                    className={` text-sm mt-3 font-medium ${
                      errors.Description?.message && "text-red-500"
                    }`}
                  >
                    {errors.Description?.message
                      ? `${errors.Description?.message}`
                      : "Description"}
                  </label>

                  <input
                    name="file"
                    type="file"
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("file", { required: true })}
                  />
                  <label htmlFor="" className=" text-sm mt-3 font-medium">
                    Attachment
                  </label>
                  <p className="text-red-500 text-sm font-medium"></p>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#7b68ee] py-2 px-4 text-sm font-medium text-white hover:bg-[#3b3171] focus:outline-none focus:ring-2 focus:ring-[#231e43] focus:ring-offset-2"
                  >
                    {loading ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress color="inherit" size={20} />
                      </Box>
                    ) : (
                      "Create Task"
                    )}
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
