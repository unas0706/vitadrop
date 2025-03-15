import { createContext, useContext, useEffect, useState } from "react";
import UserApi from "../api/UserApi";

export const bloodBankContext = createContext();

export const BloodBankContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [bloodBank, setBloodBank] = useState();
  const [user, setUser] = useState();
  const [transactions, setTransactions] = useState();
  const [OTP, setOTP] = useState();

  const login = async (email, password) => {
    try {
      let { data } = await UserApi.post("/bloodBank/login", {
        email,
        password,
      });
      setToken(data.token);
      if (data.token) {
        localStorage.setItem("bbToken", data.token);
      }
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

  const getBloodBank = async (token) => {
    try {
      let { data } = await UserApi.post("/bloodbank", {
        token,
      });
      console.log(data);

      setBloodBank(data.bloodbank);
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

  const updateInventory = async (inventory) => {
    try {
      let { data } = await UserApi.patch("/update", {
        token,
        inventory,
      });
      setBloodBank(data.user);
      console.log("Updated inventory");
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

  const editProfile = async (name, phone, address, email, token) => {
    try {
      let { data } = await UserApi.patch("/update", {
        token,
        name,
        contact: {
          phone,
          email,
        },
        address,
      });

      setBloodBank(data.user);
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

  const changePwd = async (oldpwd, newpwd) => {
    try {
      let { data } = await UserApi.patch("/changePassword", {
        oldpwd,
        newpwd,
        token,
      });
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

  const getUser = async (phone) => {
    try {
      let { data } = await UserApi.post("/getUser", {
        token,
        phone,
      });

      setUser(data.exist);
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

  const getUserTransaction = async (id) => {
    try {
      let { data } = await UserApi.post("/userTransaction", {
        id,
        token,
      });
      setTransactions(data.transactions);
    } catch (error) {
      if (error.response) {
        console.log("Server Error:", error.response.data.err);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Request setup error:", error.message);
      }
    }
  };

  const createTransaction = async (phone, bloodType, units) => {
    try {
      let { data } = await UserApi.post("/createTransaction", {
        token,
        phone,
        bloodType,
        units,
      });
      console.log("transaction created sucessfully");
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

  const sendOTP = async (phone) => {
    try {
      let { data } = await UserApi.post("/donor/login", {
        phone,
      });
      setOTP(data.otp);
    } catch (error) {
      if (error.response) {
        console.log("Server Error:", error.response.data.err);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Request setup error:", error.message);
      }
    }
  };

  const checkoutTransaction = async (id) => {
    try {
      let { data } = await UserApi.post(
        `/checkoutTransaction?transactionId=${id}`,
        {
          token,
        }
      );
      console.log("Transaction Updated Sucessfully");
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

  const deleteTransaction = async (id) => {
    try {
      let { data } = await UserApi.post(`/deleteTransaction/${id}`, {
        token,
      });
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
    let token = localStorage.getItem("bbToken");
    setToken(token);
    if (token) {
      getBloodBank(token);
    }
  }, [token]);

  return (
    <bloodBankContext.Provider
      value={{
        login,
        token,
        setToken,
        bloodBank,
        setBloodBank,
        editProfile,
        changePwd,
        getUser,
        user,
        setUser,
        createTransaction,
        getUserTransaction,
        transactions,
        setTransactions,
        sendOTP,
        OTP,
        checkoutTransaction,
        deleteTransaction,
        updateInventory,
      }}
    >
      {children}
    </bloodBankContext.Provider>
  );
};

export const useBBContext = () => {
  return useContext(bloodBankContext);
};
