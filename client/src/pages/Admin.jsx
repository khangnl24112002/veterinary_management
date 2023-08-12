/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import axiosInstance from "../axios/axiosInstance";

const Admin = ({ handleLogout }) => {
  const testRefreshToken = async () => {
    try {
      const response = await axiosInstance.get("/accounts");
      console.log(response.data);
    } catch (error) {
      console.log("error when call new API:", error);
      // Dang xuat
    }
  };
  const info = useSelector((state) => state.auth.user);
  return (
    <div>
      <div>
        <h1>Admin page</h1>
        <h2>Welcome, {info.username}</h2>
        <h2>Your id: {info.id}</h2>
        <h2>Your role: {info.role}</h2>
        <Header />
        <Navbar />
        <button onClick={testRefreshToken}>Call API test</button>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Admin;
