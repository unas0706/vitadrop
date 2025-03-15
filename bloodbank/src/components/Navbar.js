import React from "react";
import { Link } from "react-router-dom";
import { useBBContext } from "../context/BloodBankContext";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const { setToken } = useBBContext();
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
            setToken("");
            localStorage.removeItem("bbToken");
            toast("Logged out", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
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
