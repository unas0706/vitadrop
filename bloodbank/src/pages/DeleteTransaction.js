import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Transaction from "../components/Transaction";
import { useBBContext } from "../context/BloodBankContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const DeleteTransaction = () => {
  const [otp, setOtp] = useState(true);
  const {
    getUser,
    user,
    setUser,
    getUserTransaction,
    transactions,
    setTransactions,
    OTP,
    deleteTransaction,
    token,
  } = useBBContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  const [id, setId] = useState();
  useEffect(() => {
    if (user) {
      getUserTransaction(user._id);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      {otp && (
        <div className="search">
          <input
            type="text"
            id=""
            className="inp inp1"
            placeholder="Enter Donor Mobile Number"
            style={{
              height: "40%",
              width: "40%",
              fontSize: "1.5rem",
              textAlign: "center",
              padding: "0",
            }}
            onChange={async (e) => {
              if (e.target.value.length == 10) {
                try {
                  await getUser(
                    `+91 ${e.target.value.slice(0, 5)} ${e.target.value.slice(
                      5
                    )}`
                  );
                } catch (error) {
                  toast.error(error.message);
                }
              }
              if (e.target.value.length != 10) {
                setUser(null);
                setTransactions(null);
              }
            }}
          />
        </div>
      )}
      {otp && (
        <div className="transaction-con">
          {transactions?.length > 0 &&
            transactions?.map((ele, index) => {
              return (
                <Transaction
                  setOtp={setOtp}
                  key={index}
                  ele={ele}
                  setId={setId}
                />
              );
            })}

          {transactions?.length == 0 && (
            <h2
              style={{ width: "100%", textAlign: "center", marginTop: "25%" }}
            >
              No Transactions available
            </h2>
          )}

          {!transactions && (
            <h2
              style={{ width: "100%", textAlign: "center", marginTop: "25%" }}
            >
              Enter Donor Number
            </h2>
          )}
        </div>
      )}
      {!otp && (
        <div className="transaction-con otp" style={{ textAlign: "center" }}>
          <h2 className="head">
            Delete <br />
            Transaction
          </h2>
          <hr />
          <label
            style={{
              display: "block",
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
            {user?.phone}
          </label>

          <input
            type="text"
            name=""
            id="otp"
            className="inp1 inp"
            placeholder="Enter OTP"
          />

          <div
            className="btn-con"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
              margin: "auto",
            }}
          >
            <button
              className="btn btn-2 active hover"
              onClick={() => {
                setOtp(true);
              }}
            >
              Back
            </button>
            <button
              className="btn btn-2 hover"
              onClick={async () => {
                console.log(OTP);
                let otp = document.getElementById("otp").value;
                if (OTP == otp && id) {
                  try {
                    setOtp(true);
                    setTransactions(null);
                    deleteTransaction(id);
                    toast("Transaction Deleted Successfully", {
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                  } catch (error) {
                    toast.error(error.message);
                  }
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTransaction;
