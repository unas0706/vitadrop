import React from "react";
import { useBBContext } from "../context/BloodBankContext";

const Transaction = ({ setOtp, ele, setId }) => {
  const { user, sendOTP } = useBBContext();

  const dateObj = new Date(ele?.date);

  const formattedDate = `${dateObj.getDate().toString().padStart(2, "0")}/${(
    dateObj.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateObj.getFullYear()}`;

  return (
    <div
      className="transaction"
      onClick={() => {
        setOtp(false);
        if (user) {
          sendOTP(user?.phone);
          setId(ele._id);
        }
      }}
    >
      <div className="tran" style={{ justifySelf: "right" }}>
        Date: {formattedDate}
      </div>
      <div className="tran">
        <b>Transaction Id: </b> <i>{ele?._id}</i>
      </div>
      <div className="tran">
        <b>Quantity:</b>
        <i>{ele?.units} units</i>
      </div>
    </div>
  );
};

export default Transaction;
