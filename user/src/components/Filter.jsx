import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { UserContext } from "../context/UserContext";

const Filter = ({ filter, setFilter, setLocation, location }) => {
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

  const {
    setPincode,
    setFilterBloodBanks,
    bloodBanks,
    setSearchBloodBanks,
    donors,
    setFilterDonors,
    setSearchDonors,
  } = useContext(UserContext);

  const [LocBtn, setLocBtn] = useState({
    backgroundColor: "#ff5252",
    color: "#fff",
  });
  const [BgBtn, setBgBtn] = useState({
    backgroundColor: "#fff",
    color: "#ff5252",
  });
  const [loc, setLoc] = useState({
    display: "block",
  });
  const [Bg, setBg] = useState({ display: "none" });
  return (
    <div className="filter-sec" style={filter}>
      <div className="filter-head">
        <div
          style={LocBtn}
          className="filter-head-val"
          onClick={() => {
            setLoc({ display: "block" });
            setBg({ display: "none" });
            setLocBtn({ backgroundColor: "#ff5252", color: "#fff" });
            setBgBtn({ backgroundColor: "#fff", color: "#ff5252" });
          }}
        >
          <b>Location</b>
        </div>
        <div
          style={BgBtn}
          className="filter-head-val "
          onClick={() => {
            setLoc({ display: "none" });
            setBg({ display: "block" });
            setBgBtn({ backgroundColor: "#ff5252", color: "#fff" });
            setLocBtn({ backgroundColor: "#fff", color: "#ff5252" });
          }}
        >
          <b>Blood Group</b>
        </div>
      </div>
      <div className="filter-val">
        <div className="filter-val-location" style={loc}>
          {/* Enter Your PinCode <br />
          <input
            type="number"
            max="999999"
            className="inp f-inp"
            onInput={async (e) => {
              if (100000 <= e.target.value && e.target.value <= 999999) {
                const url = `https://nominatim.openstreetmap.org/search`;

                try {
                  const response = await axios.get(url, {
                    params: {
                      postalcode: e.target.value,
                      format: "json",
                      countrycodes: "IN",
                    },
                  });

                  if (response.data.length > 0) {
                    const addressParts =
                      response.data[0].display_name.split(", ");
                    const city =
                      addressParts.length > 1
                        ? addressParts[1]
                        : response.data[0].display_name;
                    setLocation(city);
                    setPincode(`${e.target.value}`);
                  } else {
                    setLocation("No Location");
                  }
                } catch (error) {
                  console.error("Error fetching location:", error);
                }
              }
            }}
          />
          <div className="location-data">
            Your location is <b>{location}</b>
          </div> */}
          Select your Location
          <select
            id="pinCode"
            className="inp"
            style={{ height: "30%", textAlign: "center" }}
            onChange={(e) => {
              setPincode(e.target.value);
              let arr = sortedCities.filter(
                (ele) => ele.pincode == e.target.value
              );
              setLocation(arr[0].name);
            }}
          >
            <option value="">-- Choose a City --</option>
            {sortedCities.map((city, index) => (
              <option key={index} value={city.pincode}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-blood-group filter-val-location" style={Bg}>
          Select Blood Group you need
          <select
            name="bloodType"
            className="inp f-inp"
            onChange={(e) => {
              if (bloodBanks?.length > 0 && e.target.value != "") {
                let arr = bloodBanks.filter((ele) => {
                  return ele.inventory.some(
                    (item) =>
                      item.bloodType == e.target.value && item.units >= 1
                  );
                });
                setFilterBloodBanks(arr);
                setSearchBloodBanks(arr);
              }

              if (donors?.length > 0) {
                let arr = donors.filter(
                  (ele) => ele.bloodType == e.target.value
                );
                setFilterDonors(arr);
                setSearchDonors(arr);
              }
            }}
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>
      <div className="filter-btn-con transaction-btn-con1">
        <button
          style={{ boxShadow: "unset" }}
          className="Btn active"
          onClick={() => {
            setFilter({
              left: "100%",
            });
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setFilter({
              left: "100%",
            });
          }}
          className="Btn "
          style={{ border: "unset" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Filter;
