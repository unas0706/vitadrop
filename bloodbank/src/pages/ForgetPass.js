import React, { useState } from "react";
// import { Link } from "react-router-dom";

const ForgetPass = () => {
  const [verified, setVerified] = useState(true);
  return (
    <>
      <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="cred"
          style={{ textAlign: "center" }}
        >
          <h2 className="head">
            VITADROP <br />
            Forget Password
          </h2>
          <hr />
          {verified && (
            <>
              <label
                style={{
                  margin: "auto",
                  height: "30%",
                  fontSize: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "transparent",
                  boxShadow: "unset",
                }}
                className="inp inp1"
                htmlFor="number"
              >
                One Time Passcode (OTP) has sent to <br />
                xxxxxx@gmail.com
              </label>

              <input
                type="text"
                name=""
                id="otp"
                className="inp1 inp"
                placeholder="Enter OTP"
              />
            </>
          )}
          {!verified && (
            <>
              <div className="cred-con">
                <input
                  type="email"
                  className="inp"
                  id=""
                  placeholder="Enter Your new password"
                />
                <input
                  type="password"
                  className="inp"
                  id=""
                  placeholder="Re-Enter your password"
                />
              </div>
              <div className="btn-con">
                <button className="btn">Update</button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ForgetPass;
