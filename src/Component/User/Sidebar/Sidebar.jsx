import React, { useContext, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { AiFillCaretDown, AiOutlineNotification } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";
import { CgMoveTask } from "react-icons/cg";
import { GiUpgrade } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import AddDepartment from "../Workspace/Add/addDepartment";
import { FcVideoProjector } from "react-icons/fc";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import { SocketContext } from "../../../App";
import { Popover } from "@mui/material";
import { MdLeaderboard } from "react-icons/md";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";

export default function TrialSidebar() {
  const [cookies, setCookies, removeCookies] = useCookies();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [showTask, setShowTask] = useState("-1");
  const [addDepartment, setAddDepartment] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [departmentID, setDepartmentID] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") == "Admin");
  const { id } = useParams();
  const [workspaceId, setWorkspaceId] = useState(id);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(false);

  const history = useNavigate();
  const socket = useContext(SocketContext);

  socket.on("notifications", (data) => {
    setNotificationCount(true);
  });

  const plan = (val) => {
    localStorage.setItem("plan", val);
  };

  /**
   * SWR code for get grouped collecton data
   */
  const {
    isLoading,
    error,
    data: workspaceData,
    mutate,
  } = useSWR(
    {
      link: "getWorkspace",
      id: workspaceId,
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );
  const {
    isLoading: userWorkspaceLoading,
    error: userWorkspaceError,
    data: userWorkspaceList,
    mutate: userWorkspaceMutate,
  } = useSWR(
    {
      link: "findUserWorkspaces",
      id: user._id,
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );

  const {
    isLoading: userDataLoading,
    error: userDataError,
    data: userData,
    mutate: userDataMutate,
  } = useSWR(
    {
      link: "getUser",
      id: user._id,
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );

  if (isLoading || userDataLoading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  } else if (error || userDataError) {
    if (error.status == 401) {
      removeCookies(userJwt);
      history("/");
    }
    return (
      <>
        <ServerDown />
      </>
    );
  } else {
    const workspace = workspaceData?.data?.data?.workspace;
    const role = workspaceData?.data?.data?.role;
    localStorage.setItem("role", role);
    const user = userData?.data?.data?.user;
    const curWorkspace = user?.memberOf?.filter(
      (data) => data?.workspace == workspace?._id
    );
    console.log({ curWorkspace, role });
    if (workspace) plan(workspace.plan || "free");
    socket.emit("joinWorkspace", {
      workspaceId: workspace._id,
      userId: user._id,
      username: user.name,
    });

    const handleClick = async (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleChange = (projectId) => {
      const data = JSON.parse(localStorage.getItem("Workspace"));
      history(`/${workspaceId}/department/list/${projectId}`);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChangeWorkspace = (data, role) => {
      setWorkspaceId(data._id);
      if (role == "Admin") setRole(true);
      mutate(workspaceData);
      localStorage.removeItem("Notification");
      localStorage.setItem("CurrentWSpace", data._id);
      history("/redirect");
      handleClose();
    };

    const modalWorkspaceList = () => {
      if (userWorkspaceLoading) {
        return (
          <>
            <LoadingPage />
          </>
        );
      } else if (userWorkspaceError) {
        return (
          <>
            <ServerDown />
          </>
        );
      } else {
        const workspaces = userWorkspaceList.data.data.workspaces;

        return (
          <div className=" p-3 ">
            {workspaces.map((data, key) => (
              <div
                className="flex  border-y-gray-100 border-b-2 border-t-2 overflow-hidden p-2"
                key={key}
                onClick={() => handleChangeWorkspace(data.workspace, data.role)}
              >
                <div className="w-[40px] h-[40px] bg-[#7b68ee] rounded-full border grid place-content-center">
                  <p className="font-bold text-white uppercase">
                    {data?.workspace?.Name?.split("")[0]}
                  </p>
                </div>
                <div className="ml-3 grid place-content-center overflow-hidden">
                  <p>{data?.workspace?.Name}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }
    };
    const open = Boolean(anchorEl);

    return (
      <>
        <div className="md:visible invisible">
          <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto absolute z-[-1] border-r-2 py-36 px-3  w-[17%]  h-[900px] max-h-full">
              <ul className="space-y-2 px-2">
                <li onClick={() => history(`/${workspaceId}/home`)}>
                  <a
                    href="#"
                    className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  >
                    <HiOutlineHome size={20} />

                    <span className="ml-3 font-medium text-sm">Home</span>
                  </a>
                </li>
                <li
                  onClick={() => {
                    setNotificationCount(false);
                    history(`/${workspaceId}/notification`);
                  }}
                >
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  >
                    <AiOutlineNotification size={20} />

                    <span className="flex text-sm ml-3 whitespace-nowrap font-medium">
                      Notification {notificationCount}
                    </span>
                    {notificationCount && (
                      <span class="inline-block w-2 h-2 mx-5 bg-red-600 rounded-full"></span>
                    )}
                  </a>
                </li>
                <li onClick={() => history(`/${workspaceId}/chat`)}>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  >
                    <BiChat size={20} />
                    <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                      Discussion
                    </span>
                  </a>
                </li>
                <li onClick={() => history(`/${workspaceId}/dashboard`)}>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  >
                    <MdLeaderboard size={20} />
                    <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                      Workload
                    </span>
                  </a>
                </li>
                <hr />

                {role && (
                  <li className="bg-gray-200 rounded-lg overflow-hidden mt-2">
                    <a
                      href="#"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                      onClick={() => setAddDepartment(true)}
                    >
                      <GrFormAdd size={20} />
                      <span className="flex-1  px-2 whitespace-nowrap font-medium lg:text-xs text-[9px] text-gray-500 uppercase">
                        Add Department
                      </span>
                    </a>
                  </li>
                )}

                {workspace?.department.map((data, i) => (
                  <li className=" rounded-lg overflow-hidden" key={i}>
                    <a
                      href="#"
                      className="flex items-center text-base font-normal text-gray-900 rounded-lg mt-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      onClick={() => {
                        setShowTask((showTask) =>
                          showTask == `${i}` ? "-1" : `${i}`
                        );
                      }}
                    >
                      <FcVideoProjector />
                      <span className="flex-1 text-sm ml-3 whitespace-nowrap font-bold capitalize text-gray-700 overflow-hidden">
                        {data?.departmentName}
                      </span>
                    </a>
                    {showTask == `${i}` ? (
                      <ul className="px-5 mt-3">
                        {role && (
                          <li>
                            <a
                              href="#"
                              className="flex items-center  p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                              onClick={() => {
                                setAddProject(true);
                                setDepartmentID(data._id);
                              }}
                            >
                              <GrFormAdd size={20} />
                              <span className="flex-1  px-2 whitespace-nowrap font-medium lg:text-xs text-[9px] text-gray-500 uppercase">
                                Add Project
                              </span>
                            </a>
                          </li>
                        )}

                        {data.project.map((data, j) => (
                          <>
                            <li key={j}>
                              <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                                onClick={() => {
                                  handleChange(data.projectId._id);
                                }}
                              >
                                <CgMoveTask size={20} />
                                <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium overflow-hidden">
                                  {data?.projectId?.projectName}
                                </span>
                              </a>
                            </li>
                          </>
                        ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
                <hr />
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                    onClick={() => {
                      history(`/${workspaceId}/leaderboard`);
                    }}
                  >
                    <MdLeaderboard size={20} />
                    <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                      Members
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                    onClick={() => {
                      history(`/${workspaceId}/profile/${user._id}`);
                    }}
                  >
                    <ImProfile size={20} />
                    <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                      Profile
                    </span>
                  </a>
                </li>
                {workspace.Lead._id == user._id ? (
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                      onClick={() => history(`/${workspaceId}/subscribe`)}
                    >
                      <GiUpgrade size={20} />
                      <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                        Upgrade
                      </span>
                    </a>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  >
                    <FiLogOut size={20} />
                    <span
                      className="flex-1 ml-3 text-sm whitespace-nowrap font-medium"
                      onClick={() => {
                        localStorage.clear();
                        history("/");
                      }}
                    >
                      Logout
                    </span>
                  </a>
                </li>
              </ul>
              <div className="relative ">
                <div className="fixed bottom-2 flex justify-between bg-white">
                  <div
                    className="w-[40px] h-[40px] bg-[#7b68ee] rounded-full border grid place-content-center"
                    onClick={handleClick}
                    aria-describedby={id}
                  >
                    <p className="font-bold text-white">
                      {workspace.Name.split("")[0]}
                    </p>
                  </div>
                  <div className="grid place-content-center">
                    <AiFillCaretDown size={10} color={"gray"} />
                  </div>
                  {workspace.Lead._id == user._id ? (
                    <>
                      <div className="grid place-content-center ml-1 cursor-pointer">
                        <div
                          className="w-16 h-7 bg-gray-200 text-center grid place-content-center"
                          onClick={() =>
                            history(`/${workspaceId}/invite/member`)
                          }
                        >
                          <p className="font-medium text-sm text-gray-500 rounded-xl">
                            Invite
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
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
                <div className="h-44 min-w-full p-5">
                  {modalWorkspaceList()}
                </div>
              </Popover>
            </div>
          </aside>
        </div>
        {addDepartment && (
          <AddDepartment
            button={"Create"}
            nextLink={"department"}
            activeStep={"Create Department"}
            placeholder={"Enter Department Name"}
            close={() => {
              mutate(workspaceData);
              setAddDepartment(false);
            }}
          />
        )}
        {addProject && (
          <AddDepartment
            button={"Create"}
            nextLink={"project"}
            activeStep={"Create Project"}
            placeholder={"Enter Project Name"}
            departmentID={departmentID}
            close={() => {
              mutate(workspaceData);
              setAddProject(false);
            }}
          />
        )}
      </>
    );
  }
}
