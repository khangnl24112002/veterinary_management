import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";

const Admin = () => {
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
      <div>
        <Header />
        <Navbar />
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Admin;
