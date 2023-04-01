import React from "react";
import AdminNotification from "../../Component/Admin/Notification/Notification";
import AdminSidebar from "../../Component/Admin/Sidebar/AdminSidebar";

export default function AdminNotificationPage() {
  return (
    <div>
      <AdminSidebar />
      <div className="md:mx-[18%] absolute items-center">
        <AdminNotification />
      </div>
    </div>
  );
}
