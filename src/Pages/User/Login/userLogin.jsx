import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Login from "../../../Component/User/Login and Signup/Login";

export default function UserLogin() {
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
      <Login />
    </div>
  );
}
