import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Curve from "../components/Curve";
import Sidebar from "../components/Sidebar";
import { DonorContext } from "../context/DonorContext";

const Home = () => {
  const { donorData } = useContext(DonorContext);

  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });

  return (
    <main className="home">
      <>
        <Curve sidebar={sidebar} setSidebar={setSidebar} />
        <div className="btn-con">
          <div className="btn1-con">
            <Link to="/bloodbanks" className="Btn">
              Blood Banks
            </Link>
            <Link to="/donor" className="Btn">
              Donors
            </Link>
          </div>
          <div className="btn1-con ">
            {!donorData && (
              <>
                <Link
                  to="/login"
                  style={{ boxShadow: "unset" }}
                  className="Btn O-Btn"
                >
                  Log In
                </Link>
                <div className="reg">
                  Want to be a donor?&nbsp;
                  <Link
                    style={{
                      color: "#f44545",
                    }}
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
            {donorData && (
              <>
                <Link
                  to="/user"
                  style={{ boxShadow: "unset" }}
                  className="Btn O-Btn"
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      </>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
    </main>
  );
};

export default Home;
