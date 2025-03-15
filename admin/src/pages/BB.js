import React from "react";
import Navbar from "../componets/Navbar";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BB = () => {
  const { addBB } = useAdminContext();
  const navigate = useNavigate();

  const cityData = [
    { name: "Adilabad", pincode: "504001" },
    { name: "Anakapalle", pincode: "531001" },
    { name: "Anantapur", pincode: "515001" },
    { name: "Bapatla", pincode: "522101" },
    { name: "Bhadrachalam", pincode: "507111" },
    { name: "Bhongir", pincode: "508116" },
    { name: "Chittoor", pincode: "517001" },
    { name: "Eluru", pincode: "534001" },
    { name: "Guntur", pincode: "522002" },
    { name: "Hyderabad", pincode: "500001" },
    { name: "Jagtial", pincode: "505327" },
    { name: "Kadapa", pincode: "516001" },
    { name: "Kakinada", pincode: "533001" },
    { name: "Karimnagar", pincode: "505002" },
    { name: "Khammam", pincode: "507002" },
    { name: "Kurnool", pincode: "518002" },
    { name: "Machilipatnam", pincode: "521001" },
    { name: "Mahabubabad", pincode: "506101" },
    { name: "Mahbubnagar", pincode: "509001" },
    { name: "Medak", pincode: "502110" },
    { name: "Nalgonda", pincode: "508001" },
    { name: "Narasaraopet", pincode: "522601" },
    { name: "Nellore", pincode: "524002" },
    { name: "Nizamabad", pincode: "503002" },
    { name: "Ongole", pincode: "523001" },
    { name: "Rajahmundry", pincode: "533103" },
    { name: "Ramagundam", pincode: "505208" },
    { name: "Sangareddy", pincode: "502001" },
    { name: "Siddipet", pincode: "502103" },
    { name: "Srikakulam", pincode: "532001" },
    { name: "Suryapet", pincode: "508213" },
    { name: "Tirupati", pincode: "517501" },
    { name: "Vijayawada", pincode: "520002" },
    { name: "Vikarabad", pincode: "501101" },
    { name: "Visakhapatnam", pincode: "530002" },
    { name: "Vizianagaram", pincode: "535002" },
    { name: "Warangal", pincode: "506002" },
    { name: "Zaheerabad", pincode: "502220" },
  ];

  const sortedCities = [...cityData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <>
      <Navbar />
      <div
        className="transaction-con otp"
        style={{ height: "75%", textAlign: "center", width: "80%" }}
      >
        <h2 style={{ height: "15%" }} className="head">
          Add BloodBank
        </h2>
        <hr />
        <input
          type="text"
          name=""
          id="name"
          className="inp1 inp inp2"
          placeholder="Enter Blood Bank Name"
        />
        <input
          type="text"
          name=""
          id="mail"
          className="inp1 inp inp2"
          placeholder="Enter E-mail"
        />
        <input
          type="tel"
          name=""
          id="phone"
          className="inp1 inp inp2"
          placeholder="Enter Mobile Number"
        />
        <input
          type="password"
          name=""
          id="password"
          className="inp1 inp inp2"
          placeholder="Enter Password"
        />
        <select id="pinCode" className="inp inp1 inp2">
          <option value="">-- Choose a City --</option>
          {sortedCities.map((city, index) => (
            <option key={index} value={city.pincode}>
              {city.name}
            </option>
          ))}
        </select>
        <input type="time" name="" id="open" className="inp inp1 inp2 inp3" />{" "}
        <label htmlFor="open" id="to">
          to
        </label>
        <input type="time" name="" id="close" className="inp inp1 inp2 inp3" />
        <textarea
          name=""
          id="address"
          className="inp1 inp2 inp"
          style={{
            resize: "none",
            height: "20%",
            width: "80%",
            paddingTop: "1%",
          }}
          placeholder="Enter Address"
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
              const name = document.getElementById("name").value;
              const email = document.getElementById("mail").value;
              const phone = document.getElementById("phone").value;
              const password = document.getElementById("password").value;
              const openTime = document.getElementById("open").value;
              const closeTime = document.getElementById("close").value;
              const address = document.getElementById("address").value;
              const pinCode = document.getElementById("pinCode").value;
              if (
                name &&
                email &&
                phone &&
                password &&
                openTime &&
                closeTime &&
                address &&
                pinCode
              ) {
                if (phone.length == 10 && !isNaN(phone)) {
                  try {
                    const bloodBankData = {
                      name,
                      password,
                      pincode: pinCode,
                      contact: {
                        email,
                        phone,
                      },
                      address,
                      operatingHours: {
                        open: openTime,
                        close: closeTime,
                      },
                      inventory: [
                        { bloodType: "A+", units: 0 },
                        { bloodType: "A-", units: 0 },
                        { bloodType: "B+", units: 0 },
                        { bloodType: "B-", units: 0 },
                        { bloodType: "AB+", units: 0 },
                        { bloodType: "AB-", units: 0 },
                        { bloodType: "O+", units: 0 },
                        { bloodType: "O-", units: 0 },
                      ],
                    };

                    await addBB(bloodBankData);
                    toast.success("BloodBank added successfully", {
                      hideProgressBar: true,
                      theme: "dark",
                      autoClose: 1000,
                    });
                    navigate("/");
                  } catch (error) {
                    toast.error(error.message, {
                      hideProgressBar: true,
                      theme: "dark",
                      autoClose: 1000,
                    });
                  }
                } else {
                  toast.error("PLease enter valid number", {
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
            ADD BLOOD BANK
          </button>
        </div>
      </div>
    </>
  );
};

export default BB;
