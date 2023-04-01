import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "../../Component/Admin/Sidebar/AdminSidebar";
import AdminChat from "../../Pages/Admin/AdminChat";
import AdminDashboard from "../../Pages/Admin/Dashboard";
import AdminNotificationPage from "../../Pages/Admin/Notification";
import SalesReport from "../../Pages/Admin/SalesReport";
import UserManagement from "../../Pages/Admin/Users";

export default function AdminRoutes() {
  return (
    <div>
      {" "}
      <AdminSidebar />
      <Routes>
        <Route path="/">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="notification" element={<AdminNotificationPage />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="sales" element={<SalesReport />} />
          <Route path="chat" element={<AdminChat />} />
        </Route>
      </Routes>
    </div>
  );
}
