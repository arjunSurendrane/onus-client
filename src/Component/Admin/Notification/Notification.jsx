import React from "react";
import { TiTick } from "react-icons/ti";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
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
export default function AdminNotification() {
  return (
    <>
      {content.map((data, key) => (
        <div className="md:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-2 border border-t-4 border-t-balck shadow-lg rounded">
          <div className="w-[100%]">
            <div className="px-2 py-2">
              <h6 className="text-[11px] font-medium text-gray-500">
                {data.department}
                {">"}
                {data.task}
              </h6>
              <h2 className="font-medium">Click Here to Open the task</h2>
            </div>
            {data.notifications.map((data, key) => (
              <>
                <hr />
                <div className="md:px-4 px-1 py-2 flex" key={key}>
                  <div className="w-7  bg-[#251f49] h-7 rounded-full items-center flex justify-center">
                    <p className="text-white text-sm font-bold">AB</p>
                  </div>
                  <div className="ml-3">
                    <p className="md:text-sm text-[10px]">{data.name}</p>
                  </div>
                  <div className="ml-3 bg-gray-200 rounded-2xl px-2 py-0 h-5">
                    <p className="md:text-[11px] text-[8px] font-medium">
                      {data.content}
                    </p>
                  </div>
                  <div className="ml-3">
                    <p className="md:text-sm text-[10px]">{data.updatedData}</p>
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
    </>
  );
}
