import * as React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../../../assets/toppng.com-teamwork-icon-black-and-white-407x435.png";

export default function LandingNav() {
  const [nav, setNav] = React.useState(false);
  const handleNav = () => {
    setNav((preNav) => !preNav);
  };
  return (
    <div className="items-center flex justify-between h-24 max-w-[1240px] mx-auto px-4">
      <img src={logo} alt="" className="w-10 h-10" />
      <h1 className="w-full text-3xl font-bold text-[#75337d]">Onus</h1>
      <div className=" hidden md:flex">
        <ul className="flex">
          <li className="p-4 font-bold">Home</li>
        </ul>
      </div>

      <button
        className="p-25 cursor-pointer block md:hidden"
        onClick={handleNav}
      >
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </button>

      <div
        className={
          nav
            ? `fixed left-0 top-0 w-[60%] border-r h-full bg-gray-100 ease-in-out  duration-500`
            : `fixed left-[-100%] `
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#75337d] m-4">Onus</h1>
        <ul className="p-4  uppercase">
          <li className="p-4 border-gray-900 font-bold">Home</li>
          <li className="p-4 border-gray-900 font-bold">About</li>
          <li className="p-4 border-gray-900 font-bold">Contact</li>
        </ul>
      </div>
    </div>
  );
}
