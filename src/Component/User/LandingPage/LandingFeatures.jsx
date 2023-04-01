import React from "react";
import TeamCollab from "../../../assets/undraw_team_collaboration_re_ow29.svg";
import TaskImage from "../../../assets/undraw_add_tasks_re_s5yj.svg";
const list = [
  {
    heading: "About",
    content:
      "Connect your teams, projects, and docs in Notion — so you can bust silos and move as one",
    image: TeamCollab,
    position: "left",
  },
  {
    heading: "Build the workflow you want",
    content:
      "Customize Notion to make it work the way you want it to. Just drag and drop to craft the dashboard, website, doc, or system you need.",
    image: TaskImage,
    position: "right",
  },
];

export default function Features() {
  const RenderingPage = list.map((data, key) => (
    <div
      className="max-w-full mt-[-99px] w-full h-screen mx-auto text-center flex flex-col justify-center"
      key={key}
    >
      <div className="w-full max-w-full mt-[-99px] h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="w-full text-3xl font-bold text-[#75337d] my-2">
          {data.heading}
        </h1>
        <div className=" w-[1300px] h-[500px] mx-auto  max-w-full  md:flex justify-between px-3 py-3 rounded-3xl">
          {data.position === "left" ? (
            <div className="mt-10 md:flex">
              <p className="md:my-32 md:text-3xl sm:text-xl text-xl font-bold mx-auto">
                {data.content}
              </p>

              <img
                src={data.image}
                alt="image"
                className="mt-10 md:mt-0 md:w-[400px] sm:w-[300px] w-[300px] mx-auto"
              />
            </div>
          ) : (
            <div className="mt-10 md:flex">
              {" "}
              <img
                src={data.image}
                alt="image"
                className="  md:w-[500px] sm:w-[300px] w-[300px] mx-auto"
              />
              <p className=" sm:my-32 md:text-3xl sm:text-xl text-xl font-bold mt-10">
                {data.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  ));
  return <>{RenderingPage}</>;
}
