import React from "react";
import { Radar } from "react-chartjs-2";

export default function RadarChart({ chartData }) {
  console.log({ value: chartData.datasets[0].data });
  return (
    <div>
      <div>
        <Radar data={chartData} />
      </div>
    </div>
  );
}
