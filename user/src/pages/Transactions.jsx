import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Transaction from "../components/Transaction";
import { DonorContext } from "../context/DonorContext";

const Transactions = () => {
  const { transactions } = useContext(DonorContext);
  const [validTransactions, setValidTransactions] = useState();
  const [invalidTransactions, setInvalidTransactions] = useState();

  useEffect(() => {
    let arr = transactions?.filter((ele) => ele.valid == true);
    setValidTransactions(arr);
    let arr1 = transactions?.filter((ele) => ele.valid != true);
    setInvalidTransactions(arr1);
  }, [transactions]);

  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });

  return (
    <div className="home">
      {" "}
      <Header name={"Transactions"} sidebar={sidebar} setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div className="transaction-btn-con1">
        <button
          id="t-btn-1"
          style={{ boxShadow: "none", border: "none", borderRadius: "unset" }}
          className="Btn"
          onClick={() => {
            document.querySelector(".transaction-con").scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Active
        </button>
        <button
          id="t-btn-2"
          className="Btn active"
          style={{ boxShadow: "none", border: "none", borderRadius: "unset" }}
          onClick={() => {
            document.querySelector(".transaction-con").scrollTo({
              left: document.querySelector(".transaction-con").scrollWidth,
              behavior: "smooth",
            });
          }}
        >
          Reedemed
        </button>
      </div>
      <div
        className="transaction-con"
        onScroll={(e) => {
          const scrollLeft = e.target.scrollLeft;
          const scrollWidth = e.target.scrollWidth;
          const clientWidth = e.target.clientWidth;

          if (scrollLeft === 0) {
            document.getElementById("t-btn-2").classList.add("active");
            document.getElementById("t-btn-1").classList.remove("active");
          } else if (scrollLeft + clientWidth + 2 >= scrollWidth) {
            document.getElementById("t-btn-1").classList.add("active");
            document.getElementById("t-btn-2").classList.remove("active");
          }
        }}
      >
        <div className="transaaction-con-1">
          {validTransactions?.length === 0 && (
            <div className="empty">THERE ARE NO TRANSACTIONS</div>
          )}
          {validTransactions?.length > 0 &&
            validTransactions.map((ele, index) => (
              <Transaction key={index} ele={ele} />
            ))}
        </div>
        <div className="transaaction-con-1 con-2">
          {invalidTransactions?.length === 0 && (
            <div className="empty">THERE ARE NO REEDEMED TRANSACTIONS</div>
          )}

          {invalidTransactions?.length > 0 &&
            invalidTransactions?.map((ele, index) => (
              <Transaction key={index} ele={ele} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
