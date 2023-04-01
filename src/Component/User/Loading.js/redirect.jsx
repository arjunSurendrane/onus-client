import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const [cookies, setCookie] = useCookies();
  const [workspaceId, setWorkspaceId] = useState(
    localStorage.getItem("CurrentWSpace")
  );
  const history = useNavigate();

  useEffect(() => {
    if (cookies.userJwt && workspaceId) {
      history(`/${workspaceId}/home`);
    }
  });
  return <div></div>;
}
