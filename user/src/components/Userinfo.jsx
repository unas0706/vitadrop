import React from "react";

const Userinfo = ({ bloodType }) => {
  return (
    <div className="blood-grp">
      <div className="sub-text">
        <b>Your blood group</b>
      </div>
      <div className="Blood">{bloodType}</div>
    </div>
  );
};

export default Userinfo;
