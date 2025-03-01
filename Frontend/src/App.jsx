import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const  Home = () => <>hiii</>;

import Navbar from "./components/navbar";
import Signup from "./components/signup";
import Login from "./components/login";
import Footer from "./components/footer";

const App = () => {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={< Signup/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        <Footer />
    </Router>
  );
};

export default App;
