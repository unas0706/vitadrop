import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Verify from "../components/Verify";
import Curve from "../components/Curve";
import { DonorContext } from "../context/DonorContext";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
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
  const navigate = useNavigate();
  // const [location, setLocation] = useState();
  const { registerDonor, num } = useContext(DonorContext);
  // const loc = async (e) => {
  //   if (100000 <= e.target.value && e.target.value <= 999999) {
  //     const url = `https://nominatim.openstreetmap.org/search`;

  //     try {
  //       const response = await axios.get(url, {
  //         params: {
  //           postalcode: 522601,
  //           format: "json",
  //           countrycodes: "IN",
  //         },
  //       });

  //       if (response.data.length > 0) {
  //         const addressParts = response.data[0].display_name.split(", ");
  //         const city =
  //           addressParts.length > 1
  //             ? addressParts[1]
  //             : response.data[0].display_name;
  //         setLocation(city);
  //       } else {
  //         setLocation(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching location:", error);
  //     }
  //   }
  // };

  const registerSubtmit = async () => {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let bloodgroup = document.getElementById("bloodgroup").value;
    let pinCode = document.getElementById("pinCode").value;
    let address = document.getElementById("address").value;
    let isPublic = document.getElementById("public").checked;

    if (number.length == 10 && !isNaN(number)) {
      if (name || bloodgroup || pinCode || address || isPublic) {
        number = `+91 ${number.slice(0, 5)} ${number.slice(5)}`;

        try {
          await registerDonor(
            number,
            name,
            bloodgroup,
            pinCode,
            address,
            isPublic
          );
          navigate("/user");
          toast.success("Donor registered successfully", {
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
      } else {
        toast.error("Please fill the form", {
          style: {
            width: "80%",
          },
          hideProgressBar: true,
        });
      }
    } else {
      toast.error(
        "Invalid phone number. Please enter a valid 10-digit number.",
        {
          style: {
            width: "80%",
          },
          hideProgressBar: true,
        }
      );
    }
  };

  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });

  let [verified, setVerified] = useState(false);

  return (
    <>
      <div className="register-form home">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        {!verified && (
          <>
            <Curve sidebar={sidebar} setSidebar={setSidebar} />
            <Verify setVerified={setVerified} />
          </>
        )}
        {verified && (
          <>
            <Header
              name={"Register"}
              sidebar={sidebar}
              setSidebar={setSidebar}
            />
            <form
              className="reg-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                name="Name"
                id="name"
                placeholder="Name"
                className="inp"
              />
              <select id="pinCode" className="inp">
                <option value="">-- Choose a City --</option>
                {sortedCities.map((city, index) => (
                  <option key={index} value={city.pincode}>
                    {city.name}
                  </option>
                ))}
              </select>
              <select name="bloodType" className="inp" id="bloodgroup">
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
              <input
                type="tel"
                name="phone"
                className="inp"
                id="number"
                value={num}
                placeholder="Enter Phone Number"
              />
              <textarea
                name="address"
                id="address"
                className="inp"
                placeholder="Addresss.."
                style={{ height: "15%", marginBottom: "5%" }}
              ></textarea>
              <br />
              <input type="checkbox" name="public" id="public" />
              <label htmlFor="public">
                &nbsp;Do you want to share your Information{" "}
              </label>
              <input
                type="submit"
                value="Register"
                className="Btn inp form-btn"
                onClick={registerSubtmit}
              />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
