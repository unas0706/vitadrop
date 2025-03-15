import React, { useEffect } from "react";
import Navbar from "../componets/Navbar";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

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
            // onClick={() => {
            //   let oldpwd = document.getElementById("oldpass").value;
            //   let newpwd = document.getElementById("newpass").value;
            //   let repwd = document.getElementById("repass").value;
            //   if (newpwd != repwd) {
            //     console.log("Enter Password properly");
            //     return;
            //   }
            //   changePwd(oldpwd, newpwd);
            // }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
