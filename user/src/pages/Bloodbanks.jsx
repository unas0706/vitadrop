import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BloodDonor from "../components/BloodDonor";
import Filter from "../components/Filter";
import BloodBank from "../components/BloodBank";
import { UserContext } from "../context/UserContext";

const Bloodbanks = () => {
  let { filterBloodBanks, setSearchBloodBanks, searchBloodBanks, LOC, setLOC } =
    useContext(UserContext);

  let [sidebar, setSidebar] = useState({
    left: "-70%",
  });
  const [filter, setFilter] = useState({
    left: "100%",
  });

  const [location, setLocation] = useState(LOC);

  useEffect(() => {
    setLOC(location);
  }, [location]);

  return (
    <div className="home" style={{ overflow: "hidden" }}>
      <Header name={"Blood Banks"} sidebar={sidebar} setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <BloodDonor
        filter={filter}
        setFilter={setFilter}
        location={LOC}
        setLocation={setLocation}
        arr={filterBloodBanks}
        setArr={setSearchBloodBanks}
      />
      <Filter
        filter={filter}
        setFilter={setFilter}
        location={location}
        setLocation={setLocation}
      />
      <div className="bloodBank-con">
        {LOC && searchBloodBanks?.length == 0 && (
          <div className="empty">No Blood Banks are available</div>
        )}
        {searchBloodBanks?.length == 0 && !LOC ? (
          <div className="empty">Please Select Your Location</div>
        ) : (
          searchBloodBanks?.map((ele, index) => {
            return <BloodBank key={index} ele={ele} />;
          })
        )}
      </div>
    </div>
  );
};

export default Bloodbanks;
