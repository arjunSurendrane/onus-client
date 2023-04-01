import React, { useState } from "react";
import PaymentModal from "./paymentModal";

export default function UpgradePage() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  return (
    <div className="md:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-2  text-center rounded">
      <div className="w-full ">
        <div className="w-full">
          <h1 className="w-full text-3xl font-bold text-[#75337d] my-2">
            Pricing
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 my-10 ">
          {/* <div className="p-5 hover:-translate-y-1 hover:scale-125 transition ease-in-out delay-150 duration-300 ">
            <div className=" bg-gray-100 mx-auto   shadow-2xl py-10 border-y-[#00b884]">
              <p className="uppercase font-bold text-[#00b884] py-1">
                free forever
              </p>
              <p className="text-sm  py-1">Best for personal use</p>
              <h1 className=" py-1 font-bold text-5xl text-[#00b884]">Free</h1>
              <p className="  py-1 text-xs font-bold text-gray-400 uppercase">
                Forever
              </p>
              <button
                className="  mt-2 rounded-md bg-[#00b884] text-white w-[150px] h-[40px] hover:bg-[#2a6b58] focus:border-2 "
                onClick={() => {
                  props.page == "landing"
                    ? history("/signup")
                    : history("/workspace");
                }}
              >
                Free Forever
              </button>
              <p className="py-1 mt-5 text-md">50 tasks</p>
              <p className="py-1 text-md">Add 10 memebers into workspace</p>
              <p className="py-1 text-md">Two-Factor Authentication</p>
              <p className="py-1 text-md">Real time chat</p>
              <p className="py-1 text-md">In app video recording</p>
              <p className="py-1 text-md">24/7 support</p>
            </div>
          </div> */}
          <div className="p-5   ">
            <div className=" bg-gray-100 hover:bg-[#f6fdff] transition ease-in-out delay-150 duration-300 mx-auto shadow-2xl  py-10">
              <p className="uppercase font-bold text-[#49ccf9] py-1">
                Business
              </p>
              <p className="text-sm  py-1">Best for mid sized teams</p>
              <h1 className=" py-1 font-bold text-5xl text-[#49ccf9]">₹499</h1>
              <p className="  py-1 text-xs font-bold text-gray-400 uppercase">
                Per member per month
              </p>
              <button
                className="  mt-2 rounded-md bg-[#49ccf9] text-white w-[150px] h-[40px] hover:bg-[#246980] focus:border-2 "
                onClick={() => {
                  setData({ plan: "Business", amount: 499 });
                  setShowModal(true);
                }}
              >
                Get Started
              </button>
              <p className="py-1 mt-5 text-md">50 tasks</p>
              <p className="py-1 text-md">Add 10 memebers into workspace</p>
              <p className="py-1 text-md">Create 10 departments</p>
              <p className="py-1 text-md">Real time chat</p>
              {/* <p className="py-1 text-md">In app video recording</p> */}
              <p className="py-1 text-md">24/7 support</p>
            </div>
          </div>
          <div className="p-5 ">
            <div className=" bg-gray-100  hover:bg-[#f6fdff] transition ease-in-out delay-150 duration-300  mx-auto shadow-2xl py-10">
              <p className="uppercase font-bold text-[#7b68ee] py-1">
                Business Plus
              </p>
              <p className="text-sm  py-1">Best Multiple Teams</p>
              <h1 className=" py-1 font-bold text-5xl text-[#7b68ee]">₹699</h1>
              <p className="  py-1 text-xs font-bold text-gray-400 uppercase">
                per member per month
              </p>
              <button
                className="  mt-2 rounded-md bg-[#7b68ee] text-white w-[150px] h-[40px] hover:bg-[#50439a] focus:border-2 "
                onClick={() => {
                  setData({ plan: "Business Plus", amount: 699 });
                  setShowModal(true);
                }}
              >
                Get Started
              </button>
              <p className="py-1 mt-5 text-md">unlimited tasks</p>
              <p className="py-1 text-md">
                Add unlimited memebers into workspace
              </p>
              <p className="py-1 text-md">Create unlimited departments</p>
              <p className="py-1 text-md">Real time chat</p>
              {/* <p className="py-1 text-md">In app video recording</p> */}
              <p className="py-1 text-md">24/7 support</p>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <PaymentModal close={() => setShowModal(false)} reqBody={data} />
      )}
    </div>
  );
}
