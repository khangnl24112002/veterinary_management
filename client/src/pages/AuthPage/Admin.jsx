/* eslint-disable react/prop-types */
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getAccountById } from "../../services/account.services";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/userActions/userActions";

const Admin = ({ handleLogout }) => {
  // get data about account from server
  const dispatch = useDispatch();
  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    const fetchUserData = async (accountId) => {
      const response = await getAccountById(accountId);
      // Goi len redux
      dispatch(updateUser(response.data));
    };
    fetchUserData(account.id);
  });

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
