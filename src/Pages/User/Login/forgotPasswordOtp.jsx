import React from "react";
import Login from "../../../Component/User/Login and Signup/Login";
import Modal from "../../../Component/User/Modal/Modal";

export default function ForgotPassword() {
  return (
    <div>
      <Login />
      <Modal
        setShowModal={() => ""}
        heading={"OTP"}
        placeholder={"Enter OTP"}
        button={"Submit"}
        url={"/workspace"}
        api={"/user/verifyOtpLogin"}
      />
    </div>
  );
}
