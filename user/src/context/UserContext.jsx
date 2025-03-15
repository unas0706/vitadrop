import React, { createContext, useEffect, useState } from "react";
import UserApi from "../API/UserApi";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [bloodBanks, setBloodBanks] = useState();
  const [bloodBank, setBloodBank] = useState();
  const [filterBloodBanks, setFilterBloodBanks] = useState();
  const [searchBloodBanks, setSearchBloodBanks] = useState();
  const [LOC, setLOC] = useState();
  const [donors, setDonors] = useState();
  const [filterDonors, setFilterDonors] = useState();
  const [searchDonors, setSearchDonors] = useState();

  const [pincode, setPincode] = useState("");

  const getBloodBanks = async () => {
    try {
      const { data } = await UserApi.get(`/allbloodbanks?pincode=${pincode}`);
      setBloodBanks(data.bloodbanks);
      setFilterBloodBanks(data.bloodbanks);
      setSearchBloodBanks(data.bloodbanks);
    } catch (error) {
      console.log(error);
    }
  };

  const getDonors = async () => {
    try {
      let { data } = await UserApi.get(`/alldonors?pincode=${pincode}`);
      setDonors(data.donors);
      setFilterDonors(data.donors);
      setSearchDonors(data.donors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodBanks();
    getDonors();
  }, [pincode]);

  return (
    <UserContext.Provider
      value={{
        pincode,
        setPincode,
        filterBloodBanks,
        setFilterBloodBanks,
        bloodBanks,
        setBloodBanks,
        searchBloodBanks,
        setSearchBloodBanks,
        setDonors,
        donors,
        filterDonors,
        setFilterDonors,
        searchDonors,
        setSearchDonors,
        bloodBank,
        setBloodBank,
        LOC,
        setLOC,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
