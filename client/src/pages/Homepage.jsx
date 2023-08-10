/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "./Unauthorized";
import Admin from "./Admin";
import Customer from "./Customer";
import { logoutUser } from "../actions/authActions";

const Homepage = ({ removeToken }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Xoa token
    removeToken();
    // xoa thong tin nguoi dung khoi redux
    dispatch(logoutUser());
  };
  const userInfo = useSelector((state) => state.auth.user);
  if (userInfo?.role === "admin")
    return (
      <div>
        <Admin handleLogout={handleLogout} />
      </div>
    );
  else if (userInfo?.role === "customer")
    return (
      <div>
        <Customer handleLogout={handleLogout} />
      </div>
    );
  else return <Unauthorized />;
};

export default Homepage;
