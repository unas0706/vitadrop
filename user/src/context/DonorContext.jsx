import { createContext, useEffect, useState } from "react";
import UserApi from "../API/UserApi";

export const DonorContext = createContext();

export const DonorContextProvider = ({ children }) => {
  const [donorData, setDonorData] = useState();
  const [token, setToken] = useState();
  const [transactions, setTransaction] = useState();
  const [num, setNumber] = useState();

  const registerDonor = async (
    phone,
    name,
    bloodType,
    pincode,
    address,
    isPublic
  ) => {
    try {
      let { data } = await UserApi.post("/registerDonor", {
        phone,
        name,
        bloodType,
        pincode,
        address,
        isPublic,
      });

      setDonorData(data.user);
      setToken(data.token);

      localStorage.setItem("donorToken", encodeURIComponent(data.token));
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.err);
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Something went wrong while processing your request");
      }
    }
  };

  const getUser = async () => {
    setToken(decodeURIComponent(localStorage.getItem("donorToken")));

    if (token) {
      try {
        let { data } = await UserApi.post("/donor", {
          token,
        });
        setDonorData(data.user);
      } catch (error) {
        if (error.response) {
          if (
            error.response.data.err == "JWT has expired. Please log in again"
          ) {
            setToken("");
            localStorage.setItem("donorToken", "");
          }

          console.log(error.response.data.err);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Request setup error:", error.message);
        }
      }
    }
  };

  const donorAllTransactions = async () => {
    if (token) {
      try {
        let { data } = await UserApi.post("/donorAllTransactions", {
          token,
        });
        data.transactions?.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransaction(data.transactions);
      } catch (error) {
        if (error.response) {
          console.log("Server Error:", error.response.data.err);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Request setup error:", error.message);
        }
      }
    }
  };

  const donorLogin = async (num) => {
    try {
      let { data } = await UserApi.post("/donorLogin", {
        phone: num,
      });

      setDonorData(data.exist);
      setToken(data.token);
      localStorage.setItem("donorToken", encodeURIComponent(data.token));
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.err);
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Something went wrong while processing your request");
      }
    }
  };

  const deleteDonor = async () => {
    setToken(decodeURIComponent(localStorage.getItem("donorToken")));

    if (token) {
      try {
        let { data } = await UserApi.post("/donor/delete", {
          token,
        });
        console.log("Donor deleted successfully");
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.err);
        } else if (error.request) {
          throw new Error("No response received from server");
        } else {
          throw new Error("Something went wrong while processing your request");
        }
      }
    }
  };

  const logOut = async () => {
    try {
      localStorage.setItem("donorToken", "");
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.err);
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Something went wrong while processing your request");
      }
    }
  };

  const editDonor = async (name, pincode, bloodType, address, isPublic) => {
    try {
      let { data } = await UserApi.patch("/donor/edit", {
        token,
        name,
        pincode,
        bloodType,
        address,
        isPublic,
      });
      console.log(name, pincode, bloodType, address, isPublic);

      setDonorData(data.user);
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.err);
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Something went wrong while processing your request");
      }
    }
  };

  useEffect(() => {
    setToken(decodeURIComponent(localStorage.getItem("donorToken")));
    if (token) {
      getUser();

      donorAllTransactions();
    }
  }, [token]);

  return (
    <DonorContext.Provider
      value={{
        donorData,
        setDonorData,
        registerDonor,
        transactions,
        deleteDonor,
        donorLogin,
        logOut,
        editDonor,
        num,
        setNumber,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
};
