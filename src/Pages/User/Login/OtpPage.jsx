import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import OtpVerification from "../../../Component/User/Login and Signup/OtpVerification";

export default function OtpPage() {
  const [cookies, setCookie] = useCookies();
  const [workspaceId, setWorkspaceId] = useState(
    localStorage.getItem("CurrentWSpace")
  );
  const history = useNavigate();

  useEffect(() => {
    if (cookies.userJwt && workspaceId) {
      history(`${workspaceId}/home`);
    }
  });
  return (
    <div>
      <OtpVerification />
    </div>
  );
}
