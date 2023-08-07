// import { Outlet } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
  // Chuyen sang trang Login
  navigate("/login");
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
