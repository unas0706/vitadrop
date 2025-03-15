import React, { useEffect, useState } from "react";

const BloodGroup = ({ ele, setInven, inve }) => {
  const [val, setVal] = useState(ele?.units);
  useEffect(() => {
    inve.forEach((item) => {
      if (item.bloodType === ele?.bloodType) {
        item.units = val;
      }
    });
  }, [val]);
  return (
    <div className="bloodgroup">
      <h2 className="bb-name">{ele?.bloodType}</h2>
      <div className="amount">
        <button
          onClick={() => {
            if (val <= 0) {
              return;
            }
            setVal(val - 1);
          }}
        >
          -
        </button>
        {val} Units
        <button
          onClick={() => {
            setVal(val + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BloodGroup;
