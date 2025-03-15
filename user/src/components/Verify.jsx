import React, { useContext, useState } from "react";
import userApi from "../API/UserApi";
import { DonorContext } from "../context/DonorContext";
import { toast } from "react-toastify";
import UserApi from "../API/UserApi";

const Verify = ({ setVerified }) => {
  const { donorLogin, setNumber } = useContext(DonorContext);

  const [verify, setVerify] = useState(true);
  const [otp, setOtp] = useState();
  const [num, setNum] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {verify && (
        <div className="verify">
          <>
            Please enter your mobile Number
            <input type="tel" pattern="^[0-9]{10}$" name="phone" id="phone" />
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
                    if (d.exist) {
                      toast.error("User already exists");
                      setLoading(false);
                      return;
                    }
                  } catch (error) {
                    console.log(error.response.data.err);

                    try {
                      let { data } = await userApi.post("donor/login", {
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
                      console.log(error.response.data.err);
                      toast.error(error.response.data.err, {
                        style: {
                          width: "80%",
                        },
                        hideProgressBar: true,
                      });
                      setLoading(false);
                    }
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
          <span className="sub-text">Enter the OTP sent to +91 9502254332</span>
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
                  setVerified(true);

                  toast.success("Logged in successfully", {
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
                let { data } = await userApi.post("donor/login", {
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
  );
};

export default Verify;
