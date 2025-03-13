import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./context/authContext";
import useAuth from "./hooks/authHook";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Subscription from "./components/subscription";
import UploadQuestionPaper from "./components/uploadQuestionPaper";
import Papers from "./components/exampaper";

function App() {
  const { token, login, logout, userId  , credit , updateCredit} = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        credit : credit , 
        updateCredit : updateCredit
      }}
    >
      <Router>
        <Navbar /> 

        <Routes>
          {!userId ? (
            <>
              <Route path="/" element={<Hero />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Hero />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/upload" element={<UploadQuestionPaper />} />
              <Route path="/papers" element={<Papers />} />
            </>
          )}
        </Routes>

        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
