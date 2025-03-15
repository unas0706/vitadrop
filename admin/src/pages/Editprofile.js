import React from "react";
import Navbar from "../componets/Navbar";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // });

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
          // defaultValue={bloodBank?.name}
        />
        <input
          type="text"
          name=""
          id="phone"
          className="inp1 inp"
          placeholder="Enter Number"
          // defaultValue={bloodBank?.contact?.phone}
        />
        <textarea
          placeholder="Enter Address"
          className="inp1 inp"
          name=""
          disabled
          id="address"
          // defaultValue={bloodBank?.address}
          style={{ height: "5%", paddingTop: "2%", opacity: "0" }}
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
            onClick={() => {
              // let email = bloodBank?.contact.email;
              // let name = document.getElementById("name").value;
              // let address = document.getElementById("address").value;
              // let phone = document.getElementById("phone").value;
              // editProfile(name, phone, address, email, token);
              navigate("/");
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
