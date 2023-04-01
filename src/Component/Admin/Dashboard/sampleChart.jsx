import React from "react";
import {
  Chart as chartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

chartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function SampleChart() {
  const data = {
    labels: [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 3, 5, 7, 5, 10, 8, 8, 9, 10, 8, 9],
      },
    ],
  };
  const options = {
    Plugin: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 10,
        ticks: { stepSize: 2, callback: (value) => value + "K" },
        grid: { borderDash: [10] },
      },
    },
  };
  return (
    <div className="w-[500px] ">
      <Line data={data} options={options}></Line>
    </div>
  );
}
