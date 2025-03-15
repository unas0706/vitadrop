import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Curve = ({ sidebar, setSidebar, text }) => {
  return (
    <>
      <div className="curve">
        <div className="menu">
          <GiHamburgerMenu
            onClick={() => {
              setSidebar({
                left: "0%",
              });
            }}
          />{" "}
        </div>
        <h2 className="greeting">
          Welcome !!
          <br /> {text || " to VitaDrop"}
        </h2>
        <div className="subtext">
          <i>
            {text
              ? ""
              : "You don’t have to be a doctor to save a life, just a donor"}
          </i>
        </div>
      </div>
    </>
  );
};

export default Curve;
