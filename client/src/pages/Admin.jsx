/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import axiosInstance from "../axios/axios_interceptor_instance";
import { Outlet } from "react-router-dom";

const Admin = ({ handleLogout, userInfo }) => {
  // const testRefreshToken = async () => {
  //   try {
  //     const response = await axiosInstance.get("/accounts");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log("error when call new API:", error);
  //     // Dang xuat
  //   }
  // };
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col">
        <Header userInfo={userInfo} handleLogout={handleLogout} />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
