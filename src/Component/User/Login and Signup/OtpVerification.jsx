import axios from "../../../api/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../style.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

export default function OtpVerification() {
  // create variables
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const [cookies, setCookie] = useCookies(["user"]);

  // handlechange function
  const handleChange = (e) => {
    console.log(e.target.value);
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    let fieldIntIndex = parseInt(fieldIndex, 10);
    console.log(fieldIntIndex);

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (fieldIntIndex < 5) {
        // Get the next input field using it's name
        const nextfield = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        );

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

  // clear error message
  const clearError = () => {
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  // submit otp
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      const otp = Object.values(data).join("");
      console.log(otp);
      const userDetail = user.user;
      const res = await axios.post("/user/otpVerification", {
        ...userDetail,
        otp,
      });
      if (res.data.status == "success") {
        setLoading(false);
        localStorage.setItem("User", JSON.stringify({ ...res.data.data }));
        setCookie("userJwt", res.data.token, { path: "/" });
        history("/createWorkspace ");
      }
    } catch (error) {
      if (error.response.data.error == "invalid otp") {
        setLoading(false);

        setErrorMsg("invalid otp");
      } else {
        setLoading(false);

        setErrorMsg("something gone wrong");
      }
      clearError();
    }
  };

  // resend otp
  const handleResend = async () => {
    try {
      const res = await axios.post("/user/emailVerifiction", {
        email: user.user.email,
      });
      toast("success fully sent to your email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setErrorMsg("something gone wrong");
    }
    clearError();
  };

  return (
    <div className="items-center mx-auto text-center py-52 lg:px-80 px-10">
      <h1 className=" md:text-4xl sm:text-3xl text-3xl font-bold md:py-6">
        Email Verification
      </h1>
      <p>Check your email for the otp</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around">
          <input
            id="email-address"
            name="field-1"
            type="number"
            className="relative text-center lg:w-[100px] w-[60px] lg:h-[100px] h-[60px] mt-5 block max-w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="_"
            required
            autoComplete="off"
            {...register("field-1")}
            tabIndex="5"
            maxLength={1}
            onChange={handleChange}
          />
          <input
            id="email-address"
            name="field-2"
            type="number"
            className="relative text-center lg:w-[100px] w-[60px] lg:h-[100px] h-[60px] mt-5 block max-w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="_"
            required
            autoComplete="off"
            {...register("field-2")}
            tabIndex="5"
            maxLength="1"
            onChange={handleChange}
          />
          <input
            id="email-address"
            name="field-3"
            type="number"
            required
            className="relative text-center lg:w-[100px] w-[60px] lg:h-[100px] h-[60px] mt-5 block max-w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="_"
            autoComplete="off"
            {...register("field-3")}
            tabIndex="5"
            maxLength="1"
            onChange={handleChange}
          />
          <input
            id="email-address"
            name="field-4"
            type="number"
            className="relative text-center lg:w-[100px] w-[60px] lg:h-[100px] h-[60px] mt-5 block max-w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="_"
            autoComplete="off"
            required
            {...register("field-4")}
            tabIndex="5"
            maxLength="1"
            onChange={handleChange}
          />
          <input
            id="email-address"
            name="field-5"
            type="number"
            className="relative text-center lg:w-[100px] w-[60px] lg:h-[100px] h-[60px] mt-5 block max-w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="_"
            required
            autoComplete="off"
            {...register("field-5")}
            tabIndex="5"
            maxLength="1"
            onChange={handleChange}
          />

          {/* <input
            name="otp5"
            type="text
            autoComplete="off"
            tabIndex="5"
            maxLength="1"
            d
          /> */}
        </div>
        <p className="text-red-500 font-medium text-sm capitalize">
          {errorMsg}
        </p>
        <p className="mt-10 cursor-pointer" onClick={handleResend}>
          Resend Otp
        </p>
        <button
          className="rounded bg-[#6b2f72] w-44 h-10 mt-10 text-white hover:bg-[#58255e] grid place-content-center"
          type="submit"
        >
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="inherit" size={20} />
            </Box>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
