import axios from "../../../api/index";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/users/userSlice";
import { useCookies } from "react-cookie";

export default function Modal({
  setShowModal,
  heading,
  placeholder,
  button,
  url,
  api,
}) {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState();
  const [cookies, setCookie] = useCookies();
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const [data, setData] = useState("");

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;
    if (heading == "email id") {
      try {
        res = await axios.post(api, { email: data });
        console.log(res);
        dispatch(registerUser({ email: data }));
        console.log(user);
        history("/forgotPassword");
      } catch (error) {
        if (error.response.data.status == "fail") {
          setErrorMsg("user doesnt exist");
        } else {
          setErrorMsg("something went wrong");
        }
      }
    } else {
      try {
        res = await axios.post(api, { email: user.user.email, otp: data });
        console.log(res);
        localStorage.setItem("User", JSON.stringify({ ...res?.data?.data }));
        localStorage.setItem(
          "Workspaces",
          JSON.stringify({ memberOf: res?.data?.data?.memberOf })
        );
        let CurrentWSpace = res?.data?.data?.memberOf[0]?.workspace;
        localStorage.setItem("CurrentWSpace", CurrentWSpace);
        setCookie("userJwt", res.data.token, { path: "/" });
        history(`/${CurrentWSpace}/home`);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.status == "fail") {
          setErrorMsg("invalid Otp");
        } else {
          setErrorMsg("something went wrong");
        }
      }
    }
    console.log("handlesubmit");
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  // handleChange function
  const handleChange = (e) => {
    setData(e.target.value);
  };
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-lg font-semibold text-gray-600">
                Enter your {heading}
              </h3>
              {heading == "email id" ? (
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal()}
                >
                  x
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="relative p-6 flex-auto mb-5">
              <form action="" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    {placeholder}
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type={heading == "email id" ? "email" : "number"}
                    value={data}
                    required
                    autoComplete="email"
                    onChange={handleChange}
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder={placeholder}
                  />
                  <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#75337D] py-2 px-4 text-sm font-medium text-white hover:bg-[#56245b] focus:outline-none focus:ring-2 focus:ring-[#56245b] focus:ring-offset-2"
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
