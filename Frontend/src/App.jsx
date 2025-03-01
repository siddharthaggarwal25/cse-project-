import React from "react";
import AuthContext from "./context/authContext";
import useAuth from "./hooks/authHook";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const { token, login, logout, userId } = useAuth();

  let router;
  if (!userId) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<> hello</>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </>
      )
    );
  } else {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<h1>Welcome</h1>} /> 
      )
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
