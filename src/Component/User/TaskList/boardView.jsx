import React from "react";

export default function Board() {
  return (
    <div>
      <div className="md:flex justify-between md:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw] px-2   ">
        <div>
          <p className="font-medium text-sm text-gray-500">TODO</p>
          <div className="w-56 h-56 bg-gray-100 mt-3 border border-t-gray-500 border-t-4 rounded-t-lg shadow-lg"></div>
        </div>
        <div>
          <p className="font-medium text-[#a875ff] text-sm">IN PROGRESS</p>
          <div className="w-56 h-56 bg-gray-100 mt-3 border-t-[#a875ff] border-t-4 rounded-t-lg shadow-lg"></div>
          <div className="w-56 h-56 bg-gray-100 mt-3 border-t-[#a875ff] border-t-4 rounded-t-lg shadow-lg"></div>
        </div>
        <div>
          <p className="font-medium text-[#6bc950] text-sm">COMPLETED</p>
          <div className="w-56 h-56 bg-gray-100 mt-3 border-t-[#6bc950] border-t-4 rounded-t-lg shadow-lg"></div>
          <div className="w-56 h-56 bg-gray-100 mt-3 border-t-[#6bc950] border-t-4 rounded-t-lg shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}
