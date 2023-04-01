import React from "react";
import AdminChatComponent from "../../Component/Admin/Chat/AdminChatComponent";
import AdminSidebar from "../../Component/Admin/Sidebar/AdminSidebar";

export default function AdminChat() {
  return (
    <div>
      <div className="md:mx-[18%] absolute items-center">
        <AdminChatComponent />
      </div>
    </div>
  );
}
