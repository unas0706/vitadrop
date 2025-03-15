import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useBBContext } from "../context/BloodBankContext";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token, changePwd } = useBBContext();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      <Navbar />
      <div className="transaction-con otp" style={{ textAlign: "center" }}>
        <h2 className="head">
          Change <br />
          Password
        </h2>
        <hr />

        <input
          type="text"
          name=""
          id="oldpass"
          className="inp1 inp"
          placeholder="Enter old password"
        />
        <input
          type="password"
          name=""
          id="newpass"
          className="inp1 inp"
          placeholder="Enter new password"
        />
        <input
          type="password"
          name=""
          id="repass"
          className="inp1 inp"
          placeholder="Re-enter new password"
        />

        <div
          className="btn-con"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            margin: "auto",
          }}
        >
          <button
            className="btn btn-2 hover"
            onClick={async () => {
              let oldpwd = document.getElementById("oldpass").value;
              let newpwd = document.getElementById("newpass").value;
              let repwd = document.getElementById("repass").value;
              if (newpwd != repwd) {
                console.log("Enter Password properly");
                return;
              }
              try {
                await changePwd(oldpwd, newpwd);
                toast("Password Changed Successfully", {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              } catch (error) {
                toast.error(error.message);
              }
            }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
