import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useBBContext } from "../context/BloodBankContext";
const Home = () => {
  const { token, bloodBank, setTransactions, transactions, setUser } =
    useBBContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  useEffect(() => {
    setTransactions(null);
    setUser(null);
  }, [transactions]);
  return (
    <>
      <Navbar />
      <div className="greet">
        <h2>
          Welcome!! <br />
          {bloodBank?.name}
        </h2>
        <span>
          ------ "Blood banks connect the kindness of donors to the survival of
          patients." ------
        </span>
      </div>

      <div className="operation-con">
        <Link to="/createTransaction" className="operation hover">
          Create Transaction <MdOutlineKeyboardArrowRight className="arrow" />
        </Link>
        <Link to="/deleteTransaction" className="operation hover">
          Delete Transaction <MdOutlineKeyboardArrowRight />{" "}
        </Link>
        <Link to="/validateTransaction" className="operation hover">
          Validate Transaction <MdOutlineKeyboardArrowRight />{" "}
        </Link>
        <Link to="/inventory" className="operation hover">
          Update Inventory <MdOutlineKeyboardArrowRight />{" "}
        </Link>
      </div>
    </>
  );
};

export default Home;
