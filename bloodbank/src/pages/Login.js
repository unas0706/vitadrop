import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBBContext } from "../context/BloodBankContext";
import { toast } from "react-hot-toast";
const Login = () => {
  const { login, token } = useBBContext();
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
              try {
                await login(email, password);
                toast("Logged in", {
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
