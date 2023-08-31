/* eslint-disable react/prop-types */
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
const Customer = ({ handleLogout, userInfo }) => {
  return (
    <div>
      <div>
        <Header userInfo={userInfo} handleLogout={handleLogout} />
        <div className="flex">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Customer;
