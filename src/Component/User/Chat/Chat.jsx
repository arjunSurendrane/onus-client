import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../App";
import EmptyImage from "../../../assets/no-message.svg";
import moment from "moment";

export default function ChatScreen() {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [chatData, setChatData] = useState([]);
  const { id } = useParams();
  const messagesEndRef = useRef(null);
  const today = moment().endOf("day").fromNow();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.emit("joinWorkspace", {
      workspaceId: id,
      userId: user._id,
      username: user.name,
    });
    socket.emit("getGroupMessage", id);
    socket.on("newMessage", (data) => {
      if (data.length != 1) setChatData([]);
      console.log("here");
      console.log({ data });
      setChatData((prev) => [...prev, ...data]);
    });
    return () => {
      socket.off("getGroupMessage");
      socket.off("joinWorkspace");
    };
  }, []);

  console.log(chatData);
  const handleKeyEnter = (event) => {
    if (event.key == "Enter") {
      console.log(event.target.value);
      socket.emit("createMessage", {
        id,
        userId: user._id,
        message: event.target.value,
        userName: user.name,
      });
      setMessage("");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      <>
        <div key={"key"} className="my-8">
          <div className="mx-5 my-5">
            <p className="text-xl font-bold text-gray-400">
              {"Discussion Room"}
            </p>
          </div>

          <div
            className="md:mx-14 py-5 mx-5 mt-10  md:w-[70vw] w-[87vw]   px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded"
            key={"key"}
          >
            <div>
              <div className="px-5 font-medium">
                <div>
                  <p>{"Group Discussion"}</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-5 mt-5 max-h-[57vh] min-h-[57vh] overflow-y-scroll  bg-gray-100">
              {chatData.length ? (
                chatData.map((data, key) => (
                  <div className="flex justify-between mt-3" key={key}>
                    <div className="w-[10%]">
                      <Avatar className="capitalize">
                        {data?.userName.split("")[0]}
                      </Avatar>
                    </div>
                    <div className="w-[90%] shadow-lg bg-white  border rounded-b-lg rounded-r-lg   py-2">
                      <div className="flex justify-between px-5 py-2">
                        <div>
                          <p className="capitalize font-medium">
                            {data.userName}
                          </p>
                        </div>
                        <div className="text-sm text-gray-400 font-bold">
                          {moment().endOf(data.createAt).fromNow()}
                        </div>
                      </div>
                      <hr />
                      <div className="py-2 px-5">
                        <p className="text-sm">{data.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="grid place-content-center w-32 h-32">
                    <img src={EmptyImage} alt="" />
                  </div>
                </>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="w-[100%] px-5  mt-3 flex justify-between">
              <div className="w-full">
                <div>
                  <input
                    type="text"
                    name="attachments"
                    autoComplete="off"
                    value={message}
                    placeholder="Write Message"
                    className="focus:border-none hover:border-none focus:outline-none w-[100%]"
                    onChange={handleChange}
                    onKeyDown={handleKeyEnter}
                  />
                </div>
              </div>
              <div>
                <TbSend size={20} color={"gray"} />
              </div>
            </div>
          </div>
        </div>
        <hr />
      </>
    </div>
  );
}
