import React, { useEffect, useState } from "react";
import { HiOutlineHome, HiStatusOnline } from "react-icons/hi";
import { AiOutlineNotification, AiFillDashboard } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaUsersCog } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { MdWorkspacesOutline } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { CgMoveTask } from "react-icons/cg";
import { GiUpgrade, GiTakeMyMoney } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdSpaceDashboard, MdLeaderboard } from "react-icons/md";
import { useCookies } from "react-cookie";
import CreateWorkspace from "../../workSpaceForm";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/material";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function AdminSidebar() {
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  const [cookies, setCookies, removeCookies] = useCookies();
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [showList, setShowList] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="md:visible invisible">
        <aside className="w-64" aria-label="Sidebar">
          <div className="overflow-y-auto absolute z-[-1] border-2 shadow-xl py-52 px-3  w-[17%] my-20  max-h-55vh">
            <ul className="space-y-2 px-2">
              <li onClick={() => history("/admin/Dashboard")}>
                <a
                  href="#"
                  className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <AiFillDashboard size={20} />

                  <span className="ml-3 font-medium text-sm ">Dashboard</span>
                </a>
              </li>
              {/* <li onClick={() => history("/admin/notification")}>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-900 dark:hover:bg-gray-900"
                >
                  <AiOutlineNotification size={20}  />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium ">
                    Notification
                  </span>
                </a>
              </li> */}
              <li onClick={() => history("/admin/userManagement")}>
                <a
                  href="#"
                  className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <FaUsersCog size={20} />

                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium ">
                    Users
                  </span>
                </a>
              </li>
              <li onClick={() => history("/admin/sales")}>
                <a
                  href="#"
                  className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <GiTakeMyMoney size={20} />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium ">
                    Sales Report
                  </span>
                </a>
              </li>

              <li onClick={() => history("/admin/chat")}>
                <a
                  href="#"
                  className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <BiChat size={20} />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium ">
                    Chat
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
                    onClick={() => removeCookies("adminJwt")}
                  >
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      {showModal && <CreateWorkspace close={() => setShowModal(false)} />}
    </>
  );
}
