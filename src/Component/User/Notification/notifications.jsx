import React, { useContext, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import useSWR from "swr";
import { SocketContext } from "../../../App";
import { sendRequest } from "../../../api/sampleapi";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Task from "../Task/Task";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";
import EmptyData from "../Empty/emptyData";

export default function Notifications() {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [cookies, setCookies] = useCookies();
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState("");

  const { isLoading, error, data } = useSWR(
    {
      id,
      link: "fetchNotification",
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
    let notification = data.data.data.notifications;
    console.log(notification);
    socket.on("notifications", (data) => {
      notification = data;
    });
    if (notification.length) {
      return (
        <div>
          {notification &&
            notification.map((data, key) => (
              <div
                className="md:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw] cursor-pointer flex justify-between px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded "
                key={key}
                onClick={() => {
                  setTaskId(data._id);
                  setShowModal(true);
                }}
              >
                <div className="w-[100%]">
                  <div className="px-2 py-2">
                    <h6 className="text-[11px] font-medium text-gray-500">
                      Task Name {">"} {data.data[0].taskName}
                    </h6>
                    <h2 className="font-medium">Click Here to Open the task</h2>
                  </div>
                  {data.data.map((data, key) => (
                    <>
                      <hr />
                      <div className="md:px-4 px-1 py-2 flex" key={key}>
                        <div className="w-7  bg-[#251f49] h-7 rounded-full items-center flex justify-center">
                          <p className="text-white text-sm font-bold uppercase">
                            {data.userName.split("").slice(0, 2)}
                          </p>
                        </div>
                        <div className="ml-3">
                          <p className="md:text-sm text-[10px] capitalize">
                            {data.userName}
                          </p>
                        </div>
                        <div className="ml-3 bg-gray-200 rounded-2xl px-2 py-0 h-5">
                          <p className="md:text-[11px] text-[8px] font-medium">
                            {data.action}
                          </p>
                        </div>
                        <div className="ml-3">
                          <p className="md:text-sm text-[10px]">
                            {data.message}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                {/* <div className="w-[10%]">
          <IconContext.Provider
            value={{ color: "white", className: "global-class-name" }}
          >
            <div className="w-10 mx-auto bg-[#7b68ee] h-10 rounded-full items-center flex justify-center">
              <TiTick />
            </div>
          </IconContext.Provider>
        </div> */}
              </div>
            ))}
          {showModal && (
            <Task setShowModal={() => setShowModal(false)} taskId={taskId} />
          )}
        </div>
      );
    } else {
      return <EmptyData heading={"Empty Notification"} />;
    }
  }
}
