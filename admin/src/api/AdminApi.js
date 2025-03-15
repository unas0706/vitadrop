import axios from "axios";

const AdminApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AdminApi;
