import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useBBContext } from "../context/BloodBankContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const CreateTransaction = () => {
  const navigate = useNavigate();
  const { getUser, user, token, setUser, createTransaction } = useBBContext();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      <Navbar />
      <div className="con">
        <form
          className="cred"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{ textAlign: "center" }}
        >
          <h2 className="head">
            Create <br />
            Transaction
          </h2>
          <hr />
          <input
            type="text"
            name=""
            id="number"
            className="inp1 inp"
            placeholder="Enter mobile number"
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
              }
            }}
          />
          <input
            type="text"
            name=""
            id="units"
            className="inp1 inp"
            placeholder="Enter Units"
          />{" "}
          <br /> <br />
          <br />
          <label
            style={{
              width: "80%",
              textAlign: "start",
              display: "block",
              margin: "auto",
              height: "7%",
            }}
            htmlFor="number"
          >
            <b>Name</b>: {user?.name}
          </label>
          <label
            style={{
              width: "80%",
              textAlign: "start",
              display: "block",
              margin: "auto",
              height: "7%",
            }}
            htmlFor="number"
          >
            <b>Blood Group</b>: {user?.bloodType}
          </label>
          <div
            className="btn-con"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="btn hover"
              onClick={() => {
                if (user && document.getElementById("units").value) {
                  try {
                    createTransaction(
                      user.phone,
                      user.bloodType,
                      document.getElementById("units").value
                    );
                    toast("Transaction Created Successfully", {
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                    navigate("/");
                  } catch (error) {
                    toast.error(error.message);
                  }
                } else {
                  toast.error("Please enter donor details");
                }
              }}
            >
              Create Transaction
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTransaction;
