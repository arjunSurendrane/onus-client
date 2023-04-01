import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgFlagAlt } from "react-icons/cg";
import { RiFlag2Fill } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import addTaskImage from "../../../assets/undraw_add_files_re_v09g.svg";
import Task from "../Task/Task";
import AddTask from "../Task/addTask";
import { useCookies } from "react-cookie";
import { fetchProductId } from "../../../features/users/Project";
import useSWR from "swr";
import { useSelector } from "react-redux";
import {
  changeTaskPrioriy,
  deleteTask,
  fetchData,
  fetchTask,
} from "../../../api/apis";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import UserList from "./userList";
import { sendRequest } from "../../../api/sampleapi";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";

export default function List() {
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [task, setTask] = useState();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [reload, setReload] = useState(false);
  const [taskId, setTaskId] = useState();
  const today = new Date(Date.now());
  const navigate = useNavigate();
  const componentReload = () => {
    window.location.reload(false);
  };
  const { id, projectId } = useParams();
  const workspaceId = id;

  /**
   * SWR code for get grouped collecton data
   */
  const {
    isLoading,
    error,
    data: tasksData,
    mutate,
  } = useSWR(
    {
      link: "groupAllTasks",
      id: projectId,
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );

  /**
   * Check isloading/error/data
   */
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
    return <div>Error</div>;
  } else {
    const tasks = tasksData?.data?.data?.tasks || [];
    console.log({ tasks });

    let inProgress, ToDo, Completed;

    inProgress = tasks?.filter((data) => data._id == "InProgress");
    ToDo = tasks?.filter((data) => data._id == "ToDo");
    Completed = tasks?.filter((data) => data._id == "Completed");

    const displayTasks = (data) => {
      setTask(data._id);
      setShowModal(true);
    };
    const taskAdded = () => {
      console.log("mutated");
      setOpenAddTask(false);
    };
    const handleDelete = async (id) => {
      console.log("delete button clicked");
      const res = await deleteTask(id, workspaceId, cookies.userJwt);
      console.log({ res });
      if (res) {
        toast.success("Task deleted");
        mutate([...tasksData.data.tasks]);
        setShowModal(false);
      }
    };
    const updatePriority = async (id, priority) => {
      const task = await changeTaskPrioriy(
        id,
        priority,
        workspaceId,
        cookies.userJwt
      );
      if (task.data.status == "success") {
        mutate(tasksData.data);
        toast.success("update priority");
      }
    };
    const deleteConfirmationMessage = (data) => {
      toast((t) => (
        <span>
          Are You Sure to delete <b>{data.taskName}</b>
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
                  handleDelete(data._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </span>
      ));
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
            onClick={() => displayTasks(data)}
          >
            <p className="text-sm">{data?.taskName}</p>
          </div>

          <div className="flex justify-around w-[50%]">
            <p
              className=" uppercase text-gray-700 font-bold "
              onClick={() => {
                setTaskId(data._id);
                setShowUsers(true);
              }}
            >
              {data.AssignedTo[0] ? (
                <div className="bg-[#153e21] w-7 h-7 rounded-full grid place-content-center text-white uppercase">
                  {data.AssignedTo[0].email.split("")[0]}
                </div>
              ) : (
                <AiOutlineUserAdd size={20} />
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
            <p
              className=" uppercase text-gray-700 font-bold "
              onClick={() => updatePriority(data._id, !data.priority)}
            >
              {data.priority ? (
                <RiFlag2Fill size={20} />
              ) : (
                <CgFlagAlt size={20} />
              )}
            </p>
            <p
              className=" uppercase text-gray-700 font-bold cursor-pointer"
              onClick={() => deleteConfirmationMessage(data)}
            >
              <RiDeleteBin6Line size={20} />
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
          <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
            delete
          </p>
        </div>
      </div>
    );

    return (
      <>
        {" "}
        <Toaster />
        {tasks.length ? (
          <>
            <div>
              <div className="fmd:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw] px-2 ">
                {/* TODO */}
                {ToDo.length ? TaskHeading("TODO", "gray-200", "gray-500") : ""}
                {ToDo[0]?.data?.map((data) => taskList(data))}

                {/* IN PROGRESS */}
                {inProgress.length
                  ? TaskHeading("IN PROGRESS", "[#a875ff]", "white")
                  : ""}
                {inProgress[0]?.data?.map((data) => taskList(data))}

                {/* COMPLETED  */}
                {Completed.length
                  ? TaskHeading("COMPLETED", "[#6bc950]", "white")
                  : ""}
                {Completed[0]?.data?.map((data) => taskList(data))}
              </div>
            </div>
            {showModal && (
              <Task
                setShowModal={() => {
                  setShowModal(false);
                  console.log(tasksData);
                  mutate(tasksData);
                }}
                deleteTask={(data) => deleteConfirmationMessage(data)}
                taskId={task}
                updatePriority={(id, priority) => updatePriority(id, priority)}
              />
            )}
            {showUsers && (
              <UserList
                close={() => {
                  mutate(tasksData);
                  setShowUsers(false);
                }}
                taskId={taskId}
              />
            )}
          </>
        ) : (
          <>
            <div className=" md:w-[70vw] w-[87vw] h-[80vh] grid place-items-center  text-center">
              <img
                src={addTaskImage}
                alt="add task"
                className="w-[200px] h-[200px] transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-200 mb-0 pb-0 cursor-pointer"
                onClick={() => navigate(`/${id}/addTask/${projectId}`)}
              />
            </div>
          </>
        )}
      </>
    );
  }
}
