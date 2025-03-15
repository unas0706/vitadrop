import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const BloodBank = ({ ele }) => {
  const [open, setOpen] = useState();
  let { setBloodBank } = useContext(UserContext);
  useEffect(() => {
    const now = new Date();
    const [oh, om] = ele.operatingHours.open.split(":").map(Number);
    const [ch, cm] = ele.operatingHours.close.split(":").map(Number);
    const opentym = new Date();
    opentym.setHours(oh, om, 0, 0);

    const closetym = new Date();
    closetym.setHours(ch, cm, 0, 0);

    if (now >= opentym && now <= closetym) {
      setOpen("open");
    } else {
      setOpen("closed");
    }
  });

  return (
    <>
      <Link
        className="BB"
        to={`/BB/${ele?.name}`}
        onClick={() => {
          setBloodBank(ele);
        }}
      >
        <div className="BB-name">
          <b style={{ width: "70%" }}>{ele?.name}</b>
          <b className={open}> {open}</b>
        </div>
        <div className="BB-address">{ele?.address}</div>
      </Link>
    </>
  );
};

export default BloodBank;
