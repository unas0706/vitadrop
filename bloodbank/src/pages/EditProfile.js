import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useBBContext } from "../context/BloodBankContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const EditProfile = () => {
  const navigate = useNavigate();
  const { bloodBank, editProfile, token } = useBBContext();
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
          Update <br />
          information
        </h2>
        <hr />

        <input
          type="text"
          name=""
          id="name"
          className="inp1 inp"
          placeholder="Enter Name"
          defaultValue={bloodBank?.name}
        />
        <input
          type="text"
          name=""
          id="phone"
          className="inp1 inp"
          placeholder="Enter Number"
          defaultValue={bloodBank?.contact?.phone}
        />
        <textarea
          placeholder="Enter Address"
          className="inp1 inp"
          name=""
          id="address"
          defaultValue={bloodBank?.address}
          style={{ height: "15%", paddingTop: "2%" }}
        ></textarea>

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
              let email = bloodBank?.contact.email;
              let name = document.getElementById("name").value;
              let address = document.getElementById("address").value;
              let phone = document.getElementById("phone").value;
              try {
                if (name && address && phone.length == 10 && !isNaN(phone)) {
                  editProfile(name, phone, address, email, token);
                  navigate("/");
                  toast("Profile updated successfully", {
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                } else {
                  toast.error("Please enter valid details");
                }
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

export default EditProfile;
