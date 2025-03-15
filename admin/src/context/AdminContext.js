import { createContext, useContext, useEffect, useState } from "react";
import AdminApi from "../api/AdminApi";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [admin, setAdmin] = useState();
  useEffect(() => {
    let AdminToken = localStorage.getItem("adminToken");
    setToken(AdminToken);
    if (token) {
      getAdmin();
    }
  }, [token]);

  const login = async (mail, password) => {
    try {
      let { data } = await AdminApi.post("/admin/login", {
        mail,
        password,
      });

      setToken(data.token);
      localStorage.setItem("adminToken", data.token);
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

  const getAdmin = async () => {
    try {
      let { data } = await AdminApi.post("/me", {
        token,
      });
      setAdmin(data.admin);
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

  const addBB = async (bb) => {
    try {
      let { data } = await AdminApi.post("/admin/addBloodBank", {
        bb,
        token,
      });
      console.log(data.message);
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

  const addAdmin = async (name, mail, phone, password) => {
    try {
      let { data } = await AdminApi.post("/addadmin", {
        name,
        mail,
        phone,
        password,
        token,
      });
      console.log(data.message);
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

  return (
    <AdminContext.Provider
      value={{ token, login, setToken, admin, setAdmin, addBB, addAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
