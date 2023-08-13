/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import axiosInstance from "../axios/axios_interceptor_instance";

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
        <Header userInfo={userInfo} />
        <Navbar />
        <button onClick={testRefreshToken}>Call API test</button>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Admin;
