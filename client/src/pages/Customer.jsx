/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";

const Customer = ({ handleLogout }) => {
  return (
    <div>
      <div>
        <h1>Customer page</h1>
        <Header />
        <Navbar />
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Customer;
