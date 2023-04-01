import React from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import LineChart from "./chartjs";

export default function Chart({ users }) {
  return (
    <div>
      <LineChart users={users} />
    </div>
  );
}
