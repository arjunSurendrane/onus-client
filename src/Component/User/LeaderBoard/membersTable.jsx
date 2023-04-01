import React, { useState } from "react";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Popover } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";

export default function MembersTable() {
  const [data, setData] = useState();
  const { id } = useParams();
  const [cookies, setCookies] = useCookies();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") == "Admin"
  );
  console.log({ userRole });

  /**
   * Fetch data from server
   */
  const {
    isLoading,
    error,
    data: members,
    mutate,
  } = useSWR(
    {
      link: "findMembers",
      id,
      operation: "get",
      cookies: cookies.userJwt,
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
        <ServerDown />
      </>
    );
  } else {
    console.log(members);
    const workspaceMembers = members?.data?.data?.members;
    console.log({ workspaceMembers });

    const handleClick = async (event, userId) => {
      setAnchorEl(event.currentTarget);
      setUserId(userId);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const updateRole = async (role) => {
      console.log(role, userId);
      const res = await sendRequest({
        link: "updateRole",
        id: userId,
        workspaceId: id,
        operation: "patch",
        cookies: cookies.userJwt,
        data: { role },
      });
      if (res.data.status == "success") {
        handleClose();
        mutate(members);
      } else {
        toast.error("something gone wrong");
      }
    };

    const handleDelete = (memberId) => {
      toast((t) => (
        <span>
          Are You Sure to delete
          <div className="flex justify-between mt-5">
            <div>
              <button
                className="border-2 px-5 py-2 bg-gray-400 font-medium text-sm"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="border-2 bg-red-500 text-white px-5 py-2 font-medium text-sm"
                onClick={() => {
                  toast.dismiss(t.id);
                  deleteConfirmation(memberId);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </span>
      ));
    };

    const deleteConfirmation = async (memberId) => {
      const res = await sendRequest({
        id,
        subtaskId: memberId,
        link: "deleteMember",
        cookies: cookies.userJwt,
        operation: "delete",
      });
      toast.success("delete user");
      mutate(members);
    };

    const open = Boolean(anchorEl);

    return (
      <div>
        <Toaster />

        <div className="md:mx-14  mt-5 md:w-[72vw] w-[87vw]  flex justify-between  rounded">
          <table class="table-fixed w-full border-separate border-spacing-1 border border-slate-500 bg-[#7c68ee14] rounded">
            <thead>
              <tr className="text-center">
                <th className="border border-slate-600 py-2 bg-[#7c68ee53]">
                  No
                </th>
                <th className="border border-slate-600 bg-[#7c68ee53]">Name</th>
                <th className="border border-slate-600 bg-[#7c68ee53]">
                  Email
                </th>
                <th className="border border-slate-600 bg-[#7c68ee53]">Role</th>
                <th className="border border-slate-600 bg-[#7c68ee53]">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {workspaceMembers.map((data, i) => (
                <tr
                  key={i}
                  className="text-center cursor-pointer"
                  onClick={() => {
                    setData(data);
                  }}
                >
                  <td className="border border-slate-700">{i + 1}</td>
                  <td className="border border-slate-700">{data?.name}</td>

                  <td className="border border-slate-700">{data?.email}</td>
                  <td
                    className={`border border-slate-700`}
                    aria-describedby={id}
                    onClick={(e) => handleClick(e, data._id)}
                  >
                    {data.memberOf.map((data) => {
                      if (data.workspace == id) return data.role || "Admin";
                    })}
                  </td>

                  {userRole ? (
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div className="min-w-full cursor-pointer bg-gray-100">
                        <div
                          className="border-2 p-2 font-medium hover:bg-gray-200"
                          onClick={() => updateRole("Admin")}
                        >
                          Admin
                        </div>
                        <div
                          className="border-2 p-2 font-medium hover:bg-gray-200"
                          onClick={() => updateRole("Member")}
                        >
                          Member
                        </div>
                      </div>
                    </Popover>
                  ) : (
                    ""
                  )}
                  {userRole ? (
                    <td
                      className="border border-slate-700"
                      onClick={() => handleDelete(data._id)}
                    >
                      delete
                    </td>
                  ) : (
                    <td className="border border-slate-700">-</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {workspaceMembers.length > 0 && (
          <div className="text-center mt-10">
            <div class="inline-flex mt-2 xs:mt-0">
              <button class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
              </button>
              <button class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
