// Cau hinh Axios
import axios from "axios";
import { API_URL } from "../api/login_api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
