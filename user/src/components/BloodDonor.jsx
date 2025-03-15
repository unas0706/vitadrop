import React, { useContext } from "react";
import { IoFilter } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const BloodDonor = ({ setFilter, location, arr, setArr }) => {
  return (
    <>
      <div className="transaction-btn-con1">
        <input
          type="text"
          name="search"
          id="search"
          className="inp"
          placeholder="Search ..."
          onChange={(e) => {
            let arr1 = arr.filter(
              (ele) =>
                ele.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                ele.address.toLowerCase().includes(e.target.value.toLowerCase())
            );

            setArr(arr1);
          }}
        />
      </div>
      <div className="filter">
        <div className="loc">
          <CiLocationOn style={{ color: "#ff5252" }} />
          <i
            onClick={() => {
              setFilter({
                left: "0",
              });
            }}
          >
            {location || "Select Location"}
          </i>
        </div>
        <div
          className="fil"
          onClick={() => {
            setFilter({
              left: "0",
            });
          }}
        >
          <IoFilter />
          <b>Apply Filter</b>
        </div>
      </div>
    </>
  );
};

export default BloodDonor;
