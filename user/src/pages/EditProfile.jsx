import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { DonorContext } from "../context/DonorContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
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
  const { donorData, editDonor } = useContext(DonorContext);

  const navigate = useNavigate();

  const edit = async () => {
    let name = document.getElementById("name").value;
    let pinCode = document.getElementById("pinCode").value;
    let bloodgroup = document.getElementById("bloodgroup").value;
    let address = document.getElementById("address").value;
    let isPublic = document.getElementById("public").checked;

    try {
      await editDonor(name, pinCode, bloodgroup, address, isPublic);
      navigate("/user");
      toast.success("User updated Successfully", {
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
  };

  useEffect(() => {
    let token = localStorage.getItem("donorToken");

    if (!token) {
      navigate("/login");
    }
  }, [donorData]);

  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });

  return (
    <div className="home">
      <Header name={"Edit Profile"} sidebar={sidebar} setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <form
        className="reg-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          defaultValue={donorData?.name}
          name="Name"
          placeholder="Name"
          className="inp"
          id="name"
        />
        {donorData && (
          <>
            <select
              id="pinCode"
              className="inp"
              defaultValue={donorData?.pincode}
              type="number"
              name="Name"
              placeholder="Pin Code"
            >
              <option value="">-- Choose a City --</option>
              {sortedCities.map((city, index) => (
                <option key={index} value={city?.pincode}>
                  {city.name}
                </option>
              ))}
            </select>
            <select
              id="bloodgroup"
              name="bloodType"
              className="inp"
              defaultValue={donorData?.bloodType}
            >
              <option value="">-- Select Your Blood Group --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </>
        )}
        {/* <input
          value={donorData?.phone}
          type="tel"
          name="phone"
          className="inp"
          placeholder="Enter Phone Number"
        /> */}
        <textarea
          defaultValue={donorData?.address}
          name="address"
          className="inp"
          placeholder="Addresss.."
          id="address"
          style={{ height: "15%", marginBottom: "5%" }}
        ></textarea>
        <br />
        <input
          type="checkbox"
          name="public"
          id="public"
          defaultChecked={donorData?.isPublic || false}
        />
        <label htmlFor="public">
          &nbsp;Do you want to share your Information{" "}
        </label>
        <input
          type="submit"
          value="Update"
          className="Btn inp form-btn"
          onClick={() => {
            edit();
          }}
        />
      </form>
    </div>
  );
};

export default EditProfile;
