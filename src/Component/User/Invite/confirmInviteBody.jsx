import React, { useEffect, useState } from "react";
import teamUp from "../../../assets/teamup.jpg";
import ReactConfetti from "react-confetti";
import Popup from "./popup";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { addUserIntoWorkspace } from "../../../api/apis";

export default function ConfirmInviteBody() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [windowDimension, setDiamension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const ditectSize = () => {
    setDiamension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  const addUser = async () => {
    const res = await addUserIntoWorkspace(id);
    if (res.data.status == "success") {
      toast(`Welcome to out team...`, {
        icon: "👏",
      });
      setOpen(true);
      return;
    } else {
      toast.error("Something gone wrong ! Please try again");
    }
  };
  useEffect(() => {
    addUser();

    window.addEventListener("resize", ditectSize);

    return () => window.removeEventListener("resize", ditectSize);
  }, []);
  return (
    <>
      <div>
        <Toaster />
        <ReactConfetti
          height={windowDimension.height}
          width={windowDimension.width}
          tweenDuration={1000}
        />
        <div className=" grid place-content-center mt-10 bg-gray-50">
          <img src={teamUp} alt="teamup image" className="w-[75vw] h-[70vh]" />
        </div>
        {open && <Popup />}
      </div>
    </>
  );
}
