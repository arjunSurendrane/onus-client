import React from "react";
import EmptyImage from "../../../assets/rest-image.png";

export default function EmptyData({ heading }) {
  return (
    <div className="min-h-[60vh] overflow-hidden">
      <div className="md:mx-14 mx-5 mt-10 py-20  md:w-[70vw] w-[87vw]  flex justify-around px-2 border border-t-4  shadow-lg rounded ">
        <div>
          <div className="text-center  font-bold">
            {" "}
            <h1>{heading}</h1>
          </div>
          <div className="w-44 h-44 mt-5">
            <img src={EmptyImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
