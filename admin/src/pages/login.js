import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login, token } = useAdminContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="cred"
      >
        <h2 className="head">
          VITADROP <br />
          LOGIN
        </h2>
        <hr />
        <div className="cred-con">
          <input
            type="email"
            className="inp"
            id="email"
            placeholder="Enter Your Email"
          />
          <input
            type="password"
            className="inp"
            id="password"
            placeholder="Enter your password"
          />
          <Link
            to="/forgetPassword"
            style={{
              width: "80%",
              display: "block",
              margin: "auto",
              textAlign: "start",
              marginTop: "2%",
            }}
          >
            <u>Forget Password</u>
          </Link>
        </div>
        <div className="btn-con">
          <button
            className="btn"
            onClick={async () => {
              let email = document.getElementById("email").value;
              let password = document.getElementById("password").value;
              if (email && password) {
                try {
                  await login(email, password);
                  toast.success("logged in", {
                    hideProgressBar: true,
                    theme: "dark",
                    autoClose: 1000,
                  });
                } catch (error) {
                  toast.error(error.message, {
                    hideProgressBar: true,
                    theme: "dark",
                    autoClose: 1000,
                  });
                }
              } else {
                toast.error("Fill the form", {
                  hideProgressBar: true,
                  theme: "dark",
                  autoClose: 1000,
                });
              }
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
