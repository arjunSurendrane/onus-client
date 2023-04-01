import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function UserOutlet() {
  const [cookies, setCookies] = useCookies();
  if (cookies.userJwt) {
    return <Outlet />;
  }
  localStorage.clear();
  return <Navigate to="/" />;
}

export default UserOutlet;
