/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import axiosInstance from "../axios/axios_interceptor_instance";
import { Outlet } from "react-router-dom";

const Admin = ({ handleLogout, userInfo }) => {
  const testRefreshToken = async () => {
    try {
      const response = await axiosInstance.get("/accounts");
      console.log(response.data);
    } catch (error) {
      console.log("error when call new API:", error);
      // Dang xuat
    }
  };
  return (
    <div>
      <div>
        <Header userInfo={userInfo} handleLogout={handleLogout} />
        <div className="flex">
          <Navbar />
          <Outlet />
        </div>
        <button onClick={testRefreshToken}>Call API test</button>
      </div>
    </div>
  );
};

export default Admin;
