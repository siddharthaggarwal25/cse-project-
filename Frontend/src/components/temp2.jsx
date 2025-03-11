import AuthContext from "../context/authContext";
import React, { useContext } from "react";
import useRazorpay from "react-razorpay";

function Checkout() {
  const auth = useContext(AuthContext);
  const [Razorpay] = useRazorpay();
  const [netPrice, setNetPrice] = React.useState(0);

  const amount = netPrice * 100 * 90;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch("http://localhost:8000/makePayment", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    });
    const order = await response.json();

    const options = {
      key: "rzp_test_pBjWhXmDvQr9bP",
      amount,
      currency,
      name: "Exammer",
      description: "Subscription ",
      image: "https://example.com/your_logo",
      order_id: order.id,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:8000/validatePayment",

          {
            method: "POST",
            body: JSON.stringify({ ...body, amount: amount }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        auth.updateCredit( validateRes.credit);
      },
    };
    let rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error);
    });
    rzp1.open();
    e.preventDefault();
  };

  return <>checkout</>;
}

export default Checkout;
