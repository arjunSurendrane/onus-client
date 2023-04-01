import axios from "../api/index";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/users/userSlice";
import { MdOutlineCancel } from "react-icons/md";

export default function CreateWorkspace({ close }) {
  const [data, setData] = useState();
  const [errorMsg, setErrorMsg] = useState();
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-lg font-semibold text-gray-600">
                Create Your Workspace
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => close()}
              >
                <MdOutlineCancel size={20} />
              </button>
            </div>
            <div className="relative p-6 flex-auto mb-5">
              <form action="">
                <div>
                  <label htmlFor="workspace" className="sr-only">
                    Workspace Name
                  </label>
                  <input
                    id="workspace"
                    name="text"
                    type="text"
                    value={data}
                    required
                    autoComplete="email"
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Workspace Name"
                  />
                  <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#75337D] py-2 px-4 text-sm font-medium text-white hover:bg-[#56245b] focus:outline-none focus:ring-2 focus:ring-[#56245b] focus:ring-offset-2"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
