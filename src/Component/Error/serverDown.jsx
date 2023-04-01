import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import ServerDownimg from "../../assets/server-down.svg";

export default function ServerDown() {
  useEffect(() => {
    toast.error("Server down");
  }, []);

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  bg-opacity-60 focus:outline-none">
      <Toaster />
      <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
        <img src={ServerDownimg} alt="" />
      </div>
    </div>
  );
}
