import { Alert, FormControlLabel, Snackbar, Switch } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import ErrorPage from "../../../Pages/User/PageNotFound/errorPage";
import LoadingPage from "../../Error/loading";

export default function UserManagementComponent() {
  const [block, setBlock] = useState({});
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const [cookies, setCookies] = useCookies();

  const handleClose = () => {
    setModal(false);
  };
  const {
    isLoading,
    error,
    data: userData,
    mutate,
  } = useSWR(
    {
      link: "getAllUsersForAdmin",
      cookies: cookies.adminJwt,
      operation: "get",
    },
    sendRequest
  );

  if (isLoading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  } else if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  } else {
    const usersList = userData.data.users;
    console.log(usersList);

    // blockUser function
    const blockUser = async (email, value) => {
      const res = await sendRequest({
        data: { email, value },
        link: "blockUser",
        operation: "patch",
        cookies: cookies.adminJwt,
      });
      // setBlock((block) => !block);
      if (res.status == 205) {
        toast.success(`Success fully ${value ? "block" : "unblock"} the user`);
        mutate(userData);
      }
      console.log({ block, res });
    };

    const handleChange = (email, value) => {
      value ? setModal(true) : setModal(false);
      blockUser(email, value);
    };

    return (
      <div>
        <Toaster />

        <div className="md:mx-14  mt-16 md:w-[72vw] w-[87vw]  flex justify-between  rounded">
          <table className="table-fixed w-full border-separate border-spacing-1 border border-slate-500 bg-gray-200 rounded">
            <thead>
              <tr className="text-center">
                <th className="border border-slate-600 py-2 bg-gray-500">No</th>
                <th className="border border-slate-600 bg-gray-500">Name</th>
                <th className="border border-slate-600 bg-gray-500">Email</th>
                <th className="border border-slate-600 bg-gray-500">
                  Workspaces
                </th>
                <th className="border border-slate-600 bg-gray-500">Plan</th>
                <th className="border border-slate-600 bg-gray-500">Block</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((data, i) => (
                <tr
                  key={i}
                  className="text-center cursor-pointer"
                  onClick={() => {
                    setModal(true);
                    setData(data);
                  }}
                >
                  <td className="border border-slate-700 font-medium text-sm">
                    {i + 1}
                  </td>
                  <td className="border border-slate-700 font-medium text-sm">
                    {data.name}
                  </td>
                  <td className="border border-slate-700 font-medium text-sm overflow-hidden">
                    {data.email}
                  </td>
                  <td className="border border-slate-700 font-medium text-sm">
                    {data.workspaces ? data.workspaces : "-"}
                  </td>
                  <td className="border border-slate-700 font-medium text-sm">
                    {data.Plan}
                  </td>
                  <td className="border border-slate-700 font-medium text-sm ">
                    <button
                      className={`${
                        data.block ? "bg-gray-400" : "bg-gray-400"
                      } w-16 rounded p-2  hover:bg-gray-300`}
                      onClick={() => {
                        handleChange(data.email, !data.block);
                      }}
                    >
                      {data.block ? "Unblock" : "block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
