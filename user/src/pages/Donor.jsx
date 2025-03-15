import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BloodDonor from "../components/BloodDonor";
import Filter from "../components/Filter";
import DonorInfo from "../components/DonorInfo";
import { UserContext } from "../context/UserContext";

const Donor = () => {
  let { filterDonors, searchDonors, setSearchDonors, LOC, setLOC } =
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
      <Header name={"Find Donors"} sidebar={sidebar} setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <BloodDonor
        filter={filter}
        setFilter={setFilter}
        location={LOC}
        setLocation={setLocation}
        arr={filterDonors}
        setArr={setSearchDonors}
      />
      <Filter
        filter={filter}
        setFilter={setFilter}
        location={location}
        setLocation={setLocation}
      />
      <div className="bloodBank-con">
        {LOC && searchDonors?.length == 0 && (
          <div className="empty">No Donors are available</div>
        )}
        {searchDonors?.length == 0 && !LOC ? (
          <div className="empty">Please Select Your Location</div>
        ) : (
          searchDonors?.map((ele, index) => {
            return (
              <DonorInfo
                key={index}
                name={ele.name}
                number={ele.phone}
                address={ele.address}
                bg={ele.bloodType}
              />
            );
          })
        )}

        {/* {searchDonors?.length > 0
          ? searchDonors?.map((ele, index) => {
              return (
                <DonorInfo
                  key={index}
                  name={ele.name}
                  number={ele.phone}
                  address={ele.address}
                  bg={ele.bloodType}
                />
              );
            })
          : null} */}
      </div>
    </div>
  );
};

export default Donor;
