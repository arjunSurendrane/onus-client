import React, { useState } from "react";
import { ImHome3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function Popup() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-70 focus:outline-none ease-in">
      <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none items-center">
          <div className="duration-100">
            <ImHome3 size={30} color={"white"} />
          </div>
          <p
            className="text-white font-bold text-xl cursor-pointer hover:text-2xl duration-100"
            onClick={() => navigate("/home")}
          >
            Go to Home Page
          </p>
        </div>
      </div>
    </div>
  );
}
