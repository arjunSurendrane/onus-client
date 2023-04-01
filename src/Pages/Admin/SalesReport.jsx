import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import AdminSalesReport from "../../Component/Admin/Sales/AdminSalesReport";
import AdminSidebar from "../../Component/Admin/Sidebar/AdminSidebar";
import {
  fetchUser,
  selectAllUser,
  selectAllUserStatus,
} from "../../features/Admin/allUserSlice";

export default function SalesReport() {
  const dispatch = useDispatch();
  const userlistStatus = useSelector(selectAllUserStatus);
  const usersList = useSelector(selectAllUser);
  const [cookie, setCookie] = useCookies();
  useEffect(() => {
    console.log(userlistStatus);
    if (userlistStatus == "idle") {
      const res = dispatch(fetchUser(cookie.adminJwt));
    }
    console.log({ usersList });
  }, [userlistStatus, dispatch]);
  return (
    <div>
      <AdminSidebar />
      <div className="md:mx-[18%] absolute items-center">
        <AdminSalesReport userList={usersList} />
      </div>
    </div>
  );
}
