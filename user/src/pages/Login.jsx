import React, { useContext, useEffect, useState } from "react";
import Verify from "../components/Verify";
import Curve from "../components/Curve";
import Sidebar from "../components/Sidebar";
import User from "./User";
import { useNavigate } from "react-router-dom";
import { DonorContext } from "../context/DonorContext";
import { toast } from "react-toastify";
import UserApi from "../API/UserApi";

const Login = () => {
  const { donorData } = useContext(DonorContext);
  const { donorLogin, setNumber } = useContext(DonorContext);

  const [verify, setVerify] = useState(true);
  const [otp, setOtp] = useState();
  const [num, setNum] = useState();
  const [loading, setLoading] = useState(false);

  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });

  let [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("donorToken");
    if (token) {
      navigate("/user");
    }
  }, [donorData]);

  return (
    <>
      <main className="home">
        <Curve sidebar={sidebar} setSidebar={setSidebar} />
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        {/* <Verify setVerified={setVerified} /> */}
        <>
          {verify && (
            <div className="verify">
              <>
                Please enter your mobile Number
                <input
                  type="tel"
                  pattern="^[0-9]{10}$"
                  name="phone"
                  id="phone"
                />
                <div style={{ height: "5%", width: "100%" }}></div>
                <button
                  className="Btn P-Btn"
                  onClick={async (e) => {
                    let num = document.getElementById("phone").value;
                    if (num.length == 10 && !isNaN(num)) {
                      setLoading(true);

                      try {
                        let { data: d } = await UserApi.post("/donorLogin", {
                          phone: `+91 ${num.slice(0, 5)} ${num.slice(5)}`,
                        });
                        console.log(d);

                        let { data } = await UserApi.post("donor/login", {
                          phone: `+91 ${num.slice(0, 5)} ${num.slice(5)}`,
                        });
                        setLoading(false);
                        setNum(`+91 ${num.slice(0, 5)} ${num.slice(5)}`);
                        setOtp(data.otp);
                        setVerify(false);
                        toast.success("OTP sent sucessfully", {
                          style: {
                            width: "80%",
                          },
                          hideProgressBar: true,
                        });
                        setNumber(num);
                      } catch (error) {
                        toast.error(error.response.data.err, {
                          style: {
                            width: "80%",
                          },
                          hideProgressBar: true,
                        });
                        setLoading(false);
                      }
                    } else {
                      toast.error("Enter valid number", {
                        style: {
                          width: "80%",
                        },
                        hideProgressBar: true,
                      });
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? "loading" : "Get OTP"}{" "}
                </button>
              </>
            </div>
          )}
          {!verify && (
            <div className="verify">
              <h2
                className="heading"
                style={{ width: "100%", textAlign: "center" }}
              >
                OTP Verification
              </h2>
              <span className="sub-text">
                Enter the OTP sent to +91 9502254332
              </span>
              <div style={{ height: "1px", width: "100%" }}></div>
              <input
                type="number"
                name="OTP"
                id="OTP"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="6"
                autoComplete="one-time-code"
                onChange={async (e) => {
                  console.log(e.target.value, otp);

                  if (otp == e.target.value) {
                    try {
                      let { data } = await UserApi.post("/donorLogin", {
                        phone: num,
                      });
                      setVerified(true);
                      donorLogin(num);
                      toast.success("Logged in successfully", {
                        style: {
                          width: "80%",
                        },
                        hideProgressBar: true,
                      });
                    } catch (error) {
                      console.log(error.response.data.err);

                      toast.error(error.message || error.response.data.err, {
                        style: {
                          width: "80%",
                        },
                        hideProgressBar: true,
                      });
                    }
                  }
                }}
              />
              <div style={{ height: "5%", width: "100%" }}></div>
            </div>
          )}
          {!verify && (
            <div className="resend">
              Didn’t receive an OTP?{" "}
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    let { data } = await UserApi.post("donor/login", {
                      phone: num,
                    });
                    setLoading(false);
                    setOtp(data.otp);
                    setVerify(false);
                    toast.error("OTP sent successfully", {
                      style: {
                        width: "80%",
                      },
                      hideProgressBar: true,
                    });
                  } catch (error) {
                    toast.error(error.message);
                  }
                }}
              >
                {loading ? "Loading" : "Resend OTP"}
              </button>
            </div>
          )}
        </>
      </main>
    </>
  );
};

export default Login;
