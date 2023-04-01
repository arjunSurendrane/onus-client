import { Button, Popover, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { GrGroup } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../../api/sampleapi";
import useSWR from "swr";
import UserProfile from "../Users/UserProfile";

export default function UserCard({ users }) {
  const workload = {};
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("User"));
  const [todo, setToDo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cookies, setCookies] = useCookies();
  const [modal, setModal] = useState(false);
  const [curUserId, setCurUserId] = useState();

  const handleClick = async (event, id) => {
    setAnchorEl(event.currentTarget);
    fetchUserWorkload(id);
  };

  const fetchUserWorkload = async (id) => {
    if (workload[id]) {
      setToDo(workload[id].filter((data) => data._id == "ToDo"));
      setProgress(workload[id].filter((data) => data._id == "InProgress"));
      setCompleted(workload[id].filter((data) => data._id == "Completed"));
    } else {
      const res = await sendRequest({
        id,
        link: "getUserWorkload",
        operation: "get",
        cookies: cookies.userJwt,
      });
      setToDo(res.data.data.users.filter((data) => data._id == "ToDo"));
      setProgress(
        res.data.data.users.filter((data) => data._id == "InProgress")
      );
      setCompleted(
        res.data.data.users.filter((data) => data._id == "Completed")
      );
      workload[id] = res.data.data.users;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div className="md:w-[70vw] w-[87vw] md:mx-14 mx-5 mt-10">
      <div className="flex">
        <h1 className="text-sm  font-bold text-gray-500">Online Members</h1>
        <GrGroup className="ml-2" />
      </div>
      <div className="grid grid-cols-5 gap-4 w-full  mt-8 cursor-default">
        {users.map((data) => (
          <div className="">
            {" "}
            <div
              className="w-9 h-9 hover:-translate-y-2 hover:scale-125 transition ease-in-out delay-150 duration-150  bg-green-500 rounded-full grid place-content-center "
              onMouseEnter={(e) => handleClick(e, data.userId)}
              aria-describedby={id}
            >
              <p className="capitalize font-medium text-lg text-white">
                {" "}
                {data?.username.split("")[0]}
              </p>
            </div>
            <div className="ml-1 ">
              <p className="text-xs font-medium ">{data.username}</p>
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
              <div
                className="p-5"
                onClick={() => {
                  setModal(true);
                  setCurUserId(data.userId);
                  handleClose();
                }}
              >
                <div className="w-24 h-24 bg-green-500 rounded-full grid place-content-center ">
                  <p className="text-2xl font-bold text-white uppercase">
                    {data.username.split("").slice(0, 2)}
                  </p>
                </div>
                <div className="px-6">
                  <p className="capitalize font-medium ">{data.username}</p>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-500">ToDo</p>{" "}
                    </div>
                    {":"}
                    <div>
                      {" "}
                      <p className="text-sm font-bold text-gray-500">
                        {todo[0]?.count || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between ">
                    <div>
                      {" "}
                      <p className="text-sm font-bold text-gray-500">
                        InProgress
                      </p>{" "}
                    </div>
                    {":"}

                    <div>
                      {" "}
                      <p className="text-sm font-bold text-gray-500">
                        {progress[0]?.count || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      {" "}
                      <p className="text-sm font-bold text-gray-500">
                        Completed
                      </p>{" "}
                    </div>
                    {":"}

                    <div>
                      {" "}
                      <p className="text-sm font-bold text-gray-500">
                        {completed[0]?.count || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover>
          </div>
        ))}
      </div>
      {modal && (
        <UserProfile closeModal={() => setModal(false)} userId={curUserId} />
      )}
    </div>
  );
}
