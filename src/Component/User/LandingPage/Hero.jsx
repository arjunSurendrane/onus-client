import React from "react";
import Typed from "react-typed";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const history = useNavigate();
  return (
    <div>
      <div className="max-w-[800]  mt-[-99px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="font-bold p-2 uppercase text-[#75337d]">
          Manage Your workload here
        </p>
        <h1 className=" md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          One workspace Every team.
        </h1>
        <div>
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Connect your teams and projects.{" "}
          </p>
          <Typed
            className="md:text-4xl sm:text-3xl mt-5 text-xl font-bold"
            strings={[
              "Team up without the chaos",
              "Build the workflow you want",
              "Never ask “What’s the context?” again",
            ]}
            typeSpeed={90}
            backSpeed={90}
            loop
          />
        </div>
        <div className=" mx-auto">
          <button
            className="bg-[#75337d] w-[150px] rounded-md font-medium my-6  py-3 text-white"
            onClick={() => history("/signup")}
          >
            SignUp
          </button>
          <button
            className=" w-[100px] rounded-md font-medium my-6 "
            onClick={() => history("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
