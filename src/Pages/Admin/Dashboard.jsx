import React, { useEffect, useState } from "react";
import DashboardChart from "../../Component/Admin/Dashboard/Dahsboard";
import AdminSidebar from "../../Component/Admin/Sidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  selectAllUser,
  selectAllUserStatus,
} from "../../features/Admin/allUserSlice";
import { useCookies } from "react-cookie";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const userlistStatus = useSelector(selectAllUserStatus);
  const usersList = useSelector(selectAllUser);
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (!cookie.adminJwt) {
      history("/admin");
    }
    if (userlistStatus == "idle") {
      setLoading(true);
      const res = dispatch(fetchUser(cookie.adminJwt));
    }
    if (userlistStatus == "succeeded") {
      setLoading(false);
    }
    console.log({ usersList });
  }, [userlistStatus, dispatch]);

  return (
    <div>
      <AdminSidebar />
      <div className="md:mx-[18%] absolute items-center">
        {loading ? (
          <div className="md:mx-5 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-10  rounded">
            <div className="flex justify-between p-10 ">
              <div className="w-full shadow-lg px-5 mx-2 border-t-2">
                <Stack spacing={2}>
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton variant="rectangular" width={400} height={200} />
                </Stack>
              </div>
              <div className="w-full shadow-lg px-5 mx-2 border-t-2">
                <Stack spacing={2}>
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton variant="rectangular" width={400} height={200} />
                </Stack>
              </div>
            </div>
          </div>
        ) : (
          <DashboardChart />
        )}
      </div>
    </div>
  );
}
