import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart({ chartData }) {
  console.log({ value: chartData.datasets[0].data });
  return (
    <div>
      <div>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
}
