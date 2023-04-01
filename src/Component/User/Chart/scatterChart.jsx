import React from "react";
import { Scatter } from "react-chartjs-2";

export default function ScatterChart({ chartData }) {
  console.log({ value: chartData.datasets[0].data });
  return (
    <div>
      <div>
        <Scatter data={chartData} />
      </div>
    </div>
  );
}
