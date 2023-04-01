import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({ chartData }) {
  console.log({ value: chartData.datasets[0].data });
  return (
    <div>
      <div>
        <Pie data={chartData} />
      </div>
    </div>
  );
}
