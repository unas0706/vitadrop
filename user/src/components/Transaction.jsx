import React from "react";

const Transaction = ({ ele }) => {
  const date = new Date(ele.date);

  const formattedDate = date.toLocaleDateString("en-GB");
  return (
    <div className="transaction">
      <div className="t-id" style={{ justifyContent: "right" }}>
        <b>Date: &nbsp;</b> <span className="sub-id">{formattedDate}</span>
      </div>{" "}
      <div className="t-id" style={{ alignItems: "flex-end" }}>
        <b>Id:</b> <span className="sub-id">{ele._id}</span>
      </div>
      <div className="t-id">
        <b>Quantity:</b> <span className="sub-id">{ele.units} Units</span>
      </div>
    </div>
  );
};

export default Transaction;
