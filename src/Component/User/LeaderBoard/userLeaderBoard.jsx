import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineRemoveModerator } from "react-icons/md";
import UserProfile from "../Users/UserProfile";
import useSWR from "swr";
import { sendRequest } from "../../../api/sampleapi";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ServerDown from "../../Error/serverDown";
import LoadingPage from "../../Error/loading";
import EmptyData from "../Empty/emptyData";

export default function UserLeaderBoard() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const { id } = useParams();
  const [cookies, setCookies] = useCookies();

  /**
   * Fetch data from server
   */
  const {
    isLoading,
    error,
    data: workloadData,
    mutate,
  } = useSWR(
    {
      link: "fetchWorkspaceWorkload",
      id,
      operation: "get",
      cookies: cookies.userJwt,
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
    console.log(workloadData);
    const workspaceMembers = workloadData?.data?.data?.usersWorkload;
    console.log({ workspaceMembers });
    if (workspaceMembers.length) {
      return (
        <div>
          <div className="md:mx-14  mt-5 md:w-[72vw] w-[87vw]  flex justify-between  rounded">
            <table class="table-fixed w-full border-separate border-spacing-1 border border-slate-500 bg-[#7c68ee14] rounded">
              <thead>
                <tr className="text-center">
                  <th className="border border-slate-600 py-2 bg-[#7c68ee53]">
                    No
                  </th>
                  <th className="border border-slate-600 bg-[#7c68ee53]">
                    Name
                  </th>
                  <th className="border border-slate-600 bg-[#7c68ee53]">
                    Email
                  </th>
                  <th className="border border-slate-600 bg-[#7c68ee53]">
                    Workload
                  </th>
                </tr>
              </thead>
              <tbody>
                {workspaceMembers.map((data, i) => (
                  <tr
                    key={i}
                    className="text-center cursor-pointer"
                    onClick={() => {
                      setModal(true);
                      setData(data);
                    }}
                  >
                    <td className="border border-slate-700">{i + 1}</td>
                    <td className="border border-slate-700">
                      {data?.user[0]?.name}
                    </td>

                    <td className="border border-slate-700">
                      {data?.user[0]?.email}
                    </td>
                    <td className="border border-slate-700">{data.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {modal && (
            <UserProfile closeModal={() => setModal(false)} userData={data} />
          )}
        </div>
      );
    } else {
      return <EmptyData heading={"No Data"} />;
    }
  }
}
