import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bloodbanks from "./pages/Bloodbanks";
import Donor from "./pages/Donor";
import Register from "./pages/Register";
import User from "./pages/User";
import Transactions from "./pages/Transactions";
import BB from "./pages/BB";
import EditProfile from "./pages/EditProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={500} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/donor" element={<Donor />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/bloodbanks" element={<Bloodbanks />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/donor/edit" element={<EditProfile />}></Route>
        <Route path="/BB/:name" element={<BB />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
