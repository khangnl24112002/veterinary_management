import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/authActions";

const Customer = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div>
      <h1>Welcome to Customer Page</h1>
      <h1>Hello {user.username}</h1>
      <h1>Your password: {user.password}</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Customer;
