/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const Admin = ({ handleLogout }) => {
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
      <div className="flex flex-col w-[100%]">
        <Header handleLogout={handleLogout} />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
