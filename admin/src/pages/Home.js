import React, { useEffect } from "react";
import Navbar from "../componets/Navbar";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

const Home = () => {
  const { token, admin } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="greet">
        <h2>
          Welcome!! <br />
          {admin?.name}
        </h2>
        <span>
          ------ "Heroes don’t always wear capes <br />
          sometimes, they just roll up their sleeves and donate blood. Be
          someone's hero today!" ------
        </span>
      </div>

      <div className="operation-con">
        <Link to="/addAdmin" className="operation hover">
          Add Admin <MdOutlineKeyboardArrowRight className="arrow" />
        </Link>
        <Link to="/addBloodBank" className="operation hover">
          Add BloodBank <MdOutlineKeyboardArrowRight />{" "}
        </Link>
      </div>
    </>
  );
};

export default Home;
