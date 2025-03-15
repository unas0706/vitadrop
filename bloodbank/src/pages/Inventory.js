import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BloodGroup from "../components/BloodGroup";
import { useNavigate } from "react-router-dom";
import { useBBContext } from "../context/BloodBankContext";
import { toast } from "react-hot-toast";
const Inventory = () => {
  const { token, bloodBank, updateInventory } = useBBContext();
  const [inve, setInven] = useState(bloodBank?.inventory);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      <Navbar />
      <div className="inventory-con">
        {bloodBank?.inventory.map((ele, index) => {
          return (
            <BloodGroup ele={ele} key={index} inve={inve} setInven={setInven} />
          );
        })}
      </div>

      <div className="update-con login-con">
        <button
          className="btn hover"
          style={{ width: "40%" }}
          onClick={async () => {
            try {
              await updateInventory(inve);

              toast("Inventory updated successfully", {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Inventory;
