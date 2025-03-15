import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { IoMdCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { UserContext } from "../context/UserContext";

const BB = () => {
  const { bloodBank } = useContext(UserContext);
  const bloodUnits = bloodBank?.inventory.reduce((acc, item) => {
    acc[item.bloodType] = item.units;
    return acc;
  }, {});

  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });

  return (
    <div className="home">
      <Header
        name={bloodBank?.name}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div className="filter">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            width: "40%",
            height: "100%",
          }}
        >
          <IoMdCall />
          <a href={`tel:${bloodBank?.contact.phone}`} className="call">
            {bloodBank?.contact.phone}
          </a>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "60%",
            height: "100%",
          }}
        >
          <CiMail style={{ marginLeft: "2%" }} />
          <a href={`mailto:${bloodBank?.contact.email}`} className="call">
            {bloodBank?.contact.email}
          </a>
        </div>
      </div>

      <table className="BB-inventory">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Number of Units</th>
          </tr>
        </thead>
        <tbody>
          {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
            (bloodGroup) => (
              <tr key={bloodGroup}>
                <td>{bloodGroup}</td>
                <td>{bloodUnits[bloodGroup] || 0}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="bb-address">
        <h2>
          <u>Address</u>
        </h2>
        <div className="BB-address" style={{ width: "70%", margin: "auto" }}>
          {bloodBank.address}
        </div>
      </div>
    </div>
  );
};

export default BB;
