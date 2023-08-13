/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";

const Customer = ({ handleLogout, userInfo }) => {
  return (
    <div>
      <div>
        <Header userInfo={userInfo} handleLogout={handleLogout} />
        <Navbar />
      </div>
    </div>
  );
};

export default Customer;
