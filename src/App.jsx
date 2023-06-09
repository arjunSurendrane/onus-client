import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/User/LandingPage/LandingPage";
import ForgotPassword from "./Pages/User/Login/forgotPasswordOtp";
import OtpPage from "./Pages/User/Login/OtpPage";
import UserLogin from "./Pages/User/Login/userLogin";
import UserSignup from "./Pages/User/Signup/userSignup";
import AdminLoginPage from "./Pages/Admin/login";
import { useCookies } from "react-cookie";
import AdminRoutes from "./routes/Admin/adminRoutes";
import UserRoutes from "./routes/User/userRoutes";
import ConfrimInvitation from "./Pages/User/InviteConfirmation/confrimInvitation";
import UserOutlet from "./routes/User/userOutlet";
import CreateWorkspace from "./Pages/User/Workspace/createWorkspace";
import CreateDepartment from "./Pages/User/Workspace/createDepartment";
import CreateTaskFromLogin from "./Pages/User/Workspace/createTaskFromLogin";
import socketIoClient from "socket.io-client";
import Redirect from "./Component/User/Loading.js/redirect";
const ENDPOINT = "http://localhost:4000";
const socket = socketIoClient(ENDPOINT, { auth: { token: 123 } });
export const SocketContext = createContext();
function App() {
  return (
    <div className="overflow-y-hidden">
      <SocketContext.Provider value={socket}>
        <Routes>
          {/* ===========Admin============ */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* ========User=========== */}
          <Route path="/accept/:id" element={<ConfrimInvitation />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/otpVerification" element={<OtpPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/" element={<UserOutlet />}>
            <Route path="createWorkspace" element={<CreateWorkspace />} />
            <Route path="createDepartment" element={<CreateDepartment />} />
            <Route path="createProject" element={<CreateTaskFromLogin />} />
            <Route path="/:id/*" element={<UserRoutes />} />
          </Route>
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
