import React, { useState } from "react";

export default function LineUp() {
  const [lineUpTask, setLineUpTask] = useState(
    JSON.parse(localStorage.getItem("LinupTask"))
  );
  return (
    <div className="px-5 py-5">
      <div className="">
        <p className="text-2xl font-medium">LineUp</p>
        <p className="mx-5 cursor-pointer">+ add</p>
      </div>
      <div>
        <div className=" mt-5">
          <input
            type="text"
            placeholder="+ Add your most important task here"
            className="text-center md:w-96  w-[80vw]  bg-gray-100 h-10 rounded-lg uppercase text-xs font-medium cursor-pointer"
            readOnly
          />
        </div>
        <div className="w-[40vw] h-[40vh] border border-gray-200 bg-gray-100 shadow-inner mt-1"></div>
      </div>
    </div>
  );
}
