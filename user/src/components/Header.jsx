import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ name, setSidebar }) => {
  return (
    <div className="header">
      <GiHamburgerMenu
        style={{
          position: "relative",
          right: "10%",
        }}
        onClick={() => {
          setSidebar({
            left: "0%",
          });
        }}
      />
      {name.slice(0, 16)}
      <br />
      {name.slice(16, 32)}
    </div>
  );
};

export default Header;
