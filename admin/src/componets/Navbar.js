import React from "react";
import { Link } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { setToken, setAdmin } = useAdminContext();
  return (
    <nav id="nav">
      <Link to="/" id="bb-Logo">
        VITADROP
      </Link>
      <ul className="nav-links">
        <li className="nav-link hover">
          {" "}
          <Link to="/editProfile">Edit profile</Link>
        </li>
        <li className="nav-link hover">
          <Link to="/changePassword">Change Password</Link>
        </li>
      </ul>
      <div className="login-con">
        <button
          className="btn logout hover"
          onClick={() => {
            setToken(null);
            setAdmin(null);
            localStorage.setItem("adminToken", "");
            toast.success("logged out", {
              hideProgressBar: true,
              theme: "dark",
              autoClose: 1000,
            });
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
