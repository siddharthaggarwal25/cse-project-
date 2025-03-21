import React , {useEffect} from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = React.useState({
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
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();
    let response;
    try {
      response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error occured please try again later ");
      }
      const responseData = await response.json();
      auth.login(responseData.userId, responseData.token, responseData.credit);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-xs bg-black/30 flex justify-center items-center">
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login  to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> */}
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="bg-white relative p-10 rounded-xl tex-slate-500"
        >
            <h1 className="text-2xl font-medium text-center text-neutral-700 ">
              Login
            </h1>
            <p className="text-sm ">Welcome back! Please sign in to continue</p>
            {/* <label
              htmlFor="Email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label> */}
            <div className="border border-gray-300 gap-2 px-6 py-2 flex items-center rounded-full mt-4">
            <img src={assets.email_icon} alt="" />
              <input
                id="Email"
                name="Email"
                type="email"
                value={formData.Email}
                placeholder="Email"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          

        
            {/* <div className="flex items-center justify-between">
              <label
                htmlFor="Password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div> */}
            <div className="border border-gray-300 gap-2 px-6 py-2 flex items-center rounded-full mt-4">
            <img src={assets.lock_icon} alt="" />
              <input
                id="Password"
                name="Password"
                type="password"
                value={formData.Password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <p className="text-sm text-blue-600 my-4 cursor-pointer">Forget password?</p>
            
          
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
            <img
          onClick={() => {
            navigate("/")
          }}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        /> 
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
      {/* </div> */}
    </>
  );
}
