import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart-container w-full">
      <h2 style={{ textAlign: "center" }}>Perfomance Chart</h2>
      <div className=" grid place-content-center">
        <div className="w-60 h-60">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
}
export default PieChart;
