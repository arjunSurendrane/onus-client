import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import LoadingPage from "../../Error/loading";
import ServerDown from "../../Error/serverDown";
import Task from "../Task/Task";

export default function MyWork() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const id = user._id;
  const { id: workspaceId } = useParams();
  const [cookies, setCookies] = useCookies();
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

  const myWorkView = () => {
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
      const myWork = userWorkloadData.data.userbasedWorkload;
      console.log(myWork);
      return (
        <>
          {myWork.map((data, key) => {
            return data.data.map((data, key) => (
              <>
                <div
                  key={key}
                  className="cursor-pointer"
                  onClick={() => {
                    setTaskId(data._id);
                    setShowModal(true);
                  }}
                >
                  <div className="w-[10rem]  p-2  shadow-lg border  border-gray-200 ">
                    <div className=" h-[92%] overflow-hidden flex justify-items-start">
                      <div className="grid place-content-center">
                        <div
                          className={`w-3 h-3 ${
                            data.status == "ToDo"
                              ? "bg-gray-500"
                              : data.status == "InProgress"
                              ? "bg-[#a875ff]"
                              : "bg-[#6bc950]"
                          } `}
                        ></div>
                      </div>
                      <div className="ml-2">
                        <h1 className="font-medium text-gray-500 text-sm">
                          {data.taskName}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ));
          })}
        </>
      );
    }
  };
  return (
    <div>
      {" "}
      <div className="px-5 py-5 w-[70vw] grid place-content-center ">
        <div className="text-center">
          <p className="text-2xl font-medium">MyWork</p>
        </div>
        <div className="w-[50vw] grid place-content-center">
          <div className=" mt-5 w-full">
            <input
              type="text"
              placeholder="Your task here"
              className="text-center md:w-96 w-full  bg-gray-100 h-10 rounded-lg uppercase text-xs font-medium cursor-pointer"
              readOnly
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">{myWorkView()}</div>
        </div>
      </div>
      {showModal && (
        <Task setShowModal={() => setShowModal(false)} taskId={taskId} />
      )}
    </div>
  );
}
