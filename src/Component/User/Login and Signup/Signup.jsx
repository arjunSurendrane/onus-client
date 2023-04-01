import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyApp from "../../../assets/undraw_my_app_re_gxtj.svg";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { registerUser } from "../../../features/users/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/index";

export default function Signup() {
  // declare
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const history = useNavigate();

  // create shema for form validation
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password dont match")
      .required(),
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
      // fetch data from server
      const res = await axios.post("/user/emailVerifiction", {
        email: data.email,
      });
      console.log(res);
      // success
      if (res.data.status == "success") {
        dispatch(registerUser(data));
        history("/otpVerification");
      }
    } catch (error) {
      //  fail
      if (error?.response?.data?.status == "fail") {
        if (error.response.data.error) {
          setError("this email already have an account");
        } else {
          setError("unwanted error");
        }
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div>
      <div className="md:flex min-h-full items-center my-32 justify-around py-12  sm:px-24 lg:px-8 px-16">
        <div className="sm:w-full w-0  max-w-md space-y-8">
          <img src={MyApp} alt="Welcome Image" className="" />
        </div>
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              SignUp
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  autoComplete="name"
                  className="relative mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                  {...register("name")}
                />
                <p className="text-red-500 text-sm font-medium">
                  {errors.name?.message}
                </p>
              </div>
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
                <p className="text-red-500 text-sm font-medium">
                  {errors.email?.message}
                </p>
              </div>

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
                <p className="text-red-500 text-sm font-medium">
                  {errors.password?.message}
                </p>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  type="password"
                  autoComplete="current-password"
                  className="relative mt-5 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <p className="text-red-500 text-sm font-medium">
                  {errors.confirmPassword?.message}
                </p>
                <div className="text-center">
                  <p className="text-red-500 text-sm font-medium capitalize">
                    {error}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center text-center">
              <div className="text-sm" onClick={() => history("/login")}>
                <a className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Already have an account?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#75337D] py-2 px-4 text-sm font-medium text-white hover:bg-[#56245b] focus:outline-none focus:ring-2 focus:ring-[#56245b] focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-[#491e4d] group-hover:text-[#883c91]"
                    aria-hidden="true"
                  />
                </span>
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
