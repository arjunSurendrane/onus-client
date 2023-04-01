import React from "react";
import AreaChartComponent from "./AreaChart";
import SampleChart from "./sampleChart";

export default function DashboardChart() {
  return (
    <div className="md:mx-5 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-10  rounded">
      <div className="flex justify-between p-10">
        <div className="w-full shadow-lg px-5 mx-2 border-t-2">
          <div className="w-full text-center my-5 font-bold">Users</div>
          <div className="my-10 ">
            {" "}
            <SampleChart />
          </div>
        </div>
        <div className="w-full shadow-lg px-5 mx-2 border-t-2">
          <div className="w-full text-center my-5 font-bold">Users</div>
          <div className="my-10 ">
            {" "}
            <AreaChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
