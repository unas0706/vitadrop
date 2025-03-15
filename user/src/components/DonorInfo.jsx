import React from "react";
import { IoMdCall } from "react-icons/io";

const DonorInfo = ({ number, address, bg, name }) => {
  return (
    <a href={`tel:+${number}`} className="BB">
      <div className="BB-name">
        <b>
          {name} - <b style={{ color: "#ff5252" }}>{bg}</b>
        </b>
      </div>
      <div className="BB-address">
        <IoMdCall />
        &nbsp;&nbsp;
        <b>{number} </b>
        <br />
        {address}
      </div>
    </a>
  );
};

export default DonorInfo;
