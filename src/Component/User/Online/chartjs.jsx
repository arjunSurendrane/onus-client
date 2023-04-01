import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = [];
let i = 1;
while (i < 24) {
  let j;
  i <= 12 ? (j = `${i}AM`) : (j = `${i - 12}PM`);
  labels.push(j);
  i++;
  console.log("here");
}

const data = {
  labels: labels,
  datasets: [
    {
      label: "Online Members",
      borderColor: "#7b68ee",
      data: [1, 0, 4],
    },
  ],
};

const LineChart = ({ users }) => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
