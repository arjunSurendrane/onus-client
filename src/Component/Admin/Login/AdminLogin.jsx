import React from "react";
import WelcomeImage from "../../../assets/undraw_visual_data_re_mxxo.svg";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../../../api/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { CircularProgress, modalClasses } from "@mui/material";
import { Box } from "@mui/system";

export default function AdminLogin() {
  //  declare
  const [error, setError] = useState("");
  const history = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // create schema for form validation
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // onSubmit function
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/admin/login", data);
      console.log(res.data.status);
      if (res.data.status === "success") {
        setCookie("adminJwt", res.data.token, { path: "/admin" });
        setLoading(false);
        history("/admin/dashboard");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error?.response?.data?.status == "fail") {
        setError(error?.response?.data?.error);
        setLoading(false);
      } else {
        setError("error");
        setLoading(false);
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="md:flex min-h-full items-center my-52 justify-around py-12  sm:px-24 lg:px-8 px-16">
        <div className="sm:w-full w-0  max-w-md space-y-8">
          <img src={WelcomeImage} alt="Welcome Image" className="" />
        </div>
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Admin
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="relative mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  {...register("email")}
                />
              </div>
              <p className="text-red-500 font-medium text-sm">
                {errors.email?.message}
              </p>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="relative mt-5 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  {...register("password")}
                />
                <div>
                  <p className="text-red-500 font-medium text-sm">
                    {errors.password?.message}
                  </p>
                  <p className="text-red-500 font-medium text-sm">{error}</p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#6C63FF] py-2 px-4 text-sm font-medium text-white hover:bg-[#6C63FF] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-[#6C63FF] group-hover:text-[#6C63FF]"
                    aria-hidden="true"
                  />
                </span>
                {loading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress color="inherit" size={20} />
                  </Box>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
