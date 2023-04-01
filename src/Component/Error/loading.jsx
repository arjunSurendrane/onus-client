import React from "react";

export default function LoadingPage() {
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="grid place-content-center">
            <h1>Loading</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
