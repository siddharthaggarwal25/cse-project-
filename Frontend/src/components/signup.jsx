import React from "react";
import AuthContext from "../context/authContext";
import { useContext } from "react";
export default function Signup() {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = React.useState({
    Name: "",
    Email: "",
    Password: "",
  });

  function handleChange(e) {
    setFormData((preFormData) => {
      return {
        ...preFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response;
    try {
      response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error occured please try again later ");
      }
      const responseData = await response.json();
      auth.login(responseData.userId, responseData.token);
      console.log( responseData) ;
    } catch (error) {
       console.log( error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="Name"
                className="block text-sm/6 font-medium text-gray-900"
              >
              User Name
              </label>
              <div className="mt-2">
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  required
                  value={formData.Name}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>
            <div>
              <label
                htmlFor="Email"
                className="block text-sm/6 font-medium text-gray-900"
                >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="Email"
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}              
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="Password"
                  name="Password"
                  type="password"
                  value={formData.Password}
                  onChange={handleChange} 
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}
