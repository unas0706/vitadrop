import React from "react";
import Navbar from "../componets/Navbar";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {
  const { addAdmin } = useAdminContext();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div
        className="transaction-con otp"
        style={{ height: "70%", textAlign: "center" }}
      >
        <h2 style={{ height: "20%" }} className="head">
          Add Admin
        </h2>
        <hr />

        <input
          type="text"
          name=""
          id="name"
          className="inp1 inp"
          placeholder="Enter Admin Name"
        />
        <input
          type="text"
          name=""
          id="mail"
          className="inp1 inp"
          placeholder="Enter E-mail"
        />
        <input
          type="tel"
          name=""
          id="phone"
          className="inp1 inp"
          placeholder="Enter Mobile Number"
        />

        <input
          type="password"
          name=""
          id="password"
          className="inp1 inp"
          placeholder="Enter Password"
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
              const name = document.getElementById("name").value;
              const mail = document.getElementById("mail").value;
              const phone = document.getElementById("phone").value;
              const password = document.getElementById("password").value;

              // Check if fields are attempted or left empty
              if (!name || !phone || !password || !mail) {
                toast.error("Fill the form", {
                  hideProgressBar: true,
                  theme: "dark",
                  autoClose: 1000,
                });
                return;
              }
              try {
                if (phone.length == 10 && !isNaN(phone)) {
                  await addAdmin(name, mail, phone, password);
                  toast.success("Admin added successfully", {
                    hideProgressBar: true,
                    theme: "dark",
                    autoClose: 1000,
                  });
                  navigate("/");
                } else {
                  toast.error("PLease enter valid number", {
                    hideProgressBar: true,
                    theme: "dark",
                    autoClose: 1000,
                  });
                }
              } catch (error) {
                toast.error(error.message, {
                  hideProgressBar: true,
                  theme: "dark",
                  autoClose: 1000,
                });
              }
            }}
          >
            Add Admin
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;
