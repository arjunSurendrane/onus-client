import React, { useState } from "react";
import addUser from "../../../assets/addUser.png";
import toast, { Toaster } from "react-hot-toast";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { sendInvitationApi } from "../../../api/apis";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export default function InvitationForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");
  const [cookies, setCookies] = useCookies();
  const { id } = useParams();
  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 2000);
  };
  const handleSendInvitation = async () => {
    if (!email) {
      setError("Please enter email");
      clearError();
      return;
    }
    console.log("hereeeeeee");
    setLoading(true);
    const res = await sendInvitationApi(email, role, cookies.userJwt, id);
    console.log(res);
    if (res?.data?.status == "success") {
      toast.success("Successfully send invitation");
      setEmail("");
    } else if (res?.response?.status == 410) {
      setError("He is not logged into this application.");
      clearError();
    } else {
      console.log(res);
      setError("Something gone wrong");
      clearError();
    }
    setLoading(false);
  };
  return (
    <div className="md:w-[70vw] w-[87vw] ">
      <Toaster />
      <>
        <div className="grid place-content-center mt-14">
          <div className="w-16 h-16">
            <img src={addUser} alt="" />
          </div>
        </div>
        <div className="text-center">
          <div>
            <h1 className="font-bold text-xl">Invite your team members</h1>
            <p className="font-medium text-gray-500">
              Get your project up and running faster by directly inviting your
            </p>
            <p className="font-medium text-gray-500">
              team members to your project.
            </p>
          </div>
        </div>
        <div className="place-content-center mt-10">
          <div className="mt-10 ">
            <div className="ml-5 grid place-content-center">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                className="relative  block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter mail address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-sm font-medium text-red-500">{errors}</p>
            </div>
          </div>
          <div className=" flex place-content-center mt-10">
            <div className="grid place-content-center">
              <p className="font-bold text-gray-600 text-sm">Select Role</p>
            </div>
            <div className="ml-5 grid place-content-center">
              <select
                name="role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
                className="focus:outline-none"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className=" flex place-content-center mt-10 ">
            <div className="font-medium bg-indigo-500 hover:bg-indigo-400 cursor-pointer border px-5 py-3 rounded-md">
              <button
                className="text-gray-100 text-sm flex justify-center"
                onClick={() => handleSendInvitation()}
              >
                {loading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress color="inherit" size={20} />
                  </Box>
                ) : (
                  "Send Invite"
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
