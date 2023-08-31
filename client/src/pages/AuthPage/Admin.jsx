/* eslint-disable react/prop-types */
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

const Admin = ({ handleLogout }) => {
  return (
    <div className="flex flex-row overflow-hidden h-screen">
      <Navbar />
      <div className="flex flex-col w-[100%] flex-1">
        <Header handleLogout={handleLogout} />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
