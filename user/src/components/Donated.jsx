import React, { useEffect, useState } from "react";
const Donated = ({ transactions }) => {
  const [dif, setDif] = useState();
  useEffect(() => {
    const date1 = new Date(transactions?.date);

    const date2 = new Date();

    const diffInMilliseconds = date2 - date1;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    setDif(Math.ceil(diffInDays.toFixed(2)));
  });
  return (
    <div className="blood-grp">
      <div className="sub-text" style={{ padding: "0 1%" }}>
        <b>Donated before (days)</b>
      </div>
      <div
        className="circle"
        // style={{ backgroundColor: "green", border: "unset" }}
      >
        {/* <TiTick /> */}
        {/* <RxCross2 /> */}
        {transactions ? dif : "0"}
      </div>
    </div>
  );
};

export default Donated;
