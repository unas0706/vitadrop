import React, { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { DonorContext } from "../context/DonorContext";
import { toast } from "react-toastify";

const Sidebar = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate();
  const { deleteDonor, logOut, setDonorData, donorData } =
    useContext(DonorContext);
  return (
    <>
      <div className="side-bar" style={sidebar}>
        <header className="side-bar-header">
          <h2 className="logo-side">VitaDrop</h2>
          <RxCross1
            onClick={() => {
              setSidebar({
                left: "-70%",
              });
            }}
          />
        </header>
        <ul className="side-menu">
          <li>
            <Link to="/bloodbanks">Blood Banks</Link>
          </li>
          <li>
            <Link to="/donor">Donors</Link>
          </li>

          <li>
            <Link to="/">Home</Link>
          </li>

          {!donorData && (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {donorData && (
            <>
              <li>
                <Link to="/user">Profile</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
              <li>
                <Link to="/donor/edit">Edit Profile</Link>
              </li>
            </>
          )}
        </ul>
        {donorData && (
          <>
            <div className="logout-btn-con">
              <button
                className="Btn"
                style={{
                  height: "60%",
                  boxShadow: "unset",
                  border: "none",
                  width: "90%",
                  borderRadius: "unset",
                }}
                onClick={async () => {
                  try {
                    await deleteDonor();
                    navigate("/");
                    setDonorData(null);
                    toast.success("User deleted Successfully", {
                      style: {
                        width: "80%",
                      },
                      hideProgressBar: true,
                    });
                  } catch (error) {
                    toast.error(error.message, {
                      style: {
                        width: "80%",
                      },
                      hideProgressBar: true,
                    });
                  }
                  localStorage.setItem("donorToken", "");
                  setDonorData(null);
                }}
              >
                Delete Profile
              </button>
            </div>
            <div className="logout-btn-con">
              <button
                className="O-Btn"
                style={{
                  height: "60%",
                  boxShadow: "unset",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={async () => {
                  try {
                    await logOut();
                    navigate("/");
                    setDonorData(null);
                    toast.success("Logged Out Successfully", {
                      style: {
                        width: "80%",
                      },
                      hideProgressBar: true,
                    });
                  } catch (error) {
                    toast.error(error.message, {
                      style: {
                        width: "80%",
                      },
                      hideProgressBar: true,
                    });
                  }
                }}
              >
                Log Out &nbsp;&nbsp;&nbsp;{" "}
                <IoIosLogOut style={{ fontSize: "1.5rem" }} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
