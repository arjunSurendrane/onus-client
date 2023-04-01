import React, { useState } from "react";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import LoadingPage from "../../Error/loading";
import ServerDown from "../../Error/serverDown";
import DoughnutChart from "../Chart/doughnutChart";
import EmptyImage from "../../../assets/rest-image.png";
import { useParams } from "react-router-dom";
export default function WorkloadChart() {
  const [cookies, setCookies] = useCookies();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const { id } = useParams();

  const { isLoading, error, data } = useSWR(
    {
      id: user._id,
      link: "getAssignedTask",
      operation: "get",
      cookies: cookies.useJwt,
      workspaceId: id,
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
    console.log({ data });
    const tasks = data.data.data.assignedTasks;
    console.log(tasks);
    const chartData = {
      labels: tasks.map((el) => el._id),
      datasets: [
        {
          label: "Workload",
          data: tasks.map((el) => el.data.length),
          fill: false,
          backgroundColor: [
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(153, 102, 255, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div className="min-h-[60vh] overflow-hidden">
        <div className="md:mx-14 mx-5 mt-10 py-20  md:w-[70vw] w-[87vw]  flex justify-around px-2 border border-t-4  shadow-lg rounded ">
          <div>
            <div className="text-center  font-bold">
              {" "}
              <h1>Workload</h1>
            </div>
            {tasks.length ? (
              <div className="w-44 h-44">
                <DoughnutChart chartData={chartData} />
              </div>
            ) : (
              <div className="w-44 h-44">
                <img src={EmptyImage} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
