/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Unauthorized from "./Unauthorized";
import Admin from "./Admin";
import Customer from "./Customer";

const Homepage = ({ removeToken }) => {
  const handleLogout = () => {
    removeToken();
  };
  const userInfo = useSelector((state) => state.auth.user);
  if (userInfo.role === "admin")
    return (
      <div>
        <Admin handleLogout={handleLogout} />
      </div>
    );
  else if (userInfo.role === "customer")
    return (
      <div>
        <Customer handleLogout={handleLogout} />
      </div>
    );
  else return <Unauthorized />;
};

export default Homepage;
