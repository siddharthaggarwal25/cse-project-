import React from "react";

import  AuthContext  from "./context/authContext";
import  useAuth  from "./hooks/authHook";
import Signup from "./components/signup";
import Login from "./components/login"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
function hello () {
  return <div>Start Page</div>;
};
function App() { 
  const { token, login, logout, userId } = useAuth();

  let router;
  if(!userId){
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" elemenet={<hello />}>
          <Route path="signup" element={<Signup/>} />
          <Route path="login" element={<Login />} />
        </Route>
      )
    )
    }else{
      router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" elemenet={<hello />}>
          </Route>
        )
      )
    }


  return (
    <>
      <AuthContext.Provider  value={{ isLoggedIn: !!token, token: token,userId: userId,login: login,logout: logout}}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
