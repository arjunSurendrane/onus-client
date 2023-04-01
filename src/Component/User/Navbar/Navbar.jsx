import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineNotification,
} from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { GiUpgrade } from "react-icons/gi";
import { GrFormAdd } from "react-icons/gr";
import { HiOutlineHome, HiStatusOnline } from "react-icons/hi";
import { MdWorkspacesOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import businessLogo from "../../../assets/business.png";
import businessPlusLogo from "../../../assets/businessPlus.png";
import logo from "../../../assets/toppng.com-teamwork-icon-black-and-white-407x435.png";
import Sidebar from "../Sidebar/Sidebar";

export default function Navbar({ heading, secHeading, thirdHeading, active }) {
  const [nav, setNav] = React.useState(false);
  const [plan, setPlan] = useState(localStorage.getItem("plan"));
  const history = useNavigate();
  const { id } = useParams();

  console.log(plan);

  const handleNav = () => {
    setNav((preNav) => !preNav);
  };
  return (
    <div className="border-b-2 bg-[#ffff]">
      <div className=" items-center flex justify-between h-24  w-screen  mx-auto  md:px-10 px-1">
        <button
          className="p-25 cursor-pointer block md:hidden mx-4"
          onClick={handleNav}
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </button>
        <img src={logo} alt="" className="md:w-10 w-7 h-7 md:h-10" />

        <h1 className="w-full md:text-3xl sm:text-2xl text-xl font-bold text-[#75337d] cursor-pointer">
          Onus
        </h1>
        <div className=" flex">
          <ul className="flex">
            <li
              className={
                active === "h"
                  ? "p-4 cursor-pointer font-medium bg-gradient-to-r from-[#75337d]  to-[#7b68ee] inline-block text-transparent bg-clip-text"
                  : "p-4 cursor-pointer font-medium"
              }
              onClick={() => history(`/${id}/dashboard`)}
            >
              <p
                className={
                  active === "h"
                    ? "md:text-lg sm:text-sm text-xs border-b-4 border-[#7b68ee] "
                    : "md:text-lg sm:text-sm text-xs"
                }
              >
                {" "}
                {heading}
              </p>
            </li>
            <li
              className={
                active === "s"
                  ? "p-4 cursor-pointer font-medium bg-gradient-to-r from-[#75337d]  to-[#7b68ee] inline-block text-transparent bg-clip-text"
                  : "p-4 cursor-pointer font-medium"
              }
              onClick={() => history(`/${id}/workload/table`)}
            >
              <p
                className={
                  active === "s"
                    ? "md:text-lg sm:text-sm text-xs border-b-4 border-[#7b68ee] "
                    : "md:text-lg sm:text-sm text-xs"
                }
              >
                {secHeading}
              </p>
            </li>
            <li
              className={
                active === "t"
                  ? "p-4 cursor-pointer font-medium bg-gradient-to-r from-[#75337d]  to-[#7b68ee] inline-block text-transparent bg-clip-text"
                  : "p-4 cursor-pointer font-medium"
              }
            >
              <p
                className={
                  active === "t"
                    ? "md:text-lg sm:text-sm text-xs border-b-4 border-[#7b68ee] "
                    : "md:text-lg sm:text-sm text-xs"
                }
              >
                {" "}
                {thirdHeading}
              </p>
            </li>
            {plan != "free" ? (
              <li
                className={
                  active === "h"
                    ? "p-4 cursor-pointer font-medium bg-gradient-to-r from-[#75337d]  to-[#7b68ee] inline-block text-transparent bg-clip-text"
                    : "p-4 cursor-pointer font-medium"
                }
              >
                <p
                  className={
                    plan != "Business"
                      ? "md:text-lg sm:text-sm text-xs border-b-4 border-[#7b68ee] "
                      : "md:text-lg sm:text-sm text-xs "
                  }
                >
                  <div className="w-6 h-6 grid place-content-center">
                    <span
                      data-te-toggle="tooltip"
                      title={`${plan} Member`}
                      className="transititext-primary text-primary transition duration-100 ease-in-out hover:text-primary-400 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                    >
                      {" "}
                      {plan == "Business" ? (
                        <img src={businessLogo} alt="" />
                      ) : (
                        <img src={businessPlusLogo} alt="" />
                      )}
                    </span>
                  </div>
                </p>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <div
          className={
            nav
              ? `fixed left-0 top-0 w-[60%] border-r h-full z-20 py-8 bg-white ease-in-out  duration-500`
              : `fixed left-[-100%] `
          }
        >
          <button
            className="p-25 cursor-pointer block md:hidden mx-4"
            onClick={handleNav}
          >
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </button>
          <ul className="space-y-2 px-2">
            <li onClick={() => history("/home")}>
              <a
                href="#"
                className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <HiOutlineHome size={20} />

                <span className="ml-3 font-medium text-sm">Home</span>
              </a>
            </li>
            <li onClick={() => history("/notification")}>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <AiOutlineNotification size={20} />

                <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                  Notification
                </span>
              </a>
            </li>
            <li onClick={() => history("/online")}>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <HiStatusOnline size={20} />
                <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                  Online
                </span>
              </a>
            </li>
            <li onClick={() => history("/chat")}>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <BiChat size={20} />
                <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                  Chat
                </span>
              </a>
            </li>
            <hr />
            <li
              className="bg-gray-200 rounded-lg"
              onClick={() => setShowModal(true)}
            >
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <GrFormAdd size={20} />
                <span className="flex-1  ml-3 whitespace-nowrap font-medium text-xs text-gray-500 uppercase">
                  Add workspace
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <MdWorkspacesOutline size={20} />
                <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                  Workspace
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <GiUpgrade size={20} />
                <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                  Upgrade
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
              >
                <FiLogOut size={20} />
                <span
                  className="flex-1 ml-3 text-sm whitespace-nowrap font-medium"
                  onClick={() => removeCookies("userJwt")}
                >
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
