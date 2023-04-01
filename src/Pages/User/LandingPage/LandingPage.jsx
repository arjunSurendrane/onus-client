import React, { useState } from "react";
import Features from "../../../Component/User/LandingPage/LandingFeatures";
import Footer from "../../../Component/User/Footer/Footer";
import Hero from "../../../Component/User/LandingPage/Hero";
import LandingNav from "../../../Component/User/LandingPage/LandingNavbar";
import Pricing from "../../../Component/User/LandingPage/Pricing";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
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
      <LandingNav />
      <Hero />
      <Features />
      <Pricing page={"landing"} />
      <Footer />
    </div>
  );
}
