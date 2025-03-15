import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgetPass from "./pages/ForgetPass";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import CreateTransaction from "./pages/CreateTransaction";
import ValidateTransaction from "./pages/ValidateTransaction";
import DeleteTransaction from "./pages/DeleteTransaction";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/createTransaction" element={<CreateTransaction />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/validateTransaction" element={<ValidateTransaction />} />
        <Route path="/deleteTransaction" element={<DeleteTransaction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
