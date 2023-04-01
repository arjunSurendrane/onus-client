import React from "react";
import pageNotFound from "../../assets/pageNotFound.svg";

export default function PageNotFound() {
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="grid place-content-center">
            <img src={pageNotFound} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
