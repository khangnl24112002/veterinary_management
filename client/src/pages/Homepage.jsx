/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Admin from "./Admin";
import Customer from "./Customer";
import { logoutUser } from "../actions/authAction/authActions";
import UnknownError from "./UnknownError";

const Homepage = ({ removeTokens }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Xoa token
    removeTokens();
    // Xoa thong tin user khoi localStorage
    localStorage.removeItem("account");
    // xoa thong tin nguoi dung khoi redux
    dispatch(logoutUser());
  };
  const userInfo = JSON.parse(localStorage.getItem("account"));
  if (userInfo?.role === 1)
    return (
      <div>
        <Admin handleLogout={handleLogout} userInfo={userInfo} />
      </div>
    );
  else if (userInfo?.role === 2)
    return (
      <div>
        <Customer handleLogout={handleLogout} userInfo={userInfo} />
      </div>
    );
  else return <UnknownError />;
};

export default Homepage;
