/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";

const Customer = ({ handleLogout }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div>
        <Header user={user} />
        <Navbar />
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Customer;
