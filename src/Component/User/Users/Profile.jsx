import React, { useState } from "react";
import { Avatar } from "@mui/material";
import useSWR from "swr";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { sendRequest } from "../../../api/sampleapi";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { RiFlag2Fill } from "react-icons/ri";
import { CgFlagAlt } from "react-icons/cg";
import noTaskImg from "../../../assets/notask.svg";
import noActivity from "../../../assets/no-activity.svg";
import PieChart from "./perfomanceChart";
import Task from "../Task/Task";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";

export default function ProfileView() {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookies] = useCookies();
  const [activity, setActivity] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [open, setOpen] = useState(1);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { userId } = useParams();
  const today = new Date(Date.now());
  const [chartData, setChartData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState("");

  const {
    isLoading,
    error,
    mutate,
    data: userData,
  } = useSWR(
    { link: "getUser", operation: "get", id: userId, cookies: cookies.userJwt },
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
    const user = userData.data.data.user;
    const description = user.description;
    const onSubmit = (data) => {};
    const fetchActivity = async () => {
      setOpen(1);
      const res = await sendRequest({
        id: userId,
        link: "findUserActivity",
        operation: "get",
        cookies: cookies.useJwt,
      });
      setActivity(res.data.data.activity);
    };
    console.log({ activity });
    const fetchAssignedTask = async () => {
      setOpen(2);
      const res = await sendRequest({
        id: userId,
        link: "getAssignedTask",
        operation: "get",
        cookies: cookies.useJwt,
      });
      const data = res.data.data.assignedTasks;
      setTasks(res.data.data.assignedTasks);
      setToDo(data.filter((el) => el._id == "ToDo"));
      setInProgress(data.filter((el) => el._id == "InProgress"));
      setCompleted(data.filter((el) => el._id == "Completed"));
    };
    const charDataSetUp = () => {
      setOpen(3);
      setChartData({
        datasets: [
          {
            label: tasks.map((el) => el._id),
            borderColor: "#7b68ee",
            data: tasks.map((el) => el.data.length),
          },
        ],
      });
    };

    const updateDiscription = async (e) => {
      const res = await sendRequest({
        id: user._id,
        link: "updateDescription",
        data: { description: e.target.value },
        cookies: cookies.userJwt,
        operation: "patch",
      });
      mutate(userData);
    };
    const taskList = (data) => {
      return (
        <div
          className={`flex justify-between border shadow-sm py-2 ${
            new Date(data.dueDate) < today
              ? data.status != "Completed"
                ? "bg-red-200 text-red-700 font-bold"
                : ""
              : ""
          }`}
        >
          <div
            className=" px-3 py-1 cursor-pointer"
            // onClick={() => displayTasks(data)}
            onClick={() => {
              setTaskId(data._id);
              setShowModal(true);
            }}
          >
            <p className="text-sm">{data?.taskName}</p>
          </div>

          <div className="flex justify-around w-[50%]">
            <p className=" uppercase text-gray-700 font-bold ">
              {data.AssignedTo[0] ? (
                <div className="bg-[#153e21] w-7 h-7 rounded-full grid place-content-center text-white uppercase">
                  {data.AssignedTo[0].email.split("")[0]}
                </div>
              ) : (
                ""
              )}
            </p>
            <p
              className={`${
                new Date(data.dueDate) > today
                  ? "text-gray-700"
                  : new Date(data.dueDate) == today
                  ? data.status != Completed
                    ? "text-yellow-500"
                    : "text-red-400"
                  : ""
              } uppercase md:text-[10px] text-[8px] font-bold `}
            >
              {data?.dueDate.split("T")[0]}
            </p>
            <p className=" uppercase text-gray-700 font-bold ">
              {data.priority ? (
                <RiFlag2Fill size={20} />
              ) : (
                <CgFlagAlt size={20} />
              )}
            </p>
          </div>
        </div>
      );
    };

    const TaskHeading = (data, color, text) => (
      <div className="flex justify-between mt-10">
        <div className={`bg-${color} rounded-t-lg px-3 py-1`}>
          <p className={`text-xs font-medium text-${text} `}>{data}</p>
        </div>

        <div className="flex justify-around w-[50%]">
          <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
            Assignee
          </p>
          <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
            due date
          </p>
          <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
            priority
          </p>
        </div>
      </div>
    );

    const activityLit = () => (
      <>
        {activity.length ? (
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
                key={key}
              >
                <div className="w-full">
                  <div className="px-2 py-2">
                    <h6 className="text-[11px] font-medium text-gray-500">
                      {"Task Name"}
                      {">"}
                      {data.taskName}
                    </h6>
                    <h2 className="font-medium">Click Here to Open the task</h2>
                  </div>

                  <>
                    <hr />
                    <div className="md:px-4 px-1 py-2 flex" key={key}>
                      <div className="ml-3">
                        <p className="md:text-sm text-[10px] font-bold">
                          {data.taskName}
                        </p>
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
                  </>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid place-content-center w-full mt-5">
            <div className="w-52 h-52 text-center">
              <img src={noActivity} alt="no activity" />
              <h1 className="mt-5 font-medium text-sm">No Activity</h1>
            </div>
          </div>
        )}
      </>
    );

    const taskListData = () => (
      <>
        {tasks.length ? (
          <>
            <div>
              <div className="fmd:mx-14 mx-5 mt-10  w-full px-2 ">
                {/* TODO */}
                {toDo.length ? TaskHeading("TODO", "gray-200", "gray-500") : ""}
                {toDo[0]?.data?.map((data) => taskList(data))}

                {/* IN PROGRESS */}
                {inProgress.length
                  ? TaskHeading("IN PROGRESS", "[#a875ff]", "white")
                  : ""}
                {inProgress[0]?.data?.map((data) => taskList(data))}

                {/* COMPLETED  */}
                {completed.length
                  ? TaskHeading("COMPLETED", "[#6bc950]", "white")
                  : ""}
                {completed[0]?.data?.map((data) => taskList(data))}
              </div>
            </div>
          </>
        ) : (
          <div className="grid place-content-center w-full mt-10">
            <div className="w-52 h-52 text-center">
              <img src={noTaskImg} alt="no task image" />
              <h1 className="mt-5 font-medium text-sm">No Task Assigned</h1>
            </div>
          </div>
        )}
      </>
    );

    const perfomanceList = () => (
      <>
        {chartData ? (
          chartData.datasets[0].data.length ? (
            <PieChart chartData={chartData} />
          ) : (
            <div className="grid place-content-center w-full mt-10">
              <div className="w-52 h-52 text-center">
                <img src={noTaskImg} alt="no task image" />
                <h1 className="mt-5 font-medium text-sm">No Workload</h1>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </>
    );

    return (
      <div className="md:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded">
        <Tabs value="html" className="w-full">
          <div className="bg-white w-full ">
            <div className="w-full  shadow-lg ">
              <div className="w-full flex justify-arounnd py-8 px-8">
                <div>
                  <Avatar sx={{ width: 64, height: 64 }}>
                    <p className="uppercase"> {user.name.split("")[0]}</p>
                  </Avatar>
                </div>
                <div className=" w-full flex justify-between ml-5">
                  <div className="w-[50%]">
                    <div>
                      <h1 className="text-xl font-medium capitalize">
                        {user.name}
                      </h1>
                    </div>
                    <div className="w-full flex justify-between">
                      <div>
                        <textarea
                          type="text"
                          placeholder={description || "add description"}
                          value={description}
                          className="focus:outline-none"
                          onChange={updateDiscription}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-green-100 p-2 rounded">
                      {" "}
                      <p className="text-green-600 font-bold text-xs">Online</p>
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
                      className={`mx-5 ${
                        open == 1 ? "font-medium" : "text-gray-500 "
                      }`}
                      onClick={fetchActivity}
                    >
                      <p className="font-medium">Activity</p>
                    </Tab>
                  </div>
                  <div>
                    <Tab
                      key={"myWork"}
                      value={"myWork"}
                      className={`mx-5 ${
                        open == 2 ? "font-medium" : "text-gray-500 "
                      }`}
                      onClick={fetchAssignedTask}
                    >
                      <p className="font-medium">My Work</p>
                    </Tab>
                  </div>

                  <div>
                    {tasks.length ? (
                      <Tab
                        key={"performance"}
                        value={"performance"}
                        className={`mx-5 ${
                          open == 3 ? "font-medium" : "text-gray-500 "
                        }`}
                        onClick={charDataSetUp}
                      >
                        <p className="font-medium">Perfomance</p>
                      </Tab>
                    ) : (
                      ""
                    )}
                  </div>
                </TabsHeader>
              </div>
            </div>
            <div className="w-full">
              <div className="overflow-y-scroll max-h-[30rem] overflow-x-hidden">
                <div>
                  <TabPanel key={"activity"} value={"activity"}>
                    {open == 1 && activityLit()}
                  </TabPanel>
                  <TabPanel key={"myWork"} value={"myWork"}>
                    {open == 2 && taskListData()}
                  </TabPanel>
                  <TabPanel key={"performance"} value={"performance"}>
                    {open == 3 && perfomanceList()}
                  </TabPanel>
                  {/* <TabPanel key={"edit"} value="edit">
                    <div>
                      <div>Edit</div>
                      <div>
                        <form
                          className="mt-8 space-y-6"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                              <label
                                htmlFor="email-address"
                                className="sr-only"
                              >
                                Name
                              </label>
                              <input
                                id="Name"
                                name="Name"
                                type="text"
                                value={user.name}
                                autoComplete="name"
                                className="relative mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="username"
                                {...register("name")}
                              />
                              <p className="text-red-500 text-sm font-medium"></p>
                            </div>
                          </div>

                          <div>
                            <button
                              type="submit"
                              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#75337D] py-2 px-4 text-sm font-medium text-white hover:bg-[#56245b] focus:outline-none focus:ring-2 focus:ring-[#56245b] focus:ring-offset-2"
                            >
                              Edit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </TabPanel> */}
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
}
