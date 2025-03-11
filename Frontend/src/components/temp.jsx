import React, { useContext, useState } from "react";
import AuthContext from "../context/authContext";

const Temp = () => {
  const auth = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    let response;
    try {
      response = await fetch("http://localhost:8000/credit", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + auth.token,
          },
      });
      if (!response.ok) {
        throw new Error("Error occured please try again later ");
      }
      const responseData = await response.json();
      auth.updateCredit( responseData.credit);
      console.log( responseData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-48"
        onClick={handleSubmit}
      >
        inc credit
      </button>
    </>
  );
};
export default Temp;
