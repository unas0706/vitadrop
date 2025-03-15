import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import BB from "./pages/BB";
import EditProfile from "./pages/Editprofile";
import Admin from "./pages/Admin";
import ChangePassword from "./pages/ChangePassword";
import ForgetPass from "./pages/ForgetPass";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBloodBank" element={<BB />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/addAdmin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
