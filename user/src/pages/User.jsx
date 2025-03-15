import React, { useContext, useEffect, useState } from "react";
import Curve from "../components/Curve";
import Sidebar from "../components/Sidebar";
import Userinfo from "../components/Userinfo";
import Donated from "../components/Donated";
import { Link, useNavigate } from "react-router-dom";
import { DonorContext } from "../context/DonorContext";

const User = () => {
  const { donorData, transactions } = useContext(DonorContext);
  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("donorToken");
    if (!token) {
      navigate("/login");
    }
  }, [donorData]);

  return (
    <div className="home">
      <Curve sidebar={sidebar} setSidebar={setSidebar} text={donorData?.name} />
      <div className="user-info">
        <Userinfo bloodType={donorData?.bloodType} />
        {transactions && <Donated transactions={transactions[0]} />}{" "}
      </div>
      <div className="transaction-btn-con">
        <Link
          to="/transactions"
          className="Btn O-Btn"
          style={{ border: "unset" }}
        >
          Check Donation History
        </Link>
      </div>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
    </div>
  );
};

export default User;
