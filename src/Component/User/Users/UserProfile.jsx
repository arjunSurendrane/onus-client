import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import DoughnutChart from "../Chart/doughnutChart";
import Task from "../Task/Task";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";

const content = [
  {
    department: "marketing",
    task: "edit marketing video",
    notifications: [
      {
        profile: "url",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
      {
        profile: "url",
        department: "marketing",
        task: "edit marketing video",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
    ],
  },
  {
    department: "marketing",
    task: "edit marketing video",
    notifications: [
      {
        profile: "url",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
      {
        profile: "url",
        department: "marketing",
        task: "edit marketing video",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
    ],
  },
];

export default function UserProfile({ closeModal, userData }) {
  const [cookies, setCookies] = useCookies();
  const { id: workspaceId } = useParams();
  const id = userData._id;
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState("");

  const {
    isLoading,
    error,
    data: userWorkloadData,
  } = useSWR(
    {
      id,
      workspaceId,
      link: "fetchUserWorkload",
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );
  const {
    isLoading: activityLoading,
    error: activityError,
    data: activityData,
  } = useSWR(
    {
      id,
      link: "findUserActivity",
      operation: "get",
      cookies: cookies.useJwt,
    },
    sendRequest
  );

  const activityList = () => {
    if (activityLoading) {
      return (
        <>
          <LoadingPage />
        </>
      );
    } else if (activityError) {
      return (
        <>
          <ServerDown />
        </>
      );
    } else {
      const activity = activityData.data.data.activity;
      return (
        <>
          <div>
            <div>
              <p>Activity</p>
            </div>
            {activity.map((data, key) => (
              <div
                className=" my-5  w-full flex justify-between px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded cursor-pointer"
                onClick={() => {
                  setTaskId(data.taskid);
                  setShowModal(true);
                }}
              >
                <div className="w-full">
                  <div className="px-2 py-2">
                    <h6 className="text-[11px] font-medium text-gray-500">
                      {"Task"}
                      {">"}
                      {data.taskName}
                    </h6>
                    <h2 className="font-medium">Click Here to Open the task</h2>
                  </div>
                  <hr />
                  <div className="md:px-4 px-1 py-2 flex" key={key}>
                    <div className="ml-3">
                      <p className="md:text-sm text-[10px]">{data.taskName}</p>
                    </div>
                    <div className="ml-3 bg-gray-200 rounded-2xl px-2 py-0 h-5">
                      <p className="md:text-[11px] text-[8px] font-medium">
                        {data.action}
                      </p>
                    </div>
                    <div className="ml-3">
                      <p className="md:text-sm text-[10px]">{data.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  const taskList = () => {
    if (isLoading) {
      console.log("loading..");
    } else if (error) {
      console.log("error...");
    } else {
      const tasks = userWorkloadData.data.userbasedWorkload;
      console.log(tasks);
      const todo = tasks.filter((data) => data._id == "ToDo");
      const inProgress = tasks.filter((data) => data._id == "InProgress");
      const completed = tasks.filter((data) => data._id == "Completed");

      return (
        <>
          {" "}
          {/* TODO */}
          {todo.map((data, key) => (
            <>
              <div className="flex justify-between ">
                <div className="bg-gray-200 rounded-t-lg px-3 py-1">
                  <p className="text-xs font-medium text-gray-500 ">TODO</p>
                </div>
              </div>
              {data.data.map((data, key) => (
                <div className="flex justify-between border shadow-sm py-2">
                  <div className=" px-3 py-1 cursor-pointer">
                    <p className="text-sm">{data.taskName}</p>
                  </div>
                </div>
              ))}
            </>
          ))}
          {/* IN PROGRESS */}
          {inProgress.map((data, key) => (
            <>
              <div className="flex justify-between  mt-10">
                <div className="bg-[#a875ff] rounded-t-lg px-3 py-1">
                  <p className="text-xs font-medium text-white ">IN PROGRESS</p>
                </div>
              </div>
              {data.data.map((data, key) => (
                <div className="flex justify-between border shadow-sm py-2">
                  <div className=" px-3 py-1 cursor-pointer">
                    <p className="text-sm">{data.taskName}</p>
                  </div>
                </div>
              ))}
            </>
          ))}
          {/* COMPLETED  */}
          {completed.map((data, key) => (
            <>
              {" "}
              <div className="flex justify-between  mt-10">
                <div className="bg-[#6bc950] rounded-t-lg px-3 py-1">
                  <p className="text-xs font-medium text-white">COMPLETED</p>
                </div>
              </div>
              {data.data.map((data, i) => (
                <div className="flex justify-between border shadow-sm py-2">
                  <div className=" px-3 py-1 cursor-pointer">
                    <p className="text-sm">{data.taskName}</p>
                  </div>
                </div>
              ))}
            </>
          ))}
        </>
      );
      //close
    }
  };

  const perfomanceChart = () => {
    if (isLoading) {
      console.log("loading..");
    } else if (error) {
      console.log("error...");
    } else {
      const tasks = userWorkloadData.data.userbasedWorkload;
      const chartData = {
        labels: tasks.map((el) => el._id),
        datasets: [
          {
            label: "Workload",
            data: tasks.map((el) => el.data.length),
            backgroundColor: [
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(153, 102, 255, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      console.log("perfomance chart", chartData);
      return (
        <div className="grid place-content-center w-full">
          <div>
            <DoughnutChart chartData={chartData} />
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <Tabs value="html">
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
          <div className="flex w-[100vw] h-[100vh] overflow-hidden">
            <div className="w-[40%]  h-full bg-white bg-opacity-0"></div>
            <div className="w-[60%] h-full bg-white bg-opacity-0 flex">
              <div className="">
                <div
                  className="rounded-full bg-gray-200 px-2 py-2 m-5 shadow-xl cursor-pointer"
                  onClick={() => closeModal()}
                >
                  <AiOutlineClose size={20} />
                </div>
              </div>

              <div className="bg-white w-full min-h-[100vh] border border-t-4 border-t-[#7b68ee] rounded-t-md">
                <div className="w-full  shadow-lg">
                  <div className="w-full flex justify-arounnd py-8 px-8">
                    <div>
                      <Avatar sx={{ width: 64, height: 64 }}>
                        <p className="uppercase font-bold">
                          {userData?.user[0].name.split("")[0]}
                        </p>
                      </Avatar>
                    </div>
                    <div className=" w-full flex justify-between ml-5">
                      <div className="w-[50%]">
                        <div>
                          <h1 className="text-xl font-medium capitalize">
                            {userData?.user[0].name}
                          </h1>
                        </div>
                        <div className="w-full flex justify-between">
                          <div>
                            <input type="text" placeholder="add discription" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              {userData?.user[0].email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="bg-green-100 p-2 rounded">
                          {" "}
                          <p className="text-green-600 font-bold text-xs">
                            Online
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 pb-2 flex justify-between">
                    <TabsHeader>
                      <div>
                        <Tab
                          key={"activity"}
                          value={"activity"}
                          className="mx-5"
                        >
                          <p className="font-medium">Activity</p>
                        </Tab>
                      </div>
                      <div>
                        <Tab key={"myWork"} value={"myWork"} className="mx-5">
                          <p className="font-medium">Work</p>
                        </Tab>
                      </div>

                      <div>
                        <Tab
                          key={"perfomance"}
                          value={"perfomance"}
                          className="mx-5"
                        >
                          <p className="font-medium">Perfomance</p>
                        </Tab>
                      </div>
                    </TabsHeader>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <TabsBody>
                      <TabPanel key={"activity"} value={"activity"}>
                        {activityList()}
                      </TabPanel>
                      <TabPanel key={"myWork"} value={"myWork"}>
                        {taskList()}
                      </TabPanel>
                      <TabPanel
                        key={"perfomance"}
                        value={"perfomance"}
                        className="overflow-y-scroll"
                      >
                        {perfomanceChart()}
                      </TabPanel>
                    </TabsBody>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
      {showModal && (
        <Task setShowModal={() => setShowModal(false)} taskId={taskId} />
      )}
    </div>
  );
}
// }
