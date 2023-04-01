import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import noTaskImg from "../../../assets/notask.svg";
import LoadingPage from "../../Error/loading";
import ServerDown from "../../Error/serverDown";
import DoughnutChart from "../Chart/doughnutChart";
import PieChart from "../Chart/pieChart";
import RadarChart from "../Chart/radarChart";
import ScatterChart from "../Chart/scatterChart";
import EmptyData from "../Empty/emptyData";

export default function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const { id } = useParams();
  const [cookies, setCookies] = useCookies();
  const { isLoading, error, data } = useSWR(
    {
      id,
      link: "fetchWorkspaceWorkload",
      operation: "get",
      cookies: cookies.userJwt,
    },
    sendRequest
  );
  if (isLoading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  } else if (error) {
    return (
      <>
        <ServerDown />
      </>
    );
  } else {
    const { workload, usersWorkload } = data.data.data;
    console.log({ workload, usersWorkload });

    const chartData = {
      labels: workload.map((el) => el._id),
      datasets: [
        {
          label: "Workload",
          data: workload.map((el) => el.count),
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const userChartData = {
      labels: usersWorkload.map((el) => el.user[0].name),
      datasets: [
        {
          label: "Workload",
          data: usersWorkload.map((el) => el.count),
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    if (workload.length || usersWorkload.length) {
      return (
        <div className="h-[80vh] overflow-y-scroll">
          <div className="md:mx-14 mx-5 mt-10 py-20  md:w-[70vw] w-[87vw]  flex justify-around px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded ">
            {chartData ? (
              <>
                <div className="text-center font-bold">
                  <h1>User Workload Data</h1>
                  <DoughnutChart chartData={userChartData} />
                </div>

                <div className="text-center font-bold">
                  <h1>Workspace Workload</h1>
                  <PieChart chartData={chartData} />
                </div>
              </>
            ) : (
              <div className="grid place-content-center w-full mt-10">
                <div className="w-52 h-52 text-center">
                  <img src={noTaskImg} alt="no task image" />
                  <h1 className="mt-5 font-medium text-sm">No Workload</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return <EmptyData heading={"No Data"} />;
    }
  }
}
