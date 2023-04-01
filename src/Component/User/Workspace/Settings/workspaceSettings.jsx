import {
  TabPanel,
  TabsBody,
  TabsHeader,
  Tab,
  Tabs,
} from "@material-tailwind/react";
import axios from "../../../../api/index";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { sendInvitationApi, userAuthorization } from "../../../../api/apis";
import { useParams } from "react-router-dom";
import addUser from "../../../../assets/addUser.png";
import { Box } from "@mui/system";
import { CircularProgress, Modal } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { fetchProductMembers } from "../../../../features/users/Project";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { sendRequest } from "../../../../api/sampleapi";
import useSWR from "swr";
import { TbAsteriskSimple } from "react-icons/tb";
import { userRole } from "../../../../features/users/userSlice";
import ServerDown from "../../../Error/serverDown";
import LoadingPage from "../../../Error/loading";

export default function WorkspaceSettings() {
  const [email, setEmail] = useState();
  const [role, setRole] = useState("Member");
  const [errors, setError] = useState();
  const [cookies, setCookie] = useCookies();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { id } = useParams();
  console.log(useSelector(userRole));
  const {
    isLoading,
    error,
    data: tasksData,
    mutate,
  } = useSWR(
    {
      link: "workspaceMembers",
      id,
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );

  console.log(tasksData);
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
    const members = tasksData.data.data.users;

    const data = [
      {
        label: "Invite",
        value: "html",
        desc: (
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
                  Get your project up and running faster by directly inviting
                  your
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
        ),
      },
      {
        label: "Members",
        value: "react",
        desc: (
          <>
            <div className=" mt-10">
              {members.length ? (
                <table className="table-fixed w-full border-separate border-spacing-1 border border-slate-100  border-t-[#7b68ee] border-t-4  rounded shadow-lg">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Delete</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((data, i) => (
                      <tr className="text-center items-center " key={i}>
                        <td>{i + 1}</td>
                        <td className="capitalize">{data.memberId.name}</td>
                        <td>{data.memberId.email}</td>
                        <td>{data.role || "Member"}</td>
                        <td className="mx-auto cursor-pointer ">
                          <MdOutlineDeleteOutline
                            size={20}
                            className="mx-auto"
                            color="#8665eb"
                            onClick={() => deleteMember(data._id)}
                          />
                        </td>
                        <td className="mx-auto cursor-pointer ">
                          <CiEdit
                            size={20}
                            className="mx-auto"
                            color="#8665eb"
                            onClick={() => setVisible(true)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="w-full shadow-lg text-center border-t-[#7b68ee] border-t-4 py-10">
                  <p className="text-xl font-bold text-gray-400">
                    There are no members in this workspace..
                  </p>
                </div>
              )}
            </div>
          </>
        ),
      },
    ];

    // function for clean the error
    const clearError = () => {
      setTimeout(() => {
        setError("");
      }, 2000);
    };

    const deleteMember = async (memberId) => {
      const res = await sendRequest({
        id,
        subtaskId: memberId,
        link: "deleteMember",
        cookies: cookies.userJwt,
        operation: "delete",
      });
      userAuthorization(cookies.userJwt);
      mutate(tasksData);
      console.log(res);
    };

    // function for send invitation for members into the workspace
    const handleSendInvitation = async () => {
      if (!email) {
        setError("Please enter email");
        clearError();
        return;
      }
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
      <div className="w-[79vw] ">
        <Toaster />
        <Tabs id="custom-animation" value="html">
          <TabsHeader className="bg-[#5935c614] ">
            {data.map(({ label, value }, key) => (
              <Tab
                key={value}
                value={value}
                className={`font-bold  ${
                  current == key ? " " : "text-gray-600"
                } rounded-2xl  ease-in-out`}
                onClick={() => setCurrent(key)}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    );
  }
}
