import React from "react";
import logo from "../../../assets/toppng.com-teamwork-icon-black-and-white-407x435.png";

export default function Footer() {
  return (
    <div>
      <footer className="p-4 bg-white  shadow md:px-6 md:py-8 dark:bg-gray-200 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img src={logo} className="mr-3 h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              Onus
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-black">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-black">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Onus
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}
