import React from "react";
import InvitationForm from "../../../Component/User/Invite/invitationSend";
import Navbar from "../../../Component/User/Navbar/Navbar";

export default function InvitationPage() {
  return (
    <div>
      <Navbar heading={"Home"} active={"h"} />
      <div className="md:mx-[18%] absolute">
        <InvitationForm />
      </div>
    </div>
  );
}
