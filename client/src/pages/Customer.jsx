/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";

const Customer = ({ handleLogout }) => {
  const info = useSelector((state) => state.auth.user);
  return (
    <div>
      <div>
        <h1>Customer page</h1>
        <h2>Welcome, {info.username}</h2>
        <h2>Your id: {info.id}</h2>
        <h2>Your role: {info.role}</h2>
        <Header />
        <Navbar />
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Customer;
