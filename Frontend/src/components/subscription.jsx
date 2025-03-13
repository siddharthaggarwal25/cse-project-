import React, { useContext } from "react";
import AuthContext from "../context/authContext";

export default function Subscription() {
  const auth = useContext(AuthContext);
  const amount = 500 * 100; // Convert to paise
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/makePayment", {
        method: "POST",
        body: JSON.stringify({ amount, currency, receipt: receiptId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      });

      const order = await response.json();

      // Ensure Razorpay script is loaded before initializing
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => initializeRazorpay(order);
        document.body.appendChild(script);
      } else {
        initializeRazorpay(order);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const initializeRazorpay = (order) => {
    const options = {
      key: "rzp_test_pBjWhXmDvQr9bP",
      amount,
      currency,
      name: "Exammer",
      description: "Subscription",
      image: "https://example.com/your_logo",
      order_id: order.id,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        try {
          const validateRes = await fetch("http://localhost:8000/validatePayment", {
            method: "POST",
            body: JSON.stringify({ ...response, amount }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          });

          const res = await validateRes.json();
          auth.updateCredit(res.credit);
        } catch (error) {
          console.error("Error validating payment:", error);
        }
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
    });

    rzp1.open();
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-10">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation, 
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0">
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Best for large scale uses and extended redistribution rights.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹499</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <span>Individual configuration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span>No setup, or hidden fees</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span>
                    Team size: <span className="font-semibold">100+ developers</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span>
                    Premium support: <span className="font-semibold">36 months</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span>
                    Free updates: <span className="font-semibold">36 months</span>
                  </span>
                </li>
              </ul>
              <button
                onClick={paymentHandler}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
