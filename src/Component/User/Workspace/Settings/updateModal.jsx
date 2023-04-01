import React, { useState } from "react";

export default function UpdateRole({ close }) {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
      <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%] flex justify-center">
        <div
          className="border-0 rounded-lg shadow-lg relative   w-[60%] bg-white outline-none focus:outline-none p-10 text-center
        "
        >
          <div
            className="border-2 rounded-full w-7 cursor-pointer"
            onClick={() => close()}
          >
            X
          </div>
          <div className="overflow-y-scroll">div</div>
        </div>
      </div>
    </div>
  );
}
