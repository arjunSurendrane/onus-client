import { FormControlLabel, Switch } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
const leaderboard = [
  {
    name: "arjun",
    email: "arju@gmail.com",
    date: "19/09/2022",
    paymentMethod: "upi",
    plan: "100",
  },
  {
    name: "ramshad",
    email: "ramshad@gmail.com",
    date: "19/09/2022",
    paymentMethod: "bank",
    plan: "900",
  },
  {
    name: "sreehari",
    email: "abhinav@gmail.com",
    date: "19/09/2022",
    paymentMethod: "bank",
    plan: "499",
  },
  {
    name: "Hrithik",
    email: "abheesh@gmail.com",
    date: "19/10/2022",
    paymentMethod: "bank",
    plan: "709",
  },
];

export default function AdminSalesReport({ userList }) {
  const [block, setBlock] = useState({});
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const [total, setTotal] = useState(1000);
  const [sort, setSort] = useState("date");
  let ascending = [...leaderboard];
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="md:mx-14 mt-5   md:w-[72vw] w-[87vw]  flex justify-between  rounded">
        <div className=" w-full flex justify-between">
          <div className="px-2 py-2 flex">
            <h1 className="m-2 font-bold text-gray-700">Sort</h1>
            <select
              class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              id="filter"
              onChange={handleChange}
            >
              <option value="Date" className="font-medium ">
                Date
              </option>
              <option value="price" className="font-medium ">
                Price
              </option>
              <option value="Name" className="font-medium ">
                Name
              </option>
              <option value="paymentMethod" className="font-medium ">
                Payment Method
              </option>
            </select>
          </div>
          <div className="px-2 py-4 bg-green-100 rounded">
            <h1 className="text-green-700 font-bold">Total : ₹{total}</h1>
          </div>
        </div>
      </div>
      <div className="md:mx-14  mt-5 md:w-[72vw] w-[87vw]  flex justify-between  rounded">
        <table class="table-fixed w-full border-separate border-spacing-1 border border-slate-500 bg-gray-200 rounded">
          <thead>
            <tr className="text-center">
              <th className="border border-slate-600 py-2 bg-gray-500 ">No</th>
              <th className="border border-slate-600 bg-gray-500 ">username</th>
              <th className="border border-slate-600 bg-gray-500 ">email</th>
              <th className="border border-slate-600 bg-gray-500 ">date</th>
              <th className="border border-slate-600 bg-gray-500 ">
                Payment Method
              </th>
              <th className="border border-slate-600 bg-gray-500">price</th>
            </tr>
          </thead>
          <tbody>
            {ascending.map((data, i) => (
              <tr
                key={i}
                className="text-center cursor-pointer"
                onClick={() => {
                  setModal(true);
                  setData(data);
                }}
              >
                <td className="border border-slate-700 font-medium text-sm py-2">
                  {i + 1}
                </td>
                <td className="border border-slate-700 font-medium text-sm py-2">
                  {data.name}
                </td>
                <td className="border border-slate-700 font-medium text-sm py-2">
                  {data.email}
                </td>
                <td className="border border-slate-700 font-medium text-sm py-2">
                  {data.date}
                </td>
                <td className="border border-slate-700 font-medium text-sm py-2">
                  {data.paymentMethod}
                </td>
                <td className="border border-slate-700 font-medium text-sm py-2">
                  {data.plan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {modal && <UserProfile closeModal={() => setModal(false)} user={data} />} */}
    </div>
  );
}
