import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { fetchProductId } from "../../../features/users/Project";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { sendRequest } from "../../../api/sampleapi";

export default function AddSubtask({ close, id }) {
  const [cookies, setCookies] = useCookies();
  const projectId = useSelector(fetchProductId);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Must enter task name"),
    description: yup.string().min(4).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const res = await sendRequest({
      link: "addSubTask",
      id,
      cookies: cookies.userJwt,
      data: { ...data, projectId },
      operation: "patch",
    });
    console.log({ task: res });
    if (res.data.status == "success") {
      close();
    } else {
      setErrorMsg("Something gone wrong");
    }
    setLoading(false);
  };
  return (
    <div>
      <Toaster />
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center  justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h1 className="font-bold text-lg">Create Subtask</h1>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => close()}
              >
                x
              </button>
            </div>
            <div className="relative p-6 flex-auto mb-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    id="email-address"
                    name="name"
                    type="text"
                    autoComplete="email"
                    className={`relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors?.name?.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                    placeholder="Task Name "
                    {...register("name")}
                  />

                  <label
                    htmlFor="name"
                    className={` text-sm mt-3 font-medium ${
                      errors.name?.message && "text-red-500"
                    }`}
                  >
                    {errors.name?.message
                      ? `${errors.name?.message}`
                      : "Task Name"}
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    className={`relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors?.description?.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                    placeholder="Add description"
                    {...register("description")}
                  />
                  <label
                    htmlFor="description"
                    className={` text-sm mt-3 font-medium ${
                      errors.description?.message && "text-red-500"
                    }`}
                  >
                    {errors.description?.message
                      ? `${errors.description?.message}`
                      : "description"}
                  </label>
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
