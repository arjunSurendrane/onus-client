import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../../api/index";
import Toaster, { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

export default function PaymentModal({ close, reqBody }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [cookies, setCookies] = useCookies();
  /**
   * Create Order
   * @param {*} data
   * @returns {Object}
   */
  const createOrder = async (data) => {
    const token = cookies.userJwt;
    try {
      // Order is created on the server and the order id is returned
      const res = await axios.post(
        "/user/my-server/create-paypal-order",
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({ createOrder: res.data });
      return res.data.id;
    } catch (error) {
      console.log(error);
      toast.error("Something gone wrong !!! Try Again...");
      return error.response.data;
    }
  };
  /**
   * Approve Payment
   * @param {*} data
   * @returns
   */
  const onApprove = async (data) => {
    const token = cookies.userJwt;

    // Order is captured on the server
    try {
      const res = await axios.post(
        "/user/my-server/capture-paypal-order",
        { orderID: data.orderID },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment Success");
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("error");
      console.log(error);
      toast.error("Something gone wrong !!! Try Again...");
      return error.response.data;
    }
  };
  const initialOptions = {
    "client-id":
      "AYg1B-IkpwkS57idabtXqFLHkw1wBH1IpT3AF902bHsXxLY-DBiFtJ1Mj4D-YUhrJG7W8NYSSvpPuN1W",
    currency: "USD",
    intent: "capture",
  };
  return (
    <div>
      <Toaster />
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-lg font-semibold text-gray-600">
                Pay Using Paypal
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => close()}
              >
                x
              </button>
            </div>
            <div className="relative p-6 flex-auto mb-5 max-h-[100vh] overflow-scroll">
              <form action="">
                <div>
                  <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                </div>
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </PayPalScriptProvider>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
