import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import WelcomeImage from "../../../assets/undraw_welcome_cats_thqn.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../../../api/index";
import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { CircularProgress, modalClasses } from "@mui/material";
import Modal from "../Modal/Modal";
import { Box } from "@mui/system";
import { createUser } from "../../../features/users/userSlice";

export default function Login() {
  //  declare
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

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
      const res = await axios.post("/user/login", data);
      console.log(res.data.data.user);
      localStorage.setItem(
        "User",
        JSON.stringify({ ...res?.data?.data?.user })
      );
      localStorage.setItem(
        "Workspaces",
        JSON.stringify({ memberOf: res?.data?.data?.user?.memberOf })
      );
      let CurrentWSpace = res.data.data.user.memberOf[0].workspace;
      localStorage.setItem("CurrentWSpace", CurrentWSpace);
      setCookie("userJwt", res.data.token, { path: "/" });
      history(`/${CurrentWSpace}/home`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.status == "fail") {
        setError(error?.response?.data?.error);
        setLoading(false);
      } else {
        setError("Something gone wrong");
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
              Login to your account
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
                <div className="text-center">
                  <p className="text-red-500 font-medium text-sm">
                    {errors.password?.message}
                  </p>
                  <p className="text-red-500 font-medium text-sm capitalize">
                    {error}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center text-center">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setModalOpen(true)}
                >
                  OTP Login?
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div className="text-sm">
                <a
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={() => history("/signup")}
                >
                  Create new account.
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
      {modalOpen && (
        <Modal
          setShowModal={() => setModalOpen(false)}
          heading={"email id"}
          placeholder={"Email id"}
          button={"Send Otp"}
          url={"/forgotPassword"}
          api={"/user/otpLogin"}
        />
      )}
    </>
  );
}
