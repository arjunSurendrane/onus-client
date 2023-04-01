import React, { useContext, useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineCloudUpload } from "react-icons/ai";
import { CgFlagAlt } from "react-icons/cg";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FcDocument, FcImageFile } from "react-icons/fc";
import { TbSubtask, TbSend } from "react-icons/tb";
import { Avatar } from "@mui/material";
import { useForm } from "react-hook-form";
import moment from "moment";
import useSWR from "swr";
import { useCookies } from "react-cookie";
import { changeStatus, changeTaskPrioriy } from "../../../api/apis";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin6Line, RiFlag2Fill } from "react-icons/ri";
import { url } from "../../../api";
import { sendRequest } from "../../../api/sampleapi";
import UserList from "../TaskList/userList";
import AddSubtask from "./addSubtask";
import { SocketContext } from "../../../App";
import { useParams } from "react-router-dom";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";

export default function Task({ setShowModal, taskId, deleteTask }) {
  const { register, handleSubmit } = useForm();
  const [cookies, setCokkies] = useCookies();
  const [showUsers, setShowUsers] = useState(false);
  const [subtask, setSubTask] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [role, setRole] = useState(localStorage.getItem("role") != "Member");
  const socket = useContext(SocketContext);
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  const { id: workspaceId } = useParams();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
    socket.emit("joinRoom", taskId);
    socket.on("data", (data) => {
      console.log({ comments: data });
      if (data?.comments) {
        setComments(data?.comments);
      }
    });
    socket.on("newComment", (data) => {
      console.log({ newComment: data.comments });
      setComments(data.comments);
    });
  }, []);

  /**
   * fetch task data with the help of swr
   */
  const {
    isLoading,
    error,
    mutate,
    data: task,
  } = useSWR(
    {
      link: "getOneTask",
      id: taskId,
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );

  /**
   * check response status
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
    return <div>Error...!</div>;
  } else {
    console.log({ taskDataINTaskPage: task });
    let taskData = task?.data?.data?.task || {};
    const onSubmit = async (data) => {
      const file = data.target.files[0];
      console.log({ file: [file] });
      const formData = new FormData();
      formData.append("file", file);

      const res = await sendRequest({
        id: taskData._id,
        data: formData,
        link: "submitTaskFile",
        operation: "patch",
        cookies: cookies.userJwt,
      });
      console.log({ responseFromSubmit: res });
      if (res.data.status == "success") {
        toast.success("submit file");
        mutate(task);
      } else {
        toast.error("Something gone wrong");
      }
    };
    const updatePriority = async (id, priority) => {
      const res = await changeTaskPrioriy(
        id,
        priority,
        workspaceId,
        cookies.userJwt
      );
      if (res.data.status == "success") {
        toast.success("update priority");
        mutate(task);
      }
    };
    const handleChangeStatus = async (id, statusData) => {
      const status =
        statusData == "Repeat"
          ? "ToDo"
          : statusData == "ToDo"
          ? "InProgress"
          : statusData == "InProgress"
          ? "Completed"
          : null;
      if (status != null) {
        const res = await changeStatus(
          id,
          status,
          workspaceId,
          cookies.userJwt
        );
        if (res) {
          toast.success("Change Task Status");
          mutate(task);
        }
      }
    };
    const sendComment = async () => {
      socket.emit("createComment", {
        id: taskData._id,
        message: commentMessage,
        userName: user.name,
        userId: user._id,
      });
      setCommentMessage("");
    };
    const handleDeleteSubtask = async (id, subtaskId) => {
      const res = await sendRequest({
        link: "deleteSubtask",
        id,
        subtaskId,
        cookies: cookies.userJwt,
        operation: "delete",
      });
      if (res.status == 204) {
        toast.success("Subtask deleted");
        mutate(task);
      } else {
        toast.error("Something gone wrong");
      }
    };
    return (
      <div>
        <div>
          <Toaster />
          <div className="flex justify-center items-center overflow-x-hidden  fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
            <div className="relative mx-auto max-w-[90%] min-w-[90%]  ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center  justify-between p-2 border-b border-solid border-gray-300 rounded-t ">
                  <h1 className="font-bold text-lg">{"Department>Task"}</h1>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal()}
                  >
                    x
                  </button>
                </div>
                <div className="relative p-3 flex-auto mb-2 flex justify-between border-b-2">
                  <div id="header" className="w-[100%]">
                    <div id="" className="flex justify-between border-r-2 pr-2">
                      <div
                        id=""
                        className="flex justify-around w-[50%] border-r-2"
                      >
                        <div className="flex">
                          <div
                            id=""
                            className={` py-2 px-2 h-8 ${
                              taskData?.status == "ToDo"
                                ? "bg-gray-400"
                                : taskData?.status == "InProgress"
                                ? "bg-[#a875ff]"
                                : "bg-green-500"
                            }  rounded-l`}
                          >
                            <p className="text-xs text-white">
                              {taskData?.status}
                            </p>
                          </div>
                          <div
                            id=""
                            className={`w-5 h-8  ${
                              taskData?.status == "ToDo"
                                ? "bg-gray-400"
                                : taskData?.status == "InProgress"
                                ? "bg-[#a875ff]"
                                : "bg-green-500"
                            } rounded-r mx-1 text-center text-white cursor-default
                            `}
                            onClick={() => {
                              handleChangeStatus(
                                taskData?._id,
                                taskData?.status
                              );
                            }}
                          >
                            {">"}
                          </div>

                          {role && taskData?.status == "Completed" ? (
                            <div>
                              <button
                                className="w-14 h-8 rounded-r mx-1 text-center text-white cursor-default bg-red-200 hover:bg-red-500"
                                onClick={() => {
                                  handleChangeStatus(taskData?._id, "Repeat");
                                }}
                              >
                                <p className="text-sm font-medium text-white">
                                  Repeat
                                </p>
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="py-2 "
                          onClick={() => {
                            setShowUsers(true);
                          }}
                        >
                          {taskData?.Assigned ? (
                            <div className="bg-[#153e21] w-7 h-7 rounded-full grid place-content-center text-white uppercase">
                              {taskData?.Assigned?.email.split("")[0]}
                            </div>
                          ) : (
                            <AiOutlineUserAdd size={20} />
                          )}
                        </div>
                        {showUsers && (
                          <UserList
                            close={() => {
                              setShowUsers(false);
                              mutate(task);
                            }}
                            taskId={taskId}
                          />
                        )}
                        <div
                          className="py-2 "
                          onClick={() =>
                            updatePriority(taskData._id, !taskData.priority)
                          }
                        >
                          {taskData.priority ? (
                            <RiFlag2Fill size={20} />
                          ) : (
                            <CgFlagAlt size={20} />
                          )}
                        </div>
                      </div>
                      <div className="flex">
                        <div
                          className="py-2 mx-2 cursor-pointer"
                          onClick={() => deleteTask(taskData)}
                        >
                          <MdOutlineDeleteOutline size={20} color={"gray"} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] flex justify-center">
                    <div className="border-r-2 px-4">
                      <div>
                        <p className="text-[10px] uppercase font-medium text-gray-500">
                          CREATED BY
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px]  font-medium text-gray-500 capitalize">
                          {taskData?.createdBy?.name}
                        </p>
                      </div>
                    </div>
                    <div className="border-r-2 px-4">
                      <div>
                        <p className="text-[10px] uppercase font-medium text-gray-500">
                          start date
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px]  font-medium text-gray-500">
                          2019-02-02
                        </p>
                      </div>
                    </div>
                    <div className="border-r-2 px-4">
                      <div>
                        <p className="text-[10px] uppercase font-medium text-gray-500">
                          Last Update
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px]  font-medium text-gray-500">
                          {taskData?.update?.updateTime.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <div className="border-r-2 px-4">
                      <div>
                        <p className="text-[10px] uppercase font-medium text-gray-500">
                          due date
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px]  font-medium text-gray-500">
                          {taskData?.dueDate?.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between px-10  max-h-[600px]  overflow-x-clip">
                  <div className="w-[50%] border-r-2 px-3">
                    <h1 className="text-2xl capitalize">
                      {taskData?.taskName}
                    </h1>
                    <div className="mt-5">
                      <p className="normal-case">{taskData?.description}</p>
                    </div>
                    <div
                      className="mt-5 w-full border-2 border-dotted rounded  text-center py-2 cursor-pointer"
                      onClick={() => {
                        setSubTask(true);
                      }}
                    >
                      <p className="text-sm">+ Add Subtask</p>
                    </div>
                    {subtask && (
                      <AddSubtask
                        close={() => {
                          setSubTask(false);
                          mutate(task);
                        }}
                        id={taskData._id}
                      />
                    )}
                    <div className="mt-5">
                      {taskData?.subtasks?.map((data, i) => (
                        <ol className="px-10">
                          <li className="text-sm mt-3">
                            <div className="">
                              <div className="flex justify-between">
                                <div className="flex">
                                  <div>
                                    <TbSubtask size={18} />
                                  </div>

                                  <p className="text-base font-medium text-gray-700 capitalize">
                                    {user?.name == data?.name
                                      ? "Me"
                                      : data.name}
                                  </p>
                                </div>

                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleDeleteSubtask(taskData._id, data._id);
                                  }}
                                >
                                  <RiDeleteBin6Line />
                                </div>
                              </div>
                              <div className="flex mt-3 mx-4 text-sm text-gray-600 font-medium">
                                {data?.description}
                              </div>
                            </div>
                          </li>
                          <hr />
                        </ol>
                      ))}
                    </div>
                    <div className="mt-5">
                      <div>
                        <h1 className="font-medium">Attachments</h1>
                      </div>
                      <div className=" grid grid-cols-3 gap-4 mr-2 ">
                        {taskData?.attachedfiles?.map((data) =>
                          data.link ? (
                            <a
                              href={`${url}/workspace/task/attachedFile/${data.link}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {" "}
                              <div className="h-32 w-full  bg-gray-100 shadow-lg m-2 text-center overflow-hidden">
                                <FcDocument
                                  size={30}
                                  className="mt-10 mx-auto"
                                />
                                <p className="text-[9px] font-bold"></p>
                              </div>
                            </a>
                          ) : (
                            <p className="text-sm text-gray-400 font-medium">
                              No Attachment file
                            </p>
                          )
                        )}
                      </div>
                    </div>
                    <div className="mt-5">
                      {taskData?.submitfile && (
                        <>
                          <div>
                            <h1 className="font-medium">Submition</h1>
                          </div>
                          <div className=" grid grid-cols-3 gap-4 mr-2 ">
                            <a
                              href={`${url}/workspace/task/attachedFile/${taskData.submitfile}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <div className="h-32 w-full  bg-gray-100 shadow-lg m-2 text-center overflow-hidden">
                                <FcDocument
                                  size={30}
                                  className="mt-10 mx-auto"
                                />

                                <p className="text-[9px] font-bold">
                                  {taskData?.submitfile}
                                </p>
                              </div>
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-[50%] px-5 py-5 bg-[#fbfbfb] overflow-scroll">
                    {comments.map((data) => (
                      <div className="flex justify-between mt-3">
                        <div className="w-[10%]">
                          <Avatar className="capitalize">
                            {data?.name?.split("")[0]}
                          </Avatar>
                        </div>
                        <div className="w-[90%] shadow-lg  border rounded-b-lg rounded-r-lg  px-5 py-2">
                          <div className="flex justify-between">
                            <div>{data?.name}</div>
                            <div className="text-xs font-bold text-gray-500">
                              {moment().endOf(data.time).fromNow()}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm">{data.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex py-5 border-t-2">
                  <div className="w-[50%] flex justify-center border-r-2">
                    {" "}
                    <label
                      htmlFor="dropzone-file"
                      className="cursor-pointer flex"
                    >
                      <div>
                        <AiOutlineCloudUpload size={20} />
                      </div>
                      <div className="mx-1">
                        <p className="text-sm">Drop files here to attach</p>{" "}
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          {...register("attachments")}
                          onChange={onSubmit}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="w-[50%] px-5 flex justify-between">
                    <div className="w-full">
                      <input
                        type="text"
                        name="attachments"
                        value={commentMessage}
                        onChange={(e) => setCommentMessage(e.target.value)}
                        placeholder="write comment"
                        className="focus:border-none hover:border-none focus:outline-none w-[100%]"
                      />
                    </div>
                    <div onClick={() => sendComment()}>
                      <TbSend size={20} color={"gray"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
